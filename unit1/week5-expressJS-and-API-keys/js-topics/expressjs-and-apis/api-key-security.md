# API Key Security Best Practices

## 🔐 Why API Key Security Matters

API keys are like passwords for your applications. If exposed, malicious users can:
- Use your API quotas and run up costs
- Access sensitive data through your accounts
- Perform actions on behalf of your application
- Get your API access revoked for abuse

## ❌ Common Security Mistakes

### 1. Exposing Keys in Client-Side Code
```javascript
// ❌ NEVER DO THIS - Visible to anyone!
const API_KEY = "sk-1234567890abcdef";
fetch(`https://api.service.com/data?key=${API_KEY}`);
```

### 2. Committing Keys to Version Control
```bash
# ❌ NEVER COMMIT THIS
# config.js
export const API_KEY = "sk-1234567890abcdef";
```

### 3. Hardcoding in Source Files
```javascript
// ❌ BAD - Keys visible in source code
app.get('/weather', async (req, res) => {
  const API_KEY = "1234567890abcdef";
  // ...
});
```

## ✅ Secure API Key Management

### 1. Environment Variables (.env files)

**Create .env file (never commit this!):**
```env
OPENWEATHER_API_KEY=your_actual_api_key_here
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=sk_test_...
```

**Use in your application:**
```javascript
require('dotenv').config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.error('API key not configured!');
  process.exit(1);
}
```

**Add to .gitignore:**
```gitignore
# Environment variables
.env
.env.local
.env.production

# API keys and secrets
config/secrets.json
keys/
```

### 2. Server-Side Proxy Pattern

Instead of exposing APIs to the client:

```javascript
// ✅ SECURE - API key stays on server
app.get('/api/weather/:city', async (req, res) => {
  try {
    const API_KEY = process.env.OPENWEATHER_API_KEY; // Secure!
    const city = req.params.city;
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    
    const data = await response.json();
    res.json(data); // Send processed data to client
  } catch (error) {
    res.status(500).json({ error: 'Weather service unavailable' });
  }
});
```

**Client-side code:**
```javascript
// ✅ SECURE - No API keys exposed
async function getWeather(city) {
  const response = await fetch(`/api/weather/${city}`);
  return response.json();
}
```

## 🛡️ Additional Security Layers

### 1. Input Validation & Sanitization
```javascript
app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;
  
  // Validate input
  if (!city || city.length < 2 || city.length > 50) {
    return res.status(400).json({ error: 'Invalid city name' });
  }
  
  // Sanitize input (remove special characters)
  const sanitizedCity = city.replace(/[^a-zA-Z\s-]/g, '');
  
  // Continue with API call...
});
```

### 2. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

// Limit requests to prevent API abuse
const weatherLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many weather requests, please try again later.'
});

app.use('/api/weather', weatherLimiter);
```

### 3. API Key Rotation
```javascript
// Support multiple keys for rotation
const API_KEYS = [
  process.env.PRIMARY_API_KEY,
  process.env.BACKUP_API_KEY
].filter(Boolean);

function getApiKey() {
  // Rotate between available keys
  return API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
}
```

### 4. Error Handling (Don't Leak Keys)
```javascript
app.get('/api/data', async (req, res) => {
  try {
    const response = await fetch(apiUrl);
    // ... handle response
  } catch (error) {
    // ❌ DON'T expose internal errors
    // console.error(error); // This might log API keys!
    
    // ✅ Log safely and return generic error
    console.error('API call failed:', error.message);
    res.status(500).json({ error: 'Service temporarily unavailable' });
  }
});
```

## 🚀 Production Deployment Security

### 1. Cloud Environment Variables
Most hosting platforms provide secure environment variable management:

**Heroku:**
```bash
heroku config:set OPENWEATHER_API_KEY=your_key_here
```

**Vercel:**
```bash
vercel env add OPENWEATHER_API_KEY
```

**Netlify:**
```bash
netlify env:set OPENWEATHER_API_KEY your_key_here
```

### 2. Key Management Services
For enterprise applications, use dedicated services:
- AWS Secrets Manager
- Azure Key Vault
- Google Secret Manager
- HashiCorp Vault

### 3. HTTPS Only
```javascript
// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure && req.get('X-Forwarded-Proto') !== 'https') {
      return res.redirect(`https://${req.get('Host')}${req.url}`);
    }
    next();
  });
}
```

## 📋 Security Checklist

- [ ] API keys stored in environment variables (.env file)
- [ ] .env file added to .gitignore
- [ ] No API keys in client-side code
- [ ] Server-side proxy for external API calls
- [ ] Input validation and sanitization
- [ ] Rate limiting implemented
- [ ] Error handling doesn't expose keys
- [ ] HTTPS enforced in production
- [ ] Regular key rotation schedule
- [ ] Monitoring for unusual API usage

## 🔄 API Key Lifecycle Management

### Development
1. Get development/test API keys
2. Store in local .env file
3. Use lower rate limits for testing

### Staging
1. Use separate staging keys
2. Mirror production security measures
3. Test key rotation procedures

### Production
1. Use production API keys with full quotas
2. Implement monitoring and alerting
3. Have backup keys ready for rotation
4. Regular security audits

## 🚨 What to Do If Keys Are Compromised

1. **Immediate Action:**
   - Revoke compromised keys immediately
   - Generate new keys
   - Update environment variables
   - Redeploy applications

2. **Investigation:**
   - Check API usage logs for abuse
   - Review access logs for unauthorized access
   - Identify how keys were exposed

3. **Prevention:**
   - Review security practices
   - Update documentation
   - Train team on security best practices
   - Implement additional monitoring

## 📚 Resources

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [12-Factor App Config](https://12factor.net/config)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

Remember: **Security is not a one-time setup, it's an ongoing practice!**