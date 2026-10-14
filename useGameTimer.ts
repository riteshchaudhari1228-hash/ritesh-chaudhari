import { useEffect, useRef, useState, useCallback } from 'react';
import { GameStatus } from '../game/gameTypes';

interface UseGameTimerProps {
  status: GameStatus;
}

export function useGameTimer({ status }: UseGameTimerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === 'playing' || status === 'solving') {
      const startTime = Date.now() - elapsedSeconds * 1000;
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const seconds = Math.floor((now - startTime) / 1000);
        setElapsedSeconds(seconds);
      }, 250);
    } else {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status]);

  const resetTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setElapsedSeconds(0);
  }, []);

  return { elapsedSeconds, resetTimer };
}
