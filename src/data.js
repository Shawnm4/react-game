export default function Data({ scores }) {
  return (
    <div className="data-container">
      <div className="data-flex">
        <div className="data-boxes">
          <Graph />
        </div>
        <div className="data-boxes">
          <div className="scores-text-container">
            <div>Your Stats</div>
          </div>
          <Stats scores={scores} />
          <StatsDetails scores={scores} />
        </div>
      </div>
    </div>
  );
}

function Stats({ time, scores }) {
  const average =
    scores
      .map((obj) => obj.score)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0) / scores.length;
  console.log(average);
  const averageGlobal = 273;
  //   const now = new Date(time).toLocaleString("en-US", {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   });

  const highscore = scores.reduce((acc, cur) => {
    if (cur.score > acc) return acc;
    else return cur.score;
  }, scores.at(0));
  console.log(highscore);

  return (
    <div>
      <div className="stats-container">
        <div>Your Average:</div>
        <div>{average.toFixed(0)}ms</div>
      </div>
      <div className="stats-container">
        <div>Your Highscore:</div>
        <div>{highscore}ms</div>
      </div>
    </div>
  );
}

function StatsDetails({ scores }) {
  const average =
    scores
      .map((obj) => obj.score)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0) / scores.length;
  console.log(average);
  return (
    <div>
      <div className="stats-paragraph">
        The average median reaction speed is 273ms
        {average.toFixed(0) > 273 ? (
          <div>Your average is higher than the global average</div>
        ) : (
          <div>Your average is lower than the global average!</div>
        )}
      </div>
    </div>
  );
}

function Graph() {}
