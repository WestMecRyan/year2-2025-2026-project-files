# ExpressJS and APIs

## Learning Objectives
- Transform vanilla Node.js server to Express.js
- Understand Express routing, middleware, and static file serving
- Integrate external APIs securely with proper key management
- Handle API responses and error states
- Implement server-side API proxying for CORS issues

## What is Express.js?

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's essentially a layer built on top of Node.js that makes it much easier to build servers.

### Why Express vs Vanilla Node.js?

**Vanilla Node.js:**
```javascript
// Complex routing with if/else statements
if (req.url === "/" && req.method === "GET") {
  // handle home page
} else if (req.url === "/users" && req.method === "POST") {
  // handle user creation
} else if (req.url.startsWith("/public/")) {
  // handle static files
}
```

**Express.js:**
```javascript
// Clean, readable routing
app.get('/', (req, res) => {
  // handle home page
});

app.post('/users', (req, res) => {
  // handle user creation
});

app.use(express.static('public'));
```

## Key Express Concepts

### 1. Routing
Express provides simple methods for different HTTP verbs:
- `app.get()` - Handle GET requests
- `app.post()` - Handle POST requests
- `app.put()` - Handle PUT requests
- `app.delete()` - Handle DELETE requests

### 2. Middleware
Middleware functions execute during the request-response cycle:
- **Built-in middleware:** `express.static()`, `express.json()`
- **Third-party middleware:** `cors`, `helmet`, `morgan`
- **Custom middleware:** Your own functions

### 3. Static File Serving
Instead of manually handling file paths and MIME types:
```javascript
// Vanilla Node.js (complex)
if (req.url.startsWith("/public/")) {
  const filePath = path.join(__dirname, req.url);
  // ... handle MIME types, errors, etc.
}

// Express (simple)
app.use(express.static('public'));
```

## Working with External APIs

### Common API Integration Patterns

1. **Client-side API calls** (direct from browser)
2. **Server-side proxy** (server makes the API call)
3. **Hybrid approach** (mix of both)

### Why Use Server-Side Proxies?

1. **CORS Issues:** Many APIs don't allow browser requests
2. **API Key Security:** Hide sensitive keys on the server
3. **Rate Limiting:** Control API usage
4. **Data Processing:** Transform data before sending to client

### API Key Security Best Practices

1. **Never expose API keys in client-side code**
2. **Use environment variables** (`.env` files)
3. **Validate and sanitize all inputs**
4. **Implement rate limiting**
5. **Use HTTPS for all API communications**

## Example Use Cases

### Weather App Architecture
```
Browser → Your Express Server → Weather API
       ← JSON Response        ← Weather Data
```

### Benefits of This Approach:
- API key stays hidden on server
- Can cache responses to reduce API calls
- Can combine multiple API responses
- Can add authentication/authorization

## Next Steps

1. Convert the vanilla Node.js server to Express
2. Add weather API integration
3. Implement proper error handling
4. Add API key security measures

## Files in This Module

- `basic-express-server.js` - Conversion from vanilla Node.js to Express
- `weather-api-example.js` - External API integration example
- `api-key-security.md` - Security best practices guide

## Resources

- [Express.js Official Documentation](https://expressjs.com/)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [REST API Best Practices](https://restfulapi.net/)