import React from 'react';
import { Compass, BookOpen, Play, HelpCircle } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'game' | 'learn';
  onNavigate: (page: 'home' | 'game' | 'learn') => void;
  onOpenRulesModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenRulesModal }) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-emerald-400 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
              Maze Runner
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Solver & Path Finder
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onNavigate('game')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentPage === 'game'
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('learn')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentPage === 'learn'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Algorithms</span>
          </button>

          {onOpenRulesModal && (
            <button
              type="button"
              onClick={onOpenRulesModal}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
              title="Game Rules & Controls"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Rules</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
