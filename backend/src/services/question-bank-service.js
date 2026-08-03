const fs = require("fs");
const path = require("path");

const sampleQuestions = require("../../data/sample-questions");

const STORAGE_PATH = path.join(
  __dirname,
  "..",
  "..",
  "storage",
  "question-bank.json",
);
const SAMPLE_BANK_ID = "sample-html-40";
const MAX_ATTEMPTS = 500;
const DOCX_CODE_LINE_TOKEN_PREFIX = "[[DOCX_CODE_LINE]]";

function toText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeDisplayText(value) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => {
      if (line.startsWith(DOCX_CODE_LINE_TOKEN_PREFIX)) {
        const codeLine = line
          .slice(DOCX_CODE_LINE_TOKEN_PREFIX.length)
          .replace(/[ \t]+$/g, "");
        return `${DOCX_CODE_LINE_TOKEN_PREFIX}${codeLine}`;
      }
      return line.replace(/[^\S\n]+/g, " ").trim();
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeComparableText(value) {
  return toText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function sortOptionEntries(optionMap) {
  return Object.entries(optionMap || {}).sort(([left], [right]) =>
    left.localeCompare(right),
  );
}

function normalizeOptionMap(optionMap) {
  return sortOptionEntries(optionMap).reduce((acc, [key, value]) => {
    const optionKey = String(key).trim().toUpperCase();
    const text = normalizeDisplayText(value);
    if (optionKey && text) {
      acc[optionKey] = text;
    }
    return acc;
  }, {});
}

function inferQuestionType(options) {
  const texts = Object.values(options).map(normalizeComparableText);
  if (
    texts.length === 2 &&
    ((texts.includes("true") && texts.includes("false")) ||
      (texts.includes("dung") && texts.includes("sai")))
  ) {
    return "true_false";
  }
  return "single_choice";
}

function createLocaleContent(block, fallback) {
  const options = normalizeOptionMap({
    ...(fallback?.options || {}),
    ...(block?.options || {}),
  });

  return {
    question:
      normalizeDisplayText(block?.question) ||
      normalizeDisplayText(fallback?.question),
    explanation:
      normalizeDisplayText(block?.explanation) ||
      normalizeDisplayText(fallback?.explanation),
    options,
  };
}

function normalizeQuestion(rawQuestion, index) {
  const defaultOptions = normalizeOptionMap(rawQuestion.options || {});
  const defaultBlock = {
    question: rawQuestion.question || rawQuestion.questionText || "",
    explanation: rawQuestion.explanation || "",
    options: defaultOptions,
  };
  const localized = rawQuestion.content || {};
  const vi = createLocaleContent(localized.vi, defaultBlock);
  const en = createLocaleContent(localized.en, defaultBlock);
  const mergedOptions = normalizeOptionMap({
    ...defaultOptions,
    ...vi.options,
    ...en.options,
  });

  return {
    id: String(rawQuestion.id ?? rawQuestion.number ?? index + 1),
    number: Number(rawQuestion.number ?? index + 1),
    type: rawQuestion.type || inferQuestionType(mergedOptions),
    topic: toText(rawQuestion.topic),
    difficulty: toText(rawQuestion.difficulty),
    correctAnswer: String(rawQuestion.correctAnswer || "")
      .trim()
      .toUpperCase(),
    content: {
      vi: {
        question: vi.question || en.question,
        explanation: vi.explanation || en.explanation,
        options: Object.keys(vi.options).length ? vi.options : mergedOptions,
      },
      en: {
        question: en.question || vi.question,
        explanation: en.explanation || vi.explanation,
        options: Object.keys(en.options).length ? en.options : mergedOptions,
      },
    },
  };
}

function normalizeQuestionBank(bank) {
  return {
    id: bank.id || `bank-${Date.now()}`,
    source: bank.source || "sample",
    fileName: bank.fileName || "",
    name: {
      vi: toText(bank.name?.vi) || "Bộ mẫu HTML",
      en: toText(bank.name?.en) || "HTML sample bank",
    },
    questions: (bank.questions || []).map((question, index) =>
      normalizeQuestion(question, index),
    ),
  };
}

function getSampleQuestionBank() {
  return normalizeQuestionBank({
    id: SAMPLE_BANK_ID,
    source: "sample",
    fileName: "40-html-sample",
    name: {
      vi: "Bộ mẫu HTML",
      en: "HTML sample bank",
    },
    questions: sampleQuestions,
  });
}

function normalizeAttemptHistoryItem(item, index) {
  const submittedAt = Number(item.submittedAt || Date.now());
  const total = Number(item.total || 0);
  const correct = Number(item.correct || 0);
  const wrong = Number(item.wrong || 0);
  const blank = Number(item.blank || 0);
  const score = Number(item.score || 0);

  const details = Array.isArray(item.details)
    ? item.details.map((detail, detailIndex) => {
        const normalizedQuestion = normalizeQuestion(detail, detailIndex);
        const selected = String(detail.selected || "")
          .trim()
          .toUpperCase();
        const isBlank = selected === "";
        const isCorrect =
          !isBlank && selected === normalizedQuestion.correctAnswer;
        return {
          ...normalizedQuestion,
          selected: isBlank ? null : selected,
          isBlank,
          isCorrect,
        };
      })
    : [];

  return {
    id: String(item.id || `attempt-${submittedAt}-${index + 1}`),
    bankId: String(item.bankId || SAMPLE_BANK_ID),
    bankName: {
      vi: toText(item.bankName?.vi),
      en: toText(item.bankName?.en),
    },
    mode: item.mode === "practice" ? "practice" : "exam",
    score: Number.isFinite(score) ? score : 0,
    correct: Number.isFinite(correct) ? correct : 0,
    wrong: Number.isFinite(wrong) ? wrong : 0,
    blank: Number.isFinite(blank) ? blank : 0,
    total: Number.isFinite(total) ? total : 0,
    durationSeconds: Number(item.durationSeconds || 0),
    submittedAt: Number.isFinite(submittedAt) ? submittedAt : Date.now(),
    details,
  };
}

function normalizeAppState(rawState) {
  const sampleBank = getSampleQuestionBank();
  const uploadedBanks = Array.isArray(rawState.uploadedBanks)
    ? rawState.uploadedBanks
        .map(normalizeQuestionBank)
        .filter((bank) => bank.id !== SAMPLE_BANK_ID)
    : [];

  const dedupedBanks = uploadedBanks.reduce((acc, bank) => {
    if (!acc.find((item) => item.id === bank.id)) {
      acc.push(bank);
    }
    return acc;
  }, []);

  const currentBankId =
    String(rawState.currentBankId || sampleBank.id).trim() || sampleBank.id;

  const history = Array.isArray(rawState.attemptHistory)
    ? rawState.attemptHistory
        .map((item, index) => normalizeAttemptHistoryItem(item, index))
        .sort((left, right) => right.submittedAt - left.submittedAt)
        .slice(0, MAX_ATTEMPTS)
    : [];

  return {
    version: 2,
    currentBankId,
    uploadedBanks: dedupedBanks,
    attemptHistory: history,
  };
}

function getDefaultAppState() {
  return normalizeAppState({
    currentBankId: SAMPLE_BANK_ID,
    uploadedBanks: [],
    attemptHistory: [],
  });
}

function migrateLegacyState(raw) {
  if (!raw || typeof raw !== "object") {
    return getDefaultAppState();
  }

  if (
    Array.isArray(raw.uploadedBanks) ||
    Array.isArray(raw.attemptHistory) ||
    Object.prototype.hasOwnProperty.call(raw, "currentBankId")
  ) {
    return normalizeAppState(raw);
  }

  if (Array.isArray(raw.questions)) {
    const migratedBank = normalizeQuestionBank(raw);
    const isSample =
      migratedBank.source === "sample" || migratedBank.id === SAMPLE_BANK_ID;
    return normalizeAppState({
      currentBankId: isSample ? SAMPLE_BANK_ID : migratedBank.id,
      uploadedBanks: isSample ? [] : [migratedBank],
      attemptHistory: [],
    });
  }

  return getDefaultAppState();
}

function ensureStorageDirectory() {
  fs.mkdirSync(path.dirname(STORAGE_PATH), { recursive: true });
}

function readStoredState() {
  if (!fs.existsSync(STORAGE_PATH)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(STORAGE_PATH, "utf8");
    return migrateLegacyState(JSON.parse(raw));
  } catch (error) {
    return null;
  }
}

function writeStoredState(state) {
  const normalizedState = normalizeAppState(state);
  ensureStorageDirectory();
  fs.writeFileSync(
    STORAGE_PATH,
    JSON.stringify(normalizedState, null, 2),
    "utf8",
  );
  return normalizedState;
}

function getCurrentState() {
  return readStoredState() || getDefaultAppState();
}

function resolveBankById(state, bankId) {
  if (!bankId || bankId === SAMPLE_BANK_ID) {
    return getSampleQuestionBank();
  }
  return state.uploadedBanks.find((bank) => bank.id === bankId) || null;
}

function getCurrentQuestionBank() {
  const state = getCurrentState();
  return resolveBankById(state, state.currentBankId) || getSampleQuestionBank();
}

function getQuestionBankList() {
  const state = getCurrentState();
  return {
    currentBankId: state.currentBankId,
    questionBanks: [getSampleQuestionBank(), ...state.uploadedBanks],
  };
}

function saveQuestionBank(bank) {
  if (!bank || !Array.isArray(bank.questions)) {
    throw new Error("Invalid question bank payload.");
  }

  const state = getCurrentState();
  const normalizedBank = normalizeQuestionBank(bank);

  if (
    normalizedBank.id === SAMPLE_BANK_ID ||
    normalizedBank.source === "sample"
  ) {
    state.currentBankId = SAMPLE_BANK_ID;
    writeStoredState(state);
    return getSampleQuestionBank();
  }

  const existingIndex = state.uploadedBanks.findIndex(
    (item) => item.id === normalizedBank.id,
  );
  if (existingIndex === -1) {
    state.uploadedBanks.unshift(normalizedBank);
  } else {
    state.uploadedBanks[existingIndex] = normalizedBank;
  }

  state.currentBankId = normalizedBank.id;
  writeStoredState(state);
  return normalizedBank;
}

function restoreSampleQuestionBank() {
  const state = getCurrentState();
  state.currentBankId = SAMPLE_BANK_ID;
  writeStoredState(state);
  return resolveBankById(state, SAMPLE_BANK_ID);
}

function clearStoredAppData() {
  const state = getDefaultAppState();
  writeStoredState(state);
  return getQuestionBankList();
}

function setCurrentQuestionBank(bankId) {
  const state = getCurrentState();
  const selected = resolveBankById(state, String(bankId || "").trim());
  if (!selected) {
    throw new Error("Question bank not found.");
  }

  state.currentBankId = selected.id;
  writeStoredState(state);
  return selected;
}

function deleteQuestionBank(bankId) {
  const targetId = String(bankId || "").trim();
  if (!targetId || targetId === SAMPLE_BANK_ID) {
    throw new Error("The sample question bank cannot be deleted.");
  }

  const state = getCurrentState();
  const existingIndex = state.uploadedBanks.findIndex(
    (item) => item.id === targetId,
  );
  if (existingIndex === -1) {
    throw new Error("Question bank not found.");
  }

  state.uploadedBanks.splice(existingIndex, 1);
  state.attemptHistory = state.attemptHistory.filter(
    (item) => item.bankId !== targetId,
  );
  if (state.currentBankId === targetId) {
    state.currentBankId = SAMPLE_BANK_ID;
  }

  writeStoredState(state);
  return getQuestionBankList();
}

function getAttemptHistory(bankId) {
  const state = getCurrentState();
  const targetBankId = String(bankId || "").trim();
  if (!targetBankId) {
    return state.attemptHistory;
  }
  return state.attemptHistory.filter((item) => item.bankId === targetBankId);
}

function addAttemptHistory(attempt) {
  if (!attempt || typeof attempt !== "object") {
    throw new Error("Invalid attempt payload.");
  }

  const state = getCurrentState();
  const activeBank =
    resolveBankById(state, state.currentBankId) || getSampleQuestionBank();

  const normalizedAttempt = normalizeAttemptHistoryItem(
    {
      ...attempt,
      id: attempt.id || `attempt-${Date.now()}`,
      bankId: attempt.bankId || activeBank.id,
      bankName: {
        vi: attempt.bankName?.vi || activeBank.name.vi,
        en: attempt.bankName?.en || activeBank.name.en,
      },
      submittedAt: attempt.submittedAt || Date.now(),
    },
    state.attemptHistory.length,
  );

  state.attemptHistory.unshift(normalizedAttempt);
  state.attemptHistory = state.attemptHistory
    .sort((left, right) => right.submittedAt - left.submittedAt)
    .slice(0, MAX_ATTEMPTS);

  writeStoredState(state);
  return normalizedAttempt;
}

function clearAttemptHistory(bankId) {
  const state = getCurrentState();
  const targetBankId = String(bankId || "").trim();

  if (targetBankId) {
    state.attemptHistory = state.attemptHistory.filter(
      (item) => item.bankId !== targetBankId,
    );
  } else {
    state.attemptHistory = [];
  }

  writeStoredState(state);
  return getAttemptHistory(targetBankId);
}

module.exports = {
  getCurrentQuestionBank,
  getQuestionBankList,
  saveQuestionBank,
  restoreSampleQuestionBank,
  setCurrentQuestionBank,
  deleteQuestionBank,
  getAttemptHistory,
  addAttemptHistory,
  clearAttemptHistory,
  clearStoredAppData,
};
