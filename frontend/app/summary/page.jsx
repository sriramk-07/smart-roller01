"use client";

import { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export default function SummaryPage() {
  const [summary, setSummary] = useState(null);

  async function loadSummary() {
    try {
      const res = await fetch(`${API_BASE}/api/summary`);
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function resetSummary() {
    await fetch(`${API_BASE}/api/summary/reset`, { method: "POST" });
    loadSummary();
  }

  useEffect(() => {
    loadSummary();
  }, []);

  if (!summary) {
    return <p className="muted">Loading summary...</p>;
  }

  return (
    <div className="grid" style={{ gap: 18 }}>
      <div>
        <h1 className="section-title">Session Summary</h1>
        <p className="muted">Review movement quality after a session.</p>
      </div>

      <div className="grid grid-2">
        <StatCard title="Messages Processed" value={summary.totalMessages} />
        <StatCard title="Correct Motions" value={summary.correctCount} />
        <StatCard title="Incorrect Motions" value={summary.incorrectCount} />
        <StatCard title="Accuracy" value={`${summary.accuracy}%`} />
      </div>

      <div className="card">
        <h2>Technique suggestion</h2>
        <p className="muted">{summary.suggestion}</p>
        <button className="btn btn-danger" onClick={resetSummary}>Reset Summary</button>
      </div>
    </div>
  );
}
