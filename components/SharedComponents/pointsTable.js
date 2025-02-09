"use client";
import { useState, useEffect } from "react";
import classes from './pointsTable.module.css'
import { calculateStats } from "@/util/pointsTableCalculator";

const data = [
  [
    {
      rank: 2,
      team: "Sky Walker Esports",
      isPlayed: true,
      p1: 2,
      p2: 3,
      p3: 2,
      p4: 3,
    },
    {
      rank: 1,
      team: "Surya Bhai Gaming",
      isPlayed: true,
      p1: 3,
      p2: 1,
      p3: 4,
      p4: 2,
    },
    { rank: 3, team: "TEAM 5", isPlayed: true, p1: 1, p2: 4, p3: 2, p4: 4 },
    { rank: 4, team: "TEAM 1", isPlayed: true, p1: 3, p2: 3, p3: 1, p4: 2 },
    { rank: 5, team: "TEAM 8", isPlayed: true, p1: 2, p2: 1, p3: 2, p4: 3 },
    { rank: 6, team: "TEAM 9", isPlayed: true, p1: 3, p2: 2, p3: 2, p4: 1 },
    { rank: 7, team: "TEAM 4", isPlayed: true, p1: 1, p2: 2, p3: 3, p4: 3 },
    { rank: 8, team: "TEAM 11", isPlayed: true, p1: 2, p2: 1, p3: 3, p4: 2 },
    { rank: 9, team: "TEAM 6", isPlayed: true, p1: 1, p2: 3, p3: 1, p4: 4 },
    { rank: 10, team: "TEAM 12", isPlayed: true, p1: 1, p2: 2, p3: 2, p4: 2 },
    { rank: 11, team: "TEAM 10", isPlayed: true, p1: 2, p2: 1, p3: 1, p4: 3 },
    { rank: 12, team: "TEAM 2", isPlayed: true, p1: 1, p2: 3, p3: 2, p4: 1 },
  ],

  [
    { rank: 1, team: "TEAM 5", isPlayed: true, p1: 4, p2: 3, p3: 2, p4: 2 },
    { rank: 2, team: "TEAM 1", isPlayed: true, p1: 2, p2: 4, p3: 3, p4: 1 },
    {
      rank: 3,
      team: "Surya Bhai Gaming",
      isPlayed: true,
      p1: 3,
      p2: 4,
      p3: 6,
      p4: 3,
    },
    {
      rank: 4,
      team: "Sky Walker Esports",
      isPlayed: true,
      p1: 1,
      p2: 2,
      p3: 4,
      p4: 3,
    },
    { rank: 5, team: "TEAM 6", isPlayed: true, p1: 2, p2: 1, p3: 3, p4: 2 },
    { rank: 6, team: "TEAM 2", isPlayed: true, p1: 3, p2: 3, p3: 1, p4: 2 },
    { rank: 7, team: "TEAM 10", isPlayed: true, p1: 1, p2: 2, p3: 3, p4: 3 },
    { rank: 8, team: "TEAM 8", isPlayed: true, p1: 2, p2: 1, p3: 2, p4: 3 },
    { rank: 9, team: "TEAM 12", isPlayed: true, p1: 1, p2: 3, p3: 2, p4: 2 },
    { rank: 10, team: "TEAM 11", isPlayed: true, p1: 3, p2: 2, p3: 1, p4: 1 },
    { rank: 11, team: "TEAM 9", isPlayed: true, p1: 2, p2: 2, p3: 1, p4: 3 },
    { rank: 12, team: "TEAM 4", isPlayed: true, p1: 1, p2: 1, p3: 4, p4: 2 },
  ],

  [
    {
      rank: 1,
      team: "Sky Walker Esports",
      isPlayed: true,
      p1: 4,
      p2: 3,
      p3: 2,
      p4: 1,
    },
    { rank: 2, team: "TEAM 9", isPlayed: true, p1: 3, p2: 1, p3: 4, p4: 2 },
    { rank: 3, team: "TEAM 8", isPlayed: true, p1: 2, p2: 3, p3: 1, p4: 4 },
    { rank: 4, team: "TEAM 10", isPlayed: true, p1: 1, p2: 4, p3: 3, p4: 2 },
    { rank: 5, team: "TEAM 4", isPlayed: true, p1: 2, p2: 2, p3: 2, p4: 3 },
    { rank: 6, team: "TEAM 11", isPlayed: true, p1: 3, p2: 3, p3: 1, p4: 1 },
    { rank: 7, team: "TEAM 6", isPlayed: true, p1: 1, p2: 2, p3: 3, p4: 3 },
    { rank: 8, team: "TEAM 5", isPlayed: true, p1: 4, p2: 1, p3: 2, p4: 1 },
    { rank: 9, team: "TEAM 12", isPlayed: true, p1: 3, p2: 2, p3: 1, p4: 2 },
    {
      rank: 10,
      team: "Surya Bhai Gaming",
      isPlayed: true,
      p1: 2,
      p2: 4,
      p3: 1,
      p4: 3,
    },
    { rank: 11, team: "TEAM 1", isPlayed: true, p1: 1, p2: 3, p3: 2, p4: 2 },
    { rank: 12, team: "TEAM 2", isPlayed: true, p1: 2, p2: 1, p3: 3, p4: 4 },
  ],

  [
    { rank: 1, team: "TEAM 4", isPlayed: true, p1: 2, p2: 4, p3: 1, p4: 3 },
    { rank: 2, team: "TEAM 6", isPlayed: true, p1: 3, p2: 8, p3: 2, p4: 1 },
    { rank: 3, team: "TEAM 8", isPlayed: true, p1: 4, p2: 1, p3: 3, p4: 2 },
    { rank: 4, team: "TEAM 2", isPlayed: true, p1: 2, p2: 3, p3: 1, p4: 2 },
    { rank: 5, team: "TEAM 5", isPlayed: true, p1: 1, p2: 2, p3: 2, p4: 4 },
    { rank: 6, team: "TEAM 11", isPlayed: true, p1: 3, p2: 1, p3: 2, p4: 3 },
    {
      rank: 7,
      team: "Sky Walker Esports",
      isPlayed: true,
      p1: 1,
      p2: 3,
      p3: 4,
      p4: 1,
    },
    { rank: 8, team: "TEAM 10", isPlayed: true, p1: 2, p2: 2, p3: 3, p4: 1 },
    {
      rank: 9,
      team: "Surya Bhai Gaming",
      isPlayed: true,
      p1: 1,
      p2: 4,
      p3: 2,
      p4: 2,
    },
    { rank: 10, team: "TEAM 12", isPlayed: true, p1: 3, p2: 1, p3: 2, p4: 1 },
    { rank: 11, team: "TEAM 1", isPlayed: true, p1: 2, p2: 3, p3: 2, p4: 3 },
    { rank: 12, team: "TEAM 9", isPlayed: true, p1: 1, p2: 2, p3: 3, p4: 4 },
  ],

  [
    { rank: 1, team: "TEAM 10", isPlayed: true, p1: 2, p2: 1, p3: 3, p4: 2 },
    {
      rank: 2,
      team: "Surya Bhai Gaming",
      isPlayed: true,
      p1: 3,
      p2: 5,
      p3: 4,
      p4: 1,
    },
    {
      rank: 3,
      team: "Sky Walker Esports",
      isPlayed: true,
      p1: 4,
      p2: 3,
      p3: 1,
      p4: 3,
    },
    { rank: 4, team: "TEAM 5", isPlayed: true, p1: 1, p2: 4, p3: 2, p4: 3 },
    { rank: 5, team: "TEAM 8", isPlayed: true, p1: 3, p2: 2, p3: 1, p4: 2 },
    { rank: 6, team: "TEAM 1", isPlayed: true, p1: 2, p2: 3, p3: 4, p4: 1 },
    { rank: 7, team: "TEAM 4", isPlayed: true, p1: 2, p2: 1, p3: 3, p4: 4 },
    { rank: 8, team: "TEAM 6", isPlayed: true, p1: 4, p2: 2, p3: 1, p4: 3 },
    { rank: 9, team: "TEAM 12", isPlayed: true, p1: 1, p2: 3, p3: 2, p4: 2 },
    { rank: 10, team: "TEAM 9", isPlayed: true, p1: 2, p2: 4, p3: 1, p4: 3 },
    { rank: 11, team: "TEAM 2", isPlayed: true, p1: 3, p2: 2, p3: 2, p4: 1 },
    { rank: 12, team: "TEAM 11", isPlayed: true, p1: 1, p2: 1, p3: 3, p4: 4 },
  ],

  [
    { rank: 1, team: "TEAM 12", isPlayed: true, p1: 4, p2: 3, p3: 2, p4: 1 },
    { rank: 2, team: "TEAM 1", isPlayed: true, p1: 2, p2: 1, p3: 4, p4: 3 },
    {
      rank: 0,
      team: "Sky Walker Esports",
      isPlayed: false,
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
    },
    { rank: 4, team: "TEAM 10", isPlayed: true, p1: 1, p2: 3, p3: 3, p4: 2 },
    { rank: 5, team: "TEAM 8", isPlayed: true, p1: 2, p2: 2, p3: 4, p4: 1 },
    { rank: 6, team: "TEAM 5", isPlayed: true, p1: 1, p2: 4, p3: 3, p4: 2 },
    { rank: 7, team: "TEAM 9", isPlayed: true, p1: 4, p2: 1, p3: 2, p4: 3 },
    { rank: 8, team: "TEAM 6", isPlayed: true, p1: 3, p2: 3, p3: 1, p4: 2 },
    {
      rank: 0,
      team: "Surya Bhai Gaming",
      isPlayed: false,
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
    },
    { rank: 10, team: "TEAM 4", isPlayed: true, p1: 1, p2: 2, p3: 1, p4: 4 },
    { rank: 11, team: "TEAM 11", isPlayed: true, p1: 3, p2: 1, p3: 2, p4: 2 },
    { rank: 12, team: "TEAM 2", isPlayed: true, p1: 1, p2: 3, p3: 2, p4: 3 },
  ],
];

