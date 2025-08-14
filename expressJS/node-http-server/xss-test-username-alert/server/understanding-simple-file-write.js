**No, you don't need a complex `getPostData` function for a simple string!** But you still need *some* way to read the POST body because Node.js streams it.

Here's the minimal version:

## Simplified approach for single string:

```javascript
// Minimal POST data reading for single value
else if (req.url === "/save-name" && req.method === "POST") {
  let body = "";

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    // For simple form: "username=john"
    const username = body.split('=')[1]; // Gets "john"

    // Write to file
    fs.writeFileSync("username.txt", username);

    // Send response
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<h2>Saved: ${username}</h2>`);
    res.end();
  });
}
```

## Even simpler if you send raw text:

If you modified your form to send **just the string** (not form-encoded data):

```javascript
// If you sent raw text instead of form data
else if (req.url === "/save-name" && req.method === "POST") {
  let body = "";

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    // body is just "john" (no parsing needed)
    fs.writeFileSync("username.txt", body);

    res.writeHead(200, { "content-type": "text/html" });
    res.write(`<h2>Saved: ${body}</h2>`);
    res.end();
  });
}
```

## Why you still need the streaming pattern:

Even for a single string, Node.js **requires** you to read the request body as a stream:

```javascript
// ❌ This doesn't work - no req.body property
const username = req.body; // undefined!

// ✅ This works - read the stream
let body = "";
req.on('data', chunk => body += chunk);
req.on('end', () => {
  // Now you have the data
});
```

## The `getPostData` function is just a helper:

```javascript
// Without helper - inline
let body = "";
req.on('data', chunk => body += chunk);
req.on('end', () => {
  const username = body.split('=')[1];
  // ... do stuff
});

// With helper - cleaner
getPostData(req, (data) => {
  const username = data.username;
  // ... do stuff
});
```

## Bottom line:

For a **single string**, you could skip the complex parsing and just use:
```javascript
const username = body.split('=')[1]; // Gets value after "username="
```

But you **still need** the `req.on('data')` / `req.on('end')` pattern because that's how Node.js HTTP works - even for tiny strings!

The `getPostData` function just makes it reusable and handles the URL decoding (`%20` → space, etc.).