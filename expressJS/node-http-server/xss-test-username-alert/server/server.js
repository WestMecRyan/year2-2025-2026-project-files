// server.js
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
    // Parse form data: "username=john" -> { username: "john" }
    console.log('complete body received', body);
    const params = new URLSearchParams(body);
    const data = {};
    for (const [key, value] of params) {
      data[key] = value;
    }
    callback(data);
  });
}

const server = http.createServer((req, res) => {
  //////// REQUEST OBJECT
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
  } else if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    const homePageHTML = fs.readFileSync("home.html");
    res.write(homePageHTML);
    res.end();
  } else if (req.url === "/save-name" && req.method === "POST") {
    console.log("logging req");
    console.log("logging req url");
    console.log(req.url);
    console.log("logging req method");
    console.log(req.method);
    console.log(req.headers);
    getPostData(req, (formData) => {
      console.log('from data is', formData);
      const username = formData.username;
      console.log("Username received:", username);

      // Write to file
      fs.writeFileSync("username.txt", username);
      console.log("Username saved to file");

      // Read from file
      const savedName = fs.readFileSync("username.txt", "utf8");
      console.log("Username read from file:", savedName);

      // Send back HTML fragment - VULNERABLE TO XSS!
      res.writeHead(200, { "content-type": "text/html" });
      res.write(
        `<h2>Welcome ${savedName}! You have been saved to the database</h2>`
      );
      res.end();
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Sorry Page not found!</h1>");
    res.end();
  }
});
server.listen(3000);
console.log("server is listening");
