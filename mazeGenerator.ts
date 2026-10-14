import { Difficulty, DIFFICULTY_CONFIGS, MazeData, Point } from './gameTypes';

const DIRECTIONS: Point[] = [
  { r: -1, c: 0 }, // Up
  { r: 1, c: 0 },  // Down
  { r: 0, c: -1 }, // Left
  { r: 0, c: 1 }   // Right
];

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Validates whether a point is within grid boundaries.
 */
export function isValidPoint(point: Point, rows: number, cols: number): boolean {
  return point.r >= 0 && point.r < rows && point.c >= 0 && point.c < cols;
}

/**
 * Counts how many orthogonal neighbors of (r, c) are currently open paths (0).
 */
function countOpenNeighbors(grid: number[][], r: number, c: number, rows: number, cols: number): number {
  let count = 0;
  for (const dir of DIRECTIONS) {
    const nr = r + dir.r;
    const nc = c + dir.c;
    if (isValidPoint({ r: nr, c: nc }, rows, cols) && grid[nr][nc] === 0) {
      count++;
    }
  }
  return count;
}

/**
 * Checks if there is a valid path from start to exit using BFS.
 * Returns the path if found, or null if unreachable.
 */
export function validateRoute(grid: number[][], start: Point, exit: Point, rows: number, cols: number): Point[] | null {
  if (grid[start.r][start.c] !== 0 || grid[exit.r][exit.c] !== 0) {
    return null;
  }

  const queue: Point[] = [start];
  const visited = new Set<string>();
  const parent = new Map<string, Point | null>();

  const startKey = `${start.r},${start.c}`;
  visited.add(startKey);
  parent.set(startKey, null);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.r === exit.r && current.c === exit.c) {
      // Reconstruct path
      const path: Point[] = [];
      let curr: Point | null = current;
      while (curr !== null) {
        path.unshift(curr);
        const currKey: string = `${curr.r},${curr.c}`;
        curr = parent.get(currKey) ?? null;
      }
      return path;
    }

    for (const dir of DIRECTIONS) {
      const nr = current.r + dir.r;
      const nc = current.c + dir.c;
      const nextPoint = { r: nr, c: nc };
      const key = `${nr},${nc}`;

      if (isValidPoint(nextPoint, rows, cols) && grid[nr][nc] === 0 && !visited.has(key)) {
        visited.add(key);
        parent.set(key, current);
        queue.push(nextPoint);
      }
    }
  }

  return null;
}

/**
 * Generates a randomized maze using the recursive backtracking algorithm.
 * Guarantees a valid, solvable route from start to exit with natural labyrinth paths.
 */
export function generateMaze(difficulty: Difficulty): MazeData {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const rows = config.rows;
  const cols = config.cols;
  const start: Point = { r: 0, c: 0 };
  const exit: Point = { r: rows - 1, c: cols - 1 };

  const minPathLength = Math.max(4, Math.floor((rows + cols - 2) * 1.0));

  // Loop with safety limit to ensure guaranteed solvability and valid route
  for (let attempt = 0; attempt < 100; attempt++) {
    // 1 represents WALL, 0 represents PATH
    const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(1));

    // Start cell is carved
    grid[start.r][start.c] = 0;
    const stack: Point[] = [start];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const validNeighbors: Point[] = [];
      const shuffledDirs = shuffle(DIRECTIONS);

      for (const dir of shuffledDirs) {
        const nr = current.r + dir.r;
        const nc = current.c + dir.c;

        if (isValidPoint({ r: nr, c: nc }, rows, cols) && grid[nr][nc] === 1) {
          // A candidate cell can only be carved if it currently has exactly 1 open neighbor
          // (the current cell we are stepping from), preventing wide open rooms and loops.
          if (countOpenNeighbors(grid, nr, nc, rows, cols) === 1) {
            validNeighbors.push({ r: nr, c: nc });
          }
        }
      }

      if (validNeighbors.length > 0) {
        // Pick random valid neighbor
        const chosen = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
        grid[chosen.r][chosen.c] = 0;
        stack.push(chosen);
      } else {
        // Backtrack
        stack.pop();
      }
    }

    // Ensure exit is carved and connected
    if (grid[exit.r][exit.c] === 1) {
      const adjacentToExit = DIRECTIONS
        .map(d => ({ r: exit.r + d.r, c: exit.c + d.c }))
        .filter(p => isValidPoint(p, rows, cols) && grid[p.r][p.c] === 0);

      if (adjacentToExit.length > 0) {
        grid[exit.r][exit.c] = 0;
      }
    }

    // Validate route and ensure path is satisfyingly challenging
    const validRoute = validateRoute(grid, start, exit, rows, cols);
    if (validRoute && validRoute.length >= minPathLength) {
      return {
        rows,
        cols,
        grid,
        start,
        exit
      };
    }
  }

  // Fallback fallback: Guaranteed simple carved path with surrounding maze if all 100 attempts were somehow rejected
  const fallbackGrid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(1));
  let curr = { r: 0, c: 0 };
  fallbackGrid[0][0] = 0;
  while (curr.r < rows - 1 || curr.c < cols - 1) {
    if (curr.r === rows - 1) curr = { r: curr.r, c: curr.c + 1 };
    else if (curr.c === cols - 1) curr = { r: curr.r + 1, c: curr.c };
    else if (Math.random() < 0.5) curr = { r: curr.r, c: curr.c + 1 };
    else curr = { r: curr.r + 1, c: curr.c };
    fallbackGrid[curr.r][curr.c] = 0;
  }
  return {
    rows,
    cols,
    grid: fallbackGrid,
    start,
    exit
  };
}
