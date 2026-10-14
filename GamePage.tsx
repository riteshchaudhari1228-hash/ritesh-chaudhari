import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MazeData, Difficulty, GameMode, GameStats, Point, SolverStep } from '../game/gameTypes';
import { generateMaze, isValidPoint } from '../game/mazeGenerator';
import { generateBfsSteps } from '../game/bfsSolver';
import { generateDfsSteps } from '../game/dfsSolver';
import { calculateScore } from '../game/scoring';
import { useGameTimer } from '../hooks/useGameTimer';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { MazeBoard } from '../components/MazeBoard';
import { GameStatsPanel } from '../components/GameStats';
import { DifficultySelector } from '../components/DifficultySelector';
import { GameControls } from '../components/GameControls';
import { GameResults } from '../components/GameResults';
import { TouchControls } from '../components/TouchControls';
import { Legend } from '../components/Legend';
import { AlgorithmExplanation } from '../components/AlgorithmExplanation';

interface GamePageProps {
  initialMode?: GameMode;
  initialDifficulty?: Difficulty;
  onReturnToMenu: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({
  initialMode = 'manual',
  initialDifficulty = 'easy',
  onReturnToMenu
}) => {
  // Mode and Difficulty state
  const [mode, setMode] = useState<GameMode>(initialMode);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty);

  // Active maze data
  const [maze, setMaze] = useState<MazeData>(() => generateMaze(initialDifficulty));

  // Manual gameplay state
  const [playerPos, setPlayerPos] = useState<Point>({ r: 0, c: 0 });
  const [lives, setLives] = useState<number>(3);
  const [moves, setMoves] = useState<number>(0);
  const [status, setStatus] = useState<GameStats['status']>('idle');
  const [hitWallPoint, setHitWallPoint] = useState<Point | null>(null);

  // Solver animation state
  const [solverSteps, setSolverSteps] = useState<SolverStep[]>([]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100); // ms per step
  const [visitedPoints, setVisitedPoints] = useState<Point[]>([]);
  const [backtrackedPoints, setBacktrackedPoints] = useState<Point[]>([]);
  const [solutionPath, setSolutionPath] = useState<Point[]>([]);
  const [activeCell, setActiveCell] = useState<Point | null>(null);
  const [exploredCount, setExploredCount] = useState<number>(0);
  const [finalPathLength, setFinalPathLength] = useState<number>(0);
  const [solverDescription, setSolverDescription] = useState<string>('');

  // Animation timeout reference
  const animationTimerRef = useRef<number | null>(null);

  // Timer hook
  const { elapsedSeconds, resetTimer } = useGameTimer({ status });

  // Calculate live score
  const score = calculateScore(moves, elapsedSeconds);

  // Reset solver animation timers safely
  const clearSolverTimer = useCallback(() => {
    if (animationTimerRef.current !== null) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
  }, []);

  // Stop everything and reset current maze to its clean state
  const handleResetCurrentMaze = useCallback(() => {
    clearSolverTimer();
    setPlayerPos({ ...maze.start });
    setLives(3);
    setMoves(0);
    setStatus('idle');
    setHitWallPoint(null);
    resetTimer();

    // Reset solver visuals
    setIsSolving(false);
    setIsPaused(false);
    setStepIndex(0);
    setVisitedPoints([]);
    setBacktrackedPoints([]);
    setSolutionPath([]);
    setActiveCell(null);
    setExploredCount(0);
    setFinalPathLength(0);
    setSolverDescription('');
  }, [clearSolverTimer, maze.start, resetTimer]);

  // Generate a brand new maze
  const handleNewMaze = useCallback((newDiff?: Difficulty) => {
    clearSolverTimer();
    const diffToUse = newDiff ?? difficulty;
    const newMaze = generateMaze(diffToUse);
    setMaze(newMaze);
    setPlayerPos({ ...newMaze.start });
    setLives(3);
    setMoves(0);
    setStatus('idle');
    setHitWallPoint(null);
    resetTimer();

    // Reset solver visuals
    setIsSolving(false);
    setIsPaused(false);
    setStepIndex(0);
    setVisitedPoints([]);
    setBacktrackedPoints([]);
    setSolutionPath([]);
    setActiveCell(null);
    setExploredCount(0);
    setFinalPathLength(0);
    setSolverDescription('');
  }, [clearSolverTimer, difficulty, resetTimer]);

