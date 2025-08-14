const http = require("http");
const fs = require('fs');
const server = http.createServer((req, res) => {
  let index = fs.readFileSync('./index.html');
  res.writeHead(200, { 'content-type': {'text/html'} });
  res.write(index);
  res.end();
});
server.listen(3000);
