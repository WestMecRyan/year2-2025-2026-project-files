const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/public/") {
    let filePath = path.join(__dirname, req.url);
    let ext = path.extname(filePath);

    let mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
    };
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        res.writeHead(200, { "content-type": mimeTypes[ext] });
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    let indexHTML = fs.readFileSync("index.html");
    res.write(indexHTML);
    res.end();
  } else {
    res.writeHead(404);
    res.write("Page Not Found");
    res.end();
  }
});
server.listen(3000);
console.log("server is listening");
