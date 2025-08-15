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
  } else if (req.url === "/user-data") {
    // console.log(req.method);
    //   console.log(req.body); // can't do this because of serialization chunks
    console.log(req.headers["content-type"]);
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        /* demonstrating chunks begin
        console.log("raw buffer", chunk);
        console.log("chunk as string", chunk.toString());
         */
        // demonstrating chunks end
        body += chunk.toString();
      });
      req.on("end", () => {
        /*
        // if (req.headers["content-type"] === "multipart/form-data") {
        console.log("raw received data", body);
        console.log(typeof body);
        console.log("parsed data", parsedData);
        console.log(typeof parsedData);
        // demonstrate that default is plain and end can write information too
        */
        let parsedData = JSON.parse(body);
        // console.log(parsedData);
        const jsonData = JSON.stringify(parsedData, null, 2);
        fs.writeFileSync("userDB.json", jsonData, "utf8");
        res.writeHead(200);
        res.end("data received and saved");
        // }
      });
    } else if (req.method === "GET") {
      let userData = fs.readFileSync("userDB.json");
      console.log("user data " + userData + " typeof" + typeof userData);
      res.writeHead(200, { "content-type": "application/json" });
      res.write(userData);
      res.end();
    }
  } else {
    res.writeHead(404);
    res.write("Page Not Found");
    res.end();
  }
});
server.listen(5000);
console.log("server is listening");
