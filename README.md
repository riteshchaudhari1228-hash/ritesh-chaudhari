# Maze Runner — Interactive Maze Solver & Path Finder

A modern, responsive, and minimalist web game built with React, TypeScript, Vite, and Tailwind CSS. **Maze Runner** transforms Python-based maze algorithms into an interactive, visual web experience featuring procedural maze generation, manual keyboard and touch gameplay with lives & scoring, and real-time step-by-step pathfinding visualizations for Breadth-First Search (BFS) and Depth-First Search (DFS).

---

## 🎮 Features

### 1. Visual & Interactive Design
- **Minimalist Aesthetic:** Warm off-white/light gray backgrounds (`#f8fafc`), crisp white surfaces, charcoal typography (`#0f172a`), emerald player markers (`#10b981`), sapphire exploration paths (`#3b82f6`), and amber exit highlights (`#f59e0b`).
- **Responsive CSS Grid Board:** Perfectly scales and centers across desktop, laptop, tablet, and mobile screens without overflowing.
- **Visual Cell States:**
  - **Wall:** Solid dark slate cell (`#1e293b`).
  - **Open Path:** Light neutral cell (`#ffffff` / `#f8fafc`).
  - **Start:** Green marker labeled **S**.
  - **Exit:** Amber marker labeled **E**.
  - **Player:** Green circular marker with subtle movement animations.
  - **Visited Cell:** Subtle blue highlight indicating algorithm exploration.
  - **Final Solution Path:** Continuous blue trail with node markers.
  - **Backtracking:** Distinct faded dashed state for dead-end DFS backtracking.
- **Collision Effects:** Brief red flash and vibration when colliding with a wall.
- **Celebration Effects:** Restrained confetti burst upon conquering the maze.

### 2. Random Maze Generation (Recursive Backtracking)
- Generated in real-time with randomized direction ordering (Fisher-Yates shuffle).
- Supports three difficulty levels:
  - **Easy:** 5 × 5
  - **Moderate:** 8 × 8
  - **Difficult:** 12 × 12
- Strictly validated with route validation to guarantee a solvable path with natural corridors and zero accidental loops.

### 3. Manual Gameplay Mode
- **Lives:** Players start with **3 lives**. Hitting a wall deducts 1 life with visual feedback. Losing all 3 lives triggers Game Over.
- **Controls:**
  - **WASD:** `W` (Up), `A` (Left), `S` (Down), `D` (Right).
  - **Arrow Keys:** Up, Down, Left, Right (browser scrolling is prevented while playing).
  - **Touch Controls:** On-screen D-pad for mobile and touch devices.
- **Statistics:** Live move counter, remaining lives (hearts), elapsed time (`MM:SS`), and dynamic score.
- **Original Scoring Formula:**
  $$\text{score} = \max(0, 1000 - \text{moves} \times 5 - \lfloor\text{elapsed\_seconds} \times 10\rfloor)$$

### 4. BFS Shortest-Path Solver
- Uses a First-In, First-Out (**FIFO**) queue.
- Progressively animates exploration wave-by-wave.
- Records parent pointers to reconstruct and highlight the **guaranteed shortest path**.
- Measures path length in **movements** ($\text{path.length} - 1$) rather than cell count.
- Provides Play, Pause, Resume, Reset, Step-by-Step advancement, and Speed controls (Slow, Normal, Fast).

### 5. DFS Backtracking Solver
- Uses an explicit Last-In, First-Out (**LIFO**) stack.
- Explores deep corridors and visually marks cells that reach dead ends as **backtracked**.
- Highlights the discovered path upon reaching the exit.
- Provides identical controls: Play, Pause, Resume, Reset, Step-by-Step mode, and Speed adjustments.

### 6. Educational Section
- Detailed theoretical breakdown of **Recursive Backtracking**, **Breadth-First Search (Queue)**, and **Depth-First Search (Stack)**.
- Metric comparisons: Data structure, time/space complexity, and shortest-path guarantees.

---

## 📁 Project Structure

```
maze-runner/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── components/
│   │   ├── AlgorithmExplanation.tsx  # Theory & complexity comparison
│   │   ├── DifficultySelector.tsx    # Difficulty & mode switches
│   │   ├── GameControls.tsx          # Action buttons & solver playback
│   │   ├── GameResults.tsx           # Victory/Game Over modal with score breakdown
│   │   ├── GameStats.tsx             # Live HUD for moves, time, lives, score
│   │   ├── Legend.tsx                # Visual cell color key
│   │   ├── MazeBoard.tsx             # Responsive CSS Grid board
│   │   ├── Navbar.tsx                # Header navigation & brand
│   │   ├── RulesModal.tsx            # Game guide & controls modal
│   │   └── TouchControls.tsx         # Mobile on-screen D-pad
│   ├── game/
│   │   ├── bfsSolver.ts              # FIFO queue shortest path algorithm
│   │   ├── dfsSolver.ts              # LIFO stack deep backtracking algorithm
│   │   ├── game.test.ts              # Vitest automated test suite (13 tests)
│   │   ├── gameTypes.ts              # TypeScript interfaces & configs
│   │   ├── mazeGenerator.ts          # Recursive backtracking generator & validator
│   │   └── scoring.ts                # Score formula & time formatting
│   ├── hooks/
│   │   ├── useGameTimer.ts           # Clean game clock hook
│   │   └── useKeyboardControls.ts    # WASD/Arrow key listener with scroll prevention
│   ├── pages/
│   │   ├── GamePage.tsx              # Main gameplay & solver stage
│   │   └── HomePage.tsx              # Landing page with animated mini preview
│   ├── App.tsx                       # Root routing & layout
│   ├── index.css                     # Tailwind imports & base theme
│   └── main.tsx                      # React root entry
└── dist/                             # Compiled production bundle
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+) and npm.

### Installation & Execution

1. **Set Active Workspace:**
   Recommended project path:
   ```bash
   cd C:\Users\rites\.gemini\antigravity\scratch\maze-runner
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

3. **Run Automated Test Suite:**
   ```bash
   npm run test
   ```
   All 13 comprehensive unit tests will execute via Vitest.

4. **Build for Production:**
   ```bash
   npm run build
   ```
   Generates optimized static assets in the `dist/` directory.

5. **Preview Production Build:**
   ```bash
   npm run preview
   ```