const Points = {
  0: 0,
  1: 12,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
  11: 0,
  12: 0,
};

export default function PointsTable() {
  const [overallStandings, setoverallStandings] = useState([]);
  useEffect(() => {
    const newData = calculateStats(data);
    console.log(newData);
    setoverallStandings(newData);
  }, []);
  const [selectedResult, setSelectedResult] = useState("0");

  return (
    <div className={` ${classes.container} ${classes.FreeFireEsports}`} id="FullPage">
      <div className={classes.imageHeader}>
        <img src="https://image1.challengermode.com/016ddc9e-3fe0-43e6-772e-08dd03ea6a3a_0_200" alt="Logo 1" className="header-logo1" />
        <div className={classes.header}>
          <h2>AGENT ESPORTS PRESENTS</h2>
          <h1>AGENT PAID SCRIMS</h1>
          <select
            name="matches"
            id="matches"
            onChange={(e) => {
              setSelectedResult(e.target.value);
            }}
          >
            <option value="0">Match 1</option>
            <option value="1">Match 2</option>
            <option value="2">Match 3</option>
            <option value="3">Match 4</option>
            <option value="4">Match 5</option>
            <option value="5">Match 6</option>
            <option value="">Overall Standings</option>
          </select>
        </div>

        <img
          src="https://i.pinimg.com/originals/e4/c8/62/e4c8626999dd56e8c4f8aaab38138e91.png"
          alt="Logo 2"
          className={classes.headerLogo1}
        />
      </div>

      <table id="PointsTable" className={classes.table}>
        {selectedResult === "" ? (
          <>
            <thead>
              <tr className={classes.theadTr}>
                <th className={classes.theadTh} >#</th>
                <th className={classes.theadTh} >TEAM NAME</th>
                <th className={classes.theadTh} >M</th>
                <th className={classes.theadTh} >🏆</th>
                <th className={classes.theadTh} >P</th>
                <th className={classes.theadTh} >K</th>
                <th className={classes.theadTh} >T</th>
              </tr>
            </thead>
            <tbody>
              {overallStandings
                .sort((a, b) => {
                  // sort by total in descending order
                  if (b.total !== a.total) return b.total - a.total;

                  // If total is the same, sort by wins in descending order
                  if (b.wins !== a.wins) return b.wins - a.wins;

                  // If wins are also the same, sort by kills in descending order
                  if (b.kills !== a.kills) return b.kills - a.kills;

                  // If kills are also the same, sort by pp in descending order
                  return b.pp - a.pp;
                })
                .map(({ kills, team, matches, wins, pp, total }, index) => (
                  <tr key={index} className={classes.tbodyTr}>
                    <td className={classes.tbodyTd}>{index + 1}</td>
                    <td className={classes.tbodyTd}>{team}</td>
                    <td className={classes.tbodyTd}>{matches}</td>
                    <td className={classes.tbodyTd}>{wins > 0 ? wins : ""}</td>
                    <td className={classes.tbodyTd}>{pp}</td>
                    <td className={classes.tbodyTd}>{kills}</td>
                    <td className="wwww">{total}</td>
                  </tr>
                ))}
            </tbody>
          </>
        ) : selectedResult >= 0 && selectedResult < data.length ? (
          <>
            <thead>
              <tr className={classes.theadTr}>
                <th className={classes.theadTh}>#</th>
                <th className={classes.theadTh}>TEAM NAME</th>
                <th className={classes.theadTh}>B</th>
                <th className={classes.theadTh}>PP</th>
                <th className={classes.theadTh}>Kills</th>
                <th className={classes.theadTh}>T</th>
              </tr>
            </thead>
            <tbody>
              {data[selectedResult]
                .slice() // Create a shallow copy to avoid mutating the original array
                .sort((a, b) => {
                  const scoreA = a.p1 + a.p2 + a.p3 + a.p4 + Points[a.rank];
                  const scoreB = b.p1 + b.p2 + b.p3 + b.p4 + Points[b.rank];
                  return scoreB - scoreA; // Sort in descending order
                })
                .map(({ rank, team, isPlayed, p1, p2, p3, p4 }, index) => (
                  <tr key={index} className={classes.tbodyTr}>
                    <td className={classes.tbodyTd}>{index + 1}</td>
                    <td className={classes.tbodyTd}>{team}</td>
                    {isPlayed ? (
                      <>
                        <td className={classes.tbodyTd}>{rank === 1 ? "🏆" : ""}</td>
                        <td className={classes.tbodyTd}>{Points[rank]}</td>
                        <td className={classes.tbodyTd}>{p1 + p2 + p3 + p4}</td>
                        <td className="wwww">
                          {p1 + p2 + p3 + p4 + Points[rank]}
                        </td>
                      </>
                    ) : (
                      <td colSpan={4} className={classes.tbodyTd}>NOT PLAYED</td>
                    )}
                  </tr>
                ))}
            </tbody>
          </>
        ) : (
          <h1>Match Not Completed Yet</h1>
        )}
      </table>

      
    </div>
  );
}
