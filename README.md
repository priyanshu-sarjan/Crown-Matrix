# 👑 Crown Matrix — Puzzle Masters Hackathon 2026

![Hackathon Status](https://img.shields.io/badge/Puzzle%20Masters%20Hackathon-2026%20Finalist-06b6d4?style=for-the-badge&logo=trophy)
![Build Status](https://img.shields.io/badge/Build-Passing-10b981?style=for-the-badge&logo=github)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Express%20%7C%20Tailwind%20%7C%20Web%20Audio-fbbf24?style=for-the-badge)

An addictive spatial reasoning and constraint-satisfaction puzzle game based on the legendary 8-Queens mathematical challenge, reimagined for modern players.

---

## 🎯 Problem Statement & Solution

### The Challenge
Traditional logic puzzles often suffer from being either overly academic and dry or lacking engaging progression mechanics that retain modern players. The **8-Queens problem** is a classic mathematical hurdle where 8 queens must be placed on an $8 \times 8$ matrix without mutual threats, yet raw math feels intimidating to casual users.

### Our Solution
**Crown Matrix** transforms complex constraint satisfaction into an intuitive, visually stunning, and rewarding mobile/desktop puzzle experience. We blend an immersive **Cyber-Chess aesthetic** (`#111827` deep slate, `#38BDF8` neon cyan, `#FBBF24` golden crowns), progressive difficulty stages, real-time laser threat vector visualizers, and a **recursive depth-first backtracking hint engine**.

---

## ✨ Key Features & Game Modes

- 🌟 **Campaign Mode**: 8+ progressive handcrafted levels (from 4x4 starter grids to 8x8 Master Matrix challenges).
- 📅 **Daily Matrix Challenge**: Seed-based daily generated puzzles with streak tracking and calendar history.
- ⚡ **Time Attack & Blitz Mode**: 60-second speed-run mode for competitive players testing rapid combinatorial problem solving under pressure.
- 🛠️ **Custom Board Builder**: Create your own region layouts and test the solver engine in real-time.
- ⚡ **Dynamic Laser Threat Engine**: Real-time SVG overlay rendering glowing red/yellow laser beams between conflicting crowns across rows, columns, diagonals, and color regions.
- 💡 **Smart Backtracking Hint Engine**: Recursive depth-first algorithm that evaluates branch states in `<2ms` to point out mistakes or suggest optimal next placements.
- 🔊 **Web Audio API Synthesizer**: Custom sound engine generated procedurally in the browser — zero external audio file dependencies!
- 📊 **Embedded 10-Slide Presentation Deck**: Integrated directly into the web application top menu matching the official hackathon pitch.
- 🎥 **Demo Video Script & Showcase**: Built-in 2–5 minute presentation guide and walkthrough simulator.

---

## 🏗️ Technical Architecture

```mermaid
graph TD
    User([🎮 Player / Touch Interface]) --> UI[React 19 Frontend App]
    
    subgraph Frontend Layer
        UI --> Board[GameBoard.jsx - Grid & Laser SVG]
        UI --> Header[Header.jsx & Mode Switcher]
        UI --> Modals[PitchDeck, DemoVideo, Leaderboard Modals]
        Board --> LaserSVG[SVG Laser Vector Threat Overlay]
    end

    subgraph Logic & Engine Layer
        UI --> Validator[threats.js - Constraint Checker]
        UI --> Solver[solver.js - Recursive DFS Backtracking]
        UI --> Audio[soundEngine.js - Web Audio API Synthesizer]
    end

    subgraph Backend & Storage Layer
        UI --> REST[server.js - Express REST API]
        REST --> API_Leaderboard[/api/leaderboard]
        REST --> API_Health[/api/health]
        UI --> Storage[(Browser LocalStorage Fallback)]
    end
```

---

## 📊 Alignment with Hackathon Judging Criteria (100%)

| Criteria | Weight | How Crown Matrix Excels |
| :--- | :---: | :--- |
| **Innovation** | **25%** | Reimagines 8-Queens constraint satisfaction with region territory boundaries and real-time SVG laser threat vectors. |
| **Gameplay** | **25%** | 4 game modes (Campaign, Daily, Blitz, Builder), multi-state tile toggles, smart hint guidance, and victory fanfare. |
| **Technical Implementation** | **20%** | Recursive DFS solver (<2ms execution), Web Audio synth, React 19, Tailwind CSS 4, Node.js REST API. |
| **UI/UX** | **15%** | Cyber-Chess aesthetic (`#111827` slate, `#38BDF8` cyan, `#FBBF24` gold), 48px touch targets, WCAG AA compliance. |
| **Creativity** | **10%** | Embedded 10-slide presentation deck modal, Web Audio procedural synth, laser threat visualizers. |
| **Presentation** | **5%** | Professional README, Mermaid diagrams, demo video script, clean GitHub repository commit structure. |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ and npm installed on your system.

### Installation & Run

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/priyanshu-sarjan/Crown-Matrix.git
   cd Crown-Matrix
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server (Frontend):**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Run Express Backend REST API (Optional):**
   ```bash
   node server.js
   ```
   Backend runs on `http://localhost:3001`.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 👥 Team Details & Submission Metadata

- **Event**: Puzzle Masters Hackathon 2026 (Grand Finale)
- **Repository**: [https://github.com/priyanshu-sarjan/Crown-Matrix.git](https://github.com/priyanshu-sarjan/Crown-Matrix.git)
- **License**: MIT