  // Handle switching difficulty
  const handleSelectDifficulty = (newDiff: Difficulty) => {
    if (newDiff === difficulty) return;
    setDifficulty(newDiff);
    handleNewMaze(newDiff);
  };

  // Handle switching game mode
  const handleSelectMode = (newMode: GameMode) => {
    if (newMode === mode) return;
    clearSolverTimer();
    setMode(newMode);
    handleResetCurrentMaze();
  };

  // Manual Movement Handler
  const handleMove = useCallback((delta: Point) => {
    if (mode !== 'manual' || status === 'won' || status === 'lost') {
      return;
    }

    const nr = playerPos.r + delta.r;
    const nc = playerPos.c + delta.c;
    const target = { r: nr, c: nc };

    // Check if target is out of bounds or is a wall
    if (!isValidPoint(target, maze.rows, maze.cols) || maze.grid[nr][nc] === 1) {
      // Wall collision! Deduct 1 life
      const hitWall = isValidPoint(target, maze.rows, maze.cols) ? target : { ...playerPos };
      setHitWallPoint(hitWall);
      setTimeout(() => setHitWallPoint(null), 250);

      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setStatus('lost');
      }
      return;
    }

    // Valid movement onto open path
    if (status === 'idle') {
      setStatus('playing');
    }

    const newMoves = moves + 1;
    setMoves(newMoves);
    setPlayerPos(target);

    // Check if exit reached
    if (nr === maze.exit.r && nc === maze.exit.c) {
      setStatus('won');
    }
  }, [lives, maze, mode, moves, playerPos, status]);

  // Hook up keyboard controls (WASD, Arrow keys)
  useKeyboardControls({
    enabled: mode === 'manual' && status !== 'won' && status !== 'lost',
    onMove: handleMove
  });

  // Apply a solver step to visual state
  const applySolverStep = useCallback((step: SolverStep) => {
    if (!step) return;
    setVisitedPoints(step.visitedPoints);
    if (step.backtrackedPoints) setBacktrackedPoints(step.backtrackedPoints);
    if (step.solutionPath) setSolutionPath(step.solutionPath);
    if (step.activeCell) setActiveCell(step.activeCell);
    setExploredCount(step.exploredCount);
    setFinalPathLength(step.pathLength);
    setSolverDescription(step.description);
  }, []);

  // Run solver animation loop
  useEffect(() => {
    if (!isSolving || isPaused) return;

    if (stepIndex >= solverSteps.length) {
      setIsSolving(false);
      setStatus('solved');
      return;
    }

    applySolverStep(solverSteps[stepIndex]);

    animationTimerRef.current = window.setTimeout(() => {
      setStepIndex(prev => prev + 1);
    }, speed);

    return () => {
      if (animationTimerRef.current !== null) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, [isSolving, isPaused, stepIndex, solverSteps, speed, applySolverStep]);

  // Start Solver
  const handleStartSolver = useCallback(() => {
    clearSolverTimer();
    const steps = mode === 'bfs' ? generateBfsSteps(maze) : generateDfsSteps(maze);
    setSolverSteps(steps);
    setStepIndex(0);
    setIsSolving(true);
    setIsPaused(false);
    setStatus('solving');
  }, [clearSolverTimer, maze, mode]);

  // Pause Solver
  const handlePauseSolver = () => {
    clearSolverTimer();
    setIsPaused(true);
    setStatus('paused');
  };

  // Resume Solver
  const handleResumeSolver = () => {
    setIsPaused(false);
    setStatus('solving');
  };

  // Step Forward (Single discrete step)
  const handleStepForward = () => {
    clearSolverTimer();
    let currentList = solverSteps;
    if (currentList.length === 0) {
      currentList = mode === 'bfs' ? generateBfsSteps(maze) : generateDfsSteps(maze);
      setSolverSteps(currentList);
    }

    if (stepIndex < currentList.length) {
      applySolverStep(currentList[stepIndex]);
      setStepIndex(prev => prev + 1);
      setIsPaused(true);
      if (stepIndex + 1 >= currentList.length) {
        setIsSolving(false);
        setStatus('solved');
      } else {
        setStatus('paused');
      }
    }
  };

  // Show Solution Action (Instant reveal)
  const handleShowSolution = useCallback(() => {
    clearSolverTimer();
    const steps = generateBfsSteps(maze);
    const lastStep = steps[steps.length - 1];
    applySolverStep(lastStep);
    setIsSolving(false);
    setIsPaused(false);
    setStatus('solved');
  }, [clearSolverTimer, maze, applySolverStep]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearSolverTimer();
    };
  }, [clearSolverTimer]);

  // Group current game stats
  const currentStats: GameStats = {
    moves,
    lives,
    elapsedSeconds,
    score,
    status,
    difficulty,
    exploredCount,
    finalPathLength
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-5">
      {/* Top Selectors Bar */}
      <DifficultySelector
        currentDifficulty={difficulty}
        onSelectDifficulty={handleSelectDifficulty}
        currentMode={mode}
        onSelectMode={handleSelectMode}
      />

      {/* Main Grid: Left Column (Maze Board), Right Column (Stats & Controls) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Maze Central Visual */}
        <div className="lg:col-span-7 flex flex-col items-center gap-3">
          <MazeBoard
            maze={maze}
            playerPos={mode === 'manual' ? playerPos : activeCell}
            hitWallPoint={hitWallPoint}
            visitedPoints={visitedPoints}
            backtrackedPoints={backtrackedPoints}
            solutionPath={solutionPath}
            activeAlgorithmCell={activeCell}
            mode={mode}
          />

          {/* Solver Step Description Bar (when solving) */}
          {mode !== 'manual' && solverDescription && (
            <div className="w-full max-w-[520px] bg-white rounded-xl p-3 border border-slate-200/90 shadow-xs text-xs text-slate-600 font-mono flex items-center justify-between">
              <span className="truncate mr-2">{solverDescription}</span>
              <span className="text-slate-400 text-[11px] shrink-0">
                Step {Math.min(stepIndex, solverSteps.length)}/{solverSteps.length}
              </span>
            </div>
          )}

          {/* On-Screen Touch Controls (shown in Manual mode) */}
          {mode === 'manual' && (
            <div className="w-full max-w-[520px] flex justify-center">
              <TouchControls
                onMove={handleMove}
                disabled={status === 'won' || status === 'lost'}
              />
            </div>
          )}

          {/* Map Legend */}
          <div className="w-full max-w-[520px]">
            <Legend />
          </div>
        </div>

        {/* Right Column: Live Stats, Controls, and Educational Guide */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Stats Panel */}
          <GameStatsPanel stats={currentStats} mode={mode} />

          {/* Controls Panel */}
          <GameControls
            mode={mode}
            isSolving={isSolving}
            isPaused={isPaused}
            speed={speed}
            onSetSpeed={setSpeed}
            onStartSolver={handleStartSolver}
            onPauseSolver={handlePauseSolver}
            onResumeSolver={handleResumeSolver}
            onStepForward={handleStepForward}
            onResetCurrentMaze={handleResetCurrentMaze}
            onNewMaze={() => handleNewMaze()}
            onShowSolution={handleShowSolution}
            onReturnToMenu={onReturnToMenu}
          />

          {/* Educational Algorithm Guide */}
          <AlgorithmExplanation />
        </div>
      </div>

      {/* Results Modal (Victory or Game Over in manual mode) */}
      {(status === 'won' || status === 'lost') && (
        <GameResults
          stats={currentStats}
          onPlayAgain={() => handleNewMaze()}
          onRetryCurrentMaze={handleResetCurrentMaze}
          onNextDifficulty={
            difficulty === 'easy'
              ? () => handleSelectDifficulty('moderate')
              : difficulty === 'moderate'
              ? () => handleSelectDifficulty('difficult')
              : undefined
          }
        />
      )}
    </div>
  );
};
