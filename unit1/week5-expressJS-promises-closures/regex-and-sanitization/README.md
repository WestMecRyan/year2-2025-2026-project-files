# Regex and Input Sanitization

## Learning Objectives
- Understand the importance of input validation and sanitization
- Learn regular expressions (regex) for pattern matching and validation
- Implement client-side and server-side input validation
- Prevent XSS attacks through proper sanitization
- Use sanitization libraries effectively
- Build secure forms with comprehensive validation

## 🔒 Why Input Validation and Sanitization Matter

### The Security Triangle
```
User Input → Validation → Sanitization → Safe Storage/Display
```

**Without proper validation and sanitization:**
- XSS (Cross-Site Scripting) attacks
- SQL injection vulnerabilities
- Data corruption and application crashes
- Poor user experience with invalid data

### Real-World Example: The Cost of Poor Validation
```javascript
// ❌ DANGEROUS - No validation or sanitization
app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  // Directly inserting user input into database and HTML
  res.send(`<div>Comment: ${comment}</div>`);
});

// Input: <script>alert('XSS Attack!');</script>
// Result: Script executes in user's browser! 🚨
```

## 📝 Regular Expressions (Regex) Fundamentals

### What is Regex?
Regular expressions are patterns used to match character combinations in strings. They're like a powerful search and validation tool.

### Basic Regex Syntax
| Pattern | Description | Example |
|---------|-------------|---------|
| `.` | Any single character | `a.c` matches "abc", "axc" |
| `*` | Zero or more of preceding | `ab*c` matches "ac", "abc", "abbc" |
| `+` | One or more of preceding | `ab+c` matches "abc", "abbc" (not "ac") |
| `?` | Zero or one of preceding | `ab?c` matches "ac", "abc" |
| `^` | Start of string | `^hello` matches "hello world" |
| `$` | End of string | `world$` matches "hello world" |
| `[]` | Character class | `[abc]` matches "a", "b", or "c" |
| `()` | Capturing group | `(abc)+` matches "abc", "abcabc" |

### Common Character Classes
- `\d` - Digits (0-9)
- `\w` - Word characters (a-z, A-Z, 0-9, _)
- `\s` - Whitespace (spaces, tabs, newlines)
- `\D` - Non-digits
- `\W` - Non-word characters
- `\S` - Non-whitespace

## ✅ Common Validation Patterns

### Email Validation
```javascript
// Basic email pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// More comprehensive email pattern
const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
```

### Phone Number Validation
```javascript
// US phone number formats
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// International format
const internationalPhoneRegex = /^\+?[1-9]\d{1,14}$/;
```

### Password Strength
```javascript
// At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```

### URL Validation
```javascript
const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
```

## 🧹 Sanitization Strategies

### 1. HTML Escaping (Basic Protection)
```javascript
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;'
  };
  
  return text.replace(/[&<>"'/]/g, (m) => map[m]);
}
```

### 2. Using Sanitize-HTML Library
```javascript
const sanitizeHtml = require('sanitize-html');

// Allow only safe HTML tags
const cleanHtml = sanitizeHtml(userInput, {
  allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'],
  allowedAttributes: {}
});
```

### 3. Input Filtering and Cleaning
```javascript
// Remove non-alphanumeric characters
const cleanAlphanumeric = (input) => input.replace(/[^a-zA-Z0-9]/g, '');

// Clean and format phone number
const cleanPhoneNumber = (phone) => phone.replace(/\D/g, '');

// Trim and normalize whitespace
const cleanText = (text) => text.trim().replace(/\s+/g, ' ');
```

## 🛡️ Defense in Depth Strategy

### Layer 1: Client-Side Validation (User Experience)
- Immediate feedback to users
- Reduces server load
- **Never rely on this alone!**

### Layer 2: Server-Side Validation (Security)
- Validate all inputs on the server
- Check data types, ranges, and formats
- Prevent malicious payloads

### Layer 3: Sanitization (Safe Processing)
- Clean data before storage/display
- Remove or escape dangerous characters
- Use tested sanitization libraries

### Layer 4: Output Encoding (Safe Display)
- Encode data when displaying to users
- Context-aware encoding (HTML, URL, JS)
- Use framework features when available

## ⚠️ Common XSS Attack Vectors

### 1. Reflected XSS
```javascript
// Vulnerable code
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`<h1>Results for: ${query}</h1>`); // Dangerous!
});

// Attack: /search?q=<script>alert('XSS')</script>
```

### 2. Stored XSS
```javascript
// Vulnerable code
app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  // Store comment in database without sanitization
  database.saveComment(comment); // Dangerous!
});
```

### 3. DOM-based XSS
```javascript
// Vulnerable client-side code
const urlParams = new URLSearchParams(window.location.search);
document.getElementById('content').innerHTML = urlParams.get('message'); // Dangerous!
```

## 🔧 Validation Libraries and Tools

### Popular JavaScript Validation Libraries
- **Joi** - Object schema validation
- **Yup** - Schema validation with excellent error messages  
- **Validator.js** - String validation and sanitization
- **Express-validator** - Express.js middleware for validation

### Example with Express-Validator
```javascript
const { body, validationResult } = require('express-validator');

app.post('/user', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  body('name').trim().escape().isLength({ min: 2, max: 50 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process valid input
});
```

## 🎯 Best Practices

### 1. Validate Early and Often
- Validate on client-side for UX
- Always validate on server-side for security
- Validate at database boundaries

### 2. Use Whitelist Approach
```javascript
// ✅ Good - Whitelist allowed characters
const validUsername = /^[a-zA-Z0-9_-]{3,20}$/;

// ❌ Bad - Blacklist dangerous characters (incomplete)
const invalidApproach = /[<>]/;
```

### 3. Context-Aware Sanitization
```javascript
// Different contexts need different sanitization
const forHtml = sanitizeHtml(input, htmlOptions);
const forUrl = encodeURIComponent(input);
const forDatabase = escapeForSql(input);
```

### 4. Error Handling and User Feedback
```javascript
function validateAndSanitizeInput(input, rules) {
  const errors = [];
  let cleanInput = input;
  
  // Validate
  for (const rule of rules) {
    if (!rule.test(input)) {
      errors.push(rule.message);
    }
  }
  
  if (errors.length === 0) {
    // Sanitize only if validation passes
    cleanInput = sanitize(input);
  }
  
  return { isValid: errors.length === 0, errors, cleanInput };
}
```

## 📚 Files in This Module

- `input-validation.js` - Common regex patterns and validation functions
- `sanitization-examples.js` - Practical sanitization implementations
- `security-patterns.md` - XSS prevention and security best practices

## 🔗 Key Security Principles

1. **Never Trust User Input** - Validate everything from the client
2. **Defense in Depth** - Multiple layers of protection
3. **Principle of Least Privilege** - Only allow what's necessary
4. **Fail Securely** - Default to secure behavior when validation fails
5. **Keep It Simple** - Complex validation logic is prone to bugs

## 🎓 Testing Your Validation

### Test Cases to Include
- Valid inputs (happy path)
- Invalid formats
- Empty/null inputs
- Extremely long inputs
- Special characters and symbols
- Unicode and international characters
- Common attack payloads

### Example Test Payloads
```javascript
const xssPayloads = [
  '<script>alert("XSS")</script>',
  '"><script>alert("XSS")</script>',
  'javascript:alert("XSS")',
  '<img src=x onerror=alert("XSS")>',
  '<svg onload=alert("XSS")>'
];
```

Remember: **Security is not a feature you add later - it must be built in from the beginning!**