import React, { useEffect, useState } from 'react';
import { X, Trophy, Flame, Zap, Award, User, RefreshCw } from 'lucide-react';
import SpotlightContainer from './effects/SpotlightContainer';
import TiltCard from './effects/TiltCard';
import MagneticButton from './effects/MagneticButton';

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
      console.log('Using local leaderboard data fallback');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <TiltCard maxTilt={4} scale={1.01} className="w-full max-w-3xl max-h-[85vh]">
        <SpotlightContainer
          spotlightColor="rgba(245, 158, 11, 0.2)"
          className="relative w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.2)] overflow-hidden flex flex-col preserve-3d"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 translate-z-10">
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
              <MagneticButton strength={0.3}>
                <button
                  onClick={fetchLeaderboard}
                  disabled={loading}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Refresh Leaderboard"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </MagneticButton>
              <MagneticButton strength={0.4}>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* User Stats Card Header */}
          <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 translate-z-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-400 flex items-center justify-center font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">You (Local Player)</h3>
                <span className="text-xs text-cyan-400 font-semibold">Active Contender</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                Total Solved: <strong className="text-emerald-400 font-bold">{userStats.totalSolved}</strong>
              </div>
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                Blitz High Score: <strong className="text-amber-400 font-bold">{userStats.blitzHighScore}</strong>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="flex-1 overflow-y-auto p-6 translate-z-5">
            <div className="space-y-2">
              {leaderboard.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      item.rank === 1 ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.6)]' :
                      item.rank === 2 ? 'bg-slate-300 text-slate-950' :
                      item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.rank}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        {item.name}
                        <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-md">
                          {item.title}
                        </span>
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="text-slate-400">
                      Solved: <strong className="text-cyan-400">{item.solved}</strong>
                    </span>
                    <span className="text-slate-400">
                      Blitz: <strong className="text-amber-400">{item.blitz}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </SpotlightContainer>
      </TiltCard>
    </div>
  );
}
