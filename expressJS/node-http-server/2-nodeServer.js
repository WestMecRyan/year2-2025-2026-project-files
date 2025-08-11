// http is a native package/module to nodeJS
const http = require('http');
/*
// the http module has a createServer method that takes 1 arg:
// 1. a callback function that has 2 args: req, res
// the req object is the thing received from the client
// the res object is the thing the server sends back
*/
/*
// createServer returns an object with a listen method
// listen takes 1 arg:
// 1. a port to listen for http traffic
*/
const server = http.createServer((req, res) => {
    console.log(req);
    // we need to send back a res object so the client knows we're done
    /*
    http message
    1. start-line
    2. header
    3. body
    header is made with writeHead method that takes 2 args
    1. status code
    2. object for mime-type
    */
    if (Math.floor((Math.random() * 2) + 1) === 1) {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>hello class</h1>');
        res.end();
    } else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h1>page not found</h1>');
        res.end();
    }
});
/*
// ports should always be higher than the number 1000 (only root access allows less than 3000)
// 3000 is a common range for node and express servers
*/
server.listen(3000);