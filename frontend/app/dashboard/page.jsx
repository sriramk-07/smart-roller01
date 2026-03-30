"use client";

import { useSocket } from "../../lib/useSocket";

function MetricCard({ label, value, sub }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric">{value}</div>
      <div className="metric-sub">{sub}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { connected, lastMessage } = useSocket();
  const data = lastMessage?.payload || {};

  const tilt = Number(data.tilt || 0);
  const stability = Number(data.stability || 0);

  return (
    <div className="grid">
      <div className="dashboard-top">
        <div>
          <h1 className="dashboard-title">Live Motion Dashboard</h1>
          <div className="status-row">
            <span className={`badge ${connected ? "good" : "bad"}`}>
              {connected ? "Device Connected" : "Disconnected"}
            </span>
            <span className={`badge ${lastMessage?.mode === "live" ? "info" : "warn"}`}>
              Mode: {lastMessage?.mode || "demo"}
            </span>
            <span className={`badge ${data.status === "correct" ? "good" : data.status === "incorrect" ? "bad" : "info"}`}>
              Technique: {data.status || "waiting"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <MetricCard label="Tilt Angle" value={`${tilt.toFixed(1)}°`} sub="Real-time roller angle" />
        <MetricCard label="Direction" value={data.direction || "idle"} sub="Detected movement direction" />
        <MetricCard label="Stability" value={`${stability.toFixed(0)}%`} sub="Motion smoothness score" />
        <MetricCard label="Session Time" value={`${data.sessionTime || 0}s`} sub="Current active recovery session" />
      </div>

      <div className="sensor-grid">
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Motion Core</h2>
            <span className="badge info">Live Sensor Visualization</span>
          </div>

          <div className="motion-ring-wrap">
            <div className="motion-ring">
              <div className="motion-ring-inner">
                <div>
                  <span className="motion-main">{stability.toFixed(0)}%</span>
                  <span className="motion-sub">stability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mini-stats">
          <div className="mini-stat">
            <div className="mini-stat-label">Gyroscope</div>
            <div className="mini-stat-value">
              {data.gx || 0} / {data.gy || 0} / {data.gz || 0}
            </div>
          </div>

          <div className="mini-stat">
            <div className="mini-stat-label">Accelerometer</div>
            <div className="mini-stat-value">
              {data.ax || 0} / {data.ay || 0} / {data.az || 0}
            </div>
          </div>

          <div className="mini-stat">
            <div className="mini-stat-label">Guidance Feedback</div>
            <div className="mini-stat-value">
              {data.status === "correct"
                ? "Good Technique"
                : data.status === "incorrect"
                ? "Adjust Position"
                : "Waiting"}
            </div>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${Math.max(8, stability)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}