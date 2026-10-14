import { MazeData, Point, SolverStep } from './gameTypes';
import { isValidPoint } from './mazeGenerator';

const DIRECTIONS: Point[] = [
  { r: -1, c: 0 }, // Up
  { r: 1, c: 0 },  // Down
  { r: 0, c: -1 }, // Left
  { r: 0, c: 1 }   // Right
];

/**
 * Precomputes all discrete animation steps for Depth-First Search (DFS) with explicit backtracking.
 * DFS uses a Last-In, First-Out (LIFO) stack. When it encounters a dead end, it pops
 * the cell and backtracks, visually distinguished from open exploration.
 */
export function generateDfsSteps(maze: MazeData): SolverStep[] {
  const steps: SolverStep[] = [];
  const { rows, cols, grid, start, exit } = maze;

  const stack: Point[] = [start];
  const visitedSet = new Set<string>();
  const visitedOrder: Point[] = [];
  const backtrackedList: Point[] = [];

  const startKey = `${start.r},${start.c}`;
  visitedSet.add(startKey);
  visitedOrder.push(start);

  steps.push({
    type: 'visit',
    point: start,
    visitedPoints: [start],
    backtrackedPoints: [],
    solutionPath: [start],
    exploredCount: 1,
    pathLength: 0,
    activeCell: start,
    description: `DFS starts at Start (${start.r}, ${start.c}) and pushes it to the stack.`
  });

  let exitFound = false;

  while (stack.length > 0 && !exitFound) {
    const current = stack[stack.length - 1];

    if (current.r === exit.r && current.c === exit.c) {
      exitFound = true;
      break;
    }

    // Look for unvisited accessible neighbor
    let nextUnvisited: Point | null = null;
    for (const dir of DIRECTIONS) {
      const nr = current.r + dir.r;
      const nc = current.c + dir.c;
      const key = `${nr},${nc}`;
      const candidate = { r: nr, c: nc };

      if (isValidPoint(candidate, rows, cols) && grid[nr][nc] === 0 && !visitedSet.has(key)) {
        nextUnvisited = candidate;
        break;
      }
    }

    if (nextUnvisited) {
      // Advance deeper
      const key = `${nextUnvisited.r},${nextUnvisited.c}`;
      visitedSet.add(key);
      visitedOrder.push(nextUnvisited);
      stack.push(nextUnvisited);

      steps.push({
        type: 'visit',
        point: nextUnvisited,
        visitedPoints: [...visitedOrder],
        backtrackedPoints: [...backtrackedList],
        solutionPath: [...stack],
        exploredCount: visitedOrder.length,
        pathLength: Math.max(0, stack.length - 1),
        activeCell: nextUnvisited,
        description: `Advancing to cell (${nextUnvisited.r}, ${nextUnvisited.c}). Stack depth: ${stack.length}`
      });

      if (nextUnvisited.r === exit.r && nextUnvisited.c === exit.c) {
        exitFound = true;
        break;
      }
    } else {
      // Dead end encountered! Backtrack!
      const popped = stack.pop()!;
      backtrackedList.push(popped);

      steps.push({
        type: 'backtrack',
        point: popped,
        visitedPoints: [...visitedOrder],
        backtrackedPoints: [...backtrackedList],
        solutionPath: [...stack],
        exploredCount: visitedOrder.length,
        pathLength: Math.max(0, stack.length - 1),
        activeCell: stack.length > 0 ? stack[stack.length - 1] : undefined,
        description: `Dead end at (${popped.r}, ${popped.c}). Backtracking up the stack.`
      });
    }
  }

  if (exitFound) {
    const finalPath = [...stack];
    const movementsCount = Math.max(0, finalPath.length - 1);

    // Final completion step
    steps.push({
      type: 'done',
      point: exit,
      visitedPoints: [...visitedOrder],
      backtrackedPoints: [...backtrackedList],
      solutionPath: finalPath,
      exploredCount: visitedOrder.length,
      pathLength: movementsCount,
      activeCell: exit,
      description: `DFS reached the exit! Path length: ${movementsCount} movements (${finalPath.length} cells). Total cells explored: ${visitedOrder.length}. (Note: DFS may not be shortest path).`
    });
  }

  return steps;
}
