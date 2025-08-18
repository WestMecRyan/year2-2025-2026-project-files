const http = require("http");
const path = require("path");
const fs = require("fs");
console.log("hello" + __dirname);
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
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Sorry Page not found!</h1>");
    res.end();
  }
});
server.listen(3000);
console.log("server is listening");
