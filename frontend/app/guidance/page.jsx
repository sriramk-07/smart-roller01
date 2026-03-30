const exercises = [
  {
    name: "Calf Recovery",
    direction: "Forward and backward",
    tilt: "Keep tilt below 8°",
    tips: ["Roll slowly", "Keep ankle relaxed", "Avoid sudden twisting"],
  },
  {
    name: "Hamstring Rolling",
    direction: "Straight line motion",
    tilt: "Keep tilt below 10°",
    tips: ["Sit balanced", "Move evenly", "Do not lean too much to one side"],
  },
  {
    name: "Quad Release",
    direction: "Front-to-back",
    tilt: "Keep tilt below 7°",
    tips: ["Support with hands", "Avoid fast rolling", "Stay aligned with thigh"],
  },
  {
    name: "Back Support",
    direction: "Controlled short rolls",
    tilt: "Keep tilt below 6°",
    tips: ["Use gentle motion", "Keep neck neutral", "Avoid sharp side tilts"],
  },
];

export default function GuidancePage() {
  return (
    <div className="grid" style={{ gap: 18 }}>
      <div>
        <h1 className="section-title">Exercise Guidance</h1>
        <p className="muted">
          These recovery presets make the project feel useful for athletes, not just technical.
        </p>
      </div>

      <div className="grid grid-2">
        {exercises.map((item) => (
          <div className="card" key={item.name}>
            <h2>{item.name}</h2>
            <p className="muted"><strong>Expected direction:</strong> {item.direction}</p>
            <p className="muted"><strong>Recommended tilt:</strong> {item.tilt}</p>
            <ul className="list muted">
              {item.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
