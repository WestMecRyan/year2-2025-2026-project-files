// server.js - SECURE VERSION with XSS Protection
const http = require("http");
const path = require("path");
const fs = require("fs");

// Helper to get POST body data
function getPostData(req, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const params = new URLSearchParams(body);
    const data = {};
    for (const [key, value] of params) {
      data[key] = value;
    }
    callback(data);
  });
}

// 🛡️ XSS PROTECTION: HTML Escaping Function
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')    // & becomes &amp;
    .replace(/</g, '&lt;')     // < becomes &lt;
    .replace(/>/g, '&gt;')     // > becomes &gt;
    .replace(/"/g, '&quot;')   // " becomes &quot;
    .replace(/'/g, '&#x27;')   // ' becomes &#x27;
    .replace(/\//g, '&#x2F;'); // / becomes &#x2F;
}

// 🛡️ ALTERNATIVE: More aggressive sanitization
function sanitizeInput(str) {
  if (!str) return '';

  // Remove all HTML tags completely
  const withoutTags = str.replace(/<[^>]*>/g, '');

  // Still escape remaining special characters
  return escapeHtml(withoutTags);
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/public/")) {
    const filePath = path.join(__dirname, req.url);
    const ext = path.extname(filePath);
    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".png": "image/png",
    };
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end();
      } else {
        res.writeHead(200, {
          "content-type": mimeTypes[ext],
        });
        res.write(data);
        res.end();
      }
    });
  }
  else if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    const homePageHTML = fs.readFileSync("home.html");
    res.write(homePageHTML);
    res.end();
  }
  else if (req.url === "/save-name" && req.method === "POST") {
    console.log("Form submitted!");

    getPostData(req, (formData) => {
      const rawUsername = formData.username;
      console.log("Raw username received:", rawUsername);

      // 🛡️ SECURE: Escape HTML before using
      const safeUsername = escapeHtml(rawUsername);
      console.log("Escaped username:", safeUsername);

      // Write RAW data to file (for logging/storage)
      fs.writeFileSync("username.txt", rawUsername);
      console.log("Raw username saved to file");

      // Read from file
      const savedName = fs.readFileSync("username.txt", "utf8");
      console.log("Username read from file:", savedName);

      // 🛡️ SECURE: Use escaped version in HTML response
      res.writeHead(200, { "content-type": "text/html" });
      res.write(`
        <div>
          <h2>Welcome ${safeUsername}! You have been saved to the database</h2>
          <div style="margin-top: 15px; padding: 10px; background: #e8f5e8; border-radius: 5px;">
            <h3>🛡️ XSS Protection Active!</h3>
            <p><strong>What you entered:</strong> ${safeUsername}</p>
            <p><strong>How it's stored:</strong> Raw data in file</p>
            <p><strong>How it's displayed:</strong> HTML-escaped for safety</p>
          </div>
        </div>
      `);
      res.end();
    });
  }
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Sorry Page not found!</h1>");
    res.end();
  }
});

server.listen(3000);
console.log("🛡️ SECURE server is listening on port 3000");

// 📚 TEACHING NOTES:
/*
WHAT ESCAPING DOES:
- Input: <script>alert('xss')</script>
- Escaped: &lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;
- Browser displays: <script>alert('xss')</script> (as text, not code)

WHY THIS WORKS:
- Browser sees &lt; as "display a < character"
- Browser sees < as "start an HTML tag"
- Escaping converts dangerous characters to safe display characters

ALTERNATIVE APPROACHES:
1. Content Security Policy (CSP) headers
2. Template engines with auto-escaping (Handlebars, EJS)
3. Client-side frameworks (React auto-escapes)
4. Input validation (whitelist allowed characters)
*/