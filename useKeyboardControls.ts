import { useEffect } from 'react';
import { Point } from '../game/gameTypes';

interface UseKeyboardControlsProps {
  enabled: boolean;
  onMove: (delta: Point) => void;
}

export function useKeyboardControls({ enabled, onMove }: UseKeyboardControlsProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is interacting with form elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      let delta: Point | null = null;

      switch (e.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
          delta = { r: -1, c: 0 };
          break;
        case 's':
        case 'S':
        case 'ArrowDown':
          delta = { r: 1, c: 0 };
          break;
        case 'a':
        case 'A':
        case 'ArrowLeft':
          delta = { r: 0, c: -1 };
          break;
        case 'd':
        case 'D':
        case 'ArrowRight':
          delta = { r: 0, c: 1 };
          break;
        default:
          return;
      }

      if (delta) {
        // Prevent default browser scrolling when using arrow keys or game keys
        e.preventDefault();
        onMove(delta);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, onMove]);
}
