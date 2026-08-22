// Crown Matrix - Express Backend REST API
// Hackathon 2026 Submission Backend

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-Memory Leaderboard Database
let leaderboard = [
  { rank: 1, name: 'CyberQueen_99', solved: 48, blitz: 1420, streak: 14, title: 'Grandmaster' },
  { rank: 2, name: 'MatrixKnight', solved: 42, blitz: 1280, streak: 12, title: 'Master' },
  { rank: 3, name: 'AlgoRider', solved: 39, blitz: 1150, streak: 9, title: 'Master' },
  { rank: 4, name: 'CrownMaster2026', solved: 35, blitz: 990, streak: 7, title: 'Expert' },
  { rank: 5, name: 'LogicPioneer', solved: 31, blitz: 870, streak: 5, title: 'Tactician' },
  { rank: 6, name: 'VectorQueen', solved: 28, blitz: 760, streak: 4, title: 'Tactician' }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    game: 'Crown Matrix',
    hackathon: 'Puzzle Masters Hackathon 2026',
    timestamp: new Date().toISOString()
  });
});

// Get Leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

// Submit Score
app.post('/api/leaderboard', (req, res) => {
  const { name, solved, blitz, streak } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const existingIdx = leaderboard.findIndex(p => p.name === name);
  if (existingIdx !== -1) {
    leaderboard[existingIdx].solved = Math.max(leaderboard[existingIdx].solved, solved || 0);
    leaderboard[existingIdx].blitz = Math.max(leaderboard[existingIdx].blitz, blitz || 0);
    leaderboard[existingIdx].streak = Math.max(leaderboard[existingIdx].streak, streak || 0);
  } else {
    leaderboard.push({
      rank: leaderboard.length + 1,
      name,
      solved: solved || 1,
      blitz: blitz || 0,
      streak: streak || 1,
      title: 'Challenger'
    });
  }

  // Sort by solved count & blitz score
  leaderboard.sort((a, b) => b.solved - a.solved || b.blitz - a.blitz);
  leaderboard.forEach((p, idx) => { p.rank = idx + 1; });

  res.json({ success: true, leaderboard });
});

// Serve frontend build if static
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

app.listen(PORT, () => {
  console.log(`Crown Matrix Express Server running on port ${PORT}`);
});
