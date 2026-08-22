import React, { useState } from 'react';
import { X, Play, Video, Award, CheckCircle, Code, Cpu, Sparkles } from 'lucide-react';

export default function DemoVideoModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('script');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center border border-red-800">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">2–5 Min Hackathon Demo Video & Showcase</h2>
              <p className="text-xs text-slate-400">Puzzle Masters Hackathon 2026 Pitch Material</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950 px-6 gap-6">
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-300 text-sm">
          
          {activeTab === 'script' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs">
                💡 <strong>Demo Video Production Guide:</strong> Use OBS or Loom to record the live running app following this 3.5-minute pitch transcript.
              </div>

              <div className="space-y-4">
                {[
                  {
                    time: '0:00 - 0:45',
                    title: 'Scene 1: Hook & The 8-Queens Problem Reimagined',
                    script: 'Welcome judges! Traditional math puzzles can feel intimidating or repetitive. Crown Matrix transforms the classic 8-Queens constraint satisfaction challenge into an addictive, cyber-chess spatial experience with custom color-coded territories.',
                    visual: 'Show Main Menu, cyber slate theme, sound toggles, and start Level 5 (The Grand Finale 8x8).'
                  },
                  {
                    time: '0:45 - 1:30',
                    title: 'Scene 2: Core Gameplay & Real-Time Laser Threat Engine',
                    script: 'Notice how every crown placement dynamically projects SVG laser threat vectors across rows, columns, diagonals, and color regions. Placing two attacking crowns instantly activates red glowing laser lines and audio warnings.',
                    visual: 'Tap tiles to place crowns, show red laser line animation on conflicts, toggle X-marks.'
                  },
                  {
                    time: '1:30 - 2:30',
                    title: 'Scene 3: Smart Backtracking Hint Solver & Blitz Mode',
                    script: 'Stuck on a tricky level? Click "Smart Hint". Our recursive depth-first backtracking algorithm evaluates all possible branch states in under 2ms to guide players without giving away full solutions. Then watch Blitz Mode for high-speed 60s challenges!',
                    visual: 'Click Smart Hint, watch green/blue highlight sparkles, solve level to trigger celebratory fireworks.'
                  },
                  {
                    time: '2:30 - 3:15',
                    title: 'Scene 4: Daily Matrix & Competitive Leaderboards',
                    script: 'Every day players receive a seed-generated Daily Matrix puzzle with streak tracking and a global real-time leaderboard powered by our Express REST API backend.',
                    visual: 'Switch to Daily Challenge tab, show Leaderboard modal with rankings and stats.'
                  },
                  {
                    time: '3:15 - 3:45',
                    title: 'Scene 5: Technical Stack & Conclusion',
                    script: 'Built with React, HTML5 Canvas/SVG, Web Audio API synthesizer, Node.js REST API, and packaged for Web, Android, and Desktop. Thank you for evaluating Crown Matrix!',
                    visual: 'Open built-in 10-slide Pitch Deck modal and show GitHub repository link.'
                  }
                ].map((scene, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-cyan-400">{scene.title}</span>
                      <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md">{scene.time}</span>
                    </div>
                    <p className="text-slate-200 text-sm italic">"{scene.script}"</p>
                    <p className="text-xs text-slate-400">🎬 <strong>Visual Actions:</strong> {scene.visual}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'judging' && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { weight: '25%', name: 'Innovation', desc: 'Reimagines classic 8-Queens logic into a region-constrained spatial puzzle with dynamic laser threat vectors.' },
                { weight: '25%', name: 'Gameplay', desc: '4 game modes (Campaign, Daily, Blitz, Builder), tap/double-tap controls, hint solver, and victory fanfare.' },
                { weight: '20%', name: 'Technical Implementation', desc: 'Recursive DFS backtracking engine (<2ms), Web Audio synth, React + SVG laser rendering, Node Express API.' },
                { weight: '15%', name: 'UI/UX', desc: 'Cyber-Chess aesthetic (#111827 deep slate, #38BDF8 cyan, #FBBF24 gold), 48px touch targets, WCAG AA.' },
                { weight: '10%', name: 'Creativity', desc: 'Built-in 10-slide presentation deck modal, Web Audio synthesizer without external assets, laser beam visualizers.' },
                { weight: '5%', name: 'Presentation', desc: 'Comprehensive README, Mermaid architecture diagrams, demo video script, complete GitHub repository commit.' }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-base">{item.name}</h3>
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
                      {item.weight}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors"
          >
            Close Showcase
          </button>
        </div>

      </div>
    </div>
  );
}
