You're right! The reason you're not seeing "big problem" is because **`fetch()` doesn't throw an error for HTTP status codes like 404**.

The 404 error you're seeing is just the browser's network log, not a JavaScript error that gets caught by your `catch` block.

**Here's what's happening:**

- `fetch()` successfully makes the request
- The server responds with "404 Not Found"
- `fetch()` considers this a "successful" request (no network error occurred)
- Your code continues and tries to call `.blob()` on the 404 response
- No error gets thrown, so your `catch` block never runs

**To handle HTTP errors properly, you need to check `response.ok`:**

```javascript
async function fetchImageAsync() {
  try {
    const response = await fetch("unrise-low-res.jpg");

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.blob();
    document.querySelector("#main-img").src = URL.createObjectURL(data);
  } catch (err) {
    console.log("big problem", err);
  }
}
```

Now when you get a 404, `response.ok` will be `false`, it will throw an error, and you'll see your "big problem" message in the console.

**`fetch()` only throws errors for:**

- Network failures (no internet, server unreachable)
- Request was aborted
- Other network-level issues

**`fetch()` does NOT throw errors for:**

- 404 Not Found
- 500 Internal Server Error
- Any other HTTP status codes
  fetch() only throws errors for:

Network failures (no internet, server unreachable)
Request was aborted
Other network-level issues

fetch() does NOT throw errors for:

404 Not Found
500 Internal Server Error
Any other HTTP status codes
