import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Trophy, Zap, ShieldCheck, Cpu, Target, Award, Play } from 'lucide-react';

export default function PitchDeckModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 10;

  if (!isOpen) return null;

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 bg-cyan-950 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-800 font-semibold">
              <Trophy className="w-3.5 h-3.5" /> Puzzle Masters Hackathon 2026
            </span>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Final PPT Presentation Deck ({currentSlide}/{totalSlides})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Canvas Area */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white">
          
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
            </div>
          )}

          {/* SLIDE 2: Problem Statement & Vision */}
          {currentSlide === 2 && (
            <div className="w-full max-w-4xl animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">
                Problem Statement & Vision
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-cyan-500/50 transition-all">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">The Challenge</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    Traditional logic puzzles often suffer from being either overly academic and dry or lacking engaging progression mechanics that retain modern players.
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    The 8-Queens problem is a classic mathematical hurdle where 8 queens must be placed on an 8x8 matrix without mutual threats, yet raw math feels intimidating to casual users.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-cyan-500/50 transition-all">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">Our Solution</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    Transforming complex constraint satisfaction into an intuitive, visually stunning, and rewarding mobile/desktop puzzle experience.
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    We blend immersive neon design, progressive difficulty stages, real-time threat highlighting, and satisfying reward loops to make mastering algorithmic logic fun.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: Game Concept & Audience */}
          {currentSlide === 3 && (
            <div className="w-full max-w-4xl animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">
                Game Concept & Audience
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Concept', text: 'Strategic 8x8 grid manipulation where players position 8 royal crowns such that no two attack each other horizontally, vertically, diagonally, or within color regions.' },
                  { title: 'Target Audience', text: 'Logic puzzle enthusiasts, Sudoku & Chess fans, STEM students, and casual gamers looking for daily brain training.' },
                  { title: 'Core Appeal', text: 'Quick 2-minute brain exercise sessions paired with deep master-level algorithmic progression.' },
                  { title: 'Accessibility', text: 'Zero prior chess experience required; intuitive laser-line guidance teaches mechanics on the fly.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                    <span className="text-amber-400 mt-1">✦</span>
                    <div>
                      <strong className="text-cyan-300">{item.title}: </strong>
                      <span className="text-slate-300">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 4: Gameplay Mechanics */}
          {currentSlide === 4 && (
            <div className="w-full max-w-4xl animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">
                Gameplay Mechanics
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-center">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-800">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">8x8 Matrix Grid</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Interactive board requiring exactly one crown in each row, column, and color region, establishing spatial bounds.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-center">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-800">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">Zero-Threat Rule</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Winning requires zero conflicts across row, column, diagonal, and region attack vectors simultaneously.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-center">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-800">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">Dynamic Laser Lines</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Real-time threat visualizers highlight conflicting tiles instantly, giving instant visual feedback on illegal moves.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: Core Gameplay Features */}
          {currentSlide === 5 && (
            <div className="w-full max-w-4xl animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">
                Core Gameplay Features
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Cpu, title: 'Smart Backtracking Hint Engine', text: 'Analyzes current board state using recursive depth-first algorithms to guide players without revealing full answers.' },
                  { icon: Zap, title: 'Time Attack & Blitz Modes', text: 'Speed-run challenges for competitive players testing rapid combinatorial problem solving under strict timers.' },
                  { icon: Target, title: 'Daily Matrix Challenges', text: 'Procedurally generated board variants with pre-placed obstacle blocks to maintain daily retention.' },
                  { icon: Trophy, title: 'Leaderboards & Achievement Unlocks', text: 'Global ranking system, title progression, and visual crown customizations for top players.' }
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/80">
                    <div className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-800">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-cyan-300 text-sm">{feat.title}</h4>
                      <p className="text-xs text-slate-300">{feat.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 6: Game Flow & User Journey */}
          {currentSlide === 6 && (
            <div className="w-full max-w-4xl animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">
                Game Flow & User Journey
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { step: '1. Main Menu', desc: 'Dashboard featuring Campaign, Daily Puzzle, and Blitz modes with ambient soundtrack.' },
                  { step: '2. Placement', desc: 'Drag-and-drop or tap-to-place mechanics position crowns onto matrix tiles seamlessly.' },
                  { step: '3. Conflict Check', desc: 'Real-time validation engine highlights illegal diagonal and axial attack paths dynamically.' },
                  { step: '4. Victory', desc: 'Celebratory particle effects, score calculation, star rating, and level unlock progression.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 flex flex-col justify-between h-56">
                    <span className="text-cyan-400 font-bold text-lg">{item.step}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 7: UI/UX & Design System */}
          {currentSlide === 7 && (
            <div className="w-full max-w-4xl animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">
                UI/UX & Design System
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Cyber-Chess Aesthetic</h3>
                  <p className="text-sm text-slate-300 mb-3">
                    Dark mode optimized with deep slate backgrounds (<code className="text-cyan-400">#111827</code>), glowing neon cyan grid lines (<code className="text-cyan-400">#38BDF8</code>), and golden royal crowns (<code className="text-amber-400">#FBBF24</code>) for max visual contrast.
                  </p>
                  <p className="text-xs text-slate-400">
                    Minimalist HUD preserves focus entirely on spatial reasoning without screen clutter.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Accessibility & Ergonomics</h3>
                  <p className="text-sm text-slate-300 mb-3">
                    Designed mobile-first with touch-friendly 48px target bounds, custom haptic feedback, and adjustable colorblind laser indicators.
                  </p>
                  <p className="text-xs text-slate-400">
                    Fully compliant with WCAG AA accessibility standards across all screen resolutions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 8: Technology Stack */}
          {currentSlide === 8 && (
            <div className="w-full max-w-4xl animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">
                Technology Stack
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-cyan-400 uppercase font-semibold">
                    <tr>
                      <th className="p-4">Layer</th>
                      <th className="p-4">Technology Chosen</th>
                      <th className="p-4">Purpose & Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/80 text-slate-300">
                    <tr>
                      <td className="p-4 font-bold text-white">Frontend & UI</td>
                      <td className="p-4 text-cyan-300">React Web / HTML5 / CSS3</td>
                      <td className="p-4">Cross-platform web, Android (APK), and desktop deployment with 60 FPS visual rendering.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Game Engine & Logic</td>
                      <td className="p-4 text-cyan-300">JavaScript (Constraint Engine)</td>
                      <td className="p-4">Optimized recursive backtracking solver for instant move validation (&lt;2ms) and dynamic hints.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">State & Storage</td>
                      <td className="p-4 text-cyan-300">Local Storage / Express API</td>
                      <td className="p-4">Persisting player level progress, daily challenge streaks, and global competitive leaderboards.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Version Control</td>
                      <td className="p-4 text-cyan-300">GitHub Repository</td>
                      <td className="p-4">Collaborative source code management, continuous integration, and open documentation.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SLIDE 9: Development Roadmap */}
          {currentSlide === 9 && (
            <div className="w-full max-w-4xl animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">
                Development Roadmap
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { phase: 'Phase 1: Ideation', desc: 'Algorithm design, board constraint rules, and interactive wireframes.' },
                  { phase: 'Phase 2: Core Build', desc: 'Drag-and-drop placement system & instant conflict validator engine.' },
                  { phase: 'Phase 3: Polish', desc: 'Adding dynamic sound design, neon visual FX, and hint solver integration.' },
                  { phase: 'Phase 4: Finale', desc: 'Multi-platform build export (APK/Web), GitHub setup, and demo video.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 flex flex-col justify-between h-56">
                    <span className="text-cyan-400 font-bold text-sm">{item.phase}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 10: Conclusion & Submission */}
          {currentSlide === 10 && (
            <div className="text-center max-w-3xl animate-in fade-in zoom-in-95 duration-300">
              <h2 className="text-5xl font-extrabold text-white mb-6">
                Ready to Conquer the <span className="text-cyan-400">Matrix</span>?
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Aligning 100% with Puzzle Masters Hackathon 2026 Evaluation Standards
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-10 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">Innovation (25%)</span>
                <span className="px-3 py-1.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">Gameplay (25%)</span>
                <span className="px-3 py-1.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">Technical (20%)</span>
                <span className="px-3 py-1.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">UI/UX (15%)</span>
                <span className="px-3 py-1.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">Creativity (10%)</span>
                <span className="px-3 py-1.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">Presentation (5%)</span>
              </div>

              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-sm shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <Trophy className="w-5 h-5 text-amber-400" /> GitHub Repository & Live Demo Ready for Submission
              </div>
            </div>
          )}

        </div>

        {/* Controls Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

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

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
