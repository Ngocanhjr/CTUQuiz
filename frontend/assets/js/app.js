const FLAG_ICON = encodeURI("assets/icons/unflagged.svg");
const FLAGGED_ICON = encodeURI("assets/icons/flagged.svg");
const API_BASE =
  window.location.protocol === "file:"
    ? "http://localhost:3000/api"
    : `${window.location.origin}/api`;
const DEFAULT_EXAM_DURATION_MINUTES = 20;
const MIN_EXAM_DURATION_MINUTES = 1;
const MAX_EXAM_DURATION_MINUTES = 300;
const STORAGE_KEY = "quiz_exam_studio.question_bank.v1";
const ATTEMPT_HISTORY_KEY = "quiz_exam_studio.attempt_history.v1";
const LOCAL_APP_STATE_KEY = "quiz_exam_studio.app_state.v2";
const NAVIGATION_MODE_KEY = "quiz_exam_studio.navigation_mode.v2";
const EXAM_DURATION_KEY = "quiz_exam_studio.exam_duration_minutes.v1";
const PRACTICE_DURATION_KEY = "quiz_exam_studio.practice_duration_minutes.v1";
const SIDEBAR_HIDDEN_KEY = "quiz_exam_studio.sidebar_hidden.v1";
const EXAM_SHUFFLE_QUESTIONS_KEY =
  "quiz_exam_studio.exam_shuffle_questions.v1";
const EXAM_SHUFFLE_ANSWERS_KEY =
  "quiz_exam_studio.exam_shuffle_answers.v1";
const EXAM_HIDE_TOPIC_KEY = "quiz_exam_studio.exam_hide_topic.v1";
const PRACTICE_SHUFFLE_QUESTIONS_KEY =
  "quiz_exam_studio.practice_shuffle_questions.v1";
const PRACTICE_SHUFFLE_ANSWERS_KEY =
  "quiz_exam_studio.practice_shuffle_answers.v1";
const PRACTICE_HIDE_TOPIC_KEY = "quiz_exam_studio.practice_hide_topic.v1";
const SUPPORTED_IMPORT_TYPES = new Set(["single_choice", "true_false"]);
const DOCX_IMAGE_TOKEN_PREFIX = "[[DOCX_IMAGE:";
const DOCX_IMAGE_TOKEN_SUFFIX = "]]";
const DOCX_CODE_LINE_TOKEN_PREFIX = "[[DOCX_CODE_LINE]]";
const DOCX_TABLE_TOKEN_PREFIX = "[[DOCX_TABLE:";
const DOCX_TABLE_TOKEN_SUFFIX = "]]";
const DOCX_COLOR_TOKEN_PREFIX = "[[DOCX_COLOR:";
const DOCX_COLOR_TOKEN_SUFFIX = "]]";
const DOCX_COLOR_END_TOKEN = "[[/DOCX_COLOR]]";
const initialExamDurationMinutes = loadExamDurationMinutes();
const initialPracticeDurationMinutes = loadPracticeDurationMinutes();
const initialExamShuffleQuestions = loadStoredBooleanSetting(
  EXAM_SHUFFLE_QUESTIONS_KEY,
  false,
);
const initialExamShuffleAnswers = loadStoredBooleanSetting(
  EXAM_SHUFFLE_ANSWERS_KEY,
  false,
);
const initialExamHideTopic = loadStoredBooleanSetting(
  EXAM_HIDE_TOPIC_KEY,
  false,
);
const initialPracticeShuffleQuestions = loadStoredBooleanSetting(
  PRACTICE_SHUFFLE_QUESTIONS_KEY,
  false,
);
const initialPracticeShuffleAnswers = loadStoredBooleanSetting(
  PRACTICE_SHUFFLE_ANSWERS_KEY,
  false,
);
const initialPracticeHideTopic = loadStoredBooleanSetting(
  PRACTICE_HIDE_TOPIC_KEY,
  false,
);

const TEXT = {
  vi: {
    languageLabel: "Ngôn ngữ",
    clearStorage: "Xóa dữ liệu",
    clearStorageConfirm:
      "Xóa toàn bộ đề đã import, lịch sử làm bài và thiết lập đã lưu?",
    clearStorageError: "Không thể xóa toàn bộ dữ liệu. Vui lòng thử lại.",
    newSession: "Tạo phiên mới",
    appSubtitle: "Bảng làm bài và quản lý ngân hàng câu hỏi",
    homeKicker: "Hướng dẫn nhanh",
    homeTitle: "Hướng dẫn sử dụng nhanh",
    homeText:
      "Chọn bộ test, đặt thời gian, bấm Thi hoặc Luyện; nhập DOCX khi cần thêm câu hỏi.",
    questionBank: "Ngân hàng câu hỏi",
    currentBank: "Bộ câu hỏi hiện tại",
    activeModes: "Chế độ",
    modeSelectionLabel: "Chế độ làm bài",
    examTag: "Thi thử",
    examModeTitle: "Chế độ Thi",
    examModeText:
      "Làm bài, lưu đáp án, nộp bài và xem review theo kiểu giao diện Moodle/CTU.",
    practiceTag: "Luyện tập",
    practiceModeTitle: "Chế độ Luyện tập",
    practiceModeText:
      "Trả lời từng câu và xem ngay trạng thái đúng/sai, đáp án đúng và lời giải.",
    importTag: "Nhập DOCX",
    chooseFile: "Chọn tệp",
    noFileSelected: "Chưa chọn tệp",
    importTitle: "Thêm bộ câu hỏi mới",
    importText:
      "Nhập file .docx theo 4 mẫu: bảng Field/Value, Word đánh số có tô đáp án, bảng ma trận nhiều dòng, hoặc block Câu/Đáp án.",
    examShuffleQuestions: "Trộn thứ tự câu hỏi",
    examShuffleAnswers: "Trộn thứ tự đáp án",
    examHideTopic: "Ẩn tiêu đề nhóm",
    practiceShuffleQuestions: "Trộn thứ tự câu hỏi",
    practiceShuffleAnswers: "Trộn thứ tự đáp án",
    practiceHideTopic: "Ẩn tiêu đề nhóm",
    importKeepChapterTopics: "Giữ tiêu đề Chapter làm topic",
    importButton: "Nhập bộ câu hỏi",
    restoreSample: "Dùng bộ mẫu",
    importIdle: "Chưa có file được nhập.",
    supportedFormat: "Định dạng hỗ trợ",
    examDurationLabel: "Thời gian làm bài",
    examDurationHint: "Áp dụng cho mỗi phiên thi thử mới.",
    practiceDurationLabel: "Thời gian luyện tập",
    practiceDurationHint: "Áp dụng cho mỗi phiên luyện tập mới.",
    minuteUnit: "phút",
    startExam: "Bắt đầu thi",
    startPractice: "Bắt đầu luyện",
    modeLabel: "Chế độ",
    navigationModeLabel: "Điều hướng",
    navigationModePaged: "Từng câu",
    navigationModeChunk5: "5 câu",
    navigationModeChunk10: "10 câu",
    navigationModeScroll: "Cuộn dọc",
    timer: "Thời gian",
    progress: "Tiến độ",
    questionMap: "Điều hướng bài thi",
    previousQuestion: "Trang trước",
    nextQuestion: "Trang tiếp theo",
    submitExam: "Hoàn thành bài thi",
    submitPractice: "Hoàn thành luyện tập",
    resultKicker: "Xem lại đáp án",
    resultTitle: "Kết quả bài làm",
    score: "Điểm",
    correctAnswers: "Đúng",
    wrongAnswers: "Sai",
    unanswered: "Bỏ trống",
    retryWrong: "Luyện lại câu sai",
    backHome: "Về trang chọn chế độ",
    backToHomeShort: "Quay lại",
    reviewNavigator: "Điều hướng xem lại",
    finishReview: "Kết thúc xem lại",
    examBadge: "Thi thử",
    practiceBadge: "Luyện tập",
    flagQuestion: "Đặt cờ",
    unflagQuestion: "Xóa cờ",
    questionLabel: "Câu hỏi",
    promptSelectOne: "Chọn một:",
    stateSaved: "Câu trả lời đã được lưu",
    stateBlank: "Chưa trả lời",
    stateCorrect: "Đúng",
    stateIncorrect: "Sai",
    markPending: "Đạt điểm 1,00",
    markFull: "Đạt điểm 1,00",
    markZero: "Đạt điểm 0,00",
    outcomeCorrect: "Bạn đã trả lời đúng.",
    outcomeIncorrect: "Bạn đã trả lời sai.",
    outcomeBlank: "Bạn chưa trả lời câu hỏi này.",
    correctAnswerLead: "Đáp án đúng là:",
    clearChoice: "Clear my choice",
    noExplanation: "Chưa có lời giải cho câu này.",
    noWrongQuestions: "Không có câu sai để luyện lại.",
    resultFilterLabel: "Lọc câu",
    resultFilterAll: "Tất cả",
    resultFilterCorrect: "Đúng",
    resultFilterWrong: "Sai",
    resultFilterBlank: "Chưa chọn",
    resultFilterEmpty: "Không có câu nào phù hợp với bộ lọc đã chọn.",
    hideSidebar: "Ẩn thanh bên",
    showSidebar: "Hiện thanh bên",
    sampleBankName: "Bộ mẫu HTML",
    importedBankName: "Bộ import: {fileName}",
    importReady: "Sẵn sàng nhập file {fileName}.",
    importReading: "Đang đọc và phân tích file {fileName}...",
    importSuccess: "Đã nhập {count} câu hỏi từ {fileName}.",
    importRestored: "Đã quay lại bộ câu hỏi mẫu.",
    importNoFile: "Hãy chọn một file DOCX trước khi nhập.",
    importDocUnsupported:
      "File .doc chưa được hỗ trợ trong phiên bản frontend này. Hãy chuyển sang .docx.",
    importBrowserUnsupported:
      "Trình duyệt hiện tại không hỗ trợ giải nén file DOCX trong trang local.",
    importMissingDocument: "Không tìm thấy word/document.xml trong file DOCX.",
    importInvalidArchive: "File DOCX không hợp lệ hoặc không đọc được.",
    importNoQuestions: "Không tìm thấy câu hỏi hợp lệ trong file DOCX.",
    importNoQuestionsDetailed:
      "Không nhận diện được câu hỏi hợp lệ. Tìm thấy {questions} tiêu đề câu hỏi, {options} lựa chọn, {answers} dòng đáp án và {tables} bảng. Định dạng cần có dạng: “Câu hỏi 1: …”, “A. …”, “Đáp án: A”.",
    importUnsupportedType:
      'Câu {index}: loại câu hỏi "{type}" chưa được hỗ trợ trong giao diện hiện tại.',
    importBrokenQuestion:
      "Câu {index}: thiếu nội dung câu hỏi, lựa chọn hoặc đáp án đúng.",
    importMissingFields: "Câu {index}: thiếu {fields}.",
    importQuestionField: "nội dung câu hỏi",
    importOptionsField: "lựa chọn",
    importCorrectAnswerField: "đáp án đúng hợp lệ",
    importPartialErrors: "Không thể nhập file vì có lỗi:\n{details}",
    savedTestsLabel: "Bộ test đã lưu",
    questionBankManagementTitle: "Quản lý bộ câu hỏi",
    useSelectedTest: "Dùng bộ đã chọn",
    deleteSelectedTest: "Xóa bộ đã chọn",
    attemptHistoryTitle: "Lịch sử làm bài",
    attemptHistoryEmpty: "Chưa có lịch sử làm bài cho bộ test này.",
    attemptModeExam: "Thi thử",
    attemptModePractice: "Luyện tập",
    bankSelected: "Đã chuyển sang bộ test: {name}.",
    bankDeleted: "Đã xóa bộ test đã chọn.",
    cannotDeleteSample: "Không thể xóa bộ mẫu mặc định.",
    deleteBankConfirm:
      'Bạn có chắc muốn xóa bộ test "{name}" và toàn bộ lịch sử liên quan?',
    reviewAttempt: "Xem lại",
    attemptReviewUnavailable:
      "Lần làm bài này không có dữ liệu chi tiết để xem lại.",
    questionJumpLabel: "Đi tới câu {number}: {status}",
  },
  en: {
    languageLabel: "Language",
    clearStorage: "Clear storage",
    clearStorageConfirm:
      "Delete all imported question banks, attempt history, and saved settings?",
    clearStorageError: "All saved data could not be cleared. Please try again.",
    newSession: "New session",
    appSubtitle: "Quiz workspace and question bank manager",
    homeKicker: "Quick guide",
    homeTitle: "Quick usage guide",
    homeText:
      "Choose a test bank, set the timer, start Exam or Practice, and import DOCX when adding questions.",
    questionBank: "Question bank",
    currentBank: "Current bank",
    activeModes: "Modes",
    modeSelectionLabel: "Quiz mode",
    examTag: "Mock exam",
    examModeTitle: "Exam mode",
    examModeText:
      "Answer questions, save responses, submit, and review them in a Moodle/CTU-style layout.",
    practiceTag: "Practice",
    practiceModeTitle: "Practice mode",
    practiceModeText:
      "Answer one question at a time and instantly see correctness, the correct answer, and explanation.",
    importTag: "Import DOCX",
    chooseFile: "Browse…",
    noFileSelected: "No file selected.",
    importTitle: "Add a new question bank",
    importText:
      "Import a .docx file from 4 templates: field/value table, numbered quiz with highlighted answers, matrix table, or tagged Question/Answer blocks.",
    examShuffleQuestions: "Shuffle question order",
    examShuffleAnswers: "Shuffle answer order",
    examHideTopic: "Hide group headings",
    practiceShuffleQuestions: "Shuffle question order",
    practiceShuffleAnswers: "Shuffle answer order",
    practiceHideTopic: "Hide group headings",
    importKeepChapterTopics: "Keep Chapter headings as topics",
    importButton: "Import question bank",
    restoreSample: "Use sample bank",
    importIdle: "No file has been imported yet.",
    supportedFormat: "Supported format",
    examDurationLabel: "Exam duration",
    examDurationHint: "Applied to each new mock exam session.",
    practiceDurationLabel: "Practice duration",
    practiceDurationHint: "Applied to each new practice session.",
    minuteUnit: "minutes",
    startExam: "Start exam",
    startPractice: "Start practice",
    modeLabel: "Mode",
    navigationModeLabel: "Navigation",
    navigationModePaged: "Paged",
    navigationModeChunk5: "5 questions",
    navigationModeChunk10: "10 questions",
    navigationModeScroll: "Scroll",
    timer: "Timer",
    progress: "Progress",
    questionMap: "Quiz navigation",
    previousQuestion: "Previous",
    nextQuestion: "Next",
    submitExam: "Finish attempt",
    submitPractice: "Finish practice",
    resultKicker: "Answer review",
    resultTitle: "Attempt results",
    score: "Score",
    correctAnswers: "Correct",
    wrongAnswers: "Wrong",
    unanswered: "Blank",
    retryWrong: "Retry wrong questions",
    backHome: "Back to modes",
    backToHomeShort: "Back",
    reviewNavigator: "Review navigator",
    finishReview: "Finish review",
    examBadge: "Mock exam",
    practiceBadge: "Practice",
    flagQuestion: "Flag question",
    unflagQuestion: "Unflag question",
    questionLabel: "Question",
    promptSelectOne: "Select one:",
    stateSaved: "Answer saved",
    stateBlank: "Not answered",
    stateCorrect: "Correct",
    stateIncorrect: "Incorrect",
    markPending: "Mark 1.00 out of 1.00",
    markFull: "Mark 1.00 out of 1.00",
    markZero: "Mark 0.00 out of 1.00",
    outcomeCorrect: "Your answer is correct.",
    outcomeIncorrect: "Your answer is incorrect.",
    outcomeBlank: "You did not answer this question.",
    correctAnswerLead: "The correct answer is:",
    clearChoice: "Clear my choice",
    noExplanation: "No explanation is available for this question yet.",
    noWrongQuestions: "There are no wrong questions to retry.",
    resultFilterLabel: "Filter",
    resultFilterAll: "All",
    resultFilterCorrect: "Correct",
    resultFilterWrong: "Wrong",
    resultFilterBlank: "Unanswered",
    resultFilterEmpty: "No questions match the selected filter.",
    hideSidebar: "Hide sidebar",
    showSidebar: "Show sidebar",
    sampleBankName: "HTML sample bank",
    importedBankName: "Imported bank: {fileName}",
    importReady: "Ready to import {fileName}.",
    importReading: "Reading and parsing {fileName}...",
    importSuccess: "Imported {count} questions from {fileName}.",
    importRestored: "Restored the sample question bank.",
    importNoFile: "Choose a DOCX file before importing.",
    importDocUnsupported:
      ".doc files are not supported in this frontend build yet. Please convert the file to .docx.",
    importBrowserUnsupported:
      "The current browser cannot decompress DOCX files in this local app.",
    importMissingDocument:
      "The DOCX archive does not contain word/document.xml.",
    importInvalidArchive: "The DOCX file is invalid or could not be read.",
    importNoQuestions: "No valid questions were found in the DOCX file.",
    importNoQuestionsDetailed:
      "No valid questions were recognized. Found {questions} question headings, {options} options, {answers} answer lines, and {tables} tables. Expected format: “Question 1: …”, “A. …”, “Correct answer: A”.",
    importUnsupportedType:
      'Question {index}: the type "{type}" is not supported by the current quiz interface.',
    importBrokenQuestion:
      "Question {index}: missing question text, options, or correct answer.",
    importMissingFields: "Question {index}: missing {fields}.",
    importQuestionField: "question text",
    importOptionsField: "options",
    importCorrectAnswerField: "a valid correct answer",
    importPartialErrors:
      "The file could not be imported because of these errors:\n{details}",
    savedTestsLabel: "Saved tests",
    questionBankManagementTitle: "Question bank management",
    useSelectedTest: "Use selected test",
    deleteSelectedTest: "Delete selected test",
    attemptHistoryTitle: "Attempt history",
    attemptHistoryEmpty: "No attempts have been recorded for this test yet.",
    attemptModeExam: "Mock exam",
    attemptModePractice: "Practice",
    bankSelected: "Switched to test: {name}.",
    bankDeleted: "The selected test was deleted.",
    cannotDeleteSample: "The default sample test cannot be deleted.",
    deleteBankConfirm:
      'Are you sure you want to delete test "{name}" and all related history?',
    reviewAttempt: "Review",
    attemptReviewUnavailable:
      "Detailed data is not available for this attempt.",
    questionJumpLabel: "Go to question {number}: {status}",
  },
};

