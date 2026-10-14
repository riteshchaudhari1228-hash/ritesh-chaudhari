import React, { useState } from 'react';
import { Layers, Cpu, GitBranch } from 'lucide-react';

export const AlgorithmExplanation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generation' | 'bfs' | 'dfs'>('generation');

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Algorithm Fundamentals
          </h3>
          <p className="text-xs text-slate-500">
            Learn the theory behind maze generation and search heuristics.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl mb-5 border border-slate-200/80">
        <button
          type="button"
          onClick={() => setActiveTab('generation')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'generation'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="truncate">Recursive Backtracking</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bfs')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'bfs'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span className="truncate">BFS (Queue)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dfs')}
          className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'dfs'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span className="truncate">DFS (Stack)</span>
        </button>
      </div>

      {/* Content for Recursive Backtracking */}
      {activeTab === 'generation' && (
        <div className="flex flex-col gap-3 text-sm text-slate-600 leading-relaxed">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-800"></span>
              How Random Maze Generation Works
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Recursive Backtracking carves winding corridors out of a solid block of walls.
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 font-medium">
              <li>Initialize the whole grid filled with solid wall cells (<span className="font-mono text-slate-800">1</span>).</li>
              <li>Mark the starting cell (0, 0) as an open passage (<span className="font-mono text-slate-800">0</span>) and push it to the stack.</li>
              <li>While the stack is not empty, look for orthogonal neighbors that can be carved without creating loops.</li>
              <li>Randomly select one neighbor, carve a passage into it, and push it onto the stack.</li>
              <li>When a dead end is reached (no unvisited neighbors), pop the stack to <strong>backtrack</strong> until an unexplored branch is found.</li>
            </ol>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Data Structure</span>
              <span className="font-semibold text-slate-700">LIFO Stack</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Complexity</span>
              <span className="font-semibold text-slate-700">O(Rows × Cols)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Maze Type</span>
              <span className="font-semibold text-slate-700">Perfect (Acyclic)</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Solvability</span>
              <span className="font-semibold text-emerald-600">Guaranteed</span>
            </div>
          </div>
        </div>
      )}

      {/* Content for Breadth-First Search */}
      {activeTab === 'bfs' && (
        <div className="flex flex-col gap-3 text-sm text-slate-600 leading-relaxed">
          <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
            <h4 className="font-bold text-blue-900 text-sm mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Breadth-First Search (Shortest Path Guarantee)
            </h4>
            <p className="text-xs text-blue-800/80 mb-3">
              BFS expands level-by-level like a wave spreading outward in all directions.
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 font-medium">
              <li>Place the start cell in a <strong>First-In, First-Out (FIFO) queue</strong> and mark it as visited.</li>
              <li>Dequeue the front cell, inspect all adjacent open cells, and record parent pointers.</li>
              <li>Enqueue each newly discovered neighbor and mark it visited immediately so it is never revisited.</li>
              <li>Because all cells at distance <em>d</em> are examined before any cell at distance <em>d + 1</em>, the first time the exit is dequeued, it is <strong>guaranteed to be the shortest path</strong>.</li>
            </ol>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Data Structure</span>
              <span className="font-semibold text-slate-700">FIFO Queue</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Shortest Path</span>
              <span className="font-semibold text-emerald-600">Always Guaranteed</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Exploration</span>
              <span className="font-semibold text-slate-700">Uniform Radial</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Memory</span>
              <span className="font-semibold text-slate-700">O(V) Queue</span>
            </div>
          </div>
        </div>
      )}

      {/* Content for Depth-First Search */}
      {activeTab === 'dfs' && (
        <div className="flex flex-col gap-3 text-sm text-slate-600 leading-relaxed">
          <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100">
            <h4 className="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Depth-First Search (Exploration & Backtracking)
            </h4>
            <p className="text-xs text-emerald-800/80 mb-3">
              DFS dives as deep as possible along each branch before backtracking from dead ends.
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 font-medium">
              <li>Push the starting cell onto an explicit <strong>Last-In, First-Out (LIFO) stack</strong>.</li>
              <li>Inspect available open neighbors. Advance into the first unvisited neighbor and push it onto the stack.</li>
              <li>When hitting a wall or visited dead end, <strong>backtrack</strong> by popping from the stack until a cell with untried directions is reached.</li>
              <li><strong>Important:</strong> DFS does <em>not</em> guarantee the shortest path; it returns the first path found along its exploration order.</li>
            </ol>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Data Structure</span>
              <span className="font-semibold text-slate-700">LIFO Stack</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Shortest Path</span>
              <span className="font-semibold text-amber-600">Not Guaranteed</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Exploration</span>
              <span className="font-semibold text-slate-700">Deep Winding</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Dead Ends</span>
              <span className="font-semibold text-slate-700">Explicit Pop</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
