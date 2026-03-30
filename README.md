# Smart Roller Web App

A 5-page web app for your hackathon project with:
- Next.js frontend
- Node.js + WebSocket backend
- Live mode for ESP32
- Demo mode fallback if hardware fails

## Pages
1. Home
2. Live Dashboard
3. Demo Mode
4. Exercise Guidance
5. Session Summary

## Project structure

```bash
smart-roller-webapp/
├── frontend/
└── backend/
```

## 1) Run locally

### Backend
```bash
cd backend
npm install
npm run dev
```

This starts the WebSocket server at:
- `http://localhost:3001`
- `ws://localhost:3001`

### Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Then open:
- `http://localhost:3000`

## 2) How the app works

The frontend connects to the backend WebSocket server and receives JSON messages.

Example live packet:
```json
{
  "type": "sensor",
  "mode": "live",
  "payload": {
    "tilt": 5.4,
    "direction": "forward",
    "status": "correct",
    "gx": 0.1,
    "gy": 0.2,
    "gz": 0.3,
    "ax": 0.4,
    "ay": 0.5,
    "az": 0.6,
    "sessionTime": 12,
    "stability": 88
  }
}
```

Example demo packet:
```json
{
  "type": "sensor",
  "mode": "demo",
  "payload": {
    "tilt": 9.2,
    "direction": "left",
    "status": "incorrect",
    "gx": 0.8,
    "gy": 0.7,
    "gz": 0.5,
    "ax": 0.2,
    "ay": 0.1,
    "az": 0.9,
    "sessionTime": 18,
    "stability": 62
  }
}
```

## 3) Demo mode

The backend has REST endpoints for demo mode:
- `POST /api/demo/start`
- `POST /api/demo/stop`

It also has:
- `POST /api/summary/reset`

## 4) ESP32 integration

Your ESP32 should connect to the same Wi-Fi network as the backend and send JSON packets to the backend WebSocket server.

In the current starter project:
- browser clients connect and receive data
- you can extend the backend so the ESP32 also connects as a sender
- for hackathon demo, demo mode already works even if hardware fails

## 5) Production deployment suggestion

- Deploy the **frontend** on Vercel
- Deploy the **backend** on Render
- Set `NEXT_PUBLIC_WS_URL` in the frontend to your Render WebSocket URL

Example:
```bash
NEXT_PUBLIC_WS_URL=wss://your-render-service.onrender.com
```

## 6) Important environment variables

Frontend `.env.local`
```bash
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

Production frontend env:
```bash
NEXT_PUBLIC_WS_URL=wss://your-render-service.onrender.com
```

## 7) Build for production

### Frontend
```bash
npm run build
npm start
```

### Backend
```bash
npm start
```
