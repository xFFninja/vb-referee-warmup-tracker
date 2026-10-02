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

const activeConnections = {};

function trackConnection(req, username) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ua = req.headers['user-agent'] || 'Unknown';
  const now = Date.now();
  
  if (!activeConnections[username]) {
    activeConnections[username] = {
      starttime: now,
      source_ip: ip,
      username: username,
      'user-agent': ua,
      last_seen: now
    };
  } else {
    activeConnections[username].last_seen = now;
    // Update IP and UA in case they changed
    activeConnections[username].source_ip = ip;
    activeConnections[username]['user-agent'] = ua;
  }
}

app.get('/api/sessions', (req, res) => {
  // Return list of session names
  res.json(Object.keys(sessions));
});

app.get('/api/sessions/:name', (req, res) => {
  trackConnection(req, req.params.name);
  res.json(sessions[req.params.name] || null);
});

app.post('/api/sessions/:name', (req, res) => {
  trackConnection(req, req.params.name);
  sessions[req.params.name] = req.body;
  res.json({ success: true });
});

// Admin endpoint to format connections as requested
app.get('/api/admin/connections', (req, res) => {
  const now = Date.now();
  // Cleanup connections not seen in the last 10 seconds (since client polls every 1.5s)
  for (const user in activeConnections) {
    if (now - activeConnections[user].last_seen > 10000) {
      delete activeConnections[user];
    }
  }

  let output = 'starttime;duration;source_ip;username;user-agent\n';
  for (const user in activeConnections) {
    const conn = activeConnections[user];
    const startDate = new Date(conn.starttime).toISOString();
    const durationMs = now - conn.starttime;
    const durationSec = Math.floor(durationMs / 1000);
    const durationStr = `${Math.floor(durationSec / 60)}m ${durationSec % 60}s`;
    
    output += `${startDate};${durationStr};${conn.source_ip};${conn.username};${conn['user-agent']}\n`;
  }
  
  res.type('text/plain');
  res.send(output);
});

app.listen(port, () => {
  console.log(`Node backend listening on port ${port}`);
});
