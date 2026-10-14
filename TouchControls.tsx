import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Point } from '../game/gameTypes';

interface TouchControlsProps {
  onMove: (delta: Point) => void;
  disabled?: boolean;
}

export const TouchControls: React.FC<TouchControlsProps> = ({ onMove, disabled = false }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 select-none">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
        Touch Controls
      </div>
      <div className="grid grid-cols-3 gap-1.5 w-44">
        <div></div>
        <button
          type="button"
          onClick={() => onMove({ r: -1, c: 0 })}
          disabled={disabled}
          aria-label="Move Up"
          className="h-12 w-12 mx-auto rounded-xl bg-white border border-slate-200 shadow-sm active:bg-slate-100 disabled:opacity-40 flex items-center justify-center text-slate-700 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div></div>

        <button
          type="button"
          onClick={() => onMove({ r: 0, c: -1 })}
          disabled={disabled}
          aria-label="Move Left"
          className="h-12 w-12 mx-auto rounded-xl bg-white border border-slate-200 shadow-sm active:bg-slate-100 disabled:opacity-40 flex items-center justify-center text-slate-700 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={() => onMove({ r: 1, c: 0 })}
          disabled={disabled}
          aria-label="Move Down"
          className="h-12 w-12 mx-auto rounded-xl bg-white border border-slate-200 shadow-sm active:bg-slate-100 disabled:opacity-40 flex items-center justify-center text-slate-700 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowDown className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={() => onMove({ r: 0, c: 1 })}
          disabled={disabled}
          aria-label="Move Right"
          className="h-12 w-12 mx-auto rounded-xl bg-white border border-slate-200 shadow-sm active:bg-slate-100 disabled:opacity-40 flex items-center justify-center text-slate-700 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
      <div className="text-[11px] text-slate-400 mt-2 text-center font-mono">
        or use WASD / Arrow Keys
      </div>
    </div>
  );
};
