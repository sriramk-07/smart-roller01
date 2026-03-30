"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const defaultData = {
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

export function useSocket() {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(defaultData);
  const [error, setError] = useState("");
  const socketRef = useRef(null);

  const wsUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001";
  }, []);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setError("");
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setLastMessage(parsed);
      } catch (err) {
        console.error("Invalid socket message", err);
      }
    };

    ws.onerror = () => {
      setError("WebSocket connection error");
    };

    ws.onclose = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [wsUrl]);

  return {
    connected,
    lastMessage,
    error,
  };
}
