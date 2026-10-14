import React, { useMemo } from 'react';
import { MazeData, Point, VisualCellState } from '../game/gameTypes';

interface MazeBoardProps {
  maze: MazeData;
  playerPos: Point | null;
  hitWallPoint: Point | null;
  visitedPoints?: Point[];
  backtrackedPoints?: Point[];
  solutionPath?: Point[];
  activeAlgorithmCell?: Point | null;
  mode: 'manual' | 'bfs' | 'dfs';
}

export const MazeBoard: React.FC<MazeBoardProps> = ({
  maze,
  playerPos,
  hitWallPoint,
  visitedPoints = [],
  backtrackedPoints = [],
  solutionPath = [],
  activeAlgorithmCell = null,
  mode
}) => {
  const { rows, cols, grid, start, exit } = maze;

  // Build lookup sets for fast O(1) checks per cell
  const visitedSet = useMemo(() => {
    const s = new Set<string>();
    visitedPoints.forEach(p => s.add(`${p.r},${p.c}`));
    return s;
  }, [visitedPoints]);

  const backtrackedSet = useMemo(() => {
    const s = new Set<string>();
    backtrackedPoints.forEach(p => s.add(`${p.r},${p.c}`));
    return s;
  }, [backtrackedPoints]);

  const solutionSet = useMemo(() => {
    const s = new Set<string>();
    solutionPath.forEach(p => s.add(`${p.r},${p.c}`));
    return s;
  }, [solutionPath]);

  // Determine visual state of a cell
  const getCellState = (r: number, c: number): VisualCellState => {
    const key = `${r},${c}`;

    // If player is on this cell in manual mode
    if (mode === 'manual' && playerPos && playerPos.r === r && playerPos.c === c) {
      return 'player';
    }

    // Solution path
    if (solutionSet.has(key)) {
      return 'solution';
    }

    // Exit cell
    if (exit.r === r && exit.c === c) {
      return 'exit';
    }

    // Start cell
    if (start.r === r && start.c === c) {
      return 'start';
    }

    // Wall
    if (grid[r][c] === 1) {
      return 'wall';
    }

    // Backtracking cell in DFS
    if (backtrackedSet.has(key)) {
      return 'backtracking';
    }

    // Visited cell in BFS / DFS
    if (visitedSet.has(key)) {
      return 'visited';
    }

    return 'path';
  };

  return (
    <div className="w-full flex justify-center items-center p-2 sm:p-4">
      <div
        className="w-full max-w-[480px] sm:max-w-[520px] aspect-square bg-slate-900/5 p-2 sm:p-3 rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all duration-200"
        role="grid"
        aria-label="Maze Board"
      >
        <div
          className="w-full h-full grid gap-1 sm:gap-1.5"
          style={{
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
          }}
        >
          {grid.map((row, r) =>
            row.map((_, c) => {
              const state = getCellState(r, c);
              const isHitWall = hitWallPoint && hitWallPoint.r === r && hitWallPoint.c === c;
              const isActiveAlgorithm = activeAlgorithmCell && activeAlgorithmCell.r === r && activeAlgorithmCell.c === c;
              const isStart = start.r === r && start.c === c;
              const isExit = exit.r === r && exit.c === c;

              // Compute styling based on cell state
              let cellClasses = 'relative aspect-square rounded-md sm:rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm select-none transition-all duration-150 ';

              if (state === 'wall') {
                if (isHitWall) {
                  cellClasses += 'bg-red-500 shadow-md shadow-red-500/40 scale-105 animate-pulseWall ';
                } else {
                  cellClasses += 'bg-slate-800 shadow-inner border border-slate-700/50 ';
                }
              } else if (state === 'player') {
                cellClasses += 'bg-emerald-500 text-white shadow-md shadow-emerald-500/40 ring-2 ring-emerald-300 ring-offset-1 animate-playerMove z-20 ';
              } else if (state === 'solution') {
                cellClasses += 'bg-blue-500 text-white shadow-sm shadow-blue-500/30 ring-1 ring-blue-300 z-10 ';
              } else if (state === 'start') {
                cellClasses += 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500 shadow-sm ';
              } else if (state === 'exit') {
                cellClasses += 'bg-amber-50 text-amber-700 border-2 border-amber-500 shadow-sm ';
              } else if (state === 'backtracking') {
                cellClasses += 'bg-slate-100 border border-dashed border-slate-300 text-slate-400 ';
              } else if (state === 'visited') {
                cellClasses += 'bg-blue-50/90 border border-blue-200 text-blue-500 ';
              } else {
                // open path
                cellClasses += 'bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 ';
              }

              if (isActiveAlgorithm) {
                cellClasses += ' ring-2 ring-blue-400 scale-105 z-20 ';
              }

              return (
                <div
                  key={`${r}-${c}`}
                  className={cellClasses}
                  data-r={r}
                  data-c={c}
                  data-state={state}
                >
                  {/* Start Marker Label */}
                  {state === 'start' && !isHitWall && (
                    <span className="font-extrabold text-emerald-600">S</span>
                  )}

                  {/* Exit Marker Label */}
                  {state === 'exit' && !isHitWall && (
                    <span className="font-extrabold text-amber-600">E</span>
                  )}

                  {/* Player character visual */}
                  {state === 'player' && (
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-xs"></div>
                  )}

                  {/* Solution path dot */}
                  {state === 'solution' && !isStart && !isExit && (
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-xs"></div>
                  )}

                  {/* Hit wall collision flash icon */}
                  {isHitWall && (
                    <span className="text-white text-xs font-black animate-ping">✕</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