const FIELD_ALIASES = {
  number: ["question number", "question no", "number", "stt", "thu tu"],
  type: ["question type", "type", "loại câu hỏi"],
  question: ["question text", "question", "nội dung câu hỏi", "câu hỏi"],
  questionVi: [
    "question text vi",
    "question vi",
    "question text vn",
    "nội dung câu hỏi vi",
    "câu hỏi vi",
  ],
  questionEn: [
    "question text en",
    "question en",
    "question text english",
    "nội dung câu hỏi en",
    "câu hỏi en",
  ],
  correctAnswer: [
    "correct answer",
    "answer",
    "đáp án đúng",
    "đáp án",
    "correct",
  ],
  explanation: ["explanation", "giải thích", "lời giải"],
  explanationVi: ["explanation vi", "giải thích vi", "lời giải vi"],
  explanationEn: ["explanation en", "explanation english", "lời giải en"],
  topic: ["topic", "chủ đề"],
  difficulty: ["difficulty", "độ khó"],
};

const TEMPLATE_COLUMN_ALIASES = {
  number: ["question number", "question no", "number", "stt", "thu tu"],
  type: ["question type", "type", "loai cau hoi", "loại câu hỏi"],
  question: [
    "question text",
    "question",
    "noi dung cau hoi",
    "nội dung câu hỏi",
    "cau hoi",
    "câu hỏi",
  ],
  questionVi: [
    "question text vi",
    "question vi",
    "question vn",
    "noi dung cau hoi vi",
    "cau hoi vi",
  ],
  questionEn: [
    "question text en",
    "question en",
    "question english",
    "noi dung cau hoi en",
    "cau hoi en",
  ],
  correctAnswer: [
    "correct answer",
    "answer",
    "dap an",
    "đáp án",
    "dap an dung",
    "đáp án đúng",
  ],
  explanation: [
    "explanation",
    "giai thich",
    "giải thích",
    "loi giai",
    "lời giải",
  ],
  explanationVi: ["explanation vi", "giai thich vi", "loi giai vi"],
  explanationEn: ["explanation en", "explanation english", "loi giai en"],
  topic: ["topic", "chu de", "chủ đề"],
  difficulty: ["difficulty", "do kho", "độ khó"],
};

const state = {
  locale: "vi",
  questionBank: null,
  questionBanks: [],
  attemptHistory: [],
  questions: [],
  mode: null,
  navigationMode: loadNavigationMode(),
  examDurationMinutes: initialExamDurationMinutes,
  practiceDurationMinutes: initialPracticeDurationMinutes,
  examShuffleQuestions: initialExamShuffleQuestions,
  examShuffleAnswers: initialExamShuffleAnswers,
  examHideTopic: initialExamHideTopic,
  practiceShuffleQuestions: initialPracticeShuffleQuestions,
  practiceShuffleAnswers: initialPracticeShuffleAnswers,
  practiceHideTopic: initialPracticeHideTopic,
  sidebarHidden: loadSidebarHidden(),
  currentQuestions: [],
  currentIndex: 0,
  answers: {},
  flags: {},
  submitted: false,
  timerId: null,
  remainingSeconds: initialExamDurationMinutes * 60,
  resultSnapshot: null,
  reviewFilter: "all",
  sessionViewOptions: { hideTopic: false },
  importStatus: { tone: "idle", key: "importIdle", values: {} },
};

let toastTimerId = null;

