import QuickChart from "quickchart-js";
import { useState } from "react";

export default function Data({ scores }) {
  const scoresNums = scores.map((scores) => scores.score);

  const numbers = scores.map((score) => []);

  const myChart = new QuickChart();
  myChart
    .setConfig({
      type: "line",

      options: {
        scales: {
          yAxes: [
            {
              // display: false,
              ticks: {
                min: 50,
                max: 2000,
                stepSize: 50,
              },
            },
          ],
        },
        legend: {
          display: false,
          labels: {
            fontStyle: "Play, sans-serif",
          },
        },
      },
      data: {
        labels: numbers,
        datasets: [
          {
            label: "Your Progress",

            data: scoresNums,
            fill: false,
            borderColor: "red",
            pointStyle: "circle",
            pointBorderColor: "red",
            pointBackgroundColor: "red",
            borderWidth: 2,

            // yAxisID: "y-axis-1",
          },
        ],
      },
    })
    .setWidth(270)
    .setHeight(190)
    .setBackgroundColor("transparent");

  // Print the chart URL
  const theChart = myChart.getUrl();
  return (
    <div className="data-container">
      <div className="data-flex">
        <div className="data-boxes">
          <Graph myChart={myChart} theChart={theChart} />
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

  return (
    <div>
      <div className="stats-container">
        {average ? (
          <>
            <div>Your Average:</div>
            <div>{average.toFixed(0)}ms</div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="stats-container">
        {highscore ? (
          <>
            <div>Your Highscore:</div>
            <div>{highscore}ms</div>
          </>
        ) : (
          <div>Click to get started! </div>
        )}
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

  return (
    <div>
      {average ? (
        <div className="stats-paragraph">
          The average median reaction speed is 273ms
          {average.toFixed(0) > 273 ? (
            <div>Your average is higher than the global average</div>
          ) : (
            <div>Your average is lower than the global average!</div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function Graph({ myChart, theChart }) {
  return (
    <div className="chart">
      <img alt="chart" src={theChart} />
    </div>
  );
}
