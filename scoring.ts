/**
 * Maze Runner Scoring System
 * Preserves the original formula:
 * score = max(0, 1000 - moves * 5 - floor(elapsed_seconds * 10))
 */
export function calculateScore(moves: number, elapsedSeconds: number): number {
  const penaltyMoves = moves * 5;
  const penaltyTime = Math.floor(elapsedSeconds * 10);
  return Math.max(0, 1000 - penaltyMoves - penaltyTime);
}

export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
