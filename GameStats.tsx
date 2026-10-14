import React from 'react';
import { Heart, Timer, Trophy, Compass, Footprints } from 'lucide-react';
import { GameMode, GameStats, DIFFICULTY_CONFIGS } from '../game/gameTypes';
import { formatTime } from '../game/scoring';

interface GameStatsProps {
  stats: GameStats;
  mode: GameMode;
}

export const GameStatsPanel: React.FC<GameStatsProps> = ({ stats, mode }) => {
  const diffConfig = DIFFICULTY_CONFIGS[stats.difficulty];

  // Map status to badge style
  const getStatusBadge = () => {
    switch (stats.status) {
      case 'idle':
        return { text: 'Ready', bg: 'bg-slate-100 text-slate-700 border-slate-300' };
      case 'playing':
        return { text: 'Exploring', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'won':
        return { text: 'Victory!', bg: 'bg-emerald-500 text-white border-emerald-600' };
      case 'lost':
        return { text: 'Game Over', bg: 'bg-rose-500 text-white border-rose-600' };
      case 'solving':
        return { text: 'Solving...', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'paused':
        return { text: 'Paused', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'solved':
        return { text: 'Path Found', bg: 'bg-blue-500 text-white border-blue-600' };
      default:
        return { text: 'Ready', bg: 'bg-slate-100 text-slate-700 border-slate-300' };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5">
      {/* Top Header: Difficulty and Status Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Difficulty:
          </span>
          <span className="font-bold text-slate-800 text-sm bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            {diffConfig.name} ({diffConfig.label})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Status:
          </span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusBadge.bg} transition-all`}>
            {statusBadge.text}
          </span>
        </div>
      </div>

      {/* Grid of Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Moves / Path Length */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">
              {mode === 'manual' ? 'Moves' : 'Path Length'}
            </span>
            <Footprints className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {mode === 'manual' ? stats.moves : stats.finalPathLength}
            <span className="text-xs font-normal text-slate-400 ml-1">steps</span>
          </div>
        </div>

        {/* Lives / Explored Cells */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">
              {mode === 'manual' ? 'Lives' : 'Explored'}
            </span>
            {mode === 'manual' ? (
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            ) : (
              <Compass className="w-4 h-4 text-blue-500" />
            )}
          </div>
          {mode === 'manual' ? (
            <div className="flex items-center gap-1.5 h-8">
              {[1, 2, 3].map(i => (
                <Heart
                  key={i}
                  className={`w-6 h-6 transition-all ${
                    i <= stats.lives
                      ? 'text-rose-500 fill-rose-500 scale-100'
                      : 'text-slate-200 fill-slate-200 scale-90'
                  }`}
                />
              ))}
            </div>
          ) : (
            <div className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {stats.exploredCount}
              <span className="text-xs font-normal text-slate-400 ml-1">cells</span>
            </div>
          )}
        </div>

        {/* Time Elapsed */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Time</span>
            <Timer className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-800 tracking-tight font-mono">
            {formatTime(stats.elapsedSeconds)}
          </div>
        </div>

        {/* Current Score / Mode Feature */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Score</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {stats.score}
            <span className="text-xs font-normal text-slate-400 ml-1">pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