const elements = {
  languageSelect: document.getElementById("languageSelect"),
  clearStorageBtn: document.getElementById("clearStorageBtn"),
  resetAppBtn: document.getElementById("resetAppBtn"),
  startExamBtn: document.getElementById("startExamBtn"),
  startPracticeBtn: document.getElementById("startPracticeBtn"),
  modeSetupSelect: document.getElementById("modeSetupSelect"),
  modeSetupField: document.getElementById("modeSetupField"),
  examModeSettings: document.getElementById("examModeSettings"),
  practiceModeSettings: document.getElementById("practiceModeSettings"),
  examDurationInput: document.getElementById("examDurationInput"),
  practiceDurationInput: document.getElementById("practiceDurationInput"),
  examShuffleQuestionsInput: document.getElementById(
    "examShuffleQuestionsInput",
  ),
  examShuffleAnswersInput: document.getElementById("examShuffleAnswersInput"),
  examHideTopicInput: document.getElementById("examHideTopicInput"),
  practiceShuffleQuestionsInput: document.getElementById(
    "practiceShuffleQuestionsInput",
  ),
  practiceShuffleAnswersInput: document.getElementById(
    "practiceShuffleAnswersInput",
  ),
  practiceHideTopicInput: document.getElementById("practiceHideTopicInput"),
  importFileInput: document.getElementById("importFileInput"),
  importFileName: document.getElementById("importFileName"),
  importKeepChapterTopicsInput: document.getElementById(
    "importKeepChapterTopicsInput",
  ),
  importReplaceBtn: document.getElementById("importReplaceBtn"),
  restoreSampleBtn: document.getElementById("restoreSampleBtn"),
  importStatus: document.getElementById("importStatus"),
  bankSourceLabel: document.getElementById("bankSourceLabel"),
  bankCountLabel: document.getElementById("bankCountLabel"),
  bankSelector: document.getElementById("bankSelector"),
  applyBankBtn: document.getElementById("applyBankBtn"),
  deleteBankBtn: document.getElementById("deleteBankBtn"),
  attemptHistoryList: document.getElementById("attemptHistoryList"),
  scrollTopBtn: document.getElementById("scrollTopBtn"),
  scrollBottomBtn: document.getElementById("scrollBottomBtn"),
  homeScreen: document.getElementById("homeScreen"),
  quizWorkspace: document.getElementById("quizWorkspace"),
  resultWorkspace: document.getElementById("resultWorkspace"),
  questionHost: document.getElementById("questionHost"),
  questionNavControls: document.getElementById("questionNavControls"),
  questionPalette: document.getElementById("questionPalette"),
  reviewPalette: document.getElementById("reviewPalette"),
  reviewList: document.getElementById("reviewList"),
  resultFilters: document.getElementById("resultFilters"),
  attemptBackBtn: document.getElementById("attemptBackBtn"),
  resultBackBtn: document.getElementById("resultBackBtn"),
  modeBadge: document.getElementById("modeBadge"),
  navigationModeSelect: document.getElementById("navigationModeSelect"),
  timerValue: document.getElementById("timerValue"),
  progressValue: document.getElementById("progressValue"),
  progressMeter: document.getElementById("progressMeter"),
  submitBtn: document.getElementById("submitBtn"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  retryWrongBtn: document.getElementById("retryWrongBtn"),
  reviewRetryWrongBtn: document.getElementById("reviewRetryWrongBtn"),
  restartBtn: document.getElementById("restartBtn"),
  reviewRestartBtn: document.getElementById("reviewRestartBtn"),
  globalSidebarToggleBtn: document.getElementById("globalSidebarToggleBtn"),
  quizSidebarToggleBtn: document.getElementById("quizSidebarToggleBtn"),
  reviewSidebarToggleBtn: document.getElementById("reviewSidebarToggleBtn"),
  scoreValue: document.getElementById("scoreValue"),
  correctValue: document.getElementById("correctValue"),
  wrongValue: document.getElementById("wrongValue"),
  blankValue: document.getElementById("blankValue"),
  questionCount: document.getElementById("questionCount"),
};

function t(key, values = {}) {
  let message = TEXT[state.locale][key] ?? TEXT.vi[key] ?? key;
  Object.entries(values).forEach(([token, value]) => {
    message = message.replaceAll(`{${token}}`, String(value));
  });
  return message;
}

function decodeHtml(value) {
  const node = document.createElement("textarea");
  node.innerHTML = value ?? "";
  return node.value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toText(value) {
  return decodeHtml(String(value ?? ""))
    .replace(/\s+/g, " ")
    .trim();
}

function stripDanglingBoldMarkers(value) {
  let cleaned = String(value ?? "").trim();
  if (!cleaned) {
    return "";
  }

  let markerCount = (cleaned.match(/\*\*/g) || []).length;
  if (markerCount % 2 !== 0) {
    if (cleaned.startsWith("**")) {
      cleaned = cleaned.slice(2).trimStart();
    }
    markerCount = (cleaned.match(/\*\*/g) || []).length;
    if (markerCount % 2 !== 0 && cleaned.endsWith("**")) {
      cleaned = cleaned.slice(0, -2).trimEnd();
    }
  }

  return cleaned;
}

function stripBoldFormatting(value) {
  return stripDanglingBoldMarkers(
    String(value ?? "")
      .replace(/\*\*/g, "")
      .replace(/\[\[DOCX_COLOR:[^\]]+\]\]|\[\[\/DOCX_COLOR\]\]/g, ""),
  );
}

function normalizeDisplayText(value) {
  const normalized = decodeHtml(String(value ?? ""))
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

      return stripDanglingBoldMarkers(
        line.replace(/[^\S\n]+/g, " ").trim(),
      );
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return stripDanglingBoldMarkers(normalized);
}

function stripDocxFormattingTokens(value) {
  return String(value ?? "")
    .replace(/\*\*|`/g, "")
    .replace(/\[\[DOCX_COLOR:[^\]]+\]\]|\[\[\/DOCX_COLOR\]\]/g, "");
}

function isLikelyCodeLine(value) {
  const rawText = stripDocxFormattingTokens(value);
  const text = rawText.trim();
  if (!text || text.startsWith(DOCX_IMAGE_TOKEN_PREFIX)) {
    return false;
  }

  if (rawText.startsWith(DOCX_CODE_LINE_TOKEN_PREFIX)) {
    return true;
  }

  if (/^[\s\t]+/.test(rawText) && /[{};=<>()[\].:#]/.test(text)) {
    return true;
  }

  return (
    /^[\w$.]+\s*\([\s\S]*=>\s*\{?\s*$/.test(text) ||
    /^[\w$.]+\s*\([\s\S]*function\s*\([^)]*\)\s*\{?\s*$/.test(text) ||
    /^[\w$]+\s*=\s*["'`]?(?:select|from|where|insert|update|delete|\{|\[|function)\b/i.test(
      text,
    ) ||
    /^\}\)?[;,]?$/.test(text) ||
    /^(?:group\s+by|order\s+by|having|limit|and|or|inner\s+join|left\s+join|right\s+join|join|on)\b/i.test(
      text,
    ) ||
    /^[.#]?[-_a-zA-Z][\w-]*(?::[-_a-zA-Z][\w-]*)?\s*\{/.test(text) ||
    /^[\w-]+\s*:\s*[^;]+;?$/.test(text) ||
    /^[{}[\]];?$/.test(text) ||
    /^<\/?[a-z][^>]*>$/.test(text) ||
    /^<([a-z][\w:-]*)(?:\s[^>]*)?>[\s\S]*<\/\1>$/i.test(text) ||
    /^(?:const|let|var|function|if|else|for|while|return|class|import|export|def|print|public|private|protected|static|select|from|where|insert|update|delete)\b/i.test(
      text,
    )
  );
}

function stripDocxCodeMarkers(value) {
  return String(value ?? "")
    .replace(/`/g, "")
    .replace(/\*\*/g, "")
    .replace(/\[\[DOCX_COLOR:[^\]]+\]\]|\[\[\/DOCX_COLOR\]\]/g, "");
}

function getHtmlCodeComparableText(value) {
  return stripDocxCodeMarkers(value)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function isHtmlCodeLine(value) {
  const text = getHtmlCodeComparableText(value);
  return /^<\/?[a-z][^>]*>$/i.test(text) ||
    /^<([a-z][\w:-]*)(?:\s[^>]*)?>[\s\S]*<\/\1>$/i.test(text);
}

function isHtmlContainerOpenLine(value) {
  const text = getHtmlCodeComparableText(value);
  if (!/^<([a-z][\w:-]*)(?:\s[^>]*)?>$/i.test(text)) {
    return false;
  }

  const tagName = text.match(/^<([a-z][\w:-]*)/i)?.[1]?.toLowerCase() || "";
  if (!tagName || text.startsWith("</") || /\/>$/.test(text)) {
    return false;
  }

  return ![
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ].includes(tagName);
}

function formatHtmlCodeLines(lines) {
  const meaningfulLines = lines.filter((line) => line.trim());
  if (
    meaningfulLines.length < 2 ||
    !meaningfulLines.every((line) => isHtmlCodeLine(line))
  ) {
    return lines;
  }

  let indentLevel = 0;
  return lines.map((line) => {
    const trimmed = stripDocxCodeMarkers(line).trim();
    const comparableText = getHtmlCodeComparableText(line);
    if (!trimmed) {
      return "";
    }

    if (/^<\//.test(comparableText)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const formatted = `${"\t".repeat(indentLevel)}${trimmed}`;
    if (isHtmlContainerOpenLine(line)) {
      indentLevel += 1;
    }

    return formatted;
  });
}

function promoteAdjacentCodeLines(value) {
  const lines = String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  const codeLineFlags = lines.map(
    (line) =>
      line.startsWith(DOCX_CODE_LINE_TOKEN_PREFIX) || isLikelyCodeLine(line),
  );

  return lines
    .map((line, index) => {
      if (
        line.startsWith(DOCX_CODE_LINE_TOKEN_PREFIX) ||
        !isLikelyCodeLine(line)
      ) {
        return line;
      }

      if (codeLineFlags[index - 1] || codeLineFlags[index + 1]) {
        return `${DOCX_CODE_LINE_TOKEN_PREFIX}${line}`;
      }

      return line;
    })
    .join("\n");
}

function renderEscapedDocxCodeBlocks(value) {
  return value.replace(
    /(?:\[\[DOCX_CODE_LINE\]\][^\n]*(?:\n|$))+/g,
    (block) => {
      const codeLines = block
        .split("\n")
        .map((line) =>
          line.startsWith(DOCX_CODE_LINE_TOKEN_PREFIX)
            ? stripDocxCodeMarkers(
                line.slice(DOCX_CODE_LINE_TOKEN_PREFIX.length),
              )
            : line,
        );
      const code = formatHtmlCodeLines(codeLines)
        .join("\n")
        .replace(/\n+$/g, "");

      return `<pre class="rich-code-block"><code>${code}</code></pre>`;
    },
  );
}

function renderDocxTable(encodedRows) {
  try {
    const rows = JSON.parse(decodeURIComponent(encodedRows));
    if (!Array.isArray(rows) || !rows.length) return "";
    const body = rows
      .map((row, rowIndex) => {
        const tag = rowIndex === 0 ? "th" : "td";
        const cells = row
          .map((cell) => `<${tag}>${escapeHtml(cell)}</${tag}>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");
    return `<div class="docx-table-wrap"><table class="docx-table">${body}</table></div>`;
  } catch (error) {
    return "";
  }
}

function renderRichText(value) {
  const escaped = escapeHtml(promoteAdjacentCodeLines(value));
  const withDocxCodeBlocks = renderEscapedDocxCodeBlocks(escaped);

  const withCodeBlocks = withDocxCodeBlocks.replace(
    /```([\s\S]*?)```/g,
    (match, code) =>
      `<pre class="rich-code-block"><code>${code.replace(/^\n+|\n+$/g, "")}</code></pre>`,
  );

  const protectedBlocks = [];
  const protectedCodeBlocks = withCodeBlocks.replace(
    /<pre class="rich-code-block"><code>[\s\S]*?<\/code><\/pre>/g,
    (block) => {
      const token = `[[RICH_HTML_BLOCK_${protectedBlocks.length}]]`;
      protectedBlocks.push(block);
      return token;
    },
  );

  const withInlineCode = protectedCodeBlocks.replace(
    /`([^`\n]+)`/g,
    '<code class="rich-code-inline">$1</code>',
  );
  const withBold = withInlineCode.replace(
    /\*\*([^*\n][\s\S]*?)\*\*/g,
    "<strong>$1</strong>",
  );
  const withImages = withBold.replace(
    /\[\[DOCX_IMAGE:([\s\S]+?)\]\]/g,
    (_match, source) =>
      `<img class="docx-inline-image" src="${escapeHtml(source)}" alt="DOCX image">`,
  );
  const withColors = withImages.replace(
    /\[\[DOCX_COLOR:([0-9A-F]{6})\]\]([\s\S]*?)\[\[\/DOCX_COLOR\]\]/gi,
    (_match, color, text) =>
      `<span style="color:#${String(color).toUpperCase()}">${text}</span>`,
  );
  const withTables = withColors.replace(
    /\[\[DOCX_TABLE:([^\]]+)\]\]/g,
    (_match, encodedRows) => renderDocxTable(encodedRows),
  );
  return withTables
    .replace(/\n/g, "<br>")
    .replace(/\[\[RICH_HTML_BLOCK_(\d+)\]\]/g, (_match, index) => {
      return protectedBlocks[Number(index)] || "";
    });
}

function normalizeComparableText(value) {
  return toText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeFieldName(value) {
  return normalizeComparableText(value)
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sortOptionEntries(optionMap) {
  return Object.entries(optionMap).sort(([left], [right]) =>
    left.localeCompare(right),
  );
}

function normalizeOptionMap(optionMap) {
  return sortOptionEntries(optionMap || {}).reduce((acc, [key, value]) => {
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

function stripQuestionHeadingPrefix(questionText, questionNumber) {
  const normalizedQuestion = normalizeDisplayText(questionText);
  if (!normalizedQuestion) {
    return "";
  }

  const safeNumber = String(questionNumber ?? "").trim();
  const numberedPattern = safeNumber
    ? new RegExp(
        `^(?:\\*\\*)?(?:cau\\s*hoi|câu\\s*hỏi|cau|câu|question|q)\\s*${safeNumber}\\s*[:.)-]\\s*(?:\\*\\*)?\\s*`,
        "i",
      )
    : null;

  let stripped = normalizedQuestion;
  if (numberedPattern) {
    stripped = stripped.replace(numberedPattern, "");
  }

  stripped = stripped
    .replace(
      /^(?:\*\*)?(?:cau\s*hoi|câu\s*hỏi|cau|câu|question|q)\s*\d+\s*[:.)-]\s*(?:\*\*)?\s*/i,
      "",
    )
    .replace(/^(?:\*\*)?\d+\s*[:.)-]\s*(?:\*\*)?\s*/i, "")
    .trim();

  // If heading removal leaves a dangling bold marker (e.g. trailing "**"),
  // drop only edge markers while keeping valid bold pairs inside text.
  const boldMarkerCount = (stripped.match(/\*\*/g) || []).length;
  if (boldMarkerCount % 2 !== 0) {
    stripped = stripped.replace(/^\*\*/, "").replace(/\*\*$/, "").trim();
  }

  return stripDanglingBoldMarkers(stripped || normalizedQuestion);
}

function stripOptionLabelPrefix(optionText, optionLetter) {
  const normalizedOption = normalizeDisplayText(optionText);
  if (!normalizedOption) {
    return "";
  }

  const safeLetter = String(optionLetter ?? "")
    .trim()
    .toUpperCase();
  if (!safeLetter) {
    return normalizedOption;
  }

  const labelPattern = new RegExp(
    `^(?:\\*\\*)?${safeLetter}\\s*[:.)-]\\s*(?:\\*\\*)?\\s*`,
    "i",
  );
  return stripDocxAppendixSuffix(
    normalizedOption.replace(labelPattern, "").trim() || normalizedOption,
  );
}

function isDocxAppendixMarker(lineText) {
  const normalizedText = normalizeComparableText(lineText);
  if (!normalizedText) {
    return false;
  }

  return (
    /^answer key\b/.test(normalizedText) ||
    /^detailed explanations\b/.test(normalizedText) ||
    /^use this table\b/.test(normalizedText)
  );
}

function isDocxSectionHeading(lineText) {
  const normalizedText = normalizeComparableText(lineText);
  if (!normalizedText) {
    return false;
  }

  return (
    /^chapter\s+\d+\b/.test(normalizedText) ||
    /^chapter\s*[-:]\s*introduction\b/.test(normalizedText)
  );
}

function stripDocxAppendixSuffix(value) {
  const text = normalizeDisplayText(value);
  if (!text) {
    return "";
  }

  const markers = [
    /\bAnswer\s+Key\b/i,
    /\bDetailed\s+Explanations\b/i,
    /\bUse\s+this\s+table\b/i,
  ];

  let cutIndex = -1;
  for (const marker of markers) {
    const match = text.search(marker);
    if (match >= 0 && (cutIndex === -1 || match < cutIndex)) {
      cutIndex = match;
    }
  }

  return cutIndex >= 0 ? text.slice(0, cutIndex).trim() : text;
}

function normalizeQuestion(rawQuestion, index) {
  const resolvedNumber = Number(rawQuestion.number ?? index + 1);
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

  const viQuestion = stripQuestionHeadingPrefix(
    vi.question || en.question,
    resolvedNumber,
  );
  const enQuestion = stripQuestionHeadingPrefix(
    en.question || vi.question,
    resolvedNumber,
  );

  return {
    id: String(rawQuestion.id ?? rawQuestion.number ?? index + 1),
    number: resolvedNumber,
    type: rawQuestion.type || inferQuestionType(mergedOptions),
    topic: toText(rawQuestion.topic),
    difficulty: toText(rawQuestion.difficulty),
    correctAnswer: String(rawQuestion.correctAnswer || "")
      .trim()
      .toUpperCase(),
    content: {
      vi: {
        question: viQuestion,
        explanation: vi.explanation || en.explanation,
        options: Object.keys(vi.options).length ? vi.options : mergedOptions,
      },
      en: {
        question: enQuestion,
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
      vi: toText(bank.name?.vi) || TEXT.vi.sampleBankName,
      en: toText(bank.name?.en) || TEXT.en.sampleBankName,
    },
    questions: (bank.questions || []).map((question, index) =>
      normalizeQuestion(question, index),
    ),
  };
}

function getSampleBank() {
  return normalizeQuestionBank({
    id: "sample-html-40",
    source: "sample",
    fileName: "40-html-sample",
    name: {
      vi: TEXT.vi.sampleBankName,
      en: TEXT.en.sampleBankName,
    },
    questions: window.SAMPLE_QUESTIONS || [],
  });
}

function getLocalizedQuestionContent(question) {
  const preferred = question.content?.[state.locale] || {};
  const fallback =
    question.content?.[state.locale === "vi" ? "en" : "vi"] || {};
  return {
    question: preferred.question || fallback.question || "",
    explanation: preferred.explanation || fallback.explanation || "",
    options: normalizeOptionMap({
      ...(fallback.options || {}),
      ...(preferred.options || {}),
    }),
  };
}

function getBankDisplayName(bank = state.questionBank) {
  return (
    bank?.name?.[state.locale] ||
    bank?.name?.vi ||
    bank?.name?.en ||
    bank?.fileName ||
    ""
  );
}

async function requestQuestionBankApi(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = "API request failed.";
    try {
      const payload = await response.json();
      message = payload.message || message;
    } catch (error) {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  return response.json();
}

async function fetchQuestionBankFromApi() {
  const payload = await requestQuestionBankApi("/question-bank");
  return normalizeQuestionBank(payload.questionBank);
}

async function saveQuestionBankToApi(bank) {
  const payload = await requestQuestionBankApi("/question-bank", {
    method: "PUT",
    body: JSON.stringify(bank),
  });
  return normalizeQuestionBank(payload.questionBank);
}

async function fetchQuestionBanksFromApi() {
  const payload = await requestQuestionBankApi("/question-banks");
  return {
    currentBankId: String(payload.currentBankId || ""),
    questionBanks: (payload.questionBanks || []).map(normalizeQuestionBank),
  };
}

async function selectQuestionBankFromApi(bankId) {
  const payload = await requestQuestionBankApi("/question-banks/select", {
    method: "POST",
    body: JSON.stringify({ bankId }),
  });
  return normalizeQuestionBank(payload.questionBank);
}

async function deleteQuestionBankFromApi(bankId) {
  const payload = await requestQuestionBankApi(
    `/question-banks/${encodeURIComponent(bankId)}`,
    { method: "DELETE" },
  );
  return {
    currentBankId: String(payload.currentBankId || ""),
    questionBanks: (payload.questionBanks || []).map(normalizeQuestionBank),
  };
}

async function fetchAttemptHistoryFromApi(bankId) {
  const query = bankId ? `?bankId=${encodeURIComponent(bankId)}` : "";
  const payload = await requestQuestionBankApi(`/attempt-history${query}`);
  return (payload.attempts || [])
    .map((attempt) => normalizeAttemptHistoryItem(attempt))
    .sort((left, right) => right.submittedAt - left.submittedAt);
}

async function saveAttemptHistoryToApi(attempt) {
  const payload = await requestQuestionBankApi("/attempt-history", {
    method: "POST",
    body: JSON.stringify(attempt),
  });
  return normalizeAttemptHistoryItem(payload.attempt);
}

async function restoreSampleBankFromApi() {
  const payload = await requestQuestionBankApi("/question-bank/reset", {
    method: "POST",
    body: "{}",
  });
  return normalizeQuestionBank(payload.questionBank);
}

async function loadQuestionBank() {
  try {
    const bank = await fetchQuestionBankFromApi();
    saveStoredBank(bank);
    return bank;
  } catch (error) {
    console.warn(
      "Could not load the question bank from backend, using local fallback.",
      error,
    );
    const storedState = loadStoredAppState();
    const fallbackBank =
      resolveStoredBankById(storedState, storedState.currentBankId) ||
      loadStoredBank() ||
      getSampleBank();
    state.questionBanks = [getSampleBank(), ...storedState.uploadedBanks];
    state.attemptHistory = storedState.attemptHistory.filter(
      (item) => item.bankId === fallbackBank.id,
    );
    saveStoredBank(fallbackBank);
    saveStoredAttemptHistory(storedState.attemptHistory);
    return fallbackBank;
  }
}

async function persistQuestionBank(bank) {
  try {
    const savedBank = await saveQuestionBankToApi(bank);
    saveStoredBank(savedBank);
    const storedState = loadStoredAppState();
    if (savedBank.source === "sample" || savedBank.id === "sample-html-40") {
      storedState.currentBankId = "sample-html-40";
    } else {
      const existingIndex = storedState.uploadedBanks.findIndex(
        (item) => item.id === savedBank.id,
      );
      if (existingIndex === -1) {
        storedState.uploadedBanks.unshift(savedBank);
      } else {
        storedState.uploadedBanks[existingIndex] = savedBank;
      }
      storedState.currentBankId = savedBank.id;
    }
    saveStoredAppState(storedState);
    return savedBank;
  } catch (error) {
    console.warn(
      "Could not persist the question bank to backend, saving local fallback.",
      error,
    );
    const normalizedBank = normalizeQuestionBank(bank);
    const storedState = loadStoredAppState();

    if (
      normalizedBank.source === "sample" ||
      normalizedBank.id === "sample-html-40"
    ) {
      storedState.currentBankId = "sample-html-40";
    } else {
      const existingIndex = storedState.uploadedBanks.findIndex(
        (item) => item.id === normalizedBank.id,
      );
      if (existingIndex === -1) {
        storedState.uploadedBanks.unshift(normalizedBank);
      } else {
        storedState.uploadedBanks[existingIndex] = normalizedBank;
      }
      storedState.currentBankId = normalizedBank.id;
    }

    saveStoredAppState(storedState);
    saveStoredBank(normalizedBank);
    return normalizedBank;
  }
}

async function restoreQuestionBank() {
  try {
    const sampleBank = await restoreSampleBankFromApi();
    const storedState = loadStoredAppState();
    storedState.currentBankId = "sample-html-40";
    saveStoredAppState(storedState);
    saveStoredBank(sampleBank);
    return sampleBank;
  } catch (error) {
    console.warn(
      "Could not restore the sample bank from backend, using local fallback.",
      error,
    );
    const sampleBank = getSampleBank();
    const storedState = loadStoredAppState();
    storedState.currentBankId = "sample-html-40";
    saveStoredAppState(storedState);
    saveStoredBank(sampleBank);
    return sampleBank;
  }
}

function loadStoredBank() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeQuestionBank(JSON.parse(raw)) : null;
  } catch (error) {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function normalizeAttemptHistoryItem(item) {
  const details = Array.isArray(item?.details)
    ? item.details.map((detail, index) => {
        const normalizedQuestion = normalizeQuestion(detail, index);
        const selected = String(detail?.selected || "")
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
    id: String(item?.id || `attempt-${Date.now()}`),
    bankId: String(item?.bankId || state.questionBank?.id || "sample-html-40"),
    bankName: {
      vi: toText(item?.bankName?.vi),
      en: toText(item?.bankName?.en),
    },
    mode: item?.mode === "practice" ? "practice" : "exam",
    score: Number(item?.score || 0),
    correct: Number(item?.correct || 0),
    wrong: Number(item?.wrong || 0),
    blank: Number(item?.blank || 0),
    total: Number(item?.total || 0),
    durationSeconds: Number(item?.durationSeconds || 0),
    submittedAt: Number(item?.submittedAt || Date.now()),
    details,
  };
}

function loadStoredAttemptHistory() {
  try {
    const raw = window.localStorage.getItem(ATTEMPT_HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .map((item) => normalizeAttemptHistoryItem(item))
      .sort((left, right) => right.submittedAt - left.submittedAt);
  } catch (error) {
    window.localStorage.removeItem(ATTEMPT_HISTORY_KEY);
    return [];
  }
}

function saveStoredAttemptHistory(history) {
  try {
    window.localStorage.setItem(ATTEMPT_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn("Could not persist attempt history.", error);
  }
}

function normalizeStoredAppState(rawState) {
  const parsedState = rawState && typeof rawState === "object" ? rawState : {};
  const uploadedBanks = Array.isArray(parsedState.uploadedBanks)
    ? parsedState.uploadedBanks
        .map((bank) => normalizeQuestionBank(bank))
        .filter((bank) => bank.id !== "sample-html-40")
    : [];

  const dedupedBanks = uploadedBanks.reduce((accumulator, bank) => {
    if (!accumulator.find((item) => item.id === bank.id)) {
      accumulator.push(bank);
    }
    return accumulator;
  }, []);

  const attemptHistory = Array.isArray(parsedState.attemptHistory)
    ? parsedState.attemptHistory
        .map((item) => normalizeAttemptHistoryItem(item))
        .sort((left, right) => right.submittedAt - left.submittedAt)
        .slice(0, 500)
    : [];

  let currentBankId = String(parsedState.currentBankId || "sample-html-40");
  if (
    currentBankId !== "sample-html-40" &&
    !dedupedBanks.some((bank) => bank.id === currentBankId)
  ) {
    currentBankId = "sample-html-40";
  }

  return {
    currentBankId,
    uploadedBanks: dedupedBanks,
    attemptHistory,
  };
}

function getDefaultStoredAppState() {
  return {
    currentBankId: "sample-html-40",
    uploadedBanks: [],
    attemptHistory: [],
  };
}

function loadStoredAppState() {
  try {
    const raw = window.localStorage.getItem(LOCAL_APP_STATE_KEY);
    if (!raw) {
      return normalizeStoredAppState({
        ...getDefaultStoredAppState(),
        attemptHistory: loadStoredAttemptHistory(),
      });
    }
    return normalizeStoredAppState(JSON.parse(raw));
  } catch (error) {
    window.localStorage.removeItem(LOCAL_APP_STATE_KEY);
    return normalizeStoredAppState({
      ...getDefaultStoredAppState(),
      attemptHistory: loadStoredAttemptHistory(),
    });
  }
}

function saveStoredAppState(appState) {
  try {
    const normalizedState = normalizeStoredAppState(appState);
    window.localStorage.setItem(
      LOCAL_APP_STATE_KEY,
      JSON.stringify(normalizedState),
    );
    saveStoredAttemptHistory(normalizedState.attemptHistory);
  } catch (error) {
    console.warn("Could not persist local app state.", error);
  }
}

function resolveStoredBankById(storedState, bankId) {
  const targetId = String(bankId || "").trim();
  if (!targetId || targetId === "sample-html-40") {
    return getSampleBank();
  }
  return (
    storedState.uploadedBanks.find((item) => item.id === targetId) ||
    getSampleBank()
  );
}

function mergeAttemptHistoryForBank(existingHistory, bankId, bankAttempts) {
  const targetBankId = String(bankId || "").trim();
  if (!targetBankId) {
    return Array.isArray(existingHistory) ? existingHistory : [];
  }

  const preservedAttempts = (existingHistory || []).filter(
    (item) => item.bankId !== targetBankId,
  );
  const mergedAttempts = [...(bankAttempts || []), ...preservedAttempts]
    .map((item) => normalizeAttemptHistoryItem(item))
    .sort((left, right) => right.submittedAt - left.submittedAt)
    .slice(0, 500);
  return mergedAttempts;
}

async function refreshHomeTrackingData() {
  const currentBankId = state.questionBank?.id || "sample-html-40";

  try {
    const payload = await fetchQuestionBanksFromApi();
    state.questionBanks = payload.questionBanks;
    const selectedBank =
      payload.questionBanks.find((item) => item.id === payload.currentBankId) ||
      payload.questionBanks.find((item) => item.id === currentBankId) ||
      payload.questionBanks[0];
    if (selectedBank && selectedBank.id !== state.questionBank?.id) {
      applyQuestionBank(selectedBank);
    }

    const storedState = loadStoredAppState();
    storedState.currentBankId =
      payload.currentBankId || selectedBank?.id || "sample-html-40";
    storedState.uploadedBanks = payload.questionBanks.filter(
      (item) => item.id !== "sample-html-40",
    );
    saveStoredAppState(storedState);
  } catch (error) {
    const storedState = loadStoredAppState();
    state.questionBanks = [getSampleBank(), ...storedState.uploadedBanks];
    const selectedBank = resolveStoredBankById(
      storedState,
      storedState.currentBankId,
    );
    if (selectedBank && selectedBank.id !== state.questionBank?.id) {
      applyQuestionBank(selectedBank);
    }
  }

  try {
    state.attemptHistory = await fetchAttemptHistoryFromApi(
      state.questionBank?.id || "",
    );
    const storedState = loadStoredAppState();
    storedState.attemptHistory = mergeAttemptHistoryForBank(
      storedState.attemptHistory,
      state.questionBank?.id || "sample-html-40",
      state.attemptHistory,
    );
    saveStoredAppState(storedState);
  } catch (error) {
    const storedState = loadStoredAppState();
    state.attemptHistory = storedState.attemptHistory.filter(
      (item) => item.bankId === (state.questionBank?.id || ""),
    );
    saveStoredAttemptHistory(storedState.attemptHistory);
  }

  renderBankSelector();
  renderAttemptHistory();
}

function renderBankSelector() {
  if (!elements.bankSelector) {
    return;
  }

  const banks = state.questionBanks.length
    ? state.questionBanks
    : state.questionBank
      ? [state.questionBank]
      : [];

  elements.bankSelector.innerHTML = banks
    .map((bank) => {
      const label = getBankDisplayName(bank) || bank.fileName || bank.id;
      const selected = state.questionBank?.id === bank.id ? "selected" : "";
      return `<option value="${escapeHtml(bank.id)}" ${selected}>${escapeHtml(label)}</option>`;
    })
    .join("");

  elements.applyBankBtn.disabled = !banks.length;
  elements.deleteBankBtn.disabled = !banks.length;
}

function formatDateTime(timestamp) {
  const date = new Date(timestamp || Date.now());
  return date.toLocaleString(state.locale === "vi" ? "vi-VN" : "en-US", {
    hour12: false,
  });
}

function renderAttemptHistory() {
  if (!elements.attemptHistoryList) {
    return;
  }

  if (!state.attemptHistory.length) {
    elements.attemptHistoryList.innerHTML = `<li class="attempt-history__empty">${escapeHtml(t("attemptHistoryEmpty"))}</li>`;
    return;
  }

  elements.attemptHistoryList.innerHTML = state.attemptHistory
    .slice(0, 10)
    .map((attempt) => {
      const modeLabel = t(
        attempt.mode === "practice" ? "attemptModePractice" : "attemptModeExam",
      );
      return `
        <li>
          <strong>${escapeHtml(modeLabel)} - ${escapeHtml(String(attempt.score))}%</strong>
          <span>${escapeHtml(`${attempt.correct}/${attempt.total}`)} • ${escapeHtml(formatDateTime(attempt.submittedAt))}</span>
          <button type="button" class="attempt-history__review" data-attempt-id="${escapeHtml(attempt.id)}">${escapeHtml(t("reviewAttempt"))}</button>
        </li>
      `;
    })
    .join("");
}

function handleAttemptHistoryClick(event) {
  const button = event.target.closest("[data-attempt-id]");
  if (!button) {
    return;
  }

  const attemptId = button.dataset.attemptId;
  const attempt = state.attemptHistory.find((item) => item.id === attemptId);
  if (!attempt || !attempt.details?.length) {
    showToast(t("attemptReviewUnavailable"), "warning");
    return;
  }

  const snapshot = {
    details: attempt.details,
    correct: attempt.correct,
    wrong: attempt.wrong,
    blank: attempt.blank,
    score: attempt.score,
  };

  state.resultSnapshot = snapshot;
  state.mode = attempt.mode;
  state.reviewFilter = "all";
  state.sessionViewOptions = { hideTopic: false };
  setWorkspaceMode("result");
  elements.homeScreen.classList.add("hidden");
  elements.quizWorkspace.classList.add("hidden");
  elements.resultWorkspace.classList.remove("hidden");
  renderResults(snapshot);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function saveStoredBank(bank) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bank));
  } catch (error) {
    console.warn("Could not persist the question bank.", error);
  }
}

function loadNavigationMode() {
  try {
    const value = window.localStorage.getItem(NAVIGATION_MODE_KEY);
    if (["paged", "chunk5", "chunk10", "scroll"].includes(value)) {
      return value;
    }
    return "chunk5";
  } catch (error) {
    return "chunk5";
  }
}

function saveNavigationMode(mode) {
  try {
    window.localStorage.setItem(NAVIGATION_MODE_KEY, mode);
  } catch (error) {
    console.warn("Could not persist the navigation mode.", error);
  }
}

function loadSidebarHidden() {
  try {
    return window.localStorage.getItem(SIDEBAR_HIDDEN_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function saveSidebarHidden(hidden) {
  try {
    window.localStorage.setItem(SIDEBAR_HIDDEN_KEY, hidden ? "true" : "false");
  } catch (error) {
    console.warn("Could not persist sidebar visibility.", error);
  }
}

function loadStoredBooleanSetting(storageKey, defaultValue = false) {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (value === null) {
      return defaultValue;
    }
    return value === "true";
  } catch (error) {
    return defaultValue;
  }
}

function saveStoredBooleanSetting(storageKey, value) {
  try {
    window.localStorage.setItem(storageKey, value ? "true" : "false");
  } catch (error) {
    console.warn(`Could not persist setting ${storageKey}.`, error);
  }
}

function normalizeExamDurationMinutes(value) {
  const normalizedValue = Number.parseInt(value, 10);
  if (!Number.isFinite(normalizedValue)) {
    return DEFAULT_EXAM_DURATION_MINUTES;
  }
  return Math.min(
    MAX_EXAM_DURATION_MINUTES,
    Math.max(MIN_EXAM_DURATION_MINUTES, normalizedValue),
  );
}

function loadExamDurationMinutes() {
  try {
    return normalizeExamDurationMinutes(
      window.localStorage.getItem(EXAM_DURATION_KEY),
    );
  } catch (error) {
    return DEFAULT_EXAM_DURATION_MINUTES;
  }
}

function loadPracticeDurationMinutes() {
  try {
    return normalizeExamDurationMinutes(
      window.localStorage.getItem(PRACTICE_DURATION_KEY),
    );
  } catch (error) {
    return DEFAULT_EXAM_DURATION_MINUTES;
  }
}

function saveExamDurationMinutes(minutes) {
  try {
    window.localStorage.setItem(
      EXAM_DURATION_KEY,
      String(normalizeExamDurationMinutes(minutes)),
    );
  } catch (error) {
    console.warn("Could not persist the exam duration.", error);
  }
}

function savePracticeDurationMinutes(minutes) {
  try {
    window.localStorage.setItem(
      PRACTICE_DURATION_KEY,
      String(normalizeExamDurationMinutes(minutes)),
    );
  } catch (error) {
    console.warn("Could not persist the practice duration.", error);
  }
}

function getExamDurationSeconds(minutes = state.examDurationMinutes) {
  return normalizeExamDurationMinutes(minutes) * 60;
}

function getPracticeDurationSeconds(minutes = state.practiceDurationMinutes) {
  return normalizeExamDurationMinutes(minutes) * 60;
}

function getSessionDurationSeconds(mode = state.mode) {
  return mode === "practice"
    ? getPracticeDurationSeconds()
    : getExamDurationSeconds();
}

function syncExamDurationInput() {
  const normalizedMinutes = normalizeExamDurationMinutes(
    elements.examDurationInput.value,
  );
  state.examDurationMinutes = normalizedMinutes;
  elements.examDurationInput.value = String(normalizedMinutes);
  saveExamDurationMinutes(normalizedMinutes);

  if (state.mode !== "exam") {
    state.remainingSeconds = getExamDurationSeconds();
    elements.timerValue.textContent = formatTime(state.remainingSeconds);
  }
}

function syncPracticeDurationInput() {
  const normalizedMinutes = normalizeExamDurationMinutes(
    elements.practiceDurationInput.value,
  );
  state.practiceDurationMinutes = normalizedMinutes;
  elements.practiceDurationInput.value = String(normalizedMinutes);
  savePracticeDurationMinutes(normalizedMinutes);

  if (state.mode !== "practice") {
    state.remainingSeconds = getSessionDurationSeconds(state.mode);
    elements.timerValue.textContent = formatTime(state.remainingSeconds);
  }
}

function syncExamSessionSettings() {
  state.examShuffleQuestions = Boolean(
    elements.examShuffleQuestionsInput?.checked,
  );
  state.examShuffleAnswers = Boolean(elements.examShuffleAnswersInput?.checked);
  state.examHideTopic = Boolean(elements.examHideTopicInput?.checked);

  saveStoredBooleanSetting(
    EXAM_SHUFFLE_QUESTIONS_KEY,
    state.examShuffleQuestions,
  );
  saveStoredBooleanSetting(EXAM_SHUFFLE_ANSWERS_KEY, state.examShuffleAnswers);
  saveStoredBooleanSetting(EXAM_HIDE_TOPIC_KEY, state.examHideTopic);
}

function syncPracticeSessionSettings() {
  state.practiceShuffleQuestions = Boolean(
    elements.practiceShuffleQuestionsInput?.checked,
  );
  state.practiceShuffleAnswers = Boolean(
    elements.practiceShuffleAnswersInput?.checked,
  );
  state.practiceHideTopic = Boolean(elements.practiceHideTopicInput?.checked);

  saveStoredBooleanSetting(
    PRACTICE_SHUFFLE_QUESTIONS_KEY,
    state.practiceShuffleQuestions,
  );
  saveStoredBooleanSetting(
    PRACTICE_SHUFFLE_ANSWERS_KEY,
    state.practiceShuffleAnswers,
  );
  saveStoredBooleanSetting(PRACTICE_HIDE_TOPIC_KEY, state.practiceHideTopic);
}

function applyQuestionBank(bank) {
  state.questionBank = bank;
  state.questions = bank.questions;
  state.currentQuestions = bank.questions;
  renderBankSummary();
  updateStaticTexts();
}

function setImportStatus(tone, key, values = {}) {
  state.importStatus = { tone, key, values };
  renderImportStatus();
}

function setImportStatusText(tone, text) {
  state.importStatus = { tone, text };
  renderImportStatus();
}

function renderImportStatus() {
  elements.importStatus.dataset.state = state.importStatus.tone;
  elements.importStatus.textContent =
    state.importStatus.text ||
    t(state.importStatus.key, state.importStatus.values);
}

function updateSidebarVisibility() {
  const layoutSelectors = [elements.quizWorkspace, elements.resultWorkspace];
  layoutSelectors.forEach((layout) => {
    if (!layout) {
      return;
    }
    layout.classList.toggle(
      "attempt-layout--sidebar-hidden",
      state.sidebarHidden,
    );
  });

  [
    elements.globalSidebarToggleBtn,
    elements.quizSidebarToggleBtn,
    elements.reviewSidebarToggleBtn,
  ]
    .filter(Boolean)
    .forEach((button) => {
      button.textContent = state.sidebarHidden ? "‹" : "×";
      button.setAttribute(
        "aria-pressed",
        state.sidebarHidden ? "true" : "false",
      );
      button.dataset.i18n = state.sidebarHidden ? "showSidebar" : "hideSidebar";
      button.setAttribute(
        "aria-label",
        state.sidebarHidden ? t("showSidebar") : t("hideSidebar"),
      );
      button.setAttribute(
        "title",
        state.sidebarHidden ? t("showSidebar") : t("hideSidebar"),
      );
    });
}

function toggleSidebarVisibility() {
  state.sidebarHidden = !state.sidebarHidden;
  saveSidebarHidden(state.sidebarHidden);
  updateSidebarVisibility();
}

function setWorkspaceMode(mode) {
  document.body.classList.toggle("is-attempt-mode", mode === "attempt");
  document.body.classList.toggle("is-result-mode", mode === "result");
}

function ensureToastElement() {
  let toastNode = document.getElementById("appToast");
  if (toastNode) {
    return toastNode;
  }

  toastNode = document.createElement("div");
  toastNode.id = "appToast";
  toastNode.className = "app-toast";
  toastNode.setAttribute("role", "status");
  toastNode.setAttribute("aria-live", "polite");
  document.body.appendChild(toastNode);
  return toastNode;
}

function showToast(message, tone = "info") {
  const toastNode = ensureToastElement();
  toastNode.dataset.state = tone;
  toastNode.textContent = String(message || "");
  toastNode.classList.add("is-visible");

  if (toastTimerId !== null) {
    window.clearTimeout(toastTimerId);
  }

  toastTimerId = window.setTimeout(() => {
    toastNode.classList.remove("is-visible");
    toastTimerId = null;
  }, 2600);
}

function renderBankSummary() {
  const count = state.questions.length;
  elements.questionCount.textContent = String(count);
  elements.bankCountLabel.textContent = String(count);
  elements.bankSourceLabel.textContent = getBankDisplayName();
  elements.startExamBtn.disabled = count === 0;
  elements.startPracticeBtn.disabled = count === 0;

}

function syncModeSetupVisibility() {
  const practiceSelected = elements.modeSetupSelect.value === "practice";
  elements.examModeSettings.classList.toggle("hidden", practiceSelected);
  elements.practiceModeSettings.classList.toggle("hidden", !practiceSelected);
  const activeSettings = practiceSelected
    ? elements.practiceModeSettings
    : elements.examModeSettings;
  const durationField = activeSettings.querySelector(".mode-panel__field");
  durationField.after(elements.modeSetupField);
}

function prepareLandingReveal() {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    return () => {};
  }

  const nodes = document.querySelectorAll(
    ".home-screen__content, .home-screen__actions > .mode-panel",
  );
  nodes.forEach((node) => node.classList.add("landing-reveal"));

  return () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          node.classList.add("is-visible");
          observer.unobserve(node);
          node.addEventListener(
            "transitionend",
            () => node.classList.remove("landing-reveal", "is-visible"),
            { once: true },
          );
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
  };
}

async function bootstrap() {
  const revealLanding = prepareLandingReveal();
  applyQuestionBank(await loadQuestionBank());
  const storedState = loadStoredAppState();
  state.questionBanks = [getSampleBank(), ...storedState.uploadedBanks];
  state.attemptHistory = storedState.attemptHistory.filter(
    (item) => item.bankId === (state.questionBank?.id || ""),
  );
  renderBankSelector();
  renderAttemptHistory();
  await refreshHomeTrackingData();
  revealLanding();

  elements.navigationModeSelect.value = state.navigationMode;
  elements.examDurationInput.value = String(state.examDurationMinutes);
  elements.practiceDurationInput.value = String(state.practiceDurationMinutes);
  syncModeSetupVisibility();
  elements.languageSelect.addEventListener("change", handleLanguageChange);
  elements.clearStorageBtn.addEventListener("click", handleClearStorage);
  elements.modeSetupSelect.addEventListener("change", syncModeSetupVisibility);
  elements.navigationModeSelect.addEventListener(
    "change",
    handleNavigationModeChange,
  );
  elements.examDurationInput.addEventListener("change", syncExamDurationInput);
  elements.examDurationInput.addEventListener("blur", syncExamDurationInput);
  elements.practiceDurationInput.addEventListener(
    "change",
    syncPracticeDurationInput,
  );
  elements.practiceDurationInput.addEventListener(
    "blur",
    syncPracticeDurationInput,
  );
  elements.examShuffleQuestionsInput?.addEventListener(
    "change",
    syncExamSessionSettings,
  );
  elements.examShuffleAnswersInput?.addEventListener(
    "change",
    syncExamSessionSettings,
  );
  elements.examHideTopicInput?.addEventListener("change", syncExamSessionSettings);
  elements.practiceShuffleQuestionsInput?.addEventListener(
    "change",
    syncPracticeSessionSettings,
  );
  elements.practiceShuffleAnswersInput?.addEventListener(
    "change",
    syncPracticeSessionSettings,
  );
  elements.practiceHideTopicInput?.addEventListener(
    "change",
    syncPracticeSessionSettings,
  );
  elements.startExamBtn.addEventListener("click", () => {
    syncExamDurationInput();
    syncExamSessionSettings();
    startSession("exam", state.questions);
  });
  elements.startPracticeBtn.addEventListener("click", () => {
    syncPracticeDurationInput();
    syncPracticeSessionSettings();
    startSession("practice", state.questions);
  });
  elements.resetAppBtn.addEventListener("click", handleResetAppClick);
  elements.attemptBackBtn?.addEventListener("click", resetToHome);
  elements.resultBackBtn?.addEventListener("click", resetToHome);
  elements.globalSidebarToggleBtn?.addEventListener(
    "click",
    toggleSidebarVisibility,
  );
  elements.quizSidebarToggleBtn?.addEventListener(
    "click",
    toggleSidebarVisibility,
  );
  elements.reviewSidebarToggleBtn?.addEventListener(
    "click",
    toggleSidebarVisibility,
  );
  elements.prevBtn.addEventListener("click", goToPreviousQuestion);
  elements.nextBtn.addEventListener("click", goToNextQuestion);
  elements.submitBtn.addEventListener("click", submitSession);
  elements.retryWrongBtn.addEventListener("click", retryWrongAnswers);
  elements.reviewRetryWrongBtn.addEventListener("click", retryWrongAnswers);
  elements.restartBtn.addEventListener("click", resetToHome);
  elements.reviewRestartBtn.addEventListener("click", resetToHome);
  elements.questionHost.addEventListener("click", handleQuestionHostClick);
  elements.questionPalette.addEventListener("click", handlePaletteClick);
  elements.reviewPalette.addEventListener("click", handleReviewPaletteClick);
  elements.resultFilters?.addEventListener("click", handleResultFilterClick);
  elements.attemptHistoryList.addEventListener(
    "click",
    handleAttemptHistoryClick,
  );
  elements.importFileInput.addEventListener(
    "change",
    handleImportFileSelection,
  );
  elements.importReplaceBtn.addEventListener("click", handleImportReplace);
  elements.restoreSampleBtn.addEventListener("click", restoreSampleBank);
  elements.applyBankBtn.addEventListener("click", handleApplySelectedBank);
  elements.deleteBankBtn.addEventListener("click", handleDeleteSelectedBank);
  elements.scrollTopBtn.addEventListener("click", scrollToPageTop);
  elements.scrollBottomBtn.addEventListener("click", scrollToPageBottom);

  updateStaticTexts();
  updateSidebarVisibility();
  resetToHome();
}

function scrollToPageTop() {
  const scrollingElement =
    document.scrollingElement || document.documentElement;
  scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToPageBottom() {
  const scrollingElement =
    document.scrollingElement || document.documentElement;
  scrollingElement.scrollTo({
    top: scrollingElement.scrollHeight,
    behavior: "smooth",
  });
}

function handleLanguageChange(event) {
  state.locale = event.target.value;
  updateStaticTexts();

  if (!elements.quizWorkspace.classList.contains("hidden")) {
    renderActiveView();
  }

  if (
    !elements.resultWorkspace.classList.contains("hidden") &&
    state.resultSnapshot
  ) {
    renderResults(state.resultSnapshot);
  }
}

function handleNavigationModeChange(event) {
  const selectedMode = String(event.target.value || "paged");
  state.navigationMode = ["paged", "chunk5", "chunk10", "scroll"].includes(
    selectedMode,
  )
    ? selectedMode
    : "paged";
  saveNavigationMode(state.navigationMode);

  if (!elements.quizWorkspace.classList.contains("hidden")) {
    renderActiveView();
    if (state.navigationMode === "scroll") {
      scrollToQuestion(state.currentIndex, "smooth");
    } else {
      elements.questionHost.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  } else {
    syncNavigationLayout();
  }
}

function updateStaticTexts() {
  document.documentElement.lang = state.locale;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    if (node.id !== "importStatus") {
      node.textContent = t(node.dataset.i18n);
    }
  });
  elements.importFileName.textContent =
    elements.importFileInput.files?.[0]?.name || t("noFileSelected");
  elements.examDurationInput.value = String(state.examDurationMinutes);
  elements.practiceDurationInput.value = String(state.practiceDurationMinutes);
  elements.navigationModeSelect.value = state.navigationMode;
  syncModeSetupVisibility();
  if (elements.examShuffleQuestionsInput) {
    elements.examShuffleQuestionsInput.checked = state.examShuffleQuestions;
  }
  if (elements.examShuffleAnswersInput) {
    elements.examShuffleAnswersInput.checked = state.examShuffleAnswers;
  }
  if (elements.examHideTopicInput) {
    elements.examHideTopicInput.checked = state.examHideTopic;
  }
  if (elements.practiceShuffleQuestionsInput) {
    elements.practiceShuffleQuestionsInput.checked =
      state.practiceShuffleQuestions;
  }
  if (elements.practiceShuffleAnswersInput) {
    elements.practiceShuffleAnswersInput.checked = state.practiceShuffleAnswers;
  }
  if (elements.practiceHideTopicInput) {
    elements.practiceHideTopicInput.checked = state.practiceHideTopic;
  }
  elements.submitBtn.textContent =
    state.mode === "practice" ? t("submitPractice") : t("submitExam");
  renderBankSummary();
  renderImportStatus();
  renderBankSelector();
  renderAttemptHistory();
  syncNavigationLayout();
  updateSidebarVisibility();
}

function cloneQuestionForSession(question) {
  if (typeof structuredClone === "function") {
    return structuredClone(question);
  }
  return JSON.parse(JSON.stringify(question));
}

function shuffleArrayCopy(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function getQuestionOptionLetters(question) {
  const optionKeys = new Set();
  [question?.options, question?.content?.vi?.options, question?.content?.en?.options]
    .filter(Boolean)
    .forEach((optionMap) => {
      Object.keys(optionMap).forEach((key) =>
        optionKeys.add(String(key).trim().toUpperCase()),
      );
    });
  return Array.from(optionKeys).sort((left, right) => left.localeCompare(right));
}

function remapOptionMap(optionMap, sourceLetters, targetLetters) {
  if (!optionMap || typeof optionMap !== "object") {
    return optionMap;
  }

  const normalizedOptions = normalizeOptionMap(optionMap);
  return targetLetters.reduce((accumulator, targetLetter, index) => {
    const sourceLetter = sourceLetters[index];
    const value = normalizedOptions[sourceLetter];
    if (value) {
      accumulator[targetLetter] = value;
    }
    return accumulator;
  }, {});
}

function shuffleQuestionAnswerOrder(question) {
  const sourceLetters = getQuestionOptionLetters(question);
  if (sourceLetters.length < 2) {
    return question;
  }

  const shuffledSourceLetters = shuffleArrayCopy(sourceLetters);
  const targetLetters = [...sourceLetters];
  const clonedQuestion = cloneQuestionForSession(question);

  if (clonedQuestion.options) {
    clonedQuestion.options = remapOptionMap(
      clonedQuestion.options,
      shuffledSourceLetters,
      targetLetters,
    );
  }
  if (clonedQuestion.content?.vi?.options) {
    clonedQuestion.content.vi.options = remapOptionMap(
      clonedQuestion.content.vi.options,
      shuffledSourceLetters,
      targetLetters,
    );
  }
  if (clonedQuestion.content?.en?.options) {
    clonedQuestion.content.en.options = remapOptionMap(
      clonedQuestion.content.en.options,
      shuffledSourceLetters,
      targetLetters,
    );
  }

  const normalizedCorrectAnswer = String(clonedQuestion.correctAnswer || "")
    .trim()
    .toUpperCase();
  const correctAnswerIndex = shuffledSourceLetters.indexOf(
    normalizedCorrectAnswer,
  );
  if (correctAnswerIndex >= 0) {
    clonedQuestion.correctAnswer = targetLetters[correctAnswerIndex];
  }

  return clonedQuestion;
}

function buildExamSessionQuestions(questions) {
  let nextQuestions = state.examShuffleAnswers
    ? questions.map((question) => shuffleQuestionAnswerOrder(question))
    : [...questions];

  if (state.examShuffleQuestions) {
    nextQuestions = shuffleArrayCopy(nextQuestions);
  }

  return nextQuestions;
}

function buildPracticeSessionQuestions(questions) {
  let nextQuestions = state.practiceShuffleAnswers
    ? questions.map((question) => shuffleQuestionAnswerOrder(question))
    : [...questions];

  if (state.practiceShuffleQuestions) {
    nextQuestions = shuffleArrayCopy(nextQuestions);
  }

  return nextQuestions;
}

function startSession(mode, questions) {
  if (!questions.length) {
    return;
  }

  clearTimer();
  state.mode = mode;
  state.currentQuestions =
    mode === "exam"
      ? buildExamSessionQuestions(questions)
      : buildPracticeSessionQuestions(questions);
  state.currentIndex = 0;
  state.answers = {};
  state.flags = {};
  state.submitted = false;
  state.remainingSeconds = getSessionDurationSeconds(mode);
  state.resultSnapshot = null;
  state.sessionViewOptions = {
    hideTopic: mode === "exam" ? state.examHideTopic : state.practiceHideTopic,
  };

  elements.homeScreen.classList.add("hidden");
  elements.resultWorkspace.classList.add("hidden");
  elements.quizWorkspace.classList.remove("hidden");
  setWorkspaceMode("attempt");

  startTimer();

  updateStaticTexts();
  renderActiveView();
}

function resetToHome() {
  clearTimer();
  state.mode = null;
  state.currentQuestions = state.questions;
  state.currentIndex = 0;
  state.answers = {};
  state.flags = {};
  state.submitted = false;
  state.remainingSeconds = getExamDurationSeconds();
  state.resultSnapshot = null;
  state.reviewFilter = "all";
  state.sessionViewOptions = { hideTopic: false };

  elements.homeScreen.classList.remove("hidden");
  elements.quizWorkspace.classList.add("hidden");
  elements.resultWorkspace.classList.add("hidden");
  setWorkspaceMode("home");
  elements.examDurationInput.value = String(state.examDurationMinutes);
  elements.practiceDurationInput.value = String(state.practiceDurationMinutes);
  elements.timerValue.textContent = formatTime(state.remainingSeconds);
  renderBankSummary();
  renderBankSelector();
  renderAttemptHistory();
  updateSidebarVisibility();
}

async function handleResetAppClick() {
  try {
    await refreshHomeTrackingData();
  } catch (error) {
    // keep local fallback rendering even if backend is unavailable
  }
  resetToHome();
}

function renderActiveView() {
  renderQuestionContent();
  renderQuestionPalette();
  updateSidebarMeta();
  updateNavigationButtons();
}

function syncNavigationLayout() {
  const isScrollMode = state.navigationMode === "scroll";
  elements.questionNavControls.classList.toggle("hidden", isScrollMode);
  elements.questionHost.classList.toggle("question-host--scroll", isScrollMode);
  updateQuickNavVisibility();
}

function updateQuickNavVisibility() {
  if (!elements.scrollTopBtn || !elements.scrollBottomBtn) {
    return;
  }

  const inQuizWorkspace = !elements.quizWorkspace.classList.contains("hidden");
  const shouldShow = !inQuizWorkspace || state.navigationMode === "scroll";
  elements.scrollTopBtn.classList.toggle("hidden", !shouldShow);
  elements.scrollBottomBtn.classList.toggle("hidden", !shouldShow);
}

function getNavigationPageSize() {
  if (state.navigationMode === "chunk5") {
    return 5;
  }
  if (state.navigationMode === "chunk10") {
    return 10;
  }
  return 1;
}

function getCurrentChunkRange() {
  const pageSize = getNavigationPageSize();
  const start = Math.floor(state.currentIndex / pageSize) * pageSize;
  const end = Math.min(start + pageSize, state.currentQuestions.length);
  return { start, end, pageSize };
}

function renderQuestionContent() {
  syncNavigationLayout();
  if (state.navigationMode === "scroll") {
    renderScrollQuestionList();
    return;
  }
  if (state.navigationMode === "paged") {
    renderCurrentQuestion();
    return;
  }
  renderChunkQuestionList();
}

function renderCurrentQuestion() {
  const question = state.currentQuestions[state.currentIndex];
  if (!question) {
    elements.questionHost.innerHTML = "";
    return;
  }

  const selectedAnswer = state.answers[question.id] || null;
  const shouldShowPracticeEvaluation =
    state.mode === "practice" && selectedAnswer !== null;

  elements.questionHost.innerHTML = buildQuestionMarkup(
    question,
    state.currentIndex,
    {
      selectedAnswer,
      showEvaluation: shouldShowPracticeEvaluation,
      interactive: true,
      flagged: Boolean(state.flags[question.id]),
    },
  );
}

function renderScrollQuestionList() {
  elements.questionHost.innerHTML = state.currentQuestions
    .map((question, index) => buildScrollQuestionMarkup(question, index))
    .join("");
}

function renderChunkQuestionList() {
  const { start, end } = getCurrentChunkRange();
  elements.questionHost.innerHTML = state.currentQuestions
    .slice(start, end)
    .map((question, offset) =>
      buildQuestionMarkup(question, start + offset, {
        selectedAnswer: state.answers[question.id] || null,
        showEvaluation:
          state.mode === "practice" &&
          (state.answers[question.id] || null) !== null,
        interactive: true,
        flagged: Boolean(state.flags[question.id]),
      }),
    )
    .join("");
}

function getQuestionAnchorId(question) {
  return `session-question-${question.id}`;
}

function buildScrollQuestionMarkup(question, index) {
  const selectedAnswer = state.answers[question.id] || null;
  return buildQuestionMarkup(question, index, {
    selectedAnswer,
    showEvaluation: state.mode === "practice" && selectedAnswer !== null,
    interactive: true,
    flagged: Boolean(state.flags[question.id]),
    questionAnchorId: getQuestionAnchorId(question),
  });
}

function buildQuestionMarkup(question, index, config) {
  const content = getLocalizedQuestionContent(question);
  const selectedAnswer = config.selectedAnswer ?? null;
  const isCorrect = selectedAnswer === question.correctAnswer;
  const evaluationState = config.showEvaluation
    ? getEvaluationState(selectedAnswer, isCorrect)
    : getActiveState(selectedAnswer);
  const gradeText = config.showEvaluation
    ? isCorrect
      ? t("markFull")
      : t("markZero")
    : t("markPending");
  const safeQuestionText = renderRichText(content.question);
  const shouldHideTopic = Boolean(
    config.hideTopic ?? state.sessionViewOptions.hideTopic,
  );
  const topicText = shouldHideTopic ? "" : toText(question.topic);
  const topicMarkup = topicText
    ? `<div class="question-meta"><span class="question-topic">${escapeHtml(topicText)}</span></div>`
    : "";
  const anchorId = config.questionAnchorId
    ? ` id="${config.questionAnchorId}"`
    : "";
  const scrollClass = config.questionAnchorId ? " session-question" : "";
  const questionDomId = escapeHtml(
    `question-${String(question.id).replace(/[^a-zA-Z0-9_-]/g, "-")}`,
  );
  const answerRows = sortOptionEntries(content.options)
    .map(([letter, value], optionIndex) => {
      const answerInputId = `${questionDomId}-answer-${escapeHtml(letter)}`;
      const optionText = stripBoldFormatting(
        stripOptionLabelPrefix(value, letter),
      );
      const classes = [`r${optionIndex % 2}`];
      if (selectedAnswer === letter) {
        classes.push("is-selected");
      }
      if (config.showEvaluation && letter === question.correctAnswer) {
        classes.push("is-correct");
      }
      if (
        config.showEvaluation &&
        selectedAnswer === letter &&
        selectedAnswer !== question.correctAnswer
      ) {
        classes.push("is-wrong");
      }

      let icon = "";
      if (config.showEvaluation && letter === question.correctAnswer) {
        icon =
          '<span class="answer-state-icon answer-state-icon--correct">✓</span>';
      } else if (
        config.showEvaluation &&
        selectedAnswer === letter &&
        selectedAnswer !== question.correctAnswer
      ) {
        icon =
          '<span class="answer-state-icon answer-state-icon--wrong">✕</span>';
      }

      return `
        <div class="${classes.join(" ")}" data-answer="${letter}">
          <input
            id="${answerInputId}"
            name="${questionDomId}"
            type="radio"
            aria-label="${escapeHtml(`${t("questionLabel")} ${index + 1}, ${letter}`)}"
            ${selectedAnswer === letter ? "checked" : ""}
            ${config.interactive ? "" : "disabled"}
          />
          <label class="answer-label" for="${answerInputId}">
            <span class="answernumber">${letter.toLowerCase()}.</span>
            <div class="answer-text">${renderRichText(optionText)}</div>
            ${icon}
          </label>
        </div>
      `;
    })
    .join("");
  const clearChoiceMarkup =
    config.interactive && selectedAnswer
      ? `
        <div class="qtype_multichoice_clearchoice">
          <button class="clear-choice-button" type="button" data-action="clear-choice">
            ${t("clearChoice")}
          </button>
        </div>
      `
      : "";

  return `
    <article${anchorId} class="que multichoice deferredfeedback ${evaluationState.queue}${scrollClass}" data-question-index="${index}" data-question-id="${question.id}">
      <div class="info">
        <h3 class="no">${t("questionLabel")} <span class="qno">${index + 1}</span></h3>
        <div class="state state--${evaluationState.css}">${evaluationState.label}</div>
        <div class="grade">${gradeText}</div>
        <div class="questionflag editable">
          <a href="#" data-action="toggle-flag">
            <img class="questionflagimage" src="${config.flagged ? FLAGGED_ICON : FLAG_ICON}" alt="">
            <span>${config.flagged ? t("unflagQuestion") : t("flagQuestion")}</span>
          </a>
        </div>
      </div>
      <div class="content">
        <div class="formulation">
          ${topicMarkup}
          <div class="qtext">${safeQuestionText}</div>
          <fieldset class="ablock no-overflow visual-scroll-x">
            <legend class="prompt">${t("promptSelectOne")}</legend>
            <div class="answer">${answerRows}</div>
            ${clearChoiceMarkup}
          </fieldset>
        </div>
        ${config.showEvaluation ? buildOutcomeMarkup(question, content, selectedAnswer, isCorrect) : ""}
      </div>
    </article>
  `;
}

function buildOutcomeMarkup(question, content, selectedAnswer, isCorrect) {
  let lead = t("outcomeBlank");
  if (selectedAnswer) {
    lead = isCorrect ? t("outcomeCorrect") : t("outcomeIncorrect");
  }

  return `
    <div class="outcome">
      <p>${lead}</p>
      <p>${t("correctAnswerLead")} ${question.correctAnswer}. ${renderRichText(stripBoldFormatting(stripOptionLabelPrefix(content.options[question.correctAnswer] || "", question.correctAnswer)))}</p>
      <p>${renderRichText(content.explanation || t("noExplanation"))}</p>
    </div>
  `;
}

function getActiveState(selectedAnswer) {
  return selectedAnswer
    ? { queue: "answersaved", css: "saved", label: t("stateSaved") }
    : { queue: "notyetanswered", css: "blank", label: t("stateBlank") };
}

function getEvaluationState(selectedAnswer, isCorrect) {
  if (!selectedAnswer) {
    return { queue: "notyetanswered", css: "blank", label: t("stateBlank") };
  }
  return isCorrect
    ? { queue: "correct", css: "correct", label: t("stateCorrect") }
    : { queue: "incorrect", css: "incorrect", label: t("stateIncorrect") };
}

function updateSidebarMeta() {
  elements.modeBadge.textContent =
    state.mode === "exam" ? t("examBadge") : t("practiceBadge");
  const totalQuestions = state.currentQuestions.length || 1;
  let progressRatio = 0;
  if (state.navigationMode === "scroll") {
    const answeredCount = state.currentQuestions.filter((question) =>
      Boolean(state.answers[question.id]),
    ).length;
    elements.progressValue.textContent = `${answeredCount} / ${state.currentQuestions.length}`;
    progressRatio = answeredCount / totalQuestions;
  } else if (state.navigationMode === "paged") {
    elements.progressValue.textContent = `${state.currentIndex + 1} / ${state.currentQuestions.length}`;
    progressRatio = (state.currentIndex + 1) / totalQuestions;
  } else {
    const { start, end } = getCurrentChunkRange();
    elements.progressValue.textContent = `${start + 1}-${end} / ${state.currentQuestions.length}`;
    progressRatio = end / totalQuestions;
  }
  if (elements.progressMeter) {
    elements.progressMeter.style.width = `${Math.min(
      100,
      Math.max(0, Math.round(progressRatio * 100)),
    )}%`;
  }
  elements.timerValue.textContent = formatTime(state.remainingSeconds);
}

function updateNavigationButtons() {
  if (state.navigationMode === "scroll") {
    return;
  }
  if (state.navigationMode === "paged") {
    elements.prevBtn.disabled = state.currentIndex === 0;
    elements.nextBtn.disabled =
      state.currentIndex === state.currentQuestions.length - 1;
    return;
  }

  const { start, end } = getCurrentChunkRange();
  elements.prevBtn.disabled = start === 0;
  elements.nextBtn.disabled = end >= state.currentQuestions.length;
}

function handleQuestionHostClick(event) {
  const questionIndex = getQuestionIndexFromNode(event.target);
  const flagTarget = event.target.closest("[data-action='toggle-flag']");
  if (flagTarget) {
    event.preventDefault();
    toggleCurrentFlag(questionIndex);
    return;
  }

  const clearTarget = event.target.closest("[data-action='clear-choice']");
  if (clearTarget) {
    event.preventDefault();
    clearAnswer(questionIndex);
    return;
  }

  const answerTarget = event.target.closest("[data-answer]");
  if (answerTarget) {
    selectAnswer(answerTarget.dataset.answer, questionIndex);
  }
}

function clearAnswer(questionIndex = state.currentIndex) {
  const question = state.currentQuestions[questionIndex];
  if (!question || state.submitted) {
    return;
  }
  state.currentIndex = questionIndex;
  delete state.answers[question.id];

  if (state.navigationMode === "scroll") {
    refreshQuestionCard(questionIndex);
    renderQuestionPalette();
    updateSidebarMeta();
    return;
  }

  renderActiveView();
}

function getQuestionIndexFromNode(node) {
  const questionNode = node?.closest?.("[data-question-index]");
  if (!questionNode) {
    return state.currentIndex;
  }
  return Number(questionNode.dataset.questionIndex);
}

function selectAnswer(letter, questionIndex = state.currentIndex) {
  const question = state.currentQuestions[questionIndex];
  if (!question || state.submitted) {
    return;
  }
  state.currentIndex = questionIndex;
  state.answers[question.id] = letter;

  if (state.navigationMode === "scroll") {
    refreshQuestionCard(questionIndex);
    renderQuestionPalette();
    updateSidebarMeta();
    return;
  }

  renderActiveView();
}

function toggleCurrentFlag(questionIndex = state.currentIndex) {
  const question = state.currentQuestions[questionIndex];
  if (!question) {
    return;
  }
  state.currentIndex = questionIndex;
  state.flags[question.id] = !state.flags[question.id];

  if (state.navigationMode === "scroll") {
    refreshQuestionCard(questionIndex);
    renderQuestionPalette();
    updateSidebarMeta();
    return;
  }

  renderActiveView();
}

function refreshQuestionCard(questionIndex) {
  if (state.navigationMode !== "scroll") {
    return;
  }

  const question = state.currentQuestions[questionIndex];
  const card = document.getElementById(getQuestionAnchorId(question));
  if (!card) {
    return;
  }

  card.outerHTML = buildScrollQuestionMarkup(question, questionIndex);
}

function renderQuestionPalette() {
  elements.questionPalette.innerHTML = state.currentQuestions
    .map((question, index) =>
      buildPaletteButton(question, index, {
        current: state.currentIndex === index,
        review: false,
      }),
    )
    .join("");
}

function buildPaletteButton(question, index, options) {
  const selectedAnswer = state.answers[question.id] || null;
  let statusClass = "notyetanswered";
  if (options.review || state.mode === "practice") {
    if (selectedAnswer) {
      statusClass =
        selectedAnswer === question.correctAnswer ? "correct" : "incorrect";
    }
  } else if (selectedAnswer) {
    statusClass = "answersaved";
  }
  const statusLabel =
    {
      correct: t("stateCorrect"),
      incorrect: t("stateIncorrect"),
      answersaved: t("stateSaved"),
      notyetanswered: t("stateBlank"),
      partiallycorrect: t("stateBlank"),
    }[statusClass] || t("stateBlank");

  return `
    <button
      type="button"
      class="qnbutton ${statusClass}${options.current ? " thispage" : ""}${state.flags[question.id] ? " flagged" : ""}"
      data-index="${index}"
      aria-label="${escapeHtml(t("questionJumpLabel", { number: index + 1, status: statusLabel }))}"
      ${options.current ? 'aria-current="true"' : ""}
    >
      <span class="thispageholder"></span>
      <span>${index + 1}</span>
      <span class="trafficlight"></span>
    </button>
  `;
}

function handlePaletteClick(event) {
  const button = event.target.closest("[data-index]");
  if (!button) {
    return;
  }
  state.currentIndex = Number(button.dataset.index);
  if (state.navigationMode === "scroll") {
    renderQuestionPalette();
    updateSidebarMeta();
    scrollToQuestion(state.currentIndex);
    return;
  }
  renderActiveView();
}

function scrollToQuestion(questionIndex, behavior = "smooth") {
  const question = state.currentQuestions[questionIndex];
  const anchor = question
    ? document.getElementById(getQuestionAnchorId(question))
    : null;
  if (anchor) {
    anchor.scrollIntoView({ behavior, block: "start" });
  }
}

function startTimer() {
  clearTimer();
  state.timerId = window.setInterval(() => {
    state.remainingSeconds -= 1;
    elements.timerValue.textContent = formatTime(state.remainingSeconds);
    if (state.remainingSeconds <= 0) {
      submitSession();
    }
  }, 1000);
}

function clearTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function submitSession() {
  if (state.submitted) {
    return;
  }

  state.submitted = true;
  clearTimer();
  state.resultSnapshot = buildResultSnapshot();
  state.reviewFilter = "all";
  elements.quizWorkspace.classList.add("hidden");
  elements.resultWorkspace.classList.remove("hidden");
  setWorkspaceMode("result");
  renderResults(state.resultSnapshot);
  window.scrollTo({ top: 0, behavior: "smooth" });
  void saveAttemptSnapshot(state.resultSnapshot);
}

async function saveAttemptSnapshot(snapshot) {
  if (!snapshot || !state.questionBank) {
    return;
  }

  const payload = {
    bankId: state.questionBank.id,
    bankName: state.questionBank.name,
    mode: state.mode === "practice" ? "practice" : "exam",
    score: snapshot.score,
    correct: snapshot.correct,
    wrong: snapshot.wrong,
    blank: snapshot.blank,
    total: snapshot.details.length,
    durationSeconds: getSessionDurationSeconds() - state.remainingSeconds,
    submittedAt: Date.now(),
    details: snapshot.details,
  };

  try {
    const savedAttempt = await saveAttemptHistoryToApi(payload);
    state.attemptHistory = [savedAttempt, ...state.attemptHistory]
      .sort((left, right) => right.submittedAt - left.submittedAt)
      .slice(0, 500);
    const storedState = loadStoredAppState();
    storedState.attemptHistory = mergeAttemptHistoryForBank(
      storedState.attemptHistory,
      state.questionBank.id,
      state.attemptHistory,
    );
    saveStoredAppState(storedState);
  } catch (error) {
    const fallbackAttempt = normalizeAttemptHistoryItem(payload);
    const storedState = loadStoredAppState();
    const nextHistory = [fallbackAttempt, ...storedState.attemptHistory]
      .sort((left, right) => right.submittedAt - left.submittedAt)
      .slice(0, 500);
    storedState.attemptHistory = nextHistory;
    saveStoredAppState(storedState);
    state.attemptHistory = nextHistory.filter(
      (item) => item.bankId === state.questionBank.id,
    );
  }

  renderAttemptHistory();
}

function buildResultSnapshot() {
  const details = state.currentQuestions.map((question) => {
    const selected = state.answers[question.id] || null;
    return {
      ...question,
      selected,
      isCorrect: selected === question.correctAnswer,
      isBlank: selected === null,
    };
  });

  const correct = details.filter((item) => item.isCorrect).length;
  const blank = details.filter((item) => item.isBlank).length;
  return {
    details,
    correct,
    blank,
    wrong: details.length - correct - blank,
    score: details.length ? Math.round((correct / details.length) * 100) : 0,
  };
}

function isResultDetailVisible(item) {
  if (state.reviewFilter === "correct") {
    return item.isCorrect;
  }
  if (state.reviewFilter === "wrong") {
    return !item.isCorrect && !item.isBlank;
  }
  if (state.reviewFilter === "blank") {
    return item.isBlank;
  }
  return true;
}

function renderResultFilterState() {
  if (!elements.resultFilters) {
    return;
  }

  elements.resultFilters
    .querySelectorAll("[data-result-filter]")
    .forEach((button) => {
      const isActive = button.dataset.resultFilter === state.reviewFilter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
}

function renderResults(snapshot) {
  elements.scoreValue.textContent = `${snapshot.score}%`;
  elements.correctValue.textContent = String(snapshot.correct);
  elements.wrongValue.textContent = String(snapshot.wrong);
  elements.blankValue.textContent = String(snapshot.blank);
  renderResultFilterState();

  const visibleEntries = snapshot.details
    .map((item, index) => ({ item, index }))
    .filter((entry) => isResultDetailVisible(entry.item));

  if (!visibleEntries.length) {
    elements.reviewList.innerHTML = `<p class="review-list__empty">${escapeHtml(t("resultFilterEmpty"))}</p>`;
  } else {
    elements.reviewList.innerHTML = visibleEntries
      .map(
        ({ item, index }) => `
          <div id="review-question-${item.id}">
            ${buildQuestionMarkup(item, index, {
              selectedAnswer: item.selected,
              showEvaluation: true,
              interactive: false,
              flagged: Boolean(state.flags[item.id]),
            })}
          </div>
        `,
      )
      .join("");
  }

  elements.reviewPalette.innerHTML = visibleEntries
    .map(({ item, index }) =>
      buildPaletteButton(item, index, { current: false, review: true }),
    )
    .join("");

  const retryDisabled = snapshot.details.every((item) => item.isCorrect);
  elements.retryWrongBtn.disabled = retryDisabled;
  elements.reviewRetryWrongBtn.disabled = retryDisabled;
  elements.retryWrongBtn.title = retryDisabled ? t("noWrongQuestions") : "";
  elements.reviewRetryWrongBtn.title = retryDisabled
    ? t("noWrongQuestions")
    : "";
}

function handleResultFilterClick(event) {
  const button = event.target.closest("[data-result-filter]");
  if (!button || !state.resultSnapshot) {
    return;
  }

  const nextFilter = String(button.dataset.resultFilter || "all");
  if (!["all", "correct", "wrong", "blank"].includes(nextFilter)) {
    return;
  }

  state.reviewFilter = nextFilter;
  renderResults(state.resultSnapshot);
}

function handleReviewPaletteClick(event) {
  const button = event.target.closest("[data-index]");
  if (!button || !state.resultSnapshot) {
    return;
  }

  const target = state.resultSnapshot.details[Number(button.dataset.index)];
  const element = target
    ? document.getElementById(`review-question-${target.id}`)
    : null;
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function retryWrongAnswers() {
  if (!state.resultSnapshot) {
    return;
  }
  const wrongQuestions = state.resultSnapshot.details
    .filter((item) => !item.isCorrect)
    .map((item) => state.questions.find((question) => question.id === item.id))
    .filter(Boolean);
  if (wrongQuestions.length) {
    startSession("practice", wrongQuestions);
  }
}

function goToPreviousQuestion() {
  if (state.navigationMode === "scroll") {
    return;
  }

  if (state.navigationMode === "paged") {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderActiveView();
    }
    return;
  }

  const { start, pageSize } = getCurrentChunkRange();
  if (start > 0) {
    state.currentIndex = Math.max(0, start - pageSize);
    renderActiveView();
  }
}

function goToNextQuestion() {
  if (state.navigationMode === "scroll") {
    return;
  }

  if (state.navigationMode === "paged") {
    if (state.currentIndex < state.currentQuestions.length - 1) {
      state.currentIndex += 1;
      renderActiveView();
    }
    return;
  }

  const { start, pageSize } = getCurrentChunkRange();
  const nextStart = start + pageSize;
  if (nextStart < state.currentQuestions.length) {
    state.currentIndex = nextStart;
    renderActiveView();
  }
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0);
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const seconds = String(safeSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function handleImportFileSelection() {
  const file = elements.importFileInput.files?.[0];
  elements.importFileName.textContent = file?.name || t("noFileSelected");
  if (!file) {
    setImportStatus("idle", "importIdle");
    return;
  }
  if (file.name.toLowerCase().endsWith(".doc")) {
    setImportStatus("warning", "importDocUnsupported");
    return;
  }
  setImportStatus("info", "importReady", { fileName: file.name });
}

async function handleImportReplace() {
  const file = elements.importFileInput.files?.[0];
  if (!file) {
    setImportStatus("warning", "importNoFile");
    return;
  }
  if (file.name.toLowerCase().endsWith(".doc")) {
    setImportStatus("warning", "importDocUnsupported");
    return;
  }

  setImportBusy(true);
  setImportStatus("info", "importReading", { fileName: file.name });

  try {
    const importedBank = await importQuestionBankFromDocx(file, {
      keepSectionHeadings: Boolean(
        elements.importKeepChapterTopicsInput?.checked,
      ),
    });
    const activeBank = await persistQuestionBank(importedBank);
    applyQuestionBank(activeBank);
    await refreshHomeTrackingData();
    resetToHome();
    setImportStatus("success", "importSuccess", {
      count: activeBank.questions.length,
      fileName: file.name,
    });
  } catch (error) {
    setImportStatusText("error", error.message || t("importInvalidArchive"));
  } finally {
    setImportBusy(false);
  }
}

async function restoreSampleBank() {
  elements.importFileInput.value = "";
  elements.importFileName.textContent = t("noFileSelected");
  applyQuestionBank(await restoreQuestionBank());
  await refreshHomeTrackingData();
  resetToHome();
  setImportStatus("success", "importRestored");
}

async function handleApplySelectedBank() {
  const bankId = elements.bankSelector.value;
  if (!bankId) {
    return;
  }

  setImportBusy(true);
  try {
    let activeBank = null;
    try {
      activeBank = await selectQuestionBankFromApi(bankId);
      saveStoredBank(activeBank);
      const storedState = loadStoredAppState();
      storedState.currentBankId = activeBank.id;
      saveStoredAppState(storedState);
    } catch (error) {
      const fallbackBank = state.questionBanks.find(
        (item) => item.id === bankId,
      );
      activeBank = fallbackBank || state.questionBank;
      if (activeBank) {
        const storedState = loadStoredAppState();
        storedState.currentBankId = activeBank.id;
        saveStoredAppState(storedState);
      }
    }

    if (!activeBank) {
      return;
    }

    applyQuestionBank(activeBank);
    await refreshHomeTrackingData();
    resetToHome();
    setImportStatus("success", "bankSelected", {
      name: getBankDisplayName(activeBank) || activeBank.id,
    });
  } finally {
    setImportBusy(false);
  }
}

async function handleDeleteSelectedBank() {
  const bankId = elements.bankSelector.value;
  if (!bankId) {
    return;
  }

  const targetBank = state.questionBanks.find((item) => item.id === bankId);
  if (!targetBank || targetBank.source === "sample") {
    setImportStatus("warning", "cannotDeleteSample");
    return;
  }

  const targetName = getBankDisplayName(targetBank) || targetBank.id;
  const confirmed = window.confirm(
    t("deleteBankConfirm", { name: targetName }),
  );
  if (!confirmed) {
    return;
  }

  setImportBusy(true);
  try {
    try {
      const payload = await deleteQuestionBankFromApi(bankId);
      state.questionBanks = payload.questionBanks;
      const nextBank =
        payload.questionBanks.find(
          (item) => item.id === payload.currentBankId,
        ) || payload.questionBanks[0];
      if (nextBank) {
        applyQuestionBank(nextBank);
      }

      const storedState = loadStoredAppState();
      storedState.uploadedBanks = payload.questionBanks.filter(
        (item) => item.id !== "sample-html-40",
      );
      storedState.currentBankId = payload.currentBankId || "sample-html-40";
      storedState.attemptHistory = storedState.attemptHistory.filter(
        (item) => item.bankId !== bankId,
      );
      saveStoredAppState(storedState);
    } catch (error) {
      state.questionBanks = state.questionBanks.filter(
        (item) => item.id !== bankId,
      );
      if (state.questionBank?.id === bankId) {
        const fallback = state.questionBanks[0];
        if (fallback) {
          applyQuestionBank(fallback);
        }
      }

      const storedState = loadStoredAppState();
      storedState.uploadedBanks = storedState.uploadedBanks.filter(
        (item) => item.id !== bankId,
      );
      storedState.attemptHistory = storedState.attemptHistory.filter(
        (item) => item.bankId !== bankId,
      );
      if (storedState.currentBankId === bankId) {
        storedState.currentBankId = "sample-html-40";
      }
      saveStoredAppState(storedState);
    }

    await refreshHomeTrackingData();
    resetToHome();
    setImportStatus("success", "bankDeleted");
    renderBankSelector();
    renderAttemptHistory();
  } finally {
    setImportBusy(false);
  }
}

function setImportBusy(isBusy) {
  elements.importReplaceBtn.disabled = isBusy;
  elements.restoreSampleBtn.disabled = isBusy;
  elements.importFileInput.disabled = isBusy;
  elements.importKeepChapterTopicsInput.disabled = isBusy;
  elements.applyBankBtn.disabled = isBusy;
  elements.deleteBankBtn.disabled = isBusy;
  elements.bankSelector.disabled = isBusy;
}

async function importQuestionBankFromDocx(file, options = {}) {
  if (typeof DecompressionStream === "undefined") {
    throw new Error(t("importBrowserUnsupported"));
  }

  const arrayBuffer = await file.arrayBuffer();

  let documentXml = "";
  try {
    documentXml = await extractZipEntry(
      arrayBuffer,
      "word/document.xml",
      "text",
    );
  } catch (error) {
    throw new Error(t("importInvalidArchive"));
  }

  if (!documentXml) {
    throw new Error(t("importMissingDocument"));
  }

  const xmlDocument = new DOMParser().parseFromString(
    documentXml,
    "application/xml",
  );
  if (xmlDocument.querySelector("parsererror")) {
    throw new Error(t("importInvalidArchive"));
  }

  const imageMap = await loadDocxImageMap(arrayBuffer);

  const tableRecords = extractQuestionRecordsFromTables(xmlDocument, imageMap);
  const template4Records = extractTemplate4QuestionRecords(
    xmlDocument,
    imageMap,
    options,
  );
  const rawRecords = tableRecords.length
    ? tableRecords
    : template4Records.length
      ? template4Records
      : extractHighlightedQuestionRecords(xmlDocument, imageMap, options);
  const records = applyAnswerKeyToRecords(rawRecords, xmlDocument);
  if (!records.length) {
    const lines = extractDocxContentLines(xmlDocument, imageMap).map((line) =>
      stripRichMarkers(line.text),
    );
    throw new Error(
      t("importNoQuestionsDetailed", {
        questions: lines.filter(isTemplate4QuestionStart).length,
        options: lines.filter(isTemplate4OptionLine).length,
        answers: lines.filter(isTemplate4AnswerLine).length,
        tables: getElementsByLocalName(xmlDocument, "tbl").length,
      }),
    );
  }

  const questions = [];
  const errors = [];
  records.forEach((record, index) => {
    try {
      questions.push(buildImportedQuestion(record, index));
    } catch (error) {
      errors.push(error.message);
    }
  });

  if (!questions.length) {
    throw new Error(errors[0] || t("importNoQuestions"));
  }
  if (errors.length) {
    throw new Error(
      t("importPartialErrors", { details: errors.slice(0, 4).join("\n") }),
    );
  }

  const baseName = file.name.replace(/\.[^.]+$/, "");
  return normalizeQuestionBank({
    id: `imported-${Date.now()}`,
    source: "imported",
    fileName: file.name,
    name: {
      vi: t("importedBankName", { fileName: baseName }),
      en: TEXT.en.importedBankName.replace("{fileName}", baseName),
    },
    questions,
  });
}

async function extractZipEntry(arrayBuffer, entryName, outputType = "text") {
  const bytes = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  const decoder = new TextDecoder("utf-8");
  const searchStart = Math.max(0, bytes.length - 65557);
  let eocdOffset = -1;

  for (let offset = bytes.length - 22; offset >= searchStart; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      eocdOffset = offset;
      break;
    }
  }
  if (eocdOffset === -1) {
    throw new Error("EOCD not found");
  }

  const entryCount = view.getUint16(eocdOffset + 10, true);
  let pointer = view.getUint32(eocdOffset + 16, true);

  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(pointer, true) !== 0x02014b50) {
      throw new Error("Invalid central directory");
    }

    const compressionMethod = view.getUint16(pointer + 10, true);
    const compressedSize = view.getUint32(pointer + 20, true);
    const fileNameLength = view.getUint16(pointer + 28, true);
    const extraFieldLength = view.getUint16(pointer + 30, true);
    const fileCommentLength = view.getUint16(pointer + 32, true);
    const localHeaderOffset = view.getUint32(pointer + 42, true);
    const fileName = decoder.decode(
      bytes.slice(pointer + 46, pointer + 46 + fileNameLength),
    );

    if (fileName === entryName) {
      if (view.getUint32(localHeaderOffset, true) !== 0x04034b50) {
        throw new Error("Invalid local header");
      }

      const localNameLength = view.getUint16(localHeaderOffset + 26, true);
      const localExtraLength = view.getUint16(localHeaderOffset + 28, true);
      const dataStart =
        localHeaderOffset + 30 + localNameLength + localExtraLength;
      const compressedBytes = bytes.slice(
        dataStart,
        dataStart + compressedSize,
      );
      const inflatedBytes = await inflateEntry(
        compressionMethod,
        compressedBytes,
      );
      if (outputType === "binary") {
        return inflatedBytes;
      }
      return new TextDecoder("utf-8").decode(inflatedBytes);
    }

    pointer += 46 + fileNameLength + extraFieldLength + fileCommentLength;
  }

  return "";
}

async function loadDocxImageMap(arrayBuffer) {
  const relationshipsXml = await extractZipEntry(
    arrayBuffer,
    "word/_rels/document.xml.rels",
    "text",
  ).catch(() => "");
  const relationships = parseDocxImageRelationships(relationshipsXml);
  const imageMap = new Map();

  for (const [relationshipId, targetPath] of relationships.entries()) {
    try {
      const imageBytes = await readDocxBinaryEntry(arrayBuffer, targetPath);
      if (!imageBytes || !imageBytes.length) {
        continue;
      }
      const mimeType = getDocxImageMimeType(targetPath);
      imageMap.set(
        relationshipId,
        `data:${mimeType};base64,${toBase64(imageBytes)}`,
      );
    } catch (error) {
      // skip missing or unsupported image entries
    }
  }

  return imageMap;
}

function parseDocxImageRelationships(relationshipsXml) {
  const relationshipMap = new Map();
  if (!relationshipsXml) {
    return relationshipMap;
  }

  const xmlDocument = new DOMParser().parseFromString(
    relationshipsXml,
    "application/xml",
  );
  if (xmlDocument.querySelector("parsererror")) {
    return relationshipMap;
  }

  getElementsByLocalName(xmlDocument, "Relationship").forEach((node) => {
    const typeValue = String(
      node.getAttribute("Type") || node.getAttribute("type") || "",
    ).toLowerCase();
    if (!typeValue.includes("/image")) {
      return;
    }

    const relationshipId =
      node.getAttribute("Id") || node.getAttribute("id") || "";
    const targetPath =
      node.getAttribute("Target") || node.getAttribute("target") || "";
    if (!relationshipId || !targetPath) {
      return;
    }

    relationshipMap.set(relationshipId, resolveDocxTargetPath(targetPath));
  });

  return relationshipMap;
}

function resolveDocxTargetPath(targetPath) {
  const normalizedTarget = String(targetPath || "")
    .replace(/\\/g, "/")
    .trim();
  if (!normalizedTarget) {
    return "";
  }

  const strippedTarget = normalizedTarget.replace(/^(?:\.\.\/)+/, "");
  return (
    joinDocxPath("word", strippedTarget) || strippedTarget || normalizedTarget
  );
}

async function readDocxBinaryEntry(arrayBuffer, entryName) {
  const normalizedEntry = String(entryName || "").replace(/\\/g, "/");
  const candidates = [normalizedEntry];
  if (!normalizedEntry.startsWith("word/")) {
    candidates.push(joinDocxPath("word", normalizedEntry));
  }

  for (const candidate of candidates) {
    const bytes = await extractZipEntry(arrayBuffer, candidate, "binary");
    if (bytes && bytes.length) {
      return bytes;
    }
  }

  throw new Error(`Missing DOCX media entry: ${normalizedEntry}`);
}

function getDocxImageMimeType(filePath) {
  const extension = getDocxFileExtension(String(filePath || "")).toLowerCase();
  const mimeTypes = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".bmp": "image/bmp",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
  };
  return mimeTypes[extension] || "image/png";
}

function joinDocxPath(basePath, relativePath) {
  const baseSegments = String(basePath || "")
    .split("/")
    .filter(Boolean);
  const relativeSegments = String(relativePath || "")
    .split("/")
    .filter(Boolean);
  const segments = [...baseSegments];

  relativeSegments.forEach((segment) => {
    if (segment === ".") {
      return;
    }
    if (segment === "..") {
      segments.pop();
      return;
    }
    segments.push(segment);
  });

  return segments.join("/");
}

function getDocxFileExtension(filePath) {
  const normalizedPath = String(filePath || "").replace(/\\/g, "/");
  const fileName = normalizedPath.split("/").pop() || "";
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex) : "";
}

function toBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return window.btoa(binary);
}

async function inflateEntry(compressionMethod, compressedBytes) {
  if (compressionMethod === 0) {
    return compressedBytes;
  }
  if (compressionMethod !== 8) {
    throw new Error("Unsupported compression method");
  }
  const stream = new Blob([compressedBytes])
    .stream()
    .pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function stripDocxImageTokens(value) {
  return String(value ?? "")
    .replace(/\[\[DOCX_IMAGE:[\s\S]+?\]\]/g, "[image]")
    .replace(/\[\[DOCX_COLOR:[^\]]+\]\]|\[\[\/DOCX_COLOR\]\]/g, "")
    .replace(/\[\[DOCX_CODE_LINE\]\][^\n]*/g, "[code]");
}

function extractQuestionRecordsFromTables(xmlDocument, imageMap) {
  const fieldValueRecords = extractQuestionRecordsFromFieldValueTables(
    xmlDocument,
    imageMap,
  );
  if (fieldValueRecords.length) {
    return fieldValueRecords;
  }
  return extractQuestionRecordsFromMatrixTables(xmlDocument, imageMap);
}

function extractQuestionRecordsFromFieldValueTables(xmlDocument, imageMap) {
  return getElementsByLocalName(xmlDocument, "tbl")
    .map((tableNode) => {
      const record = {};
      getDirectChildrenByLocalName(tableNode, "tr").forEach((rowNode) => {
        const cells = getDirectChildrenByLocalName(rowNode, "tc");
        if (cells.length < 2) {
          return;
        }
        const key = normalizeFieldName(extractCellText(cells[0]));
        const value = cells
          .slice(1)
          .map((cell) => extractCellText(cell, imageMap))
          .join(" ")
          .trim();
        if (!key || !value) {
          return;
        }
        record[key] = record[key] ? `${record[key]}\n${value}` : value;
      });
      return record;
    })
    .filter(
      (record) =>
        Object.keys(record).length &&
        (pickField(record, FIELD_ALIASES.question) ||
          pickField(record, FIELD_ALIASES.correctAnswer)),
    );
}

function extractQuestionRecordsFromMatrixTables(xmlDocument, imageMap) {
  const records = [];

  getElementsByLocalName(xmlDocument, "tbl").forEach((tableNode) => {
    const rowNodes = getDirectChildrenByLocalName(tableNode, "tr");
    if (rowNodes.length < 2) {
      return;
    }

    const headerCells = getDirectChildrenByLocalName(rowNodes[0], "tc").map(
      (cellNode) => extractCellText(cellNode, imageMap),
    );
    const semanticHeaders = headerCells.map(resolveMatrixColumnSemantic);
    const recognizedHeaders = semanticHeaders.filter(Boolean).length;
    const hasQuestionColumn =
      semanticHeaders.includes("question") ||
      semanticHeaders.includes("questionVi") ||
      semanticHeaders.includes("questionEn");
    const hasCorrectAnswerColumn = semanticHeaders.includes("correctAnswer");

    if (
      recognizedHeaders < 4 ||
      !hasQuestionColumn ||
      !hasCorrectAnswerColumn
    ) {
      return;
    }

    rowNodes.slice(1).forEach((rowNode) => {
      const rowCells = getDirectChildrenByLocalName(rowNode, "tc");
      if (!rowCells.length) {
        return;
      }

      const record = {};
      rowCells.forEach((cellNode, cellIndex) => {
        const semantic = semanticHeaders[cellIndex];
        if (!semantic) {
          return;
        }
        const value = extractCellText(cellNode, imageMap);
        setRecordFieldBySemantic(record, semantic, value);
      });

      if (!Object.keys(record).length) {
        return;
      }

      const hasQuestion =
        pickField(record, FIELD_ALIASES.question) ||
        pickField(record, FIELD_ALIASES.questionVi) ||
        pickField(record, FIELD_ALIASES.questionEn);
      const hasCorrect = pickField(record, FIELD_ALIASES.correctAnswer);
      if (hasQuestion && hasCorrect) {
        records.push(record);
      }
    });
  });

  return records;
}

function resolveMatrixColumnSemantic(headerText) {
  const normalizedHeader = normalizeFieldName(headerText);
  if (!normalizedHeader) {
    return "";
  }

  for (const [semanticKey, aliases] of Object.entries(
    TEMPLATE_COLUMN_ALIASES,
  )) {
    if (
      aliases.some((alias) => normalizeFieldName(alias) === normalizedHeader)
    ) {
      return semanticKey;
    }
  }

  const optionMatch = normalizedHeader.match(
    /^(?:(?:option|answer|lua chon|dap an)\s*)?([a-z])(?:\s+(vi|vn|en|english))?$/i,
  );
  if (optionMatch) {
    const optionKey = optionMatch[1].toUpperCase();
    const localeToken = optionMatch[2] ? optionMatch[2].toLowerCase() : "";
    if (localeToken === "vi" || localeToken === "vn") {
      return `option_${optionKey}_vi`;
    }
    if (localeToken === "en" || localeToken === "english") {
      return `option_${optionKey}_en`;
    }
    return `option_${optionKey}`;
  }

  return "";
}

function setRecordFieldBySemantic(record, semantic, value) {
  const richTextSemantics = new Set([
    "question",
    "questionVi",
    "questionEn",
    "explanation",
    "explanationVi",
    "explanationEn",
  ]);
  const text = richTextSemantics.has(semantic)
    ? normalizeDisplayText(value)
    : toText(value);
  if (!text) {
    return;
  }

  const keyMap = {
    number: "question number",
    type: "question type",
    question: "question text",
    questionVi: "question text vi",
    questionEn: "question text en",
    correctAnswer: "correct answer",
    explanation: "explanation",
    explanationVi: "explanation vi",
    explanationEn: "explanation en",
    topic: "topic",
    difficulty: "difficulty",
  };

  if (keyMap[semantic]) {
    record[normalizeFieldName(keyMap[semantic])] = text;
    return;
  }

  const optionMatch = semantic.match(/^option_([A-Z])(?:_(vi|en))?$/);
  if (!optionMatch) {
    return;
  }

  const optionKey = optionMatch[1].toLowerCase();
  const locale = optionMatch[2] || "";
  const fieldName = locale
    ? `option ${optionKey} ${locale}`
    : `option ${optionKey}`;
  record[normalizeFieldName(fieldName)] = normalizeDisplayText(value);
}

async function handleClearStorage() {
  if (!window.confirm(t("clearStorageConfirm"))) return;
  try {
    await requestQuestionBankApi("/app-data", { method: "DELETE" });
    window.localStorage.clear();
    window.location.reload();
  } catch (error) {
    window.alert(t("clearStorageError"));
  }
}

function extractDocxContentLines(xmlDocument, imageMap) {
  const bodyNode = getElementsByLocalName(xmlDocument, "body")[0];
  if (!bodyNode) return [];

  return Array.from(bodyNode.children).flatMap((node) => {
    if (node.localName === "p") {
      return extractParagraphLines(node, imageMap);
    }
    if (node.localName !== "tbl") return [];

    const rows = getDirectChildrenByLocalName(node, "tr")
      .map((rowNode) =>
        getDirectChildrenByLocalName(rowNode, "tc").map((cellNode) =>
          normalizeDisplayText(extractCellText(cellNode, imageMap)),
        ),
      )
      .filter((row) => row.some(Boolean));
    if (!rows.length) return [];

    return [
      {
        text: `${DOCX_TABLE_TOKEN_PREFIX}${encodeURIComponent(JSON.stringify(rows))}${DOCX_TABLE_TOKEN_SUFFIX}`,
        highlighted: false,
      },
    ];
  });
}

function extractTemplate4QuestionRecords(xmlDocument, imageMap, options = {}) {
  const lines = extractDocxContentLines(xmlDocument, imageMap)
    .map((line) => ({
      rawText: normalizeRichText(line.text),
      text: stripRichMarkers(line.text),
      highlighted: Boolean(line.highlighted),
    }))
    .filter((line) => line.text);

  const questionSignalCount = lines.filter((line) =>
    isTemplate4QuestionStart(line.text),
  ).length;
  const optionSignalCount = lines.filter((line) =>
    isTemplate4OptionLine(line.text),
  ).length;
  const answerSignalCount = lines.filter(
    (line) =>
      isTemplate4AnswerLine(line.text) ||
      (isTemplate4OptionLine(line.text) &&
        (line.highlighted || isStronglyEmphasizedOptionLine(line.rawText))),
  ).length;

  if (
    !questionSignalCount ||
    optionSignalCount < Math.max(2, questionSignalCount) ||
    !answerSignalCount
  ) {
    return [];
  }

  return extractTaggedQuestionRecords(xmlDocument, imageMap, options);
}

function isTemplate4QuestionStart(lineText) {
  return /^(?:question|q|cau hoi|câu hỏi|cau|câu)\s*\d+(?:\s*\([^)]*\))?\s*(?:[:.)-]|$)/i.test(
    lineText,
  );
}

function isTemplate4OptionLine(lineText) {
  return Boolean(matchOptionLead(lineText));
}

function isTemplate4AnswerLine(lineText) {
  return /^(?:correct\s*answer|answer(?:\s+shown\s+in\s+the\s+source)?|dap an(?:\s+dung|\s+trong\s+nguon)?|đáp án(?:\s+đúng|\s+trong\s+nguồn)?)\s*[:\-]\s*(.+)$/i.test(
    lineText,
  );
}

function extractTaggedQuestionRecords(xmlDocument, imageMap, options = {}) {
  const lines = extractDocxContentLines(xmlDocument, imageMap)
    .map((line) => ({
      rawText: normalizeRichText(line.text),
      text: stripRichMarkers(line.text),
      highlighted: Boolean(line.highlighted),
    }))
    .filter((line) => line.text);

  const records = [];
  let current = null;
  let lastOption = "";
  let activeField = "question";
  let currentSectionHeading = "";

  for (const line of lines) {
    if (isDocxAppendixMarker(line.text)) {
      if (current && current.question && Object.keys(current.options).length) {
        records.push(current);
      }
      break;
    }

    if (isDocxSectionHeading(line.text)) {
      currentSectionHeading = toText(line.text);
      lastOption = "";
      activeField = "";
      continue;
    }

    const questionStart =
      line.text.match(
        /^(?:question|q|cau hoi|câu hỏi|cau|câu)\s*(\d+)\s*[:.)-]?\s*(.*)$/i,
      ) ||
      line.text.match(/^(\d+)\s*[.)-]\s*(.+)$/);
    if (questionStart) {
      if (current && current.question && Object.keys(current.options).length) {
        records.push(current);
      }
      current = {
        number: questionStart[1],
        type: "single_choice",
        question: extractQuestionTailRichText(line.rawText, questionStart[2]),
        options: {},
        correctAnswer: "",
        explanation: "",
        topic: options.keepSectionHeadings ? currentSectionHeading : "",
        difficulty: "",
      };
      lastOption = "";
      activeField = "question";
      continue;
    }

    if (!current) {
      continue;
    }

    const answerLine = line.text.match(
      /^(?:correct\s*answer|answer(?:\s+shown\s+in\s+the\s+source)?|dap an(?:\s+dung|\s+trong\s+nguon)?|đáp án(?:\s+đúng|\s+trong\s+nguồn)?)\s*[:\-]\s*(.+)$/i,
    );
    if (answerLine) {
      current.correctAnswer =
        resolveCorrectAnswer(answerLine[1], current.options) ||
        toText(answerLine[1]);
      lastOption = "";
      activeField = "";
      continue;
    }

    const typeLine = line.text.match(
      /^(?:question\s*type|type|loai cau hoi|loại câu hỏi)\s*[:\-]\s*(.+)$/i,
    );
    if (typeLine) {
      current.type = normalizeComparableText(typeLine[1]) || "single_choice";
      lastOption = "";
      activeField = "";
      continue;
    }

    const questionLine = line.text.match(
      /^(?:question\s*text|question|noi dung cau hoi|nội dung câu hỏi|cau hoi|câu hỏi)\s*[:\-]\s*(.+)$/i,
    );
    if (questionLine) {
      current.question = extractLabeledTailRichText(
        line.rawText,
        /^(?:question\s*text|question|noi dung cau hoi|nội dung câu hỏi|cau hoi|câu hỏi)\s*[:\-]\s*/i,
        questionLine[1],
      );
      lastOption = "";
      activeField = "question";
      continue;
    }

    const explanationLine = line.text.match(
      /^(?:explanation|giai thich|giải thích|loi giai|lời giải)\s*[:\-]?\s*(.*)$/i,
    );
    if (explanationLine) {
      current.explanation = explanationLine[1]
        ? toText(explanationLine[1])
        : current.explanation;
      lastOption = "";
      activeField = "explanation";
      continue;
    }

    if (activeField === "explanation") {
      current.explanation = appendImportText(current.explanation, line.rawText);
      continue;
    }

    const topicLine = line.text.match(
      /^(?:topic|chu de|chủ đề)\s*[:\-]\s*(.+)$/i,
    );
    if (topicLine) {
      current.topic = toText(topicLine[1]);
      lastOption = "";
      activeField = "topic";
      continue;
    }

    const difficultyLine = line.text.match(
      /^(?:difficulty|do kho|độ khó)\s*[:\-]\s*(.+)$/i,
    );
    if (difficultyLine) {
      current.difficulty = toText(difficultyLine[1]);
      lastOption = "";
      activeField = "difficulty";
      continue;
    }

    const optionLine = matchOptionLead(line.text);
    if (optionLine) {
      const optionKey = optionLine.key;
      const optionText = optionLine.tail.trim();
      current.options[optionKey] = optionText
        ? extractLabeledTailRichText(
            line.rawText,
            /^(?:option|answer|lua chon|lựa chọn|dap an|đáp án)?\s*[A-Z]\s*[:.)-]\s*/i,
            optionText,
          )
        : "";
      current.options[optionKey] = stripBoldFormatting(
        current.options[optionKey],
      );
      if (line.highlighted || isStronglyEmphasizedOptionLine(line.rawText)) {
        current.correctAnswer = optionKey;
      }
      lastOption = optionKey;
      activeField = `option:${optionKey}`;
      continue;
    }

    if (activeField === "topic") {
      current.topic = appendImportText(current.topic, line.text);
      continue;
    }

    if (activeField === "difficulty") {
      current.difficulty = appendImportText(current.difficulty, line.text);
      continue;
    }

    if (lastOption) {
      current.options[lastOption] = appendImportText(
        current.options[lastOption],
        line.rawText,
      );
      if (line.highlighted) {
        current.correctAnswer = lastOption;
      }
      activeField = `option:${lastOption}`;
      continue;
    }

    current.question = appendImportText(current.question, line.rawText);
    activeField = "question";
  }

  if (current && current.question && Object.keys(current.options).length) {
    records.push(current);
  }

  return records;
}

function extractHighlightedQuestionRecords(
  xmlDocument,
  imageMap,
  options = {},
) {
  const lines = extractDocxContentLines(xmlDocument, imageMap)
    .map((line) => ({
      rawText: normalizeRichText(line.text),
      text: stripRichMarkers(line.text),
      highlighted: Boolean(line.highlighted),
    }))
    .filter((line) => line.text);

  const records = [];
  let current = null;
  let lastOption = "";
  let activeField = "question";
  let currentSectionHeading = "";

  for (const line of lines) {
    if (isDocxAppendixMarker(line.text)) {
      if (current?.question) {
        records.push(current);
      }
      break;
    }

    if (isDocxSectionHeading(line.text)) {
      currentSectionHeading = toText(line.text);
      lastOption = "";
      activeField = "";
      continue;
    }

    const questionMatch =
      line.text.match(/^(?:Question\s+)?(\d+)[.)]\s*(.+)$/i) ||
      line.text.match(/^(?:Câu\s+)?(\d+)\s*[:.)-]\s*(.+)$/i);
    if (questionMatch) {
      if (current?.question) {
        records.push(current);
      }
      current = {
        number: questionMatch[1],
        type: "single_choice",
        question: extractQuestionTailRichText(line.rawText, questionMatch[2]),
        options: {},
        correctAnswer: "",
        explanation: "",
        topic: options.keepSectionHeadings ? currentSectionHeading : "",
      };
      lastOption = "";
      activeField = "question";
      continue;
    }

    if (!current) {
      continue;
    }

    const correctAnswerMatch = line.text.match(
      /^(?:correct\s*answer|answer(?:\s+shown\s+in\s+the\s+source)?|dap an(?:\s+dung|\s+trong\s+nguon)?|đáp án(?:\s+đúng|\s+trong\s+nguồn)?)\s*:\s*([A-D])\b/i,
    );
    if (correctAnswerMatch) {
      current.correctAnswer = correctAnswerMatch[1].toUpperCase();
      lastOption = "";
      activeField = "";
      continue;
    }

    const explanationLine = line.text.match(
      /^(?:explanation|giai thich|giải thích|loi giai|lời giải)\s*[:\-]?\s*(.*)$/i,
    );
    if (explanationLine) {
      current.explanation = explanationLine[1]
        ? toText(explanationLine[1])
        : current.explanation;
      lastOption = "";
      activeField = "explanation";
      continue;
    }

    if (activeField === "explanation") {
      current.explanation = appendImportText(current.explanation, line.rawText);
      continue;
    }

    const optionMatch = matchOptionLead(line.text);
    if (optionMatch) {
      lastOption = optionMatch.key;
      const optionText = optionMatch.tail.trim();
      current.options[lastOption] = optionText
        ? extractLabeledTailRichText(
            line.rawText,
            /^(?:option|answer|lua chon|lựa chọn|dap an|đáp án)?\s*[A-Z]\s*[:.)-]\s*/i,
            optionText,
          )
        : "";
      current.options[lastOption] = stripBoldFormatting(
        current.options[lastOption],
      );
      if (line.highlighted || isStronglyEmphasizedOptionLine(line.rawText)) {
        current.correctAnswer = lastOption;
      }
      activeField = `option:${lastOption}`;
      continue;
    }

    if (current.correctAnswer && /^Questions?\s+\d+/i.test(line.text)) {
      lastOption = "";
      activeField = "question";
      continue;
    }

    if (lastOption) {
      current.options[lastOption] = appendImportText(
        current.options[lastOption],
        line.rawText,
      );
      if (line.highlighted) {
        current.correctAnswer = lastOption;
      }
      activeField = `option:${lastOption}`;
      continue;
    }

    current.question = appendImportText(current.question, line.rawText);
    activeField = "question";
  }

  if (current?.question) {
    records.push(current);
  }

  return records.filter((record) => Object.keys(record.options).length);
}

function appendImportText(currentValue, nextValue) {
  const currentText = normalizeDisplayText(currentValue);
  const nextText = normalizeDisplayText(nextValue);
  if (!nextText) {
    return currentText;
  }
  return currentText ? `${currentText}\n${nextText}`.trim() : nextText;
}

function isStronglyEmphasizedOptionLine(rawText) {
  const normalizedRaw = normalizeRichText(rawText);
  const plainText = stripRichMarkers(normalizedRaw);
  if (!normalizedRaw || !plainText) {
    return false;
  }

  if (normalizedRaw === `**${plainText}**`) {
    return true;
  }

  const rawTail = normalizedRaw.replace(
    /^(?:\*\*)?(?:option|answer|lua chon|lựa chọn|dap an|đáp án)?\s*[A-Z]\s*[:.)-]\s*(?:\*\*)?\s*/i,
    "",
  );
  return /\*\*[^*][\s\S]*?\*\*/.test(rawTail);
}

function matchOptionLead(lineText) {
  const match = String(lineText ?? "").match(
    /^(?:option|answer|lua chon|lựa chọn|dap an|đáp án)?\s*([A-Z])\s*[:.)-]\s*(.*)$/i,
  );
  if (!match) {
    return null;
  }

  return {
    key: match[1].toUpperCase(),
    tail: match[2] || "",
  };
}

function getWordBreakType(node) {
  return String(node?.getAttribute("w:type") || node?.getAttribute("type") || "")
    .trim()
    .toLowerCase();
}

function isRenderableWordBreak(node) {
  if (!node || node.localName !== "br") {
    return false;
  }

  const breakType = getWordBreakType(node);
  return !breakType || breakType === "textwrapping" || breakType === "line";
}

function hasRenderableRunBreak(runNode) {
  return getElementsByLocalName(runNode, "br").some((node) =>
    isRenderableWordBreak(node),
  );
}

function extractParagraphLines(paragraphNode, imageMap) {
  const lines = [];
  const paragraphIsCode = hasCodeParagraphStyle(paragraphNode);
  let current = { text: "", highlighted: false };

  function pushCurrentLine() {
    if (!current.text.trim()) {
      return;
    }

    const shouldRenderAsCode =
      paragraphIsCode || isLikelyCodeLine(current.text);
    lines.push({
      ...current,
      text: shouldRenderAsCode
        ? `${DOCX_CODE_LINE_TOKEN_PREFIX}${current.text.replace(/[ \t]+$/g, "")}`
        : current.text,
    });
  }

  getDirectChildrenByLocalName(paragraphNode, "r").forEach((runNode) => {
    const hasBreak = hasRenderableRunBreak(runNode);
    const text = extractRunText(runNode, imageMap);
    const highlighted =
      getElementsByLocalName(runNode, "highlight").length > 0 ||
      hasRedRunText(runNode);

    if (hasBreak && current.text.trim()) {
      pushCurrentLine();
      current = { text: "", highlighted: false };
    } else if (hasBreak) {
      current = { text: "", highlighted: false };
    }

    if (text) {
      current.text = `${current.text}${text}`;
      current.highlighted = current.highlighted || highlighted;
    }
  });

  if (current.text.trim()) {
    pushCurrentLine();
  }
  return lines;
}

function hasRedRunText(runNode) {
  return getElementsByLocalName(runNode, "color").some((colorNode) => {
    const colorValue = String(
      colorNode.getAttribute("w:val") || colorNode.getAttribute("val") || "",
    )
      .trim()
      .toUpperCase();

    if (!colorValue || colorValue === "AUTO" || colorValue === "000000") {
      return false;
    }

    return [
      "FF0000",
      "C00000",
      "9C0006",
      "FF00FF",
      "C000FF",
      "FF1493",
    ].includes(colorValue);
  });
}

function getRunTextColor(runNode) {
  const colorValue = String(
    getElementsByLocalName(runNode, "color")[0]?.getAttribute("w:val") ||
      getElementsByLocalName(runNode, "color")[0]?.getAttribute("val") ||
      "",
  )
    .trim()
    .toUpperCase();

  if (
    !/^[0-9A-F]{6}$/.test(colorValue) ||
    colorValue === "000000" ||
    colorValue === "AUTO"
  ) {
    return "";
  }

  return colorValue;
}

function hasCodeParagraphStyle(paragraphNode) {
  const styleNode = getElementsByLocalName(paragraphNode, "pStyle")[0];
  const styleValue = (
    styleNode?.getAttribute("w:val") ||
    styleNode?.getAttribute("val") ||
    ""
  ).toLowerCase();
  return /code/.test(styleValue);
}

function extractRunText(runNode, imageMap) {
  const isBold = getElementsByLocalName(runNode, "b").length > 0;
  const isCode = hasCodeRunText(runNode);
  const textColor = getRunTextColor(runNode);
  const fragments = [];

  function visit(node) {
    if (!node) {
      return;
    }

    if (node.nodeType === 3) {
      const text = node.textContent || "";
      if (text) {
        fragments.push(text);
      }
      return;
    }

    if (node.nodeType !== 1) {
      return;
    }

    const localName = node.localName || "";
    if (localName === "t") {
      const text = node.textContent || "";
      if (text) {
        fragments.push(text);
      }
      return;
    }

    if (localName === "br") {
      if (isRenderableWordBreak(node)) {
        fragments.push("\n");
      }
      return;
    }

    if (localName === "cr") {
      fragments.push("\n");
      return;
    }

    if (localName === "tab") {
      fragments.push("\t");
      return;
    }

    if (localName === "lastRenderedPageBreak") {
      return;
    }

    if (localName === "blip") {
      const relationshipId =
        node.getAttribute("r:embed") || node.getAttribute("embed") || "";
      const source = relationshipId ? imageMap?.get(relationshipId) : "";
      if (source) {
        fragments.push(createDocxImageToken(source));
      }
      return;
    }

    if (localName === "imagedata") {
      const relationshipId =
        node.getAttribute("r:id") || node.getAttribute("id") || "";
      const source = relationshipId ? imageMap?.get(relationshipId) : "";
      if (source) {
        fragments.push(createDocxImageToken(source));
      }
      return;
    }

    Array.from(node.childNodes).forEach(visit);
  }

  Array.from(runNode.childNodes).forEach(visit);

  return fragments
    .map((fragment) => {
      if (fragment.startsWith(DOCX_IMAGE_TOKEN_PREFIX)) {
        return fragment;
      }

      let formatted = fragment;
      if (isCode) {
        formatted = `\`${formatted}\``;
      }
      if (isBold) {
        formatted = `**${formatted}**`;
      }
      if (textColor && formatted.trim()) {
        formatted = createDocxColorToken(textColor, formatted);
      }
      return formatted;
    })
    .join("");
}

