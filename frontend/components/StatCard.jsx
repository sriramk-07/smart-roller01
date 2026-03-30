export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="card">
      <div className="muted">{title}</div>
      <div className="metric">{value}</div>
      {subtitle ? <div className="muted" style={{ marginTop: 8 }}>{subtitle}</div> : null}
    </div>
  );
}
