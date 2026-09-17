import React, { useState } from 'react';
import { X, Play, Video, Award, CheckCircle, Code, Cpu, Sparkles } from 'lucide-react';
import SpotlightContainer from './effects/SpotlightContainer';
import TiltCard from './effects/TiltCard';
import MagneticButton from './effects/MagneticButton';

export default function DemoVideoModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('script');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <TiltCard maxTilt={4} scale={1.01} className="w-full max-w-4xl max-h-[85vh]">
        <SpotlightContainer
          spotlightColor="rgba(239, 68, 68, 0.2)"
          className="relative w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_80px_rgba(239,68,68,0.2)] overflow-hidden flex flex-col preserve-3d"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 translate-z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center border border-red-800">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">2–5 Min Hackathon Demo Video & Showcase</h2>
                <p className="text-xs text-slate-400">Puzzle Masters Hackathon 2026 Pitch Material</p>
              </div>
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

          {/* Tab Selector */}
          <div className="flex border-b border-slate-800 bg-slate-950 px-6 gap-6 translate-z-5">
            <button
              onClick={() => setActiveTab('script')}
              className={`py-3 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'script' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-4 h-4" /> Video Presentation Script
            </button>
            <button
              onClick={() => setActiveTab('judging')}
              className={`py-3 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'judging' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" /> Judging Criteria (100%)
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 translate-z-5">
            {activeTab === 'script' && (
              <div className="space-y-6 text-sm text-slate-300">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-white mb-2 text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" /> Demo Video Script Overview (3 Minutes)
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Designed for official Hackathon judging. Follow this timing to highlight Crown Matrix's key technical innovations, constraint solver engine, 3D micro-interactions, and gameplay UX.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 font-bold text-xs">0:00 – 0:45</span>
                    <h5 className="font-bold text-white text-base mt-1">Introduction & The Core Puzzle Concept</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Showcase the 8-Queens constraint satisfaction challenge. Explain how region colors and non-attacking rules create spatial reasoning pressure.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 font-bold text-xs">0:45 – 1:30</span>
                    <h5 className="font-bold text-white text-base mt-1">Interactive 3D Graphics & Cursor Spotlight</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Demonstrate the smooth cursor follower dot, 3D card tilt parallax, laser threat collision lines, and magnetic action buttons.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 font-bold text-xs">1:30 – 2:30</span>
                    <h5 className="font-bold text-white text-base mt-1">Smart Hint Solver & Blitz Mode</h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Trigger the Smart Hint button to reveal logical deduction steps. Demonstrate Blitz Mode under 60-second time pressure and victory celebration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'judging' && (
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-cyan-400 mb-2">Technical Execution & Performance</h4>
                  <p className="text-xs text-slate-300">GPU-accelerated transforms, rAF throttling, zero layout thrashing, modular custom components.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-amber-400 mb-2">UI/UX & Micro-Interactions</h4>
                  <p className="text-xs text-slate-300">3D tilt parallax, radial spotlight gradient, magnetic button thresholding, trailing cursor lerp.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-emerald-400 mb-2">Accessibility & Responsiveness</h4>
                  <p className="text-xs text-slate-300">Full support for `prefers-reduced-motion` and touch/coarse pointer media queries.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="font-bold text-purple-400 mb-2">Game Design & Polish</h4>
                  <p className="text-xs text-slate-300">Web Audio synthesis, victory confetti, leaderboard persistence, pitch deck presentation.</p>
                </div>
              </div>
            )}
          </div>

        </SpotlightContainer>
      </TiltCard>
    </div>
  );
}
