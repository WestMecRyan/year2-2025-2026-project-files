const http = require('http');
// fs is the file system module it's built into node
// gives access to the file system of the host server
const fs = require('fs');
const server = http.createServer((req, res) => {
    // the url property is the path relative to the root path
    console.log(req.url);
    if (req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        // res.write('<h1>hello this is the homepage</h1>');
        const homePageHTML = fs.readFileSync('home.html');
        // console.log(JSON.parse(homePageHTML));
        res.write(homePageHTML);
        // res.write(JSON.stringify({ 'firstName': 'Ryan', 'position': 'teacher' }));
        res.end();

    } else if (req.url === '/Nodelogo.png') {
        res.writeHead(200, { 'content-type': 'image/png' });
        let nodelogo = fs.readFileSync('Nodelogo.png');
        res.write(nodelogo);
        res.end();
    } else if (req.url === '/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' });
        let stylesheet = fs.readFileSync('styles.css');
        res.write(stylesheet);
        res.end();
    } else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h1>Sorry Page not found!</h1>');
        res.end();
    }
});
server.listen(3000);