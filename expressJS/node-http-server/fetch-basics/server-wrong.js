const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/public/") {
    let filePath = fs.readFileSync(__dirname);
    let ext = path.ext(filePath);
    let mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
    };
    res.writeHead(202, { "content-type": mimeTypes[ext] });
    let asset = fs.readFile(_, (err, data) => {
      if (!err) {
        return data;
      }
    });
    res.write(asset);
    res.end();
  }
  res.writeHead(200, { "content-type": "text/html" });
  let indexHTML = fs.readFileSync("index.html");
  res.write(indexHTML);
  res.end();
});
server.listen(3000);
console.log("server is listening");
