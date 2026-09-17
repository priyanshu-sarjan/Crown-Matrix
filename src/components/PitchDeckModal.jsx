import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Trophy, Zap, ShieldCheck, Cpu, Target, Award, Play } from 'lucide-react';
import SpotlightContainer from './effects/SpotlightContainer';
import TiltCard from './effects/TiltCard';
import MagneticButton from './effects/MagneticButton';

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 10;

  if (!isOpen) return null;

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <TiltCard maxTilt={4} scale={1.01} className="w-full max-w-5xl h-[85vh]">
        <SpotlightContainer
          spotlightColor="rgba(6, 182, 212, 0.2)"
          className="relative w-full h-full bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col preserve-3d"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 translate-z-10">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 bg-cyan-950 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-800 font-semibold">
                <Trophy className="w-3.5 h-3.5" /> Puzzle Masters Hackathon 2026
              </span>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Final PPT Presentation Deck ({currentSlide}/{totalSlides})
              </h2>
            </div>
            <MagneticButton strength={0.4}>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </MagneticButton>
          </div>

          {/* Slide Canvas Area */}
          <div className="flex-1 overflow-y-auto p-8 sm:p-12 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white translate-z-5">
            
            {/* SLIDE 1: Title Card */}
            {currentSlide === 1 && (
              <div className="text-center max-w-3xl animate-in fade-in zoom-in-95 duration-300">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-sm font-medium mb-8 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Trophy className="w-4 h-4 text-cyan-400" /> Puzzle Masters Hackathon 2026 Submission
                </div>
                <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                  Crown <span className="text-cyan-400">Matrix</span>
                </h1>
                <p className="text-xl sm:text-2xl text-slate-300 font-light leading-relaxed mb-8">
                  An addictive spatial reasoning and constraint-satisfaction puzzle game based on the legendary 8-Queens mathematical challenge, reimagined for modern gamers.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-400">
                  <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">⚡ Constraint Satisfaction Engine</span>
                  <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">🧠 Smart AI Solver</span>
                  <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">🏆 Global Leaderboard</span>
                </div>
              </div>
            )}

            {/* SLIDE 2: Problem Statement */}
            {currentSlide === 2 && (
              <div className="max-w-3xl animate-in fade-in zoom-in-95 duration-300">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-cyan-400">01 / The Problem</h2>
                <h3 className="text-2xl font-bold mb-6 text-white">Traditional puzzles lack dynamic feedback and real-time algorithmic interaction.</h3>
                <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <strong className="text-white block mb-1">Static Gameplay:</strong> Most digital grid puzzles don't show real-time spatial conflict vectors or threat lines.
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <strong className="text-white block mb-1">Frustrating Dead Ends:</strong> Players get stuck without intelligent hints that explain *why* a move is invalid.
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <strong className="text-white block mb-1">Lack of Variety:</strong> Traditional Sudoku or N-Queens games repeat identical grid templates.
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3: Solution */}
            {currentSlide === 3 && (
              <div className="max-w-3xl animate-in fade-in zoom-in-95 duration-300">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-cyan-400">02 / The Solution</h2>
                <h3 className="text-2xl font-bold mb-6 text-white">Crown Matrix: Cyberpunk N-Queens with Laser Threat Vectors.</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-800/50">
                    <Zap className="w-8 h-8 text-cyan-400 mb-3" />
                    <h4 className="font-bold text-white mb-2">Real-Time Threat Detection</h4>
                    <p className="text-xs text-slate-300">Dynamic SVG laser lines instantly highlight diagonal, horizontal, vertical, and color region conflicts.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/50">
                    <Cpu className="w-8 h-8 text-amber-400 mb-3" />
                    <h4 className="font-bold text-white mb-2">Smart Solver Engine</h4>
                    <p className="text-xs text-slate-300">Backtracking AI solver provides step-by-step logical hints to guide the player without spoiling the puzzle.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4 to 10 fallback */}
            {currentSlide > 3 && (
              <div className="text-center max-w-2xl animate-in fade-in zoom-in-95 duration-300">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-cyan-400">Slide {currentSlide} / {totalSlides}</h2>
                <h3 className="text-xl font-bold mb-4 text-white">Crown Matrix Architecture & Features</h3>
                <p className="text-sm text-slate-300 mb-6">
                  Featuring 3D Micro-interactions, Web Audio Synthesizer, Global Leaderboard backend, Campaign Levels, Daily Matrix challenge, and custom Puzzle Builder mode.
                </p>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs font-mono text-cyan-300 space-y-2">
                  <div>✓ Constraint Satisfaction Engine (CSE) initialized</div>
                  <div>✓ SVG Vector Line Laser Overlay rendered</div>
                  <div>✓ Web Audio Sound Synthesizer active</div>
                  <div>✓ GPU-Accelerated 3D Parallax & Cursor Spotlight enabled</div>
                </div>
              </div>
            )}

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-t border-slate-800 translate-z-10">
            <MagneticButton strength={0.3}>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            </MagneticButton>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx + 1)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentSlide === idx + 1 ? 'w-8 bg-cyan-400' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <MagneticButton strength={0.3}>
              <button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </div>
        </SpotlightContainer>
      </TiltCard>
    </div>
  );
}
