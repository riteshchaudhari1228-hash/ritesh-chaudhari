import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Home,
  Eye,
  SkipForward,
  Gauge
} from 'lucide-react';
import { GameMode } from '../game/gameTypes';

interface GameControlsProps {
  mode: GameMode;
  isSolving: boolean;
  isPaused: boolean;
  speed: number;
  onSetSpeed: (speed: number) => void;
  onStartSolver: () => void;
  onPauseSolver: () => void;
  onResumeSolver: () => void;
  onStepForward: () => void;
  onResetCurrentMaze: () => void;
  onNewMaze: () => void;
  onShowSolution: () => void;
  onReturnToMenu: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  mode,
  isSolving,
  isPaused,
  speed,
  onSetSpeed,
  onStartSolver,
  onPauseSolver,
  onResumeSolver,
  onStepForward,
  onResetCurrentMaze,
  onNewMaze,
  onShowSolution,
  onReturnToMenu
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 flex flex-col gap-4">
      {/* Primary Actions row: New Maze, Restart, Show Solution, Menu */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={onNewMaze}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 active:scale-98 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1"
        >
          <RefreshCw className="w-4 h-4" />
          <span>New Maze</span>
        </button>

        <button
          type="button"
          onClick={onResetCurrentMaze}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 active:scale-98 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>Restart Maze</span>
        </button>

        <button
          type="button"
          onClick={onShowSolution}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 text-white font-semibold text-xs sm:text-sm hover:bg-amber-600 active:scale-98 transition-all shadow-sm shadow-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1"
        >
          <Eye className="w-4 h-4" />
          <span>Show Solution</span>
        </button>

        <button
          type="button"
          onClick={onReturnToMenu}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-200 active:scale-98 transition-all focus:outline-none"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Menu</span>
        </button>
      </div>

      {/* Algorithm Solver Controls (Shown when in BFS or DFS mode) */}
      {mode !== 'manual' && (
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Solver Controls
            </span>

            {/* Speed Selector */}
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Speed:</span>
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                {[
                  { label: 'Slow', val: 240 },
                  { label: 'Normal', val: 100 },
                  { label: 'Fast', val: 30 }
                ].map(s => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => onSetSpeed(s.val)}
                    className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
                      speed === s.val
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {!isSolving ? (
              <button
                type="button"
                onClick={onStartSolver}
                className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-500/20"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start {mode.toUpperCase()} Solver</span>
              </button>
            ) : isPaused ? (
              <button
                type="button"
                onClick={onResumeSolver}
                className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 active:scale-98 transition-all shadow-md shadow-blue-500/20"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onPauseSolver}
                className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 text-white font-bold text-xs sm:text-sm hover:bg-amber-600 active:scale-98 transition-all shadow-md shadow-amber-500/20"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </button>
            )}

            <button
              type="button"
              onClick={onStepForward}
              disabled={isSolving && !isPaused}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 active:scale-98 transition-all disabled:opacity-40"
              title="Execute next discrete algorithm step"
            >
              <SkipForward className="w-4 h-4 text-blue-500" />
              <span>Step</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
