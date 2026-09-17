import React, { useRef, useEffect, useState } from 'react';
import { Crown, X, Sparkles } from 'lucide-react';
import { REGION_COLORS } from '../logic/levels';
import TiltCard from './effects/TiltCard';
import SpotlightContainer from './effects/SpotlightContainer';

export default function GameBoard({
  board,
  size,
  regions,
  threats,
  hint,
  onTileClick,
  onTileRightClick,
  readOnly = false
}) {
  const boardRef = useRef(null);
  const [cellCoords, setCellCoords] = useState({});

  // Recalculate cell centers for laser lines on mount / resize / board change
  const updateCoords = () => {
    if (!boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const coords = {};

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const el = boardRef.current.querySelector(`[data-cell="${r}-${c}"]`);
        if (el) {
          const rect = el.getBoundingClientRect();
          coords[`${r},${c}`] = {
            x: rect.left + rect.width / 2 - boardRect.left,
            y: rect.top + rect.height / 2 - boardRect.top
          };
        }
      }
    }
    setCellCoords(coords);
  };

  useEffect(() => {
    updateCoords();
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, [size, board]);

  return (
    <div className="relative flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* 3D Tilt Wrapper around Game Board */}
      <TiltCard maxTilt={8} scale={1.01} className="w-full max-w-[560px]">
        <SpotlightContainer
          spotlightColor="rgba(6, 182, 212, 0.25)"
          spotlightSize={450}
          className="rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-slate-900/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Board Container with Cyber Neon Glow and 3D Layering */}
          <div
            ref={boardRef}
            className="relative grid gap-1.5 p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 backdrop-blur-md transition-all duration-300 preserve-3d"
            style={{
              gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
              width: '100%',
              aspectRatio: '1 / 1'
            }}
          >
            {/* Dynamic Neon Laser Vector Lines SVG Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-2xl translate-z-10"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Render red laser lines for every conflict pair */}
              {threats.conflicts.map((conflict, idx) => {
                const p1 = cellCoords[`${conflict.from[0]},${conflict.from[1]}`];
                const p2 = cellCoords[`${conflict.to[0]},${conflict.to[1]}`];
                if (!p1 || !p2) return null;

                return (
                  <g key={`laser-${idx}`}>
                    {/* Thick Glowing Underline */}
                    <line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="url(#laserGrad)"
                      strokeWidth="4"
                      strokeDasharray="6 4"
                      filter="url(#laserGlow)"
                      className="animate-pulse"
                    />
                    {/* Pulsing Core Beam */}
                    <line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Matrix Grid Cells with 3D Depth */}
            {board.map((row, r) =>
              row.map((val, c) => {
                const regionIdx = regions[r][c];
                const regionStyle = REGION_COLORS[regionIdx % REGION_COLORS.length];
                const isConflicting = threats.conflictingCellKeys.has(`${r},${c}`);
                const isThreatened = threats.threatened[r][c];
                const isHinted = hint && hint.highlightCell && hint.highlightCell[0] === r && hint.highlightCell[1] === c;

                return (
                  <button
                    key={`${r}-${c}`}
                    data-cell={`${r}-${c}`}
                    disabled={readOnly}
                    onClick={() => onTileClick(r, c)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onTileRightClick(r, c);
                    }}
                    className={`
                      relative flex items-center justify-center rounded-xl transition-all duration-200 preserve-3d
                      min-h-[44px] sm:min-h-[56px] focus:outline-none focus:ring-2 focus:ring-cyan-400
                      ${isConflicting ? 'bg-red-950/80 border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-pulse z-10 translate-z-10' : ''}
                      ${isHinted ? 'ring-4 ring-cyan-400 ring-offset-2 ring-offset-slate-900 animate-bounce z-10 translate-z-10' : ''}
                      ${!isConflicting && !isHinted ? 'border hover:scale-[1.04] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(6,182,212,0.25)] active:scale-95' : ''}
                    `}
                    style={{
                      backgroundColor: isConflicting ? undefined : regionStyle.bg,
                      borderColor: isConflicting ? undefined : regionStyle.border,
                      boxShadow: isConflicting
                        ? undefined
                        : isThreatened
                        ? 'inset 0 0 14px rgba(6, 182, 212, 0.25)'
                        : '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                  >
                    {/* Threat Indicator Dot */}
                    {isThreatened && val === 0 && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400/50 animate-ping absolute translate-z-5" />
                    )}

                    {/* Hint Shimmer Icon */}
                    {isHinted && val === 0 && (
                      <Sparkles className="w-6 h-6 text-cyan-300 animate-spin absolute translate-z-10" />
                    )}

                    {/* Crown (State 1) with 3D Elevation */}
                    {val === 1 && (
                      <div className="relative flex items-center justify-center animate-in zoom-in-50 duration-200 translate-z-20">
                        <Crown className={`w-7 h-7 sm:w-9 sm:h-9 ${isConflicting ? 'text-red-400 drop-shadow-[0_0_16px_rgba(239,68,68,0.9)]' : 'text-amber-400 drop-shadow-[0_0_16px_rgba(245,158,11,0.9)]'}`} />
                      </div>
                    )}

                    {/* Cross X-Mark (State 2) */}
                    {val === 2 && (
                      <div className="flex items-center justify-center animate-in fade-in duration-150 translate-z-10">
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400/80" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </SpotlightContainer>
      </TiltCard>

      {/* Touch Control Helper Footer */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400 font-medium">
        <span className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400" /> Tap: Crown
        </span>
        <span className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 shadow-sm">
          <X className="w-3.5 h-3.5 text-slate-400" /> Double Tap / Right Click: X-Mark
        </span>
      </div>
    </div>
  );
}
