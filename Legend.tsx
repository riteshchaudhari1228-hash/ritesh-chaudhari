import React from 'react';

export const Legend: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-200/80 shadow-sm text-xs sm:text-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
        Map Legend
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            S
          </div>
          <span className="text-slate-600 font-medium">Start</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            E
          </div>
          <span className="text-slate-600 font-medium">Exit</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-emerald-300 ring-offset-1 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <span className="text-slate-600 font-medium">Player</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-slate-800 shadow-inner"></div>
          <span className="text-slate-600 font-medium">Wall</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-white border border-slate-200"></div>
          <span className="text-slate-600 font-medium">Open Path</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-100 border border-blue-300"></div>
          <span className="text-slate-600 font-medium">Visited</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-500 text-white flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <span className="text-slate-600 font-medium">Solution</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-slate-200 border border-slate-300 border-dashed"></div>
          <span className="text-slate-600 font-medium">Backtrack</span>
        </div>
      </div>
    </div>
  );
};
