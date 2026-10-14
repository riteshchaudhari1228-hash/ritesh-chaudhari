export type Difficulty = 'easy' | 'moderate' | 'difficult';

export interface DifficultyConfig {
  name: string;
  rows: number;
  cols: number;
  label: string;
  description: string;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    name: 'Easy',
    rows: 5,
    cols: 5,
    label: '5 × 5',
    description: 'Perfect for learning the mechanics and pathfinding basics.'
  },
  moderate: {
    name: 'Moderate',
    rows: 8,
    cols: 8,
    label: '8 × 8',
    description: 'Balanced challenge with multiple branching corridors and dead ends.'
  },
  difficult: {
    name: 'Difficult',
    rows: 12,
    cols: 12,
    label: '12 × 12',
    description: 'Complex labyrinth designed to test navigation and algorithm efficiency.'
  }
};

export type GameMode = 'manual' | 'bfs' | 'dfs';

export interface Point {
  r: number;
  c: number;
}

export type CellKind = 'wall' | 'path';

export interface MazeData {
  rows: number;
  cols: number;
  grid: number[][]; // 0 = path, 1 = wall
  start: Point;
  exit: Point;
}

export type VisualCellState =
  | 'wall'
  | 'path'
  | 'start'
  | 'exit'
  | 'player'
  | 'visited'
  | 'backtracking'
  | 'solution';

export type GameStatus =
  | 'idle'
  | 'playing'
  | 'won'
  | 'lost'
  | 'solving'
  | 'paused'
  | 'solved';

export interface SolverStep {
  type: 'visit' | 'backtrack' | 'solution' | 'done';
  point: Point;
  visitedPoints: Point[];
  backtrackedPoints?: Point[];
  solutionPath?: Point[];
  exploredCount: number;
  pathLength: number;
  activeCell?: Point;
  description: string;
}

export interface GameStats {
  moves: number;
  lives: number;
  elapsedSeconds: number;
  score: number;
  status: GameStatus;
  difficulty: Difficulty;
  exploredCount: number;
  finalPathLength: number;
}
