import React from 'react';
import { Crown, Volume2, VolumeX, Trophy, Video, Presentation, Zap, Calendar, Grid, Play } from 'lucide-react';
import { sound } from '../logic/soundEngine';
import MagneticButton from './effects/MagneticButton';
import SpotlightContainer from './effects/SpotlightContainer';

export default function Header({
  mode,
  setMode,
  muted,
  setMuted,
  onOpenDeck,
  onOpenVideo,
  onOpenLeaderboard
}) {
  const toggleAudio = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
    if (!isMuted) sound.playTap();
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <SpotlightContainer className="flex items-center gap-3 p-1.5 rounded-2xl">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-amber-500 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-float-3d">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">
                Crown <span className="text-cyan-400">Matrix</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Hackathon 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              8-Queens Constraint Satisfaction Puzzle Game
            </p>
          </div>
        </SpotlightContainer>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold overflow-x-auto max-w-full">
          <MagneticButton strength={0.25}>
            <button
              onClick={() => { setMode('campaign'); sound.playTap(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                mode === 'campaign'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Campaign
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              onClick={() => { setMode('daily'); sound.playTap(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                mode === 'daily'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Daily Matrix
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              onClick={() => { setMode('blitz'); sound.playTap(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                mode === 'blitz'
                  ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" /> Blitz (60s)
            </button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <button
              onClick={() => { setMode('builder'); sound.playTap(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                mode === 'builder'
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Play className="w-3.5 h-3.5" /> Builder
            </button>
          </MagneticButton>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* 10-Slide Pitch Deck Button */}
          <MagneticButton strength={0.3}>
            <button
              onClick={() => { onOpenDeck(); sound.playTap(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-cyan-300 hover:text-white text-xs font-bold transition-all shadow-sm"
              title="Open 10-Slide Hackathon Presentation Deck"
            >
              <Presentation className="w-4 h-4 text-cyan-400" />
              <span className="hidden lg:inline">Final PPT</span>
            </button>
          </MagneticButton>

          {/* Demo Video Script Button */}
          <MagneticButton strength={0.3}>
            <button
              onClick={() => { onOpenVideo(); sound.playTap(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-red-500 text-red-300 hover:text-white text-xs font-bold transition-all shadow-sm"
              title="Open Demo Video Script & Showcase"
            >
              <Video className="w-4 h-4 text-red-400" />
              <span className="hidden lg:inline">Demo Video</span>
            </button>
          </MagneticButton>

          {/* Leaderboard Button */}
          <MagneticButton strength={0.35}>
            <button
              onClick={() => { onOpenLeaderboard(); sound.playTap(); }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 text-amber-400 transition-all"
              title="Global Leaderboard"
            >
              <Trophy className="w-4 h-4" />
            </button>
          </MagneticButton>

          {/* Mute/Unmute Toggle */}
          <MagneticButton strength={0.35}>
            <button
              onClick={toggleAudio}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 transition-all"
              title={muted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
          </MagneticButton>
        </div>

      </div>
    </header>
  );
}
