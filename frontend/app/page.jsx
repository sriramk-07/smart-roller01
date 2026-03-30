import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker">⚡ Athlete Recovery Technology</div>

          <h1 className="hero-title">
            A <span className="gradient-text">smart roller</span>
            <br />
            built for modern recovery
          </h1>

          <p className="hero-text">
            SmartRoll combines an ESP32, MPU6050, and a real-time dashboard
            to guide muscle recovery with live motion tracking, intelligent
            feedback, and a full demo mode for safe presentations.
          </p>

          <div className="hero-actions">
            <Link href="/dashboard" className="btn btn-primary">
              Open Live Dashboard
            </Link>
            <Link href="/demo" className="btn btn-secondary">
              Launch Demo Mode
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-shell">
            <img src="/roller.png" alt="Smart roller" />
          </div>

          <div className="floating-stat">
            <div className="floating-stat-label">Recovery Accuracy</div>
            <div className="floating-stat-value">94%</div>
            <div className="muted">Real-time guided technique</div>
          </div>
        </div>
      </section>

      <section className="section grid grid-3">
        <div className="card">
          <h3 className="card-title">Live Motion Tracking</h3>
          <p className="card-text">
            Stream tilt, direction, and stability directly from your smart roller through WebSocket.
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">Demo Safety Mode</h3>
          <p className="card-text">
            If the hardware disconnects, the app still performs with simulated real-time athlete sessions.
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">Athlete Guidance</h3>
          <p className="card-text">
            Exercise-specific movement rules for calves, quads, hamstrings, and back recovery.
          </p>
        </div>
      </section>

      <div className="footer-space" />
    </div>
  );
}