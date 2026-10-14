import React, { useState, useEffect } from 'react';
import { Play, Cpu, GitBranch, Sparkles, ArrowRight, ShieldCheck, Footprints, Layers, Zap } from 'lucide-react';
import { GameMode, Difficulty } from '../game/gameTypes';

interface HomePageProps {
  onStartGame: (mode: GameMode, difficulty: Difficulty) => void;
  onExploreAlgorithms: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartGame, onExploreAlgorithms }) => {
  // Animated mini maze preview loop
  const [activeStep, setActiveStep] = useState(0);

  // A tiny 5x5 preview maze
  const previewGrid = [
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0]
  ];

  const previewPath = [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
    { r: 1, c: 1 },
    { r: 2, c: 1 },
    { r: 2, c: 2 },
    { r: 2, c: 3 },
    { r: 2, c: 4 },
    { r: 3, c: 4 },
    { r: 4, c: 4 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % previewPath.length);
    }, 400);
    return () => clearInterval(timer);
  }, [previewPath.length]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 sm:py-12 px-4 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Maze & Pathfinding Suite</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
          Maze Runner
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
          Generate a maze. Find your path. Master the algorithms.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            type="button"
            onClick={() => onStartGame('manual', 'easy')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm sm:text-base hover:bg-emerald-700 active:scale-98 transition-all shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Playing</span>
          </button>

          <button
            type="button"
            onClick={onExploreAlgorithms}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-300 active:scale-98 transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4 text-blue-500" />
            <span>Explore Algorithms</span>
          </button>
        </div>

        {/* Animated Mini Maze Preview */}
        <div className="inline-block p-3 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-200/50">
          <div className="w-36 h-36 grid grid-cols-5 gap-1">
            {previewGrid.map((row, r) =>
              row.map((cell, c) => {
                const isWall = cell === 1;
                const isStart = r === 0 && c === 0;
                const isExit = r === 4 && c === 4;
                const playerPos = previewPath[activeStep];
                const isPlayer = playerPos.r === r && playerPos.c === c;
                const isTrail = previewPath.slice(0, activeStep).some(p => p.r === r && p.c === c);

                let bg = 'bg-slate-50 border border-slate-200/60';
                if (isWall) bg = 'bg-slate-800';
                else if (isPlayer) bg = 'bg-emerald-500 ring-2 ring-emerald-300 ring-offset-1';
                else if (isTrail) bg = 'bg-blue-100 border-blue-200';
                else if (isStart) bg = 'bg-emerald-100 text-emerald-700 font-bold';
                else if (isExit) bg = 'bg-amber-100 text-amber-700 font-bold';

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`aspect-square rounded flex items-center justify-center text-[10px] transition-colors duration-150 ${bg}`}
                  >
                    {isStart && !isPlayer && 'S'}
                    {isExit && !isPlayer && 'E'}
                  </div>
                );
              })
            )}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2 text-center">
            Live Recursive Maze Preview
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {/* Card 1: Manual Mode */}
        <div
          onClick={() => onStartGame('manual', 'easy')}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Footprints className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>Manual Mode</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Navigate the maze using WASD, Arrow keys, or on-screen touch controls. Watch out for walls: you start with 3 lives and lose one per collision.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <span>Play Now</span>
          </div>
        </div>

        {/* Card 2: BFS Solver */}
        <div
          onClick={() => onStartGame('bfs', 'moderate')}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>BFS Shortest-Path</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Witness Breadth-First Search explore layer by layer via a FIFO queue, guaranteeing the mathematically shortest path to the exit.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center gap-1">
            <span>Watch BFS in Action</span>
          </div>
        </div>

        {/* Card 3: DFS Solver */}
        <div
          onClick={() => onStartGame('dfs', 'moderate')}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1.5 flex items-center justify-between">
              <span>DFS Backtracking</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Observe Depth-First Search with an explicit stack exploring deep corridors and dynamically backtracking when hitting dead ends.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-semibold text-indigo-600 flex items-center gap-1">
            <span>Watch DFS in Action</span>
          </div>
        </div>
      </div>

      {/* Brief Explanation of Generation & Pathfinding */}
      <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 text-center max-w-3xl">
        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
          Random Maze Generation & Unweighted Pathfinding
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto mb-4">
          Every maze is procedurally generated in real-time using <strong>Recursive Backtracking</strong> with randomized direction ordering, ensuring no accidental loops and guaranteeing a continuous solvable route from Start to Exit.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            100% Solvable Mazes
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Layers className="w-4 h-4 text-blue-500" />
            3 Difficulty Grids (5×5, 8×8, 12×12)
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-amber-500" />
            Accurate Move & Time Scoring
          </span>
        </div>
      </div>
    </div>
  );
};
