const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const { test } = require("node:test");

const frontendPath = path.join(__dirname, "../frontend/assets/js/app.js");
const frontend = vm.createContext({
  console,
  window: { location: { protocol: "http:", origin: "http://localhost" }, localStorage: { getItem: () => null } },
  document: {
    getElementById: () => null,
    addEventListener: () => {},
    // These unit cases contain plain text; real DOCX/DOM decoding is checked in browser.
    createElement: () => ({ set innerHTML(value) { this.value = value; } }),
  },
});
vm.runInContext(fs.readFileSync(frontendPath, "utf8"), frontend);

const backendPath = path.join(__dirname, "../backend/src/services/question-bank-service.js");
const backend = vm.createContext({ require: createRequire(backendPath), __dirname: path.dirname(backendPath), module: { exports: {} } });
vm.runInContext(fs.readFileSync(backendPath, "utf8"), backend);
const options = { A: "True", B: "False" };

test("indented prose stays text while code keeps its formatting", () => {
  assert.equal(frontend.isLikelyCodeLine("    Create representations of the system at higher levels of abstraction."), false);
  assert.equal(frontend.isLikelyCodeLine("    Kỹ thuật chuyển tiếp (Forward Engineering)"), false);
  assert.equal(frontend.isLikelyCodeLine("    console.log(value);"), true);
  assert.equal(frontend.isLikelyCodeLine("    color: red;"), true);
  assert.equal(frontend.isLikelyCodeLine("    <div>Content</div>"), true);
});

test("annotated answers must agree with the option text", () => {
  assert.equal(frontend.resolveCorrectAnswer("True (a)", options), "A");
  assert.equal(frontend.resolveCorrectAnswer("False (b)", options), "B");
  assert.equal(frontend.resolveCorrectAnswer("True (b)", options), "");
  assert.equal(frontend.resolveCorrectAnswer("False (z)", options), "");
  assert.equal(frontend.resolveCorrectAnswer("True", options), "A");
  assert.equal(frontend.resolveCorrectAnswer("b", options), "B");
  assert.equal(frontend.resolveCorrectAnswer("Đúng (a)", { A: "Đúng", B: "Sai" }), "A");
  assert.equal(frontend.resolveCorrectAnswer("Sai (b)", { A: "Đúng", B: "Sai" }), "B");
  assert.equal(frontend.resolveCorrectAnswer("Đúng (b)", { A: "Đúng", B: "Sai" }), "");
  for (const context of [frontend, backend]) {
    assert.equal(context.inferQuestionType({ A: "Đúng", B: "Sai" }), "true_false");
  }
});

test("multiple answers retain every valid letter and reject incomplete lists", () => {
  const choices = { A: "First", B: "Second", C: "Third" };
  assert.equal(frontend.resolveCorrectAnswer("c, a, b, a", choices), "A,B,C");
  for (const answer of ["a, z", "a, b,", "a, b garbage"]) {
    assert.equal(frontend.resolveCorrectAnswer(answer, choices), "");
  }
  const question = frontend.buildImportedQuestion({ question: "Steps?", options: choices, correctAnswer: "a, b, c" }, 0);
  assert.equal(question.type, "multiple_choice");
  assert.equal(question.correctAnswer, "A,B,C");
  assert.equal(frontend.buildImportedQuestion({ question: "True?", options, correctAnswer: "True (a)" }, 0).type, "true_false");
});

test("both storage paths grade multiple answers as sets, with no partial credit", () => {
  for (const context of [frontend, backend]) {
    const question = { question: "Steps?", options: { A: "First", B: "Second", C: "Third", D: "Extra" }, correctAnswer: "C,A,B" };
    const normalized = context.normalizeQuestion(question, 0);
    assert.equal(normalized.correctAnswer, "A,B,C");
    assert.equal(normalized.type, "multiple_choice");
    for (const [selected, expected] of [["B,C,A", true], ["A,B", false], ["A,B,C,D", false], ["", false]]) {
      const attempt = context.normalizeAttemptHistoryItem({ details: [{ ...question, selected }] }, 0);
      assert.equal(attempt.details[0].isCorrect, expected);
    }
  }
});

test("shuffling answers preserves all correct option texts", () => {
  vm.runInContext("Math.random = () => 0", frontend);
  const question = frontend.normalizeQuestion({ question: "Steps?", options: { A: "First", B: "Second", C: "Third", D: "Extra" }, correctAnswer: "A,B,C" }, 0);
  const shuffled = frontend.shuffleQuestionAnswerOrder(question);
  assert.notEqual(shuffled.correctAnswer, question.correctAnswer);
  const correctTexts = shuffled.correctAnswer.split(",").map((letter) => shuffled.content.vi.options[letter]).sort();
  assert.equal(JSON.stringify(correctTexts), JSON.stringify(["First", "Second", "Third"]));
});
