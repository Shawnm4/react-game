// import "./App.css";

import { useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000
  );
  const [color, setColor] = useState("#339af0");
  function handleClick() {
    setPlaying((playing) => !playing);
    setRandomNum(Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000);
    setTimeout(() => setColor("#37b24d"), randomNum);
  }

  return (
    <div>
      <ReactionClick onClick={handleClick} playing={playing} color={color} />
      <TimeData />
    </div>
  );
}

export default App;

function ReactionClick({ onClick, playing, color }) {
  return (
    <div
      className="click-container"
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {playing ? <GameClick /> : <ReactionText />}
    </div>
  );
}

function ReactionText() {
  return (
    <div className="reaction-text">
      <h1 className="title">Reaction Time Test</h1>
      <div className="instructions">
        <div>When the box turns green,click as quickly as you can.</div>
        <div>Click anywhere to start</div>
      </div>
    </div>
  );
}

function GameClick() {
  return (
    <div className="reaction-text">
      <h1 className="title">GET READY TO CLICK ON GREEN</h1>
    </div>
  );
}

function TimeData() {
  return (
    <div className="data-container">
      <div className="data-flex">
        <ChartContainer />
        <StatsContainer />
      </div>
    </div>
  );
}

function ChartContainer() {
  return <div className="chart-container data-boxes"></div>;
}

function StatsContainer() {
  return <div className="stats-container data-boxes"></div>;
}
