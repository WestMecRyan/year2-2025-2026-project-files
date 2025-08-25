// basic-express-server.js - Converting Vanilla Node.js to Express
const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express application
const app = express();
const PORT = 3000;

// 🛡️ XSS PROTECTION: HTML Escaping Function (same as vanilla version)
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// 🔧 MIDDLEWARE SETUP
// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

// Serve static files from public directory
// This replaces the complex manual file serving in vanilla Node.js
app.use('/public', express.static(path.join(__dirname, 'public')));

// 📍 ROUTES

// Home page route
// Vanilla: if (req.url === "/" && req.method === "GET")
app.get('/', (req, res) => {
  try {
    const homePageHTML = fs.readFileSync(path.join(__dirname, 'home.html'), 'utf8');
    res.send(homePageHTML);
  } catch (error) {
    console.error('Error reading home.html:', error);
    res.status(500).send('<h1>Error loading page</h1>');
  }
});

// Save name route (POST)
// Vanilla: if (req.url === "/save-name" && req.method === "POST")
app.post('/save-name', (req, res) => {
  console.log("Form submitted!");
  console.log("Form data received:", req.body);

  const rawUsername = req.body.username;
  console.log("Raw username received:", rawUsername);

  // 🛡️ SECURE: Escape HTML before using
  const safeUsername = escapeHtml(rawUsername);
  console.log("Escaped username:", safeUsername);

  try {
    // Write RAW data to file (for logging/storage)
    fs.writeFileSync(path.join(__dirname, "username.txt"), rawUsername);
    console.log("Raw username saved to file");

    // Read from file
    const savedName = fs.readFileSync(path.join(__dirname, "username.txt"), "utf8");
    console.log("Username read from file:", savedName);

    // 🛡️ SECURE: Use escaped version in HTML response
    res.send(`
      <div>
        <h2>Welcome ${safeUsername}! You have been saved to the database</h2>
        <div style="margin-top: 15px; padding: 10px; background: #e8f5e8; border-radius: 5px;">
          <h3>🛡️ XSS Protection Active!</h3>
          <p><strong>What you entered:</strong> ${safeUsername}</p>
          <p><strong>How it's stored:</strong> Raw data in file</p>
          <p><strong>How it's displayed:</strong> HTML-escaped for safety</p>
          <p><strong>Express Advantage:</strong> Built-in body parsing!</p>
        </div>
        <a href="/" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">Go Back Home</a>
      </div>
    `);
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).send('<h1>Error saving data</h1>');
  }
});

// API endpoint example - demonstrates Express route parameters
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id; // Express automatically parses route parameters
  
  // Simulate a simple user lookup
  const mockUser = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    created: new Date().toISOString()
  };

  res.json(mockUser); // Express automatically sets Content-Type to application/json
});

// API endpoint with query parameters
app.get('/api/search', (req, res) => {
  const { q, limit = 10 } = req.query; // Express parses query string automatically
  
  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  // Mock search results
  const results = {
    query: q,
    limit: parseInt(limit),
    results: [
      { id: 1, title: `Result for "${q}" #1` },
      { id: 2, title: `Result for "${q}" #2` },
    ],
    total: 2
  };

  res.json(results);
});

// 404 handler (must be last)
// Vanilla: else { res.writeHead(404); ... }
app.use('*', (req, res) => {
  res.status(404).send(`
    <h1>Sorry, page not found!</h1>
    <p>The requested URL <code>${req.originalUrl}</code> was not found.</p>
    <a href="/">Go back home</a>
  `);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).send('<h1>Internal server error</h1>');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📂 Serving static files from /public`);
  console.log(`🛡️ XSS protection enabled`);
});

// 📚 COMPARISON: Vanilla Node.js vs Express

/*
VANILLA NODE.JS CHALLENGES:
1. Manual URL parsing and routing with if/else statements
2. Manual POST body parsing
3. Complex static file serving with MIME type handling
4. Manual HTTP status codes and headers
5. No built-in middleware system

EXPRESS.JS ADVANTAGES:
1. Clean, readable routing with app.get(), app.post(), etc.
2. Built-in body parsing middleware
3. Simple static file serving with express.static()
4. Automatic HTTP status codes and JSON responses
5. Extensive middleware ecosystem
6. Route parameters and query parsing built-in
7. Better error handling
8. More maintainable and scalable code

MIDDLEWARE BENEFITS:
- express.urlencoded(): Parses form data automatically
- express.json(): Parses JSON request bodies
- express.static(): Serves static files with proper MIME types
- Custom middleware for logging, authentication, etc.

ROUTING IMPROVEMENTS:
- Route parameters: /user/:id automatically parsed
- Query parameters: req.query automatically parsed
- Method-specific handlers: app.get(), app.post(), etc.
- Middleware chaining for complex logic
*/

// 🏃‍♂️ GETTING STARTED:
/*
1. Initialize project: npm init -y
2. Install Express: npm install express
3. Create this file and a public/ directory
4. Add home.html file
5. Run: node basic-express-server.js
6. Visit: http://localhost:3000

NEXT STEPS:
- Add more middleware (cors, helmet, morgan)
- Implement proper error handling
- Add input validation
- Connect to external APIs
- Add authentication
*/