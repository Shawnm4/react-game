// import "./App.css";

import { useEffect, useState } from "react";

import Data from "./data";

export default function App() {
  return <Game />;
}

function Game() {
  //Game States
  const [beforeGame, setBeforeGame] = useState(true);
  const [wait4click, setWait4Click] = useState(false);
  const [duringGame, setDuringGame] = useState(false);
  const [afterGame, setAfterGame] = useState(false);
  const [clickedEarly, setClickedEarly] = useState(false);
  const [displayScore, setDisplayScore] = useState(false);
  const [displayTookToLong, setDisplayTookToLong] = useState(false);

  //Random time number
  const randomNumber = Math.floor(Math.random() * 8001 + 2000);

  const [timer, setTimer] = useState(null);

  //During Game States
  const [startState, setStartState] = useState(0);
  const [endState, setEndState] = useState(0);

  if (!localStorage.getItem("scores2")) {
    localStorage.setItem("scores2", JSON.stringify([]));
  }
  //Scores
  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem("scores2"))
  );

  const [score, setScore] = useState(null);

  function beforeGameHandler() {
    setBeforeGame((s) => false);
    setDuringGame((s) => false);
    setAfterGame((s) => false);
    setWait4Click((s) => true);
    setDisplayTookToLong(false);
    setTimer(
      setTimeout(() => {
        setBeforeGame((s) => false);
        setDuringGame((s) => true);
        setAfterGame((s) => false);
        setWait4Click((s) => false);
        setStartState(performance.now());
      }, randomNumber)
    );
  }

  function waiting4Click() {
    setTimer((t) => clearTimeout(t));
    setWait4Click(false);
    setClickedEarly((s) => true);
    setTimeout(() => {
      setBeforeGame((s) => true);
      setDuringGame((s) => false);
      setAfterGame(false);
      setWait4Click(false);
      setClickedEarly(false);
    }, 2000);
  }

  // function clickToEarly() {
  //   // setTimeout(() => {
  //   //   setBeforeGame(true);
  //   //   setDuringGame(false);
  //   //   setAfterGame(false);
  //   //   setWait4Click(false);
  //   //   setClickedEarly(false);
  //   // }, 2000);
  // }

  function handleScores(newScore) {
    setScores((prevScore) => {
      const updatedScores = [...prevScore, newScore];
      localStorage.setItem("scores2", JSON.stringify(updatedScores));
      return updatedScores;
    });
  }

  function handleEndTime() {
    const endTime = performance.now();
    const score = +(endTime - startState).toFixed(0);
    if (score > 2000) {
      setDisplayTookToLong(true);
      setDuringGame(false);
    } else {
      setDuringGame((s) => false);
      setDisplayScore(true);
      const newScore = {
        score,
        date: new Date().toLocaleString(),
      };
      console.log(newScore);
      handleScores(newScore);
      setScore(newScore.score);
    }
  }
  function handleDisplayScore() {
    setBeforeGame(true);
    setDisplayScore(false);
  }

  return (
    <>
      {beforeGame && <BeforeGameStarts onStartGame={beforeGameHandler} />}
      {wait4click && (
        <WaitingForClick
          // onToEarly={clickToEarly}
          onWait={waiting4Click}
          clickedEarly={clickedEarly}
          // stopTimer={stopTimer}
        />
      )}
      {duringGame && <DuringGame onEnd={handleEndTime} />}
      {afterGame && <AfterGameEnds />}
      {clickedEarly && <ClickedToEarly />}
      {displayScore && (
        <DisplayScore
          onhandledisplayscore={handleDisplayScore}
          score={score}
          scores={scores}
        />
      )}
      {displayTookToLong && <TookToLong onBeforeGame={beforeGameHandler} />}
      <Data scores={scores} />
    </>
  );
}

//Game State Components
function BeforeGameStarts({ beforeGame, onStartGame }) {
  return (
    <div className="click-container" onClick={onStartGame}>
      <div className="reaction-text">
        <div>
          <div className="title">Reaction Game!</div>
          <div className="instructions">Click Anywhere To Get Started!</div>
        </div>
      </div>
    </div>
  );
}

function DuringGame({ onEnd }) {
  return (
    <div className="click-container during-game" onClick={onEnd}>
      <div className="reaction-text">
        <div>
          <div className="title">CLICK NOW!!!</div>
          <div className="instructions"></div>
        </div>
      </div>
    </div>
  );
}

function AfterGameEnds() {
  return (
    <div className="click-container">
      <div className="reaction-text">
        <div>
          <div className="title"></div>
          <div className="instructions">Click Anywhere To Get Started!</div>
        </div>
      </div>
    </div>
  );
}

function WaitingForClick({ onToEarly, onWait, stopTimer, clickedEarly }) {
  // useEffect(function () {
  //   onWait();
  // }, []);
  //Random time number
  // const randomNumber = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

  // const timer = setTimeout(() => onWait(), randomNumber);
  // if (clickedEarly) {
  //   clearTimeout(timer);
  // }
  return (
    <div className="click-container" onClick={onWait}>
      <div className="reaction-text">
        <div>
          <div className="title">CLICK ON GREEN!</div>
          <div className="instructions"></div>
        </div>
      </div>
    </div>
  );
}

function ClickedToEarly({ clickToEarly, timer }) {
  //
  return (
    <div className="click-container" style={{ backgroundColor: "#f03e3e" }}>
      <div className="reaction-text">
        <div>
          <div className="title">TO EARLY</div>
          <div className="instructions">X</div>
        </div>
      </div>
    </div>
  );
}

function DisplayScore({ onhandledisplayscore, score, scores }) {
  console.log(scores);
  const highscore = scores.reduce((acc, cur) => {
    if (cur.score > acc) return acc;
    else return cur.score;
  }, scores.at(0));
  console.log(highscore);

  return (
    <div
      className="display-score"
      style={{ backgroundColor: "#40c057" }}
      onClick={onhandledisplayscore}
    >
      <div className="reaction-text">
        <div>
          <div className="title">Your Score </div>
          <div className="new-score">{score}ms</div>
          <div className="highscore-text">Highscore</div>
          <div className="highscore">{highscore}ms</div>
        </div>
      </div>
    </div>
  );
}

function TookToLong({ onBeforeGame }) {
  return (
    <div
      className="click-container"
      onClick={onBeforeGame}
      style={{ backgroundColor: "#f03e3e" }}
    >
      <div className="reaction-text">
        <div>
          <div className="title">TOO SLOW</div>
          <div className="instructions"> CLICK TO TRY AGAIN</div>
        </div>
      </div>
    </div>
  );
}
