import { MazeData, Point, SolverStep } from './gameTypes';
import { isValidPoint } from './mazeGenerator';

const DIRECTIONS: Point[] = [
  { r: -1, c: 0 }, // Up
  { r: 1, c: 0 },  // Down
  { r: 0, c: -1 }, // Left
  { r: 0, c: 1 }   // Right
];

/**
 * Reconstructs the path from start to target using the parent map.
 */
function reconstructPath(parent: Map<string, Point | null>, target: Point): Point[] {
  const path: Point[] = [];
  let curr: Point | null = target;
  while (curr !== null) {
    path.unshift(curr);
    curr = parent.get(`${curr.r},${curr.c}`) ?? null;
  }
  return path;
}

/**
 * Precomputes all discrete animation steps for Breadth-First Search (BFS).
 * BFS uses a First-In, First-Out (FIFO) queue to guarantee finding the shortest path
 * in unweighted graphs.
 */
export function generateBfsSteps(maze: MazeData): SolverStep[] {
  const steps: SolverStep[] = [];
  const { rows, cols, grid, start, exit } = maze;

  const queue: Point[] = [start];
  const visitedSet = new Set<string>();
  const parent = new Map<string, Point | null>();
  const visitedOrder: Point[] = [];

  const startKey = `${start.r},${start.c}`;
  visitedSet.add(startKey);
  parent.set(startKey, null);

  // Initial step at start cell
  steps.push({
    type: 'visit',
    point: start,
    visitedPoints: [start],
    exploredCount: 1,
    pathLength: 0,
    activeCell: start,
    description: `BFS begins at Start (${start.r}, ${start.c}) and enqueues it.`
  });
  visitedOrder.push(start);

  let exitFound = false;

  while (queue.length > 0 && !exitFound) {
    const current = queue.shift()!;

    // Check if exit reached
    if (current.r === exit.r && current.c === exit.c) {
      exitFound = true;
      break;
    }

    for (const dir of DIRECTIONS) {
      const nr = current.r + dir.r;
      const nc = current.c + dir.c;
      const nextPoint = { r: nr, c: nc };
      const key = `${nr},${nc}`;

      if (isValidPoint(nextPoint, rows, cols) && grid[nr][nc] === 0 && !visitedSet.has(key)) {
        visitedSet.add(key);
        parent.set(key, current);
        visitedOrder.push(nextPoint);
        queue.push(nextPoint);

        steps.push({
          type: 'visit',
          point: nextPoint,
          visitedPoints: [...visitedOrder],
          exploredCount: visitedOrder.length,
          pathLength: 0,
          activeCell: nextPoint,
          description: `Discovered and enqueued cell (${nr}, ${nc}) from parent (${current.r}, ${current.c}).`
        });

        if (nr === exit.r && nc === exit.c) {
          exitFound = true;
          break;
        }
      }
    }
  }

  if (exitFound) {
    const fullPath = reconstructPath(parent, exit);
    // Path length counts movements (edges traversed) rather than cells: path.length - 1
    const movementsCount = Math.max(0, fullPath.length - 1);

    // Progressive solution reveal animation steps
    for (let i = 1; i <= fullPath.length; i++) {
      const partialPath = fullPath.slice(0, i);
      const isComplete = i === fullPath.length;
      steps.push({
        type: isComplete ? 'done' : 'solution',
        point: fullPath[i - 1],
        visitedPoints: [...visitedOrder],
        solutionPath: partialPath,
        exploredCount: visitedOrder.length,
        pathLength: Math.max(0, partialPath.length - 1),
        activeCell: fullPath[i - 1],
        description: isComplete
          ? `Shortest path confirmed! Length: ${movementsCount} movements (${fullPath.length} cells). Explored: ${visitedOrder.length} cells.`
          : `Tracing shortest path: cell (${fullPath[i - 1].r}, ${fullPath[i - 1].c})`
      });
    }
  }

  return steps;
}
