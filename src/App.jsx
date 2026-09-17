import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Crown, Sparkles, RotateCcw, Undo, Lightbulb, ChevronRight,
  ChevronLeft, Zap, Play
} from 'lucide-react';

import Header from './components/Header';
import GameBoard from './components/GameBoard';
import PitchDeckModal from './components/PitchDeckModal';
import DemoVideoModal from './components/DemoVideoModal';
import LeaderboardModal from './components/LeaderboardModal';

import CursorFollower from './components/effects/CursorFollower';
import TiltCard from './components/effects/TiltCard';
import SpotlightContainer from './components/effects/SpotlightContainer';
import MagneticButton from './components/effects/MagneticButton';

import { checkThreats } from './logic/threats';
import { getSmartHint } from './logic/solver';
import { CAMPAIGN_LEVELS, getDailyPuzzle } from './logic/levels';
import { sound } from './logic/soundEngine';

export default function App() {
  // App Modes & Modals
  const [mode, setMode] = useState('campaign'); // 'campaign' | 'daily' | 'blitz' | 'builder'
  const [muted, setMuted] = useState(false);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  // Level State
  const [levelIdx, setLevelIdx] = useState(0);
  const currentLevel = mode === 'daily' ? getDailyPuzzle() : CAMPAIGN_LEVELS[levelIdx];

  const size = currentLevel.size;
  const regions = currentLevel.regions;

  // Board State
  const [board, setBoard] = useState(() => Array.from({ length: size }, () => Array(size).fill(0)));
  const [moveHistory, setMoveHistory] = useState([]);
  const [hint, setHint] = useState(null);

  // Timers & Stats
  const [timer, setTimer] = useState(0);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState(60);
  const [blitzScore, setBlitzScore] = useState(0);
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('crown_matrix_stats');
    return saved ? JSON.parse(saved) : { totalSolved: 0, blitzHighScore: 0, dailyStreak: 1 };
  });

  // Calculate Threats
  const threats = checkThreats(board, size, regions);

  // Save Stats
  useEffect(() => {
    localStorage.setItem('crown_matrix_stats', JSON.stringify(userStats));
  }, [userStats]);

  // Reset board when level or mode changes
  useEffect(() => {
    setBoard(Array.from({ length: size }, () => Array(size).fill(0)));
    setMoveHistory([]);
    setHint(null);
    setTimer(0);
  }, [levelIdx, mode]);

  // Game Timer Effect
  useEffect(() => {
    if (threats.isSolved) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [threats.isSolved]);

  // Blitz Timer Effect
  useEffect(() => {
    if (mode !== 'blitz' || threats.isSolved) return;

    if (blitzTimeLeft <= 0) {
      sound.playConflict();
      alert(`⏰ Time's Up! Blitz Score: ${blitzScore}`);
      setMode('campaign');
      return;
    }

    const timer = setInterval(() => {
      setBlitzTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, blitzTimeLeft, threats.isSolved]);

  // Trigger Victory Confetti & Fireworks
  useEffect(() => {
    if (threats.isSolved) {
      sound.playVictory();

      // Trigger Confetti
      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#fbbf24', '#10b981', '#ec4899']
        });
      } catch (e) {}

      // Update User Stats
      setUserStats((prev) => {
        const newSolved = prev.totalSolved + 1;
        const newBlitzHigh = mode === 'blitz' ? Math.max(prev.blitzHighScore, blitzScore + 100) : prev.blitzHighScore;
        return {
          ...prev,
          totalSolved: newSolved,
          blitzHighScore: newBlitzHigh
        };
      });

      // Submit to backend
      fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Player',
          solved: userStats.totalSolved + 1,
          blitz: blitzScore,
          streak: userStats.dailyStreak
        })
      }).catch(() => {});
    }
  }, [threats.isSolved]);

  // Handle Tile Clicks
  const handleTileClick = (r, c) => {
    if (threats.isSolved) return;

    // Save history for Undo
    setMoveHistory((prev) => [...prev, board.map((row) => [...row])]);

    // State transition: 0 (Empty) -> 1 (Crown) -> 2 (Cross) -> 0
    const newBoard = board.map((row) => [...row]);
    const nextVal = (newBoard[r][c] + 1) % 3;
    newBoard[r][c] = nextVal;

    if (nextVal === 1) sound.playCrown();
    else if (nextVal === 2) sound.playCross();
    else sound.playTap();

    setBoard(newBoard);
    setHint(null);
  };

  const handleTileRightClick = (r, c) => {
    if (threats.isSolved) return;

    setMoveHistory((prev) => [...prev, board.map((row) => [...row])]);
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = newBoard[r][c] === 2 ? 0 : 2; // Toggle X-mark

    if (newBoard[r][c] === 2) sound.playCross();
    else sound.playTap();

    setBoard(newBoard);
    setHint(null);
  };

  // Undo Last Move
  const handleUndo = () => {
    if (moveHistory.length === 0) return;
    sound.playTap();
    const lastBoard = moveHistory[moveHistory.length - 1];
    setBoard(lastBoard);
    setMoveHistory((prev) => prev.slice(0, prev.length - 1));
    setHint(null);
  };

  // Reset Board
  const handleReset = () => {
    sound.playTap();
    setBoard(Array.from({ length: size }, () => Array(size).fill(0)));
    setMoveHistory([]);
    setHint(null);
  };

  // Trigger Smart Hint Engine
  const handleGetHint = () => {
    sound.playHint();
    const smartHint = getSmartHint(board, size, regions);
    setHint(smartHint);
  };

  // Format Time (MM:SS)
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-hidden bg-cyber-grid">
      
      {/* Custom Trailing Cursor Follower */}
      <CursorFollower />

      {/* Ambient 3D Neon Background Glow Orbs */}
      <div className="pointer-events-none fixed -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] z-0" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] z-0" />

      {/* Header Bar */}
      <Header
        mode={mode}
        setMode={setMode}
        muted={muted}
        setMuted={setMuted}
        onOpenDeck={() => setIsDeckOpen(true)}
        onOpenVideo={() => setIsVideoOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* Main Content Body */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-between p-4 sm:p-6 max-w-6xl w-full mx-auto">
        
        {/* Top Info Ribbon with 3D Tilt & Spotlight */}
        <TiltCard maxTilt={5} scale={1.01} className="w-full">
          <SpotlightContainer
            spotlightColor="rgba(6, 182, 212, 0.2)"
            className="w-full flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800 backdrop-blur-md shadow-xl preserve-3d"
          >
            {/* Level Info */}
            <div className="translate-z-10">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{currentLevel.name}</h2>
                <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  {currentLevel.difficulty || 'Custom'}
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-md mt-0.5">
                {currentLevel.description}
              </p>
            </div>

            {/* Stats & Timers */}
            <div className="flex items-center gap-4 text-xs font-semibold translate-z-10">
              {/* Crowns Tracker */}
              <div className="flex items-center gap-1.5 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 shadow-inner">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>
                  <strong className={threats.crownCount === threats.targetCrowns ? 'text-emerald-400' : 'text-cyan-400'}>
                    {threats.crownCount}
                  </strong> / {threats.targetCrowns} Crowns
                </span>
              </div>

              {/* Timer */}
              {mode !== 'blitz' ? (
                <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-cyan-400 text-sm shadow-inner">
                  ⏱️ {formatTime(timer)}
                </div>
              ) : (
                <div className="bg-amber-950/90 text-amber-300 px-3.5 py-2 rounded-xl border border-amber-800 font-mono text-sm font-bold flex items-center gap-1.5 animate-pulse shadow-inner">
                  <Zap className="w-4 h-4 text-amber-400" /> {blitzTimeLeft}s
                </div>
              )}
            </div>
          </SpotlightContainer>
        </TiltCard>

        {/* Smart Hint Message Banner */}
        {hint && (
          <div
            className={`w-full my-3 p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg ${
              hint.type === 'error'
                ? 'bg-red-950/80 border-red-500/50 text-red-300'
                : hint.type === 'warning'
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                : hint.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{hint.message}</span>
            </div>
            <button
              onClick={() => setHint(null)}
              className="text-xs opacity-70 hover:opacity-100 px-2 py-1 bg-slate-900/40 rounded-lg"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Interactive Matrix Game Board */}
        <GameBoard
          board={board}
          size={size}
          regions={regions}
          threats={threats}
          hint={hint}
          onTileClick={handleTileClick}
          onTileRightClick={handleTileRightClick}
          readOnly={threats.isSolved}
        />

        {/* Action Controls & Navigation Footer */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
          
          {/* Level Switcher (Campaign Mode) */}
          {mode === 'campaign' && (
            <div className="flex items-center gap-2">
              <MagneticButton strength={0.3}>
                <button
                  onClick={() => {
                    if (levelIdx > 0) setLevelIdx(levelIdx - 1);
                  }}
                  disabled={levelIdx === 0}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-md"
                  title="Previous Level"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </MagneticButton>

              <span className="text-xs font-bold text-slate-400 px-3">
                Level {levelIdx + 1} of {CAMPAIGN_LEVELS.length}
              </span>

              <MagneticButton strength={0.3}>
                <button
                  onClick={() => {
                    if (levelIdx < CAMPAIGN_LEVELS.length - 1) setLevelIdx(levelIdx + 1);
                  }}
                  disabled={levelIdx === CAMPAIGN_LEVELS.length - 1}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-md"
                  title="Next Level"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </MagneticButton>
            </div>
          )}

          {/* Action Toolbar with Magnetic Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Smart Hint Button */}
            <MagneticButton strength={0.4}>
              <button
                onClick={handleGetHint}
                disabled={threats.isSolved}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50"
              >
                <Lightbulb className="w-4 h-4 text-cyan-200" /> Smart Hint
              </button>
            </MagneticButton>

            {/* Undo Button */}
            <MagneticButton strength={0.3}>
              <button
                onClick={handleUndo}
                disabled={moveHistory.length === 0 || threats.isSolved}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white font-semibold text-xs disabled:opacity-30 transition-all shadow-md"
              >
                <Undo className="w-4 h-4" /> Undo
              </button>
            </MagneticButton>

            {/* Reset Button */}
            <MagneticButton strength={0.3}>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-red-300 font-semibold text-xs transition-all shadow-md"
              >
                <RotateCcw className="w-4 h-4" /> Clear
              </button>
            </MagneticButton>
          </div>

        </div>

        {/* Victory Card Overlay with 3D Tilt */}
        {threats.isSolved && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <TiltCard maxTilt={10} className="max-w-md w-full">
              <SpotlightContainer
                spotlightColor="rgba(6, 182, 212, 0.3)"
                className="p-8 rounded-3xl bg-slate-900 border-2 border-cyan-400/50 text-center shadow-[0_0_100px_rgba(6,182,212,0.5)] preserve-3d"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/50 flex items-center justify-center mx-auto mb-4 animate-bounce translate-z-20">
                  <Crown className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 translate-z-10">Matrix Conquered!</h3>
                <p className="text-xs text-slate-300 mb-6 translate-z-10">
                  You successfully placed {threats.targetCrowns} crowns with zero conflicts in <span className="text-cyan-400 font-bold">{formatTime(timer)}</span>!
                </p>
                <div className="flex justify-center gap-3 translate-z-20">
                  {mode === 'campaign' && levelIdx < CAMPAIGN_LEVELS.length - 1 ? (
                    <MagneticButton strength={0.4}>
                      <button
                        onClick={() => {
                          setLevelIdx(levelIdx + 1);
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg transition-all"
                      >
                        Next Level <ChevronRight className="w-4 h-4" />
                      </button>
                    </MagneticButton>
                  ) : (
                    <MagneticButton strength={0.4}>
                      <button
                        onClick={handleReset}
                        className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all"
                      >
                        Play Again
                      </button>
                    </MagneticButton>
                  )}
                </div>
              </SpotlightContainer>
            </TiltCard>
          </div>
        )}

      </main>

      {/* Modals */}
      <PitchDeckModal isOpen={isDeckOpen} onClose={() => setIsDeckOpen(false)} />
      <DemoVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <LeaderboardModal isOpen={isLeaderboardOpen} onClose={() => setIsLeaderboardOpen(false)} userStats={userStats} />

    </div>
  );
}
