Here's how to add message handling to your server. You'll need to add a new route to handle POST requests and parse the incoming data:

## Updated Server Code

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    if (req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        const homePageHTML = fs.readFileSync('home.html');
        res.write(homePageHTML);
        res.end();
    }
    else if (req.url === '/messages' && req.method === 'POST') {
        // Handle POST request for messages
        let body = '';

        // Collect data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // When all data is received
        req.on('end', () => {
            try {
                // Parse the JSON data from client
                const messageData = JSON.parse(body);

                // Read existing messages or create empty array
                let messages = [];
                try {
                    const existingData = fs.readFileSync('messages.js', 'utf8');
                    // Extract the array from the export statement
                    const messagesMatch = existingData.match(/messages\s*=\s*(\[.*\])/s);
                    if (messagesMatch) {
                        messages = JSON.parse(messagesMatch[1]);
                    }
                } catch (err) {
                    console.log('No existing messages file, starting fresh');
                }

                // Add new message with timestamp
                const newMessage = {
                    message: messageData.message,
                    timestamp: Date.now(),
                    id: Date.now() // Simple ID using timestamp
                };
                messages.push(newMessage);

                // Write back to messages.js file
                const fileContent = `const messages = ${JSON.stringify(messages, null, 2)};\n\nmodule.exports = messages;`;
                fs.writeFileSync('messages.js', fileContent);

                // Send success response
                res.writeHead(200, {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*' // Allow CORS for testing
                });
                res.write(JSON.stringify({ success: true, message: 'Message saved!' }));
                res.end();

            } catch (error) {
                // Send error response
                res.writeHead(400, { 'content-type': 'application/json' });
                res.write(JSON.stringify({ success: false, error: 'Invalid data' }));
                res.end();
            }
        });
    }
    else if (req.url === '/Nodelogo.png') {
        res.writeHead(200, { 'content-type': 'image/png' });
        let nodelogo = fs.readFileSync('Nodelogo.png');
        res.write(nodelogo);
        res.end();
    }
    else if (req.url === '/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' });
        let stylesheet = fs.readFileSync('styles.css');
        res.write(stylesheet);
        res.end();
    }
    else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h1>Sorry Page not found!</h1>');
        res.end();
    }
});

server.listen(3000);
```

## HTML Form (home.html)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Message App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Send a Message</h1>

    <form id="messageForm">
        <label for="messageInput">Your Message:</label>
        <textarea id="messageInput" placeholder="Type your message here..." required></textarea>
        <button type="submit">Send Message</button>
    </form>

    <div id="response"></div>

    <script>
        const messageForm = document.getElementById('messageForm');
        const messageInput = document.getElementById('messageInput');
        const responseDiv = document.getElementById('response');

        messageForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent form from submitting normally

            const message = messageInput.value.trim();
            if (!message) return;

            try {
                // Send message to server using fetch
                const response = await fetch('/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message })
                });

                const result = await response.json();

                if (result.success) {
                    responseDiv.innerHTML = '<p style="color: green;">Message sent successfully!</p>';
                    messageInput.value = ''; // Clear the form
                } else {
                    responseDiv.innerHTML = '<p style="color: red;">Error: ' + result.error + '</p>';
                }
            } catch (error) {
                responseDiv.innerHTML = '<p style="color: red;">Network error: ' + error.message + '</p>';
            }
        });
    </script>
</body>
</html>
```

## What the messages.js file will look like:

After sending some messages, your `messages.js` file will be created and look like this:

```javascript
const messages = [
  {
    "message": "Hello, this is my first message!",
    "timestamp": 1692123456789,
    "id": 1692123456789
  },
  {
    "message": "This is another message",
    "timestamp": 1692123567890,
    "id": 1692123567890
  }
];

module.exports = messages;
```

## Key Points:

1. **POST Route**: Added `/messages` route that only responds to POST requests
2. **Data Collection**: Uses `req.on('data')` and `req.on('end')` to collect the request body
3. **File Handling**: Reads existing messages, adds new one, writes back to file
4. **Client-side Fetch**: Uses `fetch()` API to send POST request with JSON data
5. **Error Handling**: Both server and client handle errors appropriately
6. **CORS**: Added basic CORS header for development (remove in production)

The messages are stored with timestamps so you can track when they were sent, and each message gets a unique ID based on the timestamp.