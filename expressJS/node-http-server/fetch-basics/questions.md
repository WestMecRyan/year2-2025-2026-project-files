# important xss notice
`<img src=x onerror=alert('hacked!')>`
# Why do we need prevent default on a form submission?

# When was FormData class created and how does it look different internally than an object, what is the implementation difference?

# when does it matter if i use the comma or a plus symbol to concatenate a string?

# when does the for= label matter when matching a input?

# does it matter when using kebab case for name for label or id of the element do they interact?
# when does it matter if you type the content type object with plain text? When does it matter if you send data in the res.write() method? does the casing of content-type matter?

# how would the buffer look different if json.stringify or don't stringify on the client side before sending
Great question! Here's the difference:

**WITH `JSON.stringify(data)`:**
```javascript
// Client sends:
body: JSON.stringify({username: "john"})

// Server receives:
console.log("Raw chunk (Buffer):", chunk);
// <Buffer 7b 22 75 73 65 72 6e 61 6d 65 22 3a 22 6a 6f 68 6e 22 7d>

console.log("Chunk as string:", chunk.toString());
// {"username":"john"}

JSON.parse(body);  // Works! Returns {username: "john"}
```

**WITHOUT `JSON.stringify(data)`:**
```javascript
// Client sends:
body: {username: "john"}  // Just the object

// Server receives:
console.log("Raw chunk (Buffer):", chunk);
// <Buffer 5b 6f 62 6a 65 63 74 20 4f 62 6a 65 63 74 5d>

console.log("Chunk as string:", chunk.toString());
// [object Object]

JSON.parse(body);  // ERROR! Can't parse "[object Object]"
```

Without `JSON.stringify()`, JavaScript converts the object to the string `"[object Object]"` (its default string representation), which is useless - you've lost all the actual data.

The buffer shows the ASCII/UTF-8 codes:
- `7b` = `{`
- `22` = `"`
- `5b` = `[`
- `6f` = `o`
- `62` = `b`
- etc.

So the buffer literally contains different characters depending on whether you stringified or not.
Yes! Here's the client-side fetch code we were working with:

**Original (broken) version:**
```javascript
fetch("/user-data", { method: "GET" })
  .then((response) => {
    response.json(); // Missing 'return' - this was the issue
  })
  .then((response) => {
    console.log(response); // This was undefined
  })
  .catch(() => {
    console.log("error");
  });
```

**Fixed version:**
```javascript
fetch("/user-data", { method: "GET" })
  .then((response) => {
    return response.json(); // Added 'return'
  })
  .then((response) => {
    console.log(response); // Now this worked, but showed the array of character codes
  })
  .catch(() => {
    console.log("error");
  });
```

When you had the double JSON.stringify issue on the server, this client code was receiving and parsing the double-stringified data, which resulted in that array of character codes `[123, 10, 32, 32, 34, 117, 115, 101, 114, 110, 97, 109, 101, 34, 58, 32, 34, 97, 34, 10, 125]` instead of your actual user object.

The combination of both fixes (adding `return` on the client and removing the extra `JSON.stringify()` on the server) solved the problem.