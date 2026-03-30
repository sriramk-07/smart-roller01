const express = require("express");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let latestMessage = {
  type: "sensor",
  mode: "demo",
  payload: {
    tilt: 0,
    direction: "idle",
    status: "waiting",
    gx: 0,
    gy: 0,
    gz: 0,
    ax: 0,
    ay: 0,
    az: 0,
    sessionTime: 0,
    stability: 0,
  },
};

let demoInterval = null;

const summary = {
  totalMessages: 0,
  correctCount: 0,
  incorrectCount: 0,
  accuracy: 0,
  suggestion: "Start a live or demo session to generate analytics.",
};

function updateSummary(message) {
  const status = message?.payload?.status;
  summary.totalMessages += 1;
  if (status === "correct") summary.correctCount += 1;
  if (status === "incorrect") summary.incorrectCount += 1;

  if (summary.totalMessages > 0) {
    summary.accuracy = Number(((summary.correctCount / summary.totalMessages) * 100).toFixed(1));
  }

  if (summary.incorrectCount > summary.correctCount) {
    summary.suggestion = "Try keeping the roller more level and moving in a straighter direction.";
  } else if (summary.correctCount > 0) {
    summary.suggestion = "Technique looks solid. Maintain stable tilt and smooth motion.";
  }
}

function broadcast(data) {
  latestMessage = data;
  updateSummary(data);

  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }
}

function randomBetween(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function makeDemoPacket() {
  const states = [
    { status: "correct", direction: "forward", tilt: randomBetween(2, 7), stability: randomBetween(82, 97) },
    { status: "incorrect", direction: "left", tilt: randomBetween(9, 16), stability: randomBetween(45, 68) },
    { status: "incorrect", direction: "right", tilt: randomBetween(8, 15), stability: randomBetween(50, 72) },
  ];

  const state = states[Math.floor(Math.random() * states.length)];

  return {
    type: "sensor",
    mode: "demo",
    payload: {
      tilt: state.tilt,
      direction: state.direction,
      status: state.status,
      gx: randomBetween(0.1, 1.2),
      gy: randomBetween(0.1, 1.2),
      gz: randomBetween(0.1, 1.2),
      ax: randomBetween(0.1, 1.0),
      ay: randomBetween(0.1, 1.0),
      az: randomBetween(0.1, 1.0),
      sessionTime: latestMessage?.payload?.sessionTime ? latestMessage.payload.sessionTime + 1 : 1,
      stability: state.stability,
    },
  };
}

wss.on("connection", (ws) => {
  console.log("Browser connected");
  ws.send(JSON.stringify(latestMessage));

  ws.on("message", (raw) => {
    try {
      const data = JSON.parse(raw.toString());
      if (data?.type === "sensor") {
        data.mode = data.mode || "live";
        broadcast(data);
      }
    } catch (error) {
      console.error("Invalid JSON:", error.message);
    }
  });

  ws.on("close", () => {
    console.log("Browser disconnected");
  });
});

app.get("/", (_, res) => {
  res.json({ ok: true, message: "Smart Roller backend is running" });
});

app.get("/api/summary", (_, res) => {
  res.json(summary);
});

app.post("/api/summary/reset", (_, res) => {
  summary.totalMessages = 0;
  summary.correctCount = 0;
  summary.incorrectCount = 0;
  summary.accuracy = 0;
  summary.suggestion = "Summary reset. Start a new session.";
  res.json({ ok: true, message: "Summary reset" });
});

app.post("/api/demo/start", (_, res) => {
  if (demoInterval) clearInterval(demoInterval);

  demoInterval = setInterval(() => {
    const packet = makeDemoPacket();
    broadcast(packet);
  }, 800);

  res.json({ ok: true, message: "Demo mode started" });
});

app.post("/api/demo/stop", (_, res) => {
  if (demoInterval) {
    clearInterval(demoInterval);
    demoInterval = null;
  }
  res.json({ ok: true, message: "Demo mode stopped" });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