function createDocxImageToken(source) {
  return `${DOCX_IMAGE_TOKEN_PREFIX}${source}${DOCX_IMAGE_TOKEN_SUFFIX}`;
}

function createDocxColorToken(color, text) {
  return `${DOCX_COLOR_TOKEN_PREFIX}${color}${DOCX_COLOR_TOKEN_SUFFIX}${text}${DOCX_COLOR_END_TOKEN}`;
}

function applyAnswerKeyToRecords(records, xmlDocument) {
  if (!Array.isArray(records) || !records.length) {
    return [];
  }

  const answerKeyMap = extractAnswerKeyMapFromTables(xmlDocument);
  if (!answerKeyMap.size) {
    return records;
  }

  return records.map((record) => {
    if (record?.correctAnswer) {
      return record;
    }

    const questionNumber =
      record.number || pickField(record, FIELD_ALIASES.number) || "";
    const normalizedNumber = String(questionNumber).trim();
    const mappedAnswer = answerKeyMap.get(normalizedNumber);
    if (!mappedAnswer) {
      return record;
    }

    if (record.options) {
      return { ...record, correctAnswer: mappedAnswer };
    }

    const updatedRecord = { ...record };
    updatedRecord[normalizeFieldName("correct answer")] = mappedAnswer;
    return updatedRecord;
  });
}

