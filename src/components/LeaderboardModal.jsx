import React, { useEffect, useState } from 'react';
import { X, Trophy, Flame, Zap, Award, User, RefreshCw } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'CyberQueen_99', solved: 48, blitz: 1420, streak: 14, title: 'Grandmaster' },
  { rank: 2, name: 'MatrixKnight', solved: 42, blitz: 1280, streak: 12, title: 'Master' },
  { rank: 3, name: 'AlgoRider', solved: 39, blitz: 1150, streak: 9, title: 'Master' },
  { rank: 4, name: 'CrownMaster2026', solved: 35, blitz: 990, streak: 7, title: 'Expert' },
  { rank: 5, name: 'LogicPioneer', solved: 31, blitz: 870, streak: 5, title: 'Tactician' },
  { rank: 6, name: 'VectorQueen', solved: 28, blitz: 760, streak: 4, title: 'Tactician' }
];

export default function LeaderboardModal({ isOpen, onClose, userStats }) {
  const [leaderboard, setLeaderboard] = useState(MOCK_LEADERBOARD);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setLeaderboard(data);
        }
      }
    } catch (e) {
      // Fallback to local storage / mock
      console.log('Using local leaderboard data fallback');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center border border-amber-800">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Global Leaderboard & Stats</h2>
              <p className="text-xs text-slate-400">Crown Matrix Competitive Rankings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeaderboard}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
              title="Refresh Leaderboard"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Player Stats Ribbon */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/60 border-b border-slate-800 text-center">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Puzzles Solved</span>
            <span className="text-xl font-bold text-cyan-400">{userStats.totalSolved || 0}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Blitz High Score</span>
            <span className="text-xl font-bold text-amber-400">{userStats.blitzHighScore || 0}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Daily Streak</span>
            <span className="text-xl font-bold text-emerald-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> {userStats.dailyStreak || 0}
            </span>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="flex-1 overflow-y-auto p-6">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 uppercase font-semibold border-b border-slate-800 pb-2">
              <tr>
                <th className="pb-3 pl-2">Rank</th>
                <th className="pb-3">Player</th>
                <th className="pb-3">Title</th>
                <th className="pb-3 text-center">Puzzles</th>
                <th className="pb-3 text-center">Blitz Score</th>
                <th className="pb-3 text-center pr-2">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {leaderboard.map((player, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 pl-2">
                    {player.rank === 1 && <span className="inline-flex w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 items-center justify-center font-bold">🥇</span>}
                    {player.rank === 2 && <span className="inline-flex w-6 h-6 rounded-full bg-slate-400/20 text-slate-300 border border-slate-400/40 items-center justify-center font-bold">🥈</span>}
                    {player.rank === 3 && <span className="inline-flex w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 border border-amber-700/40 items-center justify-center font-bold">🥉</span>}
                    {player.rank > 3 && <span className="text-slate-400 font-semibold pl-2">#{player.rank}</span>}
                  </td>
                  <td className="py-3.5 font-bold text-white flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-cyan-400" /> {player.name}
                  </td>
                  <td className="py-3.5">
                    <span className="bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] px-2 py-0.5 rounded-md">
                      {player.title}
                    </span>
                  </td>
                  <td className="py-3.5 text-center text-slate-300 font-bold">{player.solved}</td>
                  <td className="py-3.5 text-center text-amber-400 font-bold">{player.blitz}</td>
                  <td className="py-3.5 text-center text-emerald-400 font-bold pr-2">{player.streak}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
