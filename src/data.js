export default function Data({ scores }) {
  return (
    <div className="data-container">
      <div className="data-flex">
        <div className="data-boxes"></div>
        <div className="data-boxes">
          <div className="scores-text-container">
            <div>Your Scores</div>
          </div>

          <div className="scores-text">
            {scores.map((score) => (
              <Stats key={score.date} time={score.date} score={score.score} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stats({ time, score }) {
  const now = new Date(time).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  console.log(now);
  return (
    <div className="stats-container">
      <div>{now}</div>
      <div>{score}</div>
    </div>
  );
}
