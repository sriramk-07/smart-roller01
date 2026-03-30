"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export default function DemoPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function callApi(path) {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}${path}`, { method: "POST" });
      const data = await res.json();
      setMessage(data.message || "Done");
    } catch (error) {
      setMessage("Could not reach backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div>
        <h1 className="section-title">Demo Mode</h1>
        <p className="muted">
          Use demo mode when the hardware fails or when you want to show the app quickly to judges.
        </p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>Start automatic demo</h2>
          <p className="muted">Streams simulated sensor data through the same WebSocket pipeline.</p>
          <button className="btn btn-secondary" onClick={() => callApi("/api/demo/start")} disabled={loading}>
            Start Demo
          </button>
          <button className="btn btn-danger" onClick={() => callApi("/api/demo/stop")} disabled={loading}>
            Stop Demo
          </button>
        </div>

        <div className="card">
          <h2>What demo mode shows</h2>
          <ul className="list muted">
            <li>Correct rolling technique</li>
            <li>Wrong tilt warnings</li>
            <li>Unstable movement alerts</li>
            <li>Session timing and smoothness changes</li>
          </ul>
        </div>
      </div>

      {message ? (
        <div className="card">
          <strong>{message}</strong>
        </div>
      ) : null}
    </div>
  );
}
