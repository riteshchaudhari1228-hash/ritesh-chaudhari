import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Skull, RotateCcw, RefreshCw, ArrowRight, Heart } from 'lucide-react';
import { DIFFICULTY_CONFIGS, GameStats } from '../game/gameTypes';
import { formatTime } from '../game/scoring';

interface GameResultsProps {
  stats: GameStats;
  onPlayAgain: () => void;
  onRetryCurrentMaze: () => void;
  onNextDifficulty?: () => void;
}

export const GameResults: React.FC<GameResultsProps> = ({
  stats,
  onPlayAgain,
  onRetryCurrentMaze,
  onNextDifficulty
}) => {
  const isVictory = stats.status === 'won';
  const diffConfig = DIFFICULTY_CONFIGS[stats.difficulty];

  // Fire restrained confetti on victory
  useEffect(() => {
    if (isVictory) {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#059669']
      });
    }
  }, [isVictory]);

  const penaltyMoves = stats.moves * 5;
  const penaltyTime = Math.floor(stats.elapsedSeconds * 10);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-pop">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center">
        {/* Header Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
            isVictory
              ? 'bg-emerald-500 text-white shadow-emerald-500/30'
              : 'bg-rose-500 text-white shadow-rose-500/30'
          }`}
        >
          {isVictory ? (
            <Trophy className="w-8 h-8 stroke-[2.2]" />
          ) : (
            <Skull className="w-8 h-8 stroke-[2.2]" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-1">
          {isVictory ? 'Maze Conquered!' : 'Out of Lives!'}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {isVictory
            ? `You navigated the ${diffConfig.name} (${diffConfig.label}) maze successfully.`
            : `You collided with too many walls. Keep your focus and try again!`}
        </p>

        {/* Score & Breakdown Card */}
        {isVictory && (
          <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Final Score
              </span>
              <span className="text-2xl font-black text-emerald-600 font-mono">
                {stats.score} <span className="text-xs text-slate-400 font-sans">pts</span>
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-500 flex flex-col gap-1 font-mono">
              <div className="flex justify-between">
                <span>Base Score:</span>
                <span>1000 pts</span>
              </div>
              <div className="flex justify-between text-rose-500">
                <span>Moves Penalty ({stats.moves} × 5):</span>
                <span>-{penaltyMoves} pts</span>
              </div>
              <div className="flex justify-between text-rose-500">
                <span>Time Penalty ({formatTime(stats.elapsedSeconds)} × 10):</span>
                <span>-{penaltyTime} pts</span>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-left">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block">
              Total Moves
            </span>
            <span className="text-lg font-bold text-slate-800">{stats.moves} steps</span>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-left">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block">
              Time Taken
            </span>
            <span className="text-lg font-bold text-slate-800 font-mono">
              {formatTime(stats.elapsedSeconds)}
            </span>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-left">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block">
              Lives Left
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              {[1, 2, 3].map(i => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${
                    i <= stats.lives
                      ? 'text-rose-500 fill-rose-500'
                      : 'text-slate-200 fill-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-left">
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 block">
              Difficulty
            </span>
            <span className="text-lg font-bold text-slate-800">{diffConfig.name}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2">
          {isVictory ? (
            <>
              <button
                type="button"
                onClick={onPlayAgain}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 active:scale-98 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Play New Maze</span>
              </button>

              {onNextDifficulty && stats.difficulty !== 'difficult' && (
                <button
                  type="button"
                  onClick={onNextDifficulty}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <span>Next Difficulty</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onRetryCurrentMaze}
                className="w-full py-3 px-4 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 active:scale-98 transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry This Maze</span>
              </button>

              <button
                type="button"
                onClick={onPlayAgain}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate New Maze</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
