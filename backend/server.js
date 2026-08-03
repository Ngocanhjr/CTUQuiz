const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const {
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
} = require("./src/services/question-bank-service");

const PORT = Number(process.env.PORT) || 3000;
const RESET_QUESTION_BANK_ON_START =
  String(process.env.RESET_QUESTION_BANK_ON_START || "").toLowerCase() ===
  "true";
const FRONTEND_DIR = path.join(__dirname, "..", "frontend");
const MAX_BODY_SIZE = 5 * 1024 * 1024;

const MIME_TYPES = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(response, statusCode, payload) {
  setCorsHeaders(response);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, message) {
  setCorsHeaders(response);
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  response.end(message);
}

function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalLength = 0;

    request.on("data", (chunk) => {
      totalLength += chunk.length;
      if (totalLength > MAX_BODY_SIZE) {
        reject(new Error("Request body is too large."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

async function readJsonBody(request) {
  const rawBody = await getRequestBody(request);
  if (!rawBody) {
    return {};
  }
  return JSON.parse(rawBody);
}

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || "application/octet-stream";
  setCorsHeaders(response);
  response.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(response);
}

function resolveFrontendPath(pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const resolvedPath = path.resolve(FRONTEND_DIR, `.${requestedPath}`);
  if (!resolvedPath.startsWith(FRONTEND_DIR)) {
    return "";
  }
  return resolvedPath;
}

function serveStaticAsset(pathname, response) {
  const filePath = resolveFrontendPath(pathname);
  if (
    !filePath ||
    !fs.existsSync(filePath) ||
    !fs.statSync(filePath).isFile()
  ) {
    return false;
  }

  sendFile(response, filePath);
  return true;
}

async function handleApiRequest(request, response, pathname) {
  if (request.method === "OPTIONS") {
    setCorsHeaders(response);
    response.writeHead(204);
    response.end();
    return true;
  }

  if (request.method === "GET" && pathname === "/api/health") {
    sendJson(response, 200, { status: "ok" });
    return true;
  }

  if (request.method === "GET" && pathname === "/api/question-bank") {
    sendJson(response, 200, { questionBank: getCurrentQuestionBank() });
    return true;
  }

  if (request.method === "GET" && pathname === "/api/question-banks") {
    sendJson(response, 200, getQuestionBankList());
    return true;
  }

  if (request.method === "DELETE" && pathname === "/api/app-data") {
    sendJson(response, 200, clearStoredAppData());
    return true;
  }

  if (request.method === "POST" && pathname === "/api/question-banks/select") {
    try {
      const payload = await readJsonBody(request);
      const questionBank = setCurrentQuestionBank(payload.bankId);
      sendJson(response, 200, { questionBank, ...getQuestionBankList() });
    } catch (error) {
      sendJson(response, 400, {
        message: error.message || "Could not select the question bank.",
      });
    }
    return true;
  }

  if (
    request.method === "DELETE" &&
    pathname.startsWith("/api/question-banks/")
  ) {
    try {
      const bankId = decodeURIComponent(
        pathname.replace("/api/question-banks/", ""),
      );
      const payload = deleteQuestionBank(bankId);
      sendJson(response, 200, payload);
    } catch (error) {
      sendJson(response, 400, {
        message: error.message || "Could not delete the question bank.",
      });
    }
    return true;
  }

  if (
    (request.method === "PUT" || request.method === "POST") &&
    pathname === "/api/question-bank"
  ) {
    try {
      const payload = await readJsonBody(request);
      const questionBank = saveQuestionBank(payload);
      sendJson(response, 200, { questionBank });
    } catch (error) {
      sendJson(response, 400, {
        message: error.message || "Could not save the question bank.",
      });
    }
    return true;
  }

  if (request.method === "POST" && pathname === "/api/question-bank/reset") {
    const questionBank = restoreSampleQuestionBank();
    sendJson(response, 200, { questionBank });
    return true;
  }

  if (request.method === "GET" && pathname === "/api/attempt-history") {
    const requestUrl = new URL(
      request.url || "/",
      `http://${request.headers.host || "localhost"}`,
    );
    sendJson(response, 200, {
      attempts: getAttemptHistory(requestUrl.searchParams.get("bankId") || ""),
    });
    return true;
  }

  if (request.method === "POST" && pathname === "/api/attempt-history") {
    try {
      const payload = await readJsonBody(request);
      const attempt = addAttemptHistory(payload);
      sendJson(response, 200, { attempt });
    } catch (error) {
      sendJson(response, 400, {
        message: error.message || "Could not save attempt history.",
      });
    }
    return true;
  }

  if (request.method === "DELETE" && pathname === "/api/attempt-history") {
    const requestUrl = new URL(
      request.url || "/",
      `http://${request.headers.host || "localhost"}`,
    );
    sendJson(response, 200, {
      attempts: clearAttemptHistory(
        requestUrl.searchParams.get("bankId") || "",
      ),
    });
    return true;
  }

  return false;
}

if (RESET_QUESTION_BANK_ON_START) {
  try {
    restoreSampleQuestionBank();
    console.log("Question bank was reset to sample on startup.");
  } catch (error) {
    console.warn("Could not reset question bank on startup:", error.message);
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const requestUrl = new URL(
      request.url || "/",
      `http://${request.headers.host || "localhost"}`,
    );

    if (requestUrl.pathname.startsWith("/api/")) {
      const handled = await handleApiRequest(
        request,
        response,
        requestUrl.pathname,
      );
      if (!handled) {
        sendText(response, 404, "API route not found.");
      }
      return;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      sendText(response, 405, "Method not allowed.");
      return;
    }

    if (serveStaticAsset(requestUrl.pathname, response)) {
      return;
    }

    const indexPath = path.join(FRONTEND_DIR, "index.html");
    if (fs.existsSync(indexPath)) {
      sendFile(response, indexPath);
      return;
    }

    sendText(response, 404, "Frontend entry file not found.");
  } catch (error) {
    sendJson(response, 500, {
      message: error.message || "Unexpected server error.",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Quiz Exam Studio server is running at http://localhost:${PORT}`);
});
