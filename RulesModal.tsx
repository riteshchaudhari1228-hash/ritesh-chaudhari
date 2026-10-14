import React from 'react';
import { X, ShieldAlert, Award, Compass, Keyboard } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-pop">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 flex flex-col max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-lg text-slate-800">
              Maze Runner Rules & Guide
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-600">
          {/* Controls */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Keyboard className="w-4 h-4 text-slate-500" />
              Controls
            </h4>
            <ul className="space-y-1 text-slate-600">
              <li>• <strong>W / Arrow Up:</strong> Move player up</li>
              <li>• <strong>A / Arrow Left:</strong> Move player left</li>
              <li>• <strong>S / Arrow Down:</strong> Move player down</li>
              <li>• <strong>D / Arrow Right:</strong> Move player right</li>
              <li>• <strong>On-Screen D-Pad:</strong> Click / Tap on mobile and tablets</li>
            </ul>
          </div>

          {/* Gameplay Rules */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Game Rules & Lives
            </h4>
            <ul className="space-y-1 text-slate-600">
              <li>• You begin each maze with <strong>3 lives</strong>.</li>
              <li>• Colliding into a solid wall cell deducts <strong>1 life</strong> and flashes red.</li>
              <li>• Losing all 3 lives results in <strong>Game Over</strong>.</li>
              <li>• Reaching the exit (<strong>E</strong>) wins the game!</li>
            </ul>
          </div>

          {/* Scoring Formula */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Scoring Formula
            </h4>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-700 my-1">
              score = max(0, 1000 - moves × 5 - floor(elapsed_seconds × 10))
            </div>
            <p className="text-[11px] text-slate-400">
              Fast navigation with minimal wasted movements awards the highest score!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 transition-all"
          >
            Got it, Let's Play
          </button>
        </div>
      </div>
    </div>
  );
};
