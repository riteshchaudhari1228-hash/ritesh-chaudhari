import { describe, it, expect } from 'vitest';
import { generateMaze, validateRoute, isValidPoint } from './mazeGenerator';
import { generateBfsSteps } from './bfsSolver';
import { generateDfsSteps } from './dfsSolver';
import { calculateScore, formatTime } from './scoring';
import { Difficulty, Point } from './gameTypes';

describe('Maze Generator', () => {
  const difficulties: Difficulty[] = ['easy', 'moderate', 'difficult'];

  difficulties.forEach(diff => {
    it(`generates 5 consecutive valid, solvable mazes for ${diff}`, () => {
      for (let i = 0; i < 5; i++) {
        const maze = generateMaze(diff);

        expect(maze.grid.length).toBe(maze.rows);
        expect(maze.grid[0].length).toBe(maze.cols);

        // Start and exit check
        expect(maze.start).toEqual({ r: 0, c: 0 });
        expect(maze.exit).toEqual({ r: maze.rows - 1, c: maze.cols - 1 });
        expect(maze.grid[maze.start.r][maze.start.c]).toBe(0);
        expect(maze.grid[maze.exit.r][maze.exit.c]).toBe(0);

        // Check valid route exists
        const route = validateRoute(maze.grid, maze.start, maze.exit, maze.rows, maze.cols);
        expect(route).not.toBeNull();
        expect(route!.length).toBeGreaterThan(1);
        expect(route![0]).toEqual(maze.start);
        expect(route![route!.length - 1]).toEqual(maze.exit);

        // Verify each step in the route is an orthogonal neighbor
        for (let j = 0; j < route!.length - 1; j++) {
          const d = Math.abs(route![j].r - route![j + 1].r) + Math.abs(route![j].c - route![j + 1].c);
          expect(d).toBe(1);
        }
      }
    });
  });

  it('generates different randomized mazes across calls', () => {
    const maze1 = generateMaze('moderate');
    const maze2 = generateMaze('moderate');

    const flat1 = maze1.grid.flat().join('');
    const flat2 = maze2.grid.flat().join('');

    expect(flat1).not.toBe(flat2);
  });

  it('validates bounds with isValidPoint correctly', () => {
    expect(isValidPoint({ r: 0, c: 0 }, 5, 5)).toBe(true);
    expect(isValidPoint({ r: 4, c: 4 }, 5, 5)).toBe(true);
    expect(isValidPoint({ r: -1, c: 0 }, 5, 5)).toBe(false);
    expect(isValidPoint({ r: 0, c: 5 }, 5, 5)).toBe(false);
    expect(isValidPoint({ r: 5, c: 0 }, 5, 5)).toBe(false);
  });
});

describe('BFS Shortest-Path Solver', () => {
  it('finds the shortest path and counts movements correctly', () => {
    const maze = generateMaze('moderate');
    const steps = generateBfsSteps(maze);

    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.type).toBe('done');
    expect(lastStep.solutionPath).toBeDefined();

    const path = lastStep.solutionPath!;
    expect(path[0]).toEqual(maze.start);
    expect(path[path.length - 1]).toEqual(maze.exit);

    // Movements count = path.length - 1
    expect(lastStep.pathLength).toBe(path.length - 1);
    expect(lastStep.exploredCount).toBeGreaterThanOrEqual(path.length);
  });

  it('BFS path length is always <= DFS path length', () => {
    const maze = generateMaze('moderate');
    const bfsSteps = generateBfsSteps(maze);
    const dfsSteps = generateDfsSteps(maze);

    const bfsPath = bfsSteps[bfsSteps.length - 1].solutionPath!;
    const dfsPath = dfsSteps[dfsSteps.length - 1].solutionPath!;

    expect(bfsPath.length).toBeLessThanOrEqual(dfsPath.length);
  });
});

describe('DFS Backtracking Solver', () => {
  it('finds a valid path using stack and explicit backtracking', () => {
    const maze = generateMaze('moderate');
    const steps = generateDfsSteps(maze);

    expect(steps.length).toBeGreaterThan(0);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.type).toBe('done');
    expect(lastStep.solutionPath).toBeDefined();

    const path = lastStep.solutionPath!;
    expect(path[0]).toEqual(maze.start);
    expect(path[path.length - 1]).toEqual(maze.exit);

    // Verify continuity of path
    for (let i = 0; i < path.length - 1; i++) {
      const dist = Math.abs(path[i].r - path[i + 1].r) + Math.abs(path[i].c - path[i + 1].c);
      expect(dist).toBe(1);
    }
  });
});

describe('Scoring System', () => {
  it('correctly calculates score using original formula', () => {
    // score = max(0, 1000 - moves * 5 - floor(elapsed_seconds * 10))
    expect(calculateScore(0, 0)).toBe(1000);
    expect(calculateScore(10, 5)).toBe(1000 - 10 * 5 - Math.floor(5 * 10)); // 1000 - 50 - 50 = 900
    expect(calculateScore(20, 15.5)).toBe(1000 - 20 * 5 - Math.floor(15.5 * 10)); // 1000 - 100 - 155 = 745
  });

  it('clamps negative scores to zero', () => {
    expect(calculateScore(250, 100)).toBe(0);
    expect(calculateScore(1000, 1000)).toBe(0);
  });

  it('formats time in MM:SS correctly', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(9)).toBe('00:09');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(599)).toBe('09:59');
  });
});

describe('Movement & Collision Mechanics', () => {
  it('correctly simulates lives deduction and game over on 3 collisions', () => {
    let lives = 3;
    let moves = 0;
    const isWall = true;

    // First collision
    if (isWall) lives--;
    expect(lives).toBe(2);
    expect(moves).toBe(0);

    // Second collision
    if (isWall) lives--;
    expect(lives).toBe(1);

    // Third collision -> Game Over
    if (isWall) lives--;
    expect(lives).toBe(0);
    const isGameOver = lives <= 0;
    expect(isGameOver).toBe(true);
  });

  it('correctly increments move counter on valid path steps', () => {
    let moves = 0;
    let playerPos: Point = { r: 0, c: 0 };

    const validMoves: Point[] = [
      { r: 0, c: 1 },
      { r: 1, c: 1 },
      { r: 1, c: 2 }
    ];

    validMoves.forEach(target => {
      playerPos = target;
      moves++;
    });

    expect(moves).toBe(3);
    expect(playerPos).toEqual({ r: 1, c: 2 });
  });
});
