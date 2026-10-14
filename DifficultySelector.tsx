import React from 'react';
import { User, Cpu, GitBranch } from 'lucide-react';
import { Difficulty, GameMode, DIFFICULTY_CONFIGS } from '../game/gameTypes';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onSelectDifficulty,
  currentMode,
  onSelectMode
}) => {
  const modes: { mode: GameMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'manual', label: 'Manual Play', icon: <User className="w-4 h-4" /> },
    { mode: 'bfs', label: 'BFS Shortest Path', icon: <Cpu className="w-4 h-4" /> },
    { mode: 'dfs', label: 'DFS Backtracking', icon: <GitBranch className="w-4 h-4" /> }
  ];

  const difficulties: Difficulty[] = ['easy', 'moderate', 'difficult'];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Mode Selector */}
      <div className="bg-slate-100 p-1 rounded-xl flex items-center justify-between border border-slate-200/80">
        {modes.map(item => {
          const isActive = currentMode === item.mode;
          return (
            <button
              key={item.mode}
              type="button"
              onClick={() => onSelectMode(item.mode)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all focus:outline-none ${
                isActive
                  ? 'bg-white text-slate-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Difficulty Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1 hidden sm:inline">
          Difficulty:
        </span>
        <div className="flex-1 grid grid-cols-3 gap-2">
          {difficulties.map(diff => {
            const config = DIFFICULTY_CONFIGS[diff];
            const isActive = currentDifficulty === diff;
            return (
              <button
                key={diff}
                type="button"
                onClick={() => onSelectDifficulty(diff)}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all focus:outline-none ${
                  isActive
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm shadow-emerald-500/20 font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 font-medium'
                }`}
              >
                <div className="text-xs sm:text-sm">{config.name}</div>
                <div className={`text-[10px] font-mono ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {config.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
