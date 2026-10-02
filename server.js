const express = require('express');
const app = express();
const port = 80;

app.use(express.json());

// In-memory store for active sessions
// In production, you might want to back this up to Redis or a JSON file
const sessions = {};

// Serve static files from the 'app' directory
app.use(express.static(__dirname + '/app'));

// Allowed users injected securely via Docker environment variables (or fallback)
const allowedUsers = process.env.ALLOWED_USERS 
  ? process.env.ALLOWED_USERS.split(',') 
  : ['warmup'];

// API Routes
app.post('/api/auth', (req, res) => {
  const user = req.body.username;
  if (allowedUsers.includes(user)) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

app.get('/api/sessions', (req, res) => {
  // Return list of session names
  res.json(Object.keys(sessions));
});

app.get('/api/sessions/:name', (req, res) => {
  res.json(sessions[req.params.name] || null);
});

app.post('/api/sessions/:name', (req, res) => {
  sessions[req.params.name] = req.body;
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Node backend listening on port ${port}`);
});
