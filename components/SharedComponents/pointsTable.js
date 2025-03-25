"use client";
import { useState, useEffect } from "react";
import { calculateStats } from "@/util/pointsTableCalculator";
import { Trophy, ChevronDown } from "lucide-react";

// Helper function to safely convert values to integers
const toInt = (value, defaultValue = 0) => {
  if (value === undefined || value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

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

export default function PointsTable({
  matchData = [],
  scrimName = "AGENT PAID SCRIMS",
}) {
  const [overallStandings, setoverallStandings] = useState([]);
  const [selectedResult, setSelectedResult] = useState("0");

  // Use the passed matchData or fallback to empty array
  const data = matchData.length > 0 ? matchData : [];

  useEffect(() => {
    if (data.length > 0) {
      const newData = calculateStats(data);
      console.log(newData);
      setoverallStandings(newData);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center py-4">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <h2 className="text-lg text-violet-400 tracking-widest">
            AGENT ESPORTS PRESENTS
          </h2>
          <h1 className="text-4xl font-bold text-white">{scrimName}</h1>
          <div className="relative">
            <select
              className="appearance-none bg-gray-700 border-2 border-violet-500 text-white rounded-lg px-4 py-2 pr-8 cursor-pointer hover:border-violet-400 focus:outline-none"
              onChange={(e) => setSelectedResult(e.target.value)}
            >
              {data.map((_, index) => (
                <option key={index} value={index}>
                  Match {index + 1}
                </option>
              ))}
              <option value="">Overall Standings</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-violet-400">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>

        {data.length === 0 ? (
          <table className="w-full bg-gray-700/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-violet-500">
                <th className="p-3 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-6 text-center text-gray-400">
                  No match data available
                </td>
              </tr>
            </tbody>
          </table>
        ) : selectedResult === "" ? (
          <table className="w-full bg-gray-700/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-violet-500">
                <th className="p-3 text-sm font-semibold">#</th>
                <th className="p-3 text-sm font-semibold">TEAM NAME</th>
                <th className="p-3 text-sm font-semibold">M</th>
                <th className="p-3 text-sm font-semibold">🏆</th>
                <th className="p-3 text-sm font-semibold">P</th>
                <th className="p-3 text-sm font-semibold">K</th>
                <th className="p-3 text-sm font-semibold">T</th>
              </tr>
            </thead>
            <tbody>
              {overallStandings
                .sort((a, b) => {
                  if (toInt(b.total) !== toInt(a.total))
                    return toInt(b.total) - toInt(a.total);
                  if (toInt(b.wins) !== toInt(a.wins))
                    return toInt(b.wins) - toInt(a.wins);
                  if (toInt(b.kills) !== toInt(a.kills))
                    return toInt(b.kills) - toInt(a.kills);
                  return toInt(b.pp) - toInt(a.pp);
                })
                .map(({ kills, team, matches, wins, pp, total }, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-600/50 transition-colors"
                  >
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3 text-center">{team}</td>
                    <td className="p-3 text-center">{toInt(matches)}</td>
                    <td className="p-3 text-center">
                      {toInt(wins) > 0 ? toInt(wins) : ""}
                    </td>
                    <td className="p-3 text-center">{toInt(pp)}</td>
                    <td className="p-3 text-center">{toInt(kills)}</td>
                    <td className="p-3 text-center">{toInt(total)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : selectedResult >= 0 &&
          selectedResult < data.length &&
          data[selectedResult] &&
          data[selectedResult].length > 0 ? (
          <table className="w-full bg-gray-700/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-violet-500">
                <th className="p-3 text-sm font-semibold">#</th>
                <th className="p-3 text-sm font-semibold">TEAM NAME</th>
                <th className="p-3 text-sm font-semibold">B</th>
                <th className="p-3 text-sm font-semibold">PP</th>
                <th className="p-3 text-sm font-semibold">Kills</th>
                <th className="p-3 text-sm font-semibold">T</th>
              </tr>
            </thead>
            <tbody>
              {data[selectedResult]
                .slice()
                .sort((a, b) => {
                  const p1A = toInt(a.p1),
                    p2A = toInt(a.p2),
                    p3A = toInt(a.p3),
                    p4A = toInt(a.p4);
                  const p1B = toInt(b.p1),
                    p2B = toInt(b.p2),
                    p3B = toInt(b.p3),
                    p4B = toInt(b.p4);
                  const rankA = toInt(a.rank),
                    rankB = toInt(b.rank);

                  const scoreA = p1A + p2A + p3A + p4A + Points[rankA];
                  const scoreB = p1B + p2B + p3B + p4B + Points[rankB];
                  return scoreB - scoreA;
                })
                .map(({ rank, team, isPlayed, p1, p2, p3, p4 }, index) => {
                  // Convert to integers
                  const p1Int = toInt(p1);
                  const p2Int = toInt(p2);
                  const p3Int = toInt(p3);
                  const p4Int = toInt(p4);
                  const rankInt = toInt(rank);
                  const totalKills = p1Int + p2Int + p3Int + p4Int;
                  const placementPoints = Points[rankInt] || 0;
                  const totalPoints = totalKills + placementPoints;

                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-600/50 transition-colors"
                    >
                      <td className="p-3 text-center">{index + 1}</td>
                      <td className="p-3 text-center">{team}</td>
                      {isPlayed ? (
                        <>
                          <td className="p-3 text-center">
                            {rankInt === 1 ? (
                              <Trophy size={20} className="text-yellow-400" />
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="p-3 text-center">{placementPoints}</td>
                          <td className="p-3 text-center">{totalKills}</td>
                          <td className="p-3 text-center">{totalPoints}</td>
                        </>
                      ) : (
                        <td
                          colSpan={4}
                          className="p-3 text-center text-gray-400"
                        >
                          NOT PLAYED
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <table className="w-full bg-gray-700/50 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-violet-500">
                <th className="p-3 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-6 text-center text-gray-400">
                  Match not completed yet, or the admin didn't upload the match
                  results.
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