function extractAnswerKeyMapFromTables(xmlDocument) {
  const answerKeyMap = new Map();

  getElementsByLocalName(xmlDocument, "tbl").forEach((tableNode) => {
    const rowNodes = getDirectChildrenByLocalName(tableNode, "tr");
    rowNodes.forEach((rowNode) => {
      const cellTexts = getDirectChildrenByLocalName(rowNode, "tc")
        .map(extractCellText)
        .map((value) => toText(value));

      for (let index = 0; index < cellTexts.length - 1; index += 1) {
        const questionText = cellTexts[index];
        const answerText = cellTexts[index + 1];
        if (!/^\d+$/.test(questionText)) {
          continue;
        }

        const answerMatch = answerText.match(/^([A-Z])\b/i);
        if (!answerMatch) {
          continue;
        }

        answerKeyMap.set(questionText, answerMatch[1].toUpperCase());
      }
    });
  });

  return answerKeyMap;
}

function hasCodeRunText(runNode) {
  const rFontsNode = getElementsByLocalName(runNode, "rFonts")[0];
  const fontCandidates = [
    rFontsNode?.getAttribute("w:ascii"),
    rFontsNode?.getAttribute("ascii"),
    rFontsNode?.getAttribute("w:hAnsi"),
    rFontsNode?.getAttribute("hAnsi"),
    rFontsNode?.getAttribute("w:cs"),
    rFontsNode?.getAttribute("cs"),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const styleNode = getElementsByLocalName(runNode, "rStyle")[0];
  const styleValue = (
    styleNode?.getAttribute("w:val") ||
    styleNode?.getAttribute("val") ||
    ""
  ).toLowerCase();

  return (
    /consolas|courier|menlo|monaco|fira\s*code|source\s*code|jetbrains\s*mono/.test(
      fontCandidates,
    ) || /code/.test(styleValue)
  );
}

function normalizeRichText(value) {
  return normalizeDisplayText(value);
}

function stripRichMarkers(value) {
  return normalizeRichText(stripDocxFormattingTokens(value));
}

function extractQuestionTailRichText(rawText, plainTail) {
  return extractLabeledTailRichText(
    rawText,
    /^(?:question|q|cau|câu)?\s*\d+\s*[:.)-]\s*/i,
    plainTail,
  );
}

