// sanitization-examples.js - Comprehensive Input Sanitization Techniques

console.log("🧹 Input Sanitization Examples - Cleaning User Data Safely\n");

// 1. 🔤 BASIC HTML ESCAPING

console.log("1. 🔤 Basic HTML Escaping - The Foundation of XSS Prevention");

function escapeHtml(text) {
  if (!text) return '';
  
  const htmlEscapeMap = {
    '&': '&amp;',   // Must be first!
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',  // More secure than &apos;
    '/': '&#x2F;'   // Prevents closing tags in attributes
  };
  
  return text.replace(/[&<>"'/]/g, (match) => htmlEscapeMap[match]);
}

function unescapeHtml(text) {
  if (!text) return '';
  
  const htmlUnescapeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/'
  };
  
  return text.replace(/&(amp|lt|gt|quot|#x27|#x2F);/g, (match) => htmlUnescapeMap[match]);
}

// Test HTML escaping
const htmlTests = [
  "<script>alert('XSS')</script>",
  'Hello "World" & everyone!',
  "<img src=x onerror=alert('XSS')>",
  "Normal text without HTML",
  "Path: C:/Users/Documents",
  "<div class='test'>Content</div>"
];

console.log("🔤 Testing HTML escaping:");
htmlTests.forEach(text => {
  const escaped = escapeHtml(text);
  const unescaped = unescapeHtml(escaped);
  console.log(`  Original: "${text}"`);
  console.log(`  Escaped:  "${escaped}"`);
  console.log(`  Restored: "${unescaped}"`);
  console.log(`  Safe: ${escaped.includes('<') ? '❌' : '✅'}\n`);
});

// 2. 🏷️ ATTRIBUTE SANITIZATION

console.log("2. 🏷️ HTML Attribute Sanitization");

function sanitizeHtmlAttribute(value) {
  if (!value) return '';
  
  // Remove dangerous characters for HTML attributes
  return value
    .replace(/[<>"'&]/g, '') // Remove dangerous HTML chars
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/vbscript:/gi, '')   // Remove vbscript: protocol
    .replace(/data:/gi, '')       // Remove data: protocol (can be dangerous)
    .replace(/on\w+=/gi, '')      // Remove event handlers (onclick, onload, etc)
    .trim();
}

function sanitizeUrl(url) {
  if (!url) return '';
  
  const cleaned = url.trim();
  
  // Allow only safe protocols
  const allowedProtocols = /^(https?|ftp|mailto):/i;
  
  // Check if it has a protocol
  if (cleaned.includes(':')) {
    if (!allowedProtocols.test(cleaned)) {
      return ''; // Reject dangerous protocols
    }
  } else {
    // Relative URLs are generally safe
    return cleaned;
  }
  
  return cleaned;
}

// Test attribute sanitization
const attributeTests = [
  'onclick="alert(\'XSS\')"',
  'javascript:alert("XSS")',
  'https://example.com',
  'data:text/html,<script>alert("XSS")</script>',
  'normal-value',
  'onmouseover="steal_cookies()"',
  '/relative/path',
  'mailto:user@example.com'
];

console.log("🏷️ Testing attribute sanitization:");
attributeTests.forEach(attr => {
  const sanitized = sanitizeHtmlAttribute(attr);
  const urlSanitized = sanitizeUrl(attr);
  console.log(`  Original: "${attr}"`);
  console.log(`  Attr Sanitized: "${sanitized}"`);
  console.log(`  URL Sanitized: "${urlSanitized}"`);
  console.log(`  Safe: ${sanitized.toLowerCase().includes('javascript') || sanitized.includes('onclick') ? '❌' : '✅'}\n`);
});

// 3. 📝 TEXT CONTENT SANITIZATION

console.log("3. 📝 Text Content Sanitization");

function sanitizeTextContent(text, options = {}) {
  const {
    allowLineBreaks = true,
    maxLength = 1000,
    removeExtraWhitespace = true,
    allowBasicFormatting = false
  } = options;
  
  if (!text) return '';
  
  let cleaned = text.toString();
  
  // Remove or replace dangerous characters
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Control chars
  
  if (allowBasicFormatting) {
    // Allow basic formatting but escape everything else
    const basicFormatRegex = /(<\/?(b|i|em|strong|u)>)/gi;
    const parts = cleaned.split(basicFormatRegex);
    
    cleaned = parts.map((part, index) => {
      if (index % 2 === 0) {
        // Text content - escape HTML
        return escapeHtml(part);
      } else {
        // Basic formatting tag - allow as-is (but validate first)
        return basicFormatRegex.test(part) ? part : escapeHtml(part);
      }
    }).join('');
  } else {
    // Escape all HTML
    cleaned = escapeHtml(cleaned);
  }
  
  if (!allowLineBreaks) {
    cleaned = cleaned.replace(/\r?\n|\r/g, ' ');
  } else {
    // Normalize line breaks
    cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }
  
  if (removeExtraWhitespace) {
    // Replace multiple spaces/tabs with single space
    cleaned = cleaned.replace(/[ \t]+/g, ' ');
    // Replace multiple line breaks with maximum of 2
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  }
  
  // Trim
  cleaned = cleaned.trim();
  
  // Truncate if too long
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength - 3) + '...';
  }
  
  return cleaned;
}

// Test text sanitization
const textTests = [
  "Normal text content",
  "<script>alert('XSS')</script>Text after script",
  "Text with\n\nline breaks\n\n\nand extra spaces   here",
  "Text with <b>bold</b> and <i>italic</i> formatting",
  "Text with <script>alert('bad')</script> and <b>good</b> tags",
  "Very long text that exceeds the maximum allowed length for this field and should be truncated properly",
  "Text\x00with\x1Fcontrol\x7Fcharacters"
];

console.log("📝 Testing text content sanitization:");
textTests.forEach(text => {
  const basic = sanitizeTextContent(text);
  const withFormatting = sanitizeTextContent(text, { allowBasicFormatting: true });
  const singleLine = sanitizeTextContent(text, { allowLineBreaks: false });
  
  console.log(`  Original: "${text}"`);
  console.log(`  Basic: "${basic}"`);
  console.log(`  With formatting: "${withFormatting}"`);
  console.log(`  Single line: "${singleLine}"`);
  console.log(`  Safe: ${basic.includes('<script>') ? '❌' : '✅'}\n`);
});

// 4. 💊 SQL INJECTION PREVENTION

console.log("4. 💊 SQL Injection Prevention");

function sanitizeForSql(input) {
  if (!input) return '';
  
  return input
    .toString()
    .replace(/'/g, "''")           // Escape single quotes
    .replace(/\\/g, '\\\\')        // Escape backslashes
    .replace(/\x00/g, '\\0')       // Escape null bytes
    .replace(/\n/g, '\\n')         // Escape newlines
    .replace(/\r/g, '\\r')         // Escape carriage returns
    .replace(/\x1a/g, '\\Z');      // Escape EOF character
}

// Better approach: Use parameterized queries (demonstration)
function createParameterizedQuery(tableName, columns, values) {
  // This is just an example - use proper ORM/query builder in production
  const sanitizedTableName = tableName.replace(/[^a-zA-Z0-9_]/g, '');
  const sanitizedColumns = columns.map(col => col.replace(/[^a-zA-Z0-9_]/g, ''));
  const placeholders = values.map(() => '?').join(', ');
  
  return {
    query: `INSERT INTO ${sanitizedTableName} (${sanitizedColumns.join(', ')}) VALUES (${placeholders})`,
    values: values.map(sanitizeForSql)
  };
}

// Test SQL sanitization
const sqlTests = [
  "Normal input",
  "'; DROP TABLE users; --",
  "Robert'; DELETE FROM users; --",
  "Input with 'single quotes'",
  "Path\\to\\file",
  "Line 1\nLine 2\rLine 3"
];

console.log("💊 Testing SQL injection prevention:");
sqlTests.forEach(input => {
  const sanitized = sanitizeForSql(input);
  const paramQuery = createParameterizedQuery('users', ['name'], [input]);
  
  console.log(`  Original: "${input}"`);
  console.log(`  Sanitized: "${sanitized}"`);
  console.log(`  Parameterized: ${paramQuery.query}`);
  console.log(`  Values: [${paramQuery.values.map(v => `"${v}"`).join(', ')}]`);
  console.log(`  Safe: ${sanitized.includes('DROP') || sanitized.includes('DELETE') ? '❌' : '✅'}\n`);
});

// 5. 🏗️ COMPREHENSIVE SANITIZATION LIBRARY

console.log("5. 🏗️ Comprehensive Sanitization Library");

class InputSanitizer {
  constructor() {
    this.htmlEscapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };
    
    this.allowedTags = ['b', 'i', 'em', 'strong', 'u', 'br', 'p'];
    this.dangerousProtocols = ['javascript:', 'vbscript:', 'data:', 'file:'];
  }
  
  // Sanitize for HTML content
  forHtml(input, options = {}) {
    if (!input) return '';
    
    const { allowTags = false, maxLength = 1000 } = options;
    
    let cleaned = input.toString();
    
    if (allowTags) {
      cleaned = this.sanitizeHtmlTags(cleaned);
    } else {
      cleaned = this.escapeHtml(cleaned);
    }
    
    return this.truncate(cleaned, maxLength);
  }
  
  // Sanitize for HTML attributes
  forAttribute(input) {
    if (!input) return '';
    
    return input
      .toString()
      .replace(/[<>"'&]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }
  
  // Sanitize URLs
  forUrl(input) {
    if (!input) return '';
    
    const cleaned = input.toString().trim();
    
    // Check for dangerous protocols
    for (const protocol of this.dangerousProtocols) {
      if (cleaned.toLowerCase().startsWith(protocol)) {
        return '';
      }
    }
    
    return cleaned;
  }
  
  // Sanitize for JSON
  forJson(input) {
    if (!input) return '';
    
    return input
      .toString()
      .replace(/\\/g, '\\\\')  // Escape backslashes
      .replace(/"/g, '\\"')    // Escape quotes
      .replace(/\n/g, '\\n')   // Escape newlines
      .replace(/\r/g, '\\r')   // Escape carriage returns
      .replace(/\t/g, '\\t');  // Escape tabs
  }
  
  // Sanitize filenames
  forFilename(input) {
    if (!input) return '';
    
    return input
      .toString()
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, '') // Remove dangerous characters
      .replace(/^\.+/, '')  // Remove leading dots
      .replace(/\.+$/, '')  // Remove trailing dots
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .substring(0, 255);   // Limit length
  }
  
  // Sanitize email addresses
  forEmail(input) {
    if (!input) return '';
    
    return input
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9@._-]/g, ''); // Only allow safe email characters
  }
  
  // Helper methods
  escapeHtml(text) {
    return text.replace(/[&<>"'/]/g, (match) => this.htmlEscapeMap[match]);
  }
  
  sanitizeHtmlTags(html) {
    // Simple HTML sanitization (in production, use a library like DOMPurify)
    return html.replace(/<(\/?)([\w]+)([^>]*)>/gi, (match, slash, tag, attrs) => {
      if (this.allowedTags.includes(tag.toLowerCase())) {
        return `<${slash}${tag}>`;  // Keep allowed tags but remove attributes
      }
      return '';  // Remove disallowed tags
    });
  }
  
  truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
}

// Test comprehensive sanitization
const sanitizer = new InputSanitizer();

const comprehensiveTests = [
  { input: "<script>alert('XSS')</script>Normal text", type: 'html' },
  { input: 'onclick="alert(1)" href="javascript:void(0)"', type: 'attribute' },
  { input: 'javascript:alert("XSS")', type: 'url' },
  { input: 'Data with "quotes" and \n newlines', type: 'json' },
  { input: 'my<file>name?.txt', type: 'filename' },
  { input: '  USER@EXAMPLE.COM  ', type: 'email' }
];

console.log("🏗️ Testing comprehensive sanitization:");
comprehensiveTests.forEach(({ input, type }) => {
  let result;
  
  switch (type) {
    case 'html':
      result = sanitizer.forHtml(input);
      break;
    case 'attribute':
      result = sanitizer.forAttribute(input);
      break;
    case 'url':
      result = sanitizer.forUrl(input);
      break;
    case 'json':
      result = sanitizer.forJson(input);
      break;
    case 'filename':
      result = sanitizer.forFilename(input);
      break;
    case 'email':
      result = sanitizer.forEmail(input);
      break;
    default:
      result = input;
  }
  
  console.log(`  ${type.toUpperCase()}: "${input}" -> "${result}"`);
});

// 6. 🎭 CONTEXT-AWARE SANITIZATION EXAMPLE

console.log("\n6. 🎭 Context-Aware Sanitization Example");

function sanitizeByContext(input, context, options = {}) {
  const sanitizer = new InputSanitizer();
  
  switch (context) {
    case 'html-content':
      return sanitizer.forHtml(input, { allowTags: options.allowTags || false });
      
    case 'html-attribute':
      return sanitizer.forAttribute(input);
      
    case 'url':
      return sanitizer.forUrl(input);
      
    case 'filename':
      return sanitizer.forFilename(input);
      
    case 'email':
      return sanitizer.forEmail(input);
      
    case 'search-query':
      // Special handling for search queries
      return input
        .toString()
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML
        .replace(/['"]/g, '')  // Remove quotes that might break queries
        .substring(0, 100);    // Limit length
        
    case 'username':
      // Special handling for usernames
      return input
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9_-]/g, '') // Only alphanumeric, underscore, dash
        .substring(0, 30);           // Reasonable length limit
        
    default:
      return sanitizer.forHtml(input); // Default to HTML sanitization
  }
}

// Test context-aware sanitization
const contextTests = [
  { input: '<script>alert("XSS")</script>Hello World', context: 'html-content' },
  { input: 'javascript:alert("XSS")', context: 'url' },
  { input: 'My Search <script>Terms</script>', context: 'search-query' },
  { input: 'User-Name@123!', context: 'username' },
  { input: 'Bad<File>Name?.txt', context: 'filename' },
  { input: '  USER@EXAMPLE.COM  ', context: 'email' }
];

console.log("🎭 Testing context-aware sanitization:");
contextTests.forEach(({ input, context }) => {
  const result = sanitizeByContext(input, context);
  console.log(`  ${context}: "${input}" -> "${result}"`);
});

console.log("\n🎓 Sanitization examples complete!");
console.log("💡 Key takeaways:");
console.log("   - Always sanitize user input based on its intended use");
console.log("   - Use context-aware sanitization (HTML, attributes, URLs, etc.)");
console.log("   - Escape HTML entities to prevent XSS attacks");
console.log("   - Use parameterized queries to prevent SQL injection");
console.log("   - Validate and sanitize filenames to prevent path traversal");
console.log("   - Consider using established libraries like DOMPurify for HTML sanitization");
console.log("   - Test sanitization with various attack vectors");

// 📚 PRODUCTION SANITIZATION CHECKLIST:

/*
PRODUCTION SANITIZATION CHECKLIST:

✅ INPUT SANITIZATION:
   - HTML content: Use libraries like DOMPurify or sanitize-html
   - HTML attributes: Remove dangerous characters and event handlers
   - URLs: Validate protocols and remove javascript: schemes
   - SQL queries: Use parameterized queries (never string concatenation)
   - File paths: Remove directory traversal attempts (../)
   - JSON data: Properly escape quotes and control characters

✅ CONTEXT-AWARE SANITIZATION:
   - Different contexts need different sanitization rules
   - HTML content vs HTML attributes vs URLs vs filenames
   - Consider the final destination of the data

✅ OUTPUT ENCODING:
   - Encode data when displaying to users
   - Use appropriate encoding for context (HTML, URL, JavaScript)
   - Many frameworks provide built-in encoding functions

✅ SECURITY LIBRARIES:
   - DOMPurify: Client-side HTML sanitization
   - sanitize-html: Server-side HTML sanitization  
   - validator.js: Input validation and sanitization
   - express-validator: Express.js validation middleware

COMMON MISTAKES TO AVOID:

❌ Blacklisting instead of whitelisting
❌ Client-side only sanitization
❌ Inconsistent sanitization across the application
❌ Not sanitizing data from trusted sources
❌ Over-sanitizing and breaking legitimate use cases
❌ Not testing sanitization with real attack payloads

TESTING SANITIZATION:

Include these test cases:
- Basic XSS payloads: <script>alert('XSS')</script>
- Event handler injection: <img src=x onerror=alert('XSS')>
- Protocol injection: javascript:alert('XSS')
- SQL injection: '; DROP TABLE users; --
- Path traversal: ../../../etc/passwd
- Unicode and encoding attacks
- Very long inputs to test buffer limits
*/