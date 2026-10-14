import React, { useState } from 'react';
import { GameMode, Difficulty } from './game/gameTypes';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { AlgorithmExplanation } from './components/AlgorithmExplanation';
import { RulesModal } from './components/RulesModal';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'game' | 'learn'>('home');
  const [selectedMode, setSelectedMode] = useState<GameMode>('manual');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  const handleStartGame = (mode: GameMode = 'manual', difficulty: Difficulty = 'easy') => {
    setSelectedMode(mode);
    setSelectedDifficulty(difficulty);
    setCurrentPage('game');
  };

  const handleExploreAlgorithms = () => {
    setSelectedMode('bfs');
    setSelectedDifficulty('moderate');
    setCurrentPage('game');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenRulesModal={() => setIsRulesOpen(true)}
      />

      <main className="flex-1 flex flex-col">
        {currentPage === 'home' && (
          <HomePage
            onStartGame={handleStartGame}
            onExploreAlgorithms={handleExploreAlgorithms}
          />
        )}

        {currentPage === 'game' && (
          <GamePage
            key={`${selectedMode}-${selectedDifficulty}`}
            initialMode={selectedMode}
            initialDifficulty={selectedDifficulty}
            onReturnToMenu={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'learn' && (
          <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Algorithms & Architecture
              </h1>
              <p className="text-sm text-slate-500">
                A technical breakdown of random maze generation, Breadth-First Search, and Depth-First Search with backtracking.
              </p>
            </div>
            <AlgorithmExplanation />
          </div>
        )}
      </main>

      {/* Rules Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      {/* Minimal Footer */}
      <footer className="w-full border-t border-slate-200/80 bg-white py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Maze Runner — Interactive Maze Solver & Path Finder</span>
          <span>Preserving original game logic & scoring algorithms</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