function extractLabeledTailRichText(rawText, labelPattern, fallbackPlainTail) {
  const rich = normalizeRichText(rawText);
  const richTail = stripDanglingBoldMarkers(
    normalizeRichText(rich.replace(labelPattern, "")),
  );
  if (richTail) {
    return richTail;
  }
  return normalizeDisplayText(fallbackPlainTail);
}

function extractCellText(cellNode, imageMap) {
  return getElementsByLocalName(cellNode, "p")
    .map((paragraph) =>
      extractParagraphLines(paragraph, imageMap)
        .map((line) => line.text)
        .join("\n"),
    )
    .join("\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function getElementsByLocalName(rootNode, localName) {
  return Array.from(rootNode.getElementsByTagName("*")).filter(
    (node) => node.localName === localName,
  );
}

function getDirectChildrenByLocalName(rootNode, localName) {
  return Array.from(rootNode.childNodes).filter(
    (node) => node.nodeType === 1 && node.localName === localName,
  );
}

function pickField(record, aliases) {
  for (const alias of aliases) {
    const value = record[normalizeFieldName(alias)];
    if (value) {
      return value;
    }
  }
  return "";
}

function pickOptionField(record, optionKey, locale) {
  const key = optionKey.toLowerCase();
  const localeTokens =
    locale === "vi" ? ["vi", "vn"] : locale === "en" ? ["en", "english"] : [];
  const aliases = localeTokens.length
    ? localeTokens.flatMap((token) => [
        `option ${key} ${token}`,
        `answer ${key} ${token}`,
        `lựa chọn ${key} ${token}`,
        `đáp án ${key} ${token}`,
      ])
    : [`option ${key}`, `answer ${key}`, `lựa chọn ${key}`, `đáp án ${key}`];

  for (const alias of aliases) {
    const value = record[normalizeFieldName(alias)];
    if (value) {
      return value;
    }
  }
  return "";
}

function buildImportedOptionMap(record, locale) {
  return ["A", "B", "C", "D"].reduce((acc, optionKey) => {
    const value = pickOptionField(record, optionKey, locale);
    if (value) {
      acc[optionKey] = value;
    }
    return acc;
  }, {});
}

function resolveCorrectAnswer(rawAnswer, optionMap) {
  const normalizedAnswer = normalizeComparableText(rawAnswer);
  if (!normalizedAnswer) {
    return "";
  }

  const letterMatch = normalizedAnswer.match(/^([a-z])(?:[^a-z0-9]|$)/i);
  if (letterMatch && optionMap[letterMatch[1].toUpperCase()]) {
    return letterMatch[1].toUpperCase();
  }

  if (optionMap[normalizedAnswer.toUpperCase()]) {
    return normalizedAnswer.toUpperCase();
  }

  const matchedOption = sortOptionEntries(optionMap).find(([, value]) => {
    const optionText = normalizeComparableText(value);
    return (
      optionText === normalizedAnswer || normalizedAnswer.endsWith(optionText)
    );
  });

  return matchedOption ? matchedOption[0] : "";
}

function throwMissingImportedFields(index, fields) {
  throw new Error(
    t("importMissingFields", {
      index: index + 1,
      fields: fields.join(", "),
    }),
  );
}

function buildImportedQuestion(record, index) {
  if (record.question && record.options && record.correctAnswer) {
    const correctAnswer = resolveCorrectAnswer(
      record.correctAnswer,
      record.options,
    );
    if (!correctAnswer) {
      throwMissingImportedFields(index, [t("importCorrectAnswerField")]);
    }
    return {
      id: String(record.number || index + 1),
      number: Number(record.number || index + 1),
      type: record.type || inferQuestionType(record.options),
      question: record.question,
      options: record.options,
      correctAnswer,
      explanation: record.explanation || "",
      topic: record.topic || "",
      difficulty: record.difficulty || "",
    };
  }

  const declaredType =
    normalizeComparableText(pickField(record, FIELD_ALIASES.type)) ||
    "single_choice";
  if (!SUPPORTED_IMPORT_TYPES.has(declaredType)) {
    throw new Error(
      t("importUnsupportedType", { index: index + 1, type: declaredType }),
    );
  }

  const genericQuestion = pickField(record, FIELD_ALIASES.question);
  const viQuestion = pickField(record, FIELD_ALIASES.questionVi);
  const enQuestion = pickField(record, FIELD_ALIASES.questionEn);
  const genericExplanation = pickField(record, FIELD_ALIASES.explanation);
  const viExplanation = pickField(record, FIELD_ALIASES.explanationVi);
  const enExplanation = pickField(record, FIELD_ALIASES.explanationEn);

  const genericOptions = buildImportedOptionMap(record);
  let viOptions = buildImportedOptionMap(record, "vi");
  let enOptions = buildImportedOptionMap(record, "en");

  if (declaredType === "true_false" && !Object.keys(genericOptions).length) {
    Object.assign(genericOptions, { A: "True", B: "False" });
    viOptions = Object.keys(viOptions).length
      ? viOptions
      : { A: "Dung", B: "Sai" };
    enOptions = Object.keys(enOptions).length
      ? enOptions
      : { A: "True", B: "False" };
  }

  const mergedOptions = normalizeOptionMap({
    ...genericOptions,
    ...viOptions,
    ...enOptions,
  });
  const correctAnswer = resolveCorrectAnswer(
    pickField(record, FIELD_ALIASES.correctAnswer),
    mergedOptions,
  );

  if (
    !(genericQuestion || viQuestion || enQuestion) ||
    !Object.keys(mergedOptions).length ||
    !correctAnswer
  ) {
    const missingFields = [];
    if (!(genericQuestion || viQuestion || enQuestion)) {
      missingFields.push(t("importQuestionField"));
    }
    if (!Object.keys(mergedOptions).length) {
      missingFields.push(t("importOptionsField"));
    }
    if (!correctAnswer) {
      missingFields.push(t("importCorrectAnswerField"));
    }
    throwMissingImportedFields(index, missingFields);
  }

  const questionNumber = pickField(record, FIELD_ALIASES.number) || index + 1;
  return {
    id: String(questionNumber),
    number: Number(questionNumber),
    type: declaredType,
    topic: pickField(record, FIELD_ALIASES.topic),
    difficulty: pickField(record, FIELD_ALIASES.difficulty),
    correctAnswer,
    content: {
      vi: {
        question: viQuestion || genericQuestion || enQuestion,
        explanation: viExplanation || genericExplanation || enExplanation,
        options: Object.keys(viOptions).length ? viOptions : mergedOptions,
      },
      en: {
        question: enQuestion || genericQuestion || viQuestion,
        explanation: enExplanation || genericExplanation || viExplanation,
        options: Object.keys(enOptions).length ? enOptions : mergedOptions,
      },
    },
  };
}

document.addEventListener("DOMContentLoaded", () => {
  void bootstrap();
});
