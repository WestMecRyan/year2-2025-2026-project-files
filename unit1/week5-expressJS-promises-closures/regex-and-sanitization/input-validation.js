// input-validation.js - Comprehensive Input Validation with Regular Expressions

console.log("📋 Input Validation Patterns - Building Secure Forms\n");

// 1. 📧 EMAIL VALIDATION PATTERNS

console.log("1. 📧 Email Validation Patterns");

// Basic email validation (good for most cases)
const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// More comprehensive email validation
const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateEmail(email) {
  const result = {
    isValid: false,
    errors: [],
    cleaned: email ? email.trim().toLowerCase() : ''
  };
  
  if (!email) {
    result.errors.push("Email is required");
    return result;
  }
  
  const cleaned = email.trim().toLowerCase();
  
  // Length check
  if (cleaned.length > 254) {
    result.errors.push("Email is too long (max 254 characters)");
  }
  
  // Basic format check
  if (!basicEmailRegex.test(cleaned)) {
    result.errors.push("Invalid email format");
  }
  
  // Additional checks
  if (cleaned.includes('..')) {
    result.errors.push("Email cannot contain consecutive dots");
  }
  
  if (cleaned.startsWith('.') || cleaned.endsWith('.')) {
    result.errors.push("Email cannot start or end with a dot");
  }
  
  result.isValid = result.errors.length === 0;
  result.cleaned = cleaned;
  
  return result;
}

// Test email validation
const emailTests = [
  "test@example.com",
  "user.name+tag@domain.co.uk", 
  "invalid.email",
  "@domain.com",
  "test@",
  "test..test@domain.com",
  ".test@domain.com",
  "test@domain.com.",
  "reallylongemailaddressthatexceeds254characterslimitreallylongemailaddressthatexceeds254characterslimitreallylongemailaddressthatexceeds254characterslimitreallylongemailaddressthatexceeds254characterslimitreallylongemailaddress@domain.com"
];

console.log("📧 Testing email validation:");
emailTests.forEach(email => {
  const result = validateEmail(email);
  console.log(`  ${result.isValid ? '✅' : '❌'} "${email}" -> ${result.isValid ? 'Valid' : result.errors.join(', ')}`);
});

// 2. 📞 PHONE NUMBER VALIDATION

console.log("\n2. 📞 Phone Number Validation");

// US phone number patterns
const usPhoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const internationalPhoneRegex = /^\+?[1-9]\d{1,14}$/;

function validatePhoneNumber(phone, type = 'us') {
  const result = {
    isValid: false,
    errors: [],
    cleaned: '',
    formatted: ''
  };
  
  if (!phone) {
    result.errors.push("Phone number is required");
    return result;
  }
  
  // Clean phone number (remove all non-digit characters except +)
  const cleaned = phone.replace(/[^\d+]/g, '');
  result.cleaned = cleaned;
  
  if (type === 'us') {
    // US phone number validation
    const digitsOnly = cleaned.replace(/\D/g, '');
    
    if (digitsOnly.length === 10) {
      result.isValid = usPhoneRegex.test(phone);
      result.formatted = `(${digitsOnly.slice(0,3)}) ${digitsOnly.slice(3,6)}-${digitsOnly.slice(6)}`;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      result.isValid = true;
      const withoutCountry = digitsOnly.slice(1);
      result.formatted = `+1 (${withoutCountry.slice(0,3)}) ${withoutCountry.slice(3,6)}-${withoutCountry.slice(6)}`;
    } else {
      result.errors.push("US phone number must be 10 digits (or 11 with country code 1)");
    }
  } else if (type === 'international') {
    // International phone number validation
    if (internationalPhoneRegex.test(cleaned)) {
      result.isValid = true;
      result.formatted = cleaned.startsWith('+') ? cleaned : '+' + cleaned;
    } else {
      result.errors.push("Invalid international phone number format");
    }
  }
  
  return result;
}

// Test phone number validation
const phoneTests = [
  "(555) 123-4567",
  "555-123-4567", 
  "5551234567",
  "1-555-123-4567",
  "+1 555 123 4567",
  "555-12-3456", // Invalid
  "12345", // Too short
  "+44 20 7946 0958", // UK number
  "+86 138 0013 8000" // China number
];

console.log("📞 Testing phone number validation:");
phoneTests.forEach(phone => {
  const result = validatePhoneNumber(phone, 'us');
  console.log(`  ${result.isValid ? '✅' : '❌'} "${phone}" -> ${result.isValid ? result.formatted : result.errors.join(', ')}`);
});

// 3. 🔐 PASSWORD STRENGTH VALIDATION

console.log("\n3. 🔐 Password Strength Validation");

function validatePassword(password) {
  const result = {
    isValid: false,
    errors: [],
    strength: 'weak',
    score: 0,
    suggestions: []
  };
  
  if (!password) {
    result.errors.push("Password is required");
    return result;
  }
  
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
    noCommon: !isCommonPassword(password),
    noSequential: !hasSequentialChars(password)
  };
  
  // Count passed checks
  const passedChecks = Object.values(checks).filter(Boolean).length;
  result.score = passedChecks;
  
  // Generate errors and suggestions
  if (!checks.length) {
    result.errors.push("Password must be at least 8 characters long");
    result.suggestions.push("Use at least 8 characters");
  }
  
  if (!checks.lowercase) {
    result.errors.push("Password must contain at least one lowercase letter");
    result.suggestions.push("Add lowercase letters (a-z)");
  }
  
  if (!checks.uppercase) {
    result.errors.push("Password must contain at least one uppercase letter");
    result.suggestions.push("Add uppercase letters (A-Z)");
  }
  
  if (!checks.numbers) {
    result.errors.push("Password must contain at least one number");
    result.suggestions.push("Add numbers (0-9)");
  }
  
  if (!checks.special) {
    result.errors.push("Password must contain at least one special character (@$!%*?&)");
    result.suggestions.push("Add special characters (@$!%*?&)");
  }
  
  if (!checks.noCommon) {
    result.errors.push("Password is too common");
    result.suggestions.push("Avoid common passwords like 'password123'");
  }
  
  if (!checks.noSequential) {
    result.errors.push("Password contains sequential characters");
    result.suggestions.push("Avoid sequential patterns like '123' or 'abc'");
  }
  
  // Determine strength
  if (passedChecks >= 6) {
    result.strength = 'strong';
  } else if (passedChecks >= 4) {
    result.strength = 'medium';
  } else {
    result.strength = 'weak';
  }
  
  result.isValid = result.errors.length === 0;
  
  return result;
}

function isCommonPassword(password) {
  const commonPasswords = [
    'password', '123456', 'password123', 'admin', 'qwerty',
    'letmein', 'welcome', 'monkey', '1234567890', 'abc123'
  ];
  return commonPasswords.includes(password.toLowerCase());
}

function hasSequentialChars(password) {
  // Check for 3+ sequential characters (numbers or letters)
  const sequential = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i;
  return sequential.test(password);
}

// Test password validation
const passwordTests = [
  "MyStr0ng!Pass",
  "password123",
  "PASSWORD",
  "12345678",
  "Aa1!",
  "VeryLongPasswordWithNoNumbers!",
  "abc123DEF@",
  "P@ssw0rd123"
];

console.log("🔐 Testing password validation:");
passwordTests.forEach(password => {
  const result = validatePassword(password);
  console.log(`  ${result.isValid ? '✅' : '❌'} "${password}" -> ${result.strength} (score: ${result.score}/7)`);
  if (!result.isValid) {
    console.log(`      💡 Suggestions: ${result.suggestions.join(', ')}`);
  }
});

// 4. 🌐 URL VALIDATION

console.log("\n4. 🌐 URL Validation");

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

function validateUrl(url) {
  const result = {
    isValid: false,
    errors: [],
    cleaned: url ? url.trim() : '',
    protocol: '',
    domain: '',
    path: ''
  };
  
  if (!url) {
    result.errors.push("URL is required");
    return result;
  }
  
  const cleaned = url.trim();
  result.cleaned = cleaned;
  
  try {
    const urlObj = new URL(cleaned);
    result.protocol = urlObj.protocol;
    result.domain = urlObj.hostname;
    result.path = urlObj.pathname;
    
    // Check protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      result.errors.push("URL must use HTTP or HTTPS protocol");
    }
    
    // Check for valid domain
    if (!urlObj.hostname || urlObj.hostname.length < 3) {
      result.errors.push("URL must have a valid domain");
    }
    
    // Additional URL format check
    if (urlRegex.test(cleaned)) {
      result.isValid = result.errors.length === 0;
    } else {
      result.errors.push("Invalid URL format");
    }
    
  } catch (e) {
    result.errors.push("Invalid URL format");
  }
  
  return result;
}

// Test URL validation
const urlTests = [
  "https://www.example.com",
  "http://example.com/path/to/page",
  "https://subdomain.example.co.uk/path?query=value#anchor",
  "ftp://example.com", // Invalid protocol
  "not-a-url",
  "https://",
  "www.example.com", // Missing protocol
  "https://localhost:3000",
  "https://192.168.1.1"
];

console.log("🌐 Testing URL validation:");
urlTests.forEach(url => {
  const result = validateUrl(url);
  console.log(`  ${result.isValid ? '✅' : '❌'} "${url}" -> ${result.isValid ? `${result.protocol}//${result.domain}` : result.errors.join(', ')}`);
});

// 5. 📝 TEXT INPUT VALIDATION

console.log("\n5. 📝 Text Input Validation");

function validateTextInput(text, options = {}) {
  const {
    minLength = 0,
    maxLength = 1000,
    allowedPattern = /^[\w\s\-\.,!?'"()]*$/,
    required = false,
    trimWhitespace = true
  } = options;
  
  const result = {
    isValid: false,
    errors: [],
    cleaned: '',
    wordCount: 0,
    charCount: 0
  };
  
  // Handle null/undefined
  if (!text && required) {
    result.errors.push("This field is required");
    return result;
  }
  
  if (!text) {
    result.isValid = true;
    return result;
  }
  
  // Clean input
  let cleaned = trimWhitespace ? text.trim() : text;
  
  // Normalize whitespace (replace multiple spaces with single space)
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  result.cleaned = cleaned;
  result.charCount = cleaned.length;
  result.wordCount = cleaned ? cleaned.split(/\s+/).filter(word => word.length > 0).length : 0;
  
  // Length validation
  if (cleaned.length < minLength) {
    result.errors.push(`Must be at least ${minLength} characters long`);
  }
  
  if (cleaned.length > maxLength) {
    result.errors.push(`Must be no more than ${maxLength} characters long`);
  }
  
  // Pattern validation
  if (cleaned && !allowedPattern.test(cleaned)) {
    result.errors.push("Contains invalid characters");
  }
  
  result.isValid = result.errors.length === 0;
  
  return result;
}

// Test text input validation
const textTests = [
  { text: "Hello, World!", options: { minLength: 5, maxLength: 50 } },
  { text: "   Lots of   spaces   ", options: { trimWhitespace: true } },
  { text: "Short", options: { minLength: 10 } },
  { text: "This is a very long text that exceeds the maximum allowed length for this field", options: { maxLength: 50 } },
  { text: "<script>alert('xss')</script>", options: { allowedPattern: /^[a-zA-Z0-9\s]*$/ } },
  { text: "", options: { required: true } },
  { text: "Valid text with punctuation!", options: {} }
];

console.log("📝 Testing text input validation:");
textTests.forEach(({ text, options }, index) => {
  const result = validateTextInput(text, options);
  console.log(`  ${result.isValid ? '✅' : '❌'} Test ${index + 1}: "${text}" -> ${result.isValid ? `Valid (${result.charCount} chars, ${result.wordCount} words)` : result.errors.join(', ')}`);
});

// 6. 🔢 NUMERIC INPUT VALIDATION

console.log("\n6. 🔢 Numeric Input Validation");

function validateNumericInput(input, options = {}) {
  const {
    type = 'integer', // 'integer', 'decimal', 'currency'
    min = null,
    max = null,
    required = false,
    allowNegative = true
  } = options;
  
  const result = {
    isValid: false,
    errors: [],
    value: null,
    formatted: ''
  };
  
  if (!input && !required) {
    result.isValid = true;
    return result;
  }
  
  if (!input && required) {
    result.errors.push("This field is required");
    return result;
  }
  
  // Clean input (remove whitespace and currency symbols)
  let cleaned = input.toString().trim().replace(/[$,]/g, '');
  
  // Validate numeric format
  let numericValue;
  
  if (type === 'integer') {
    const integerPattern = allowNegative ? /^-?\d+$/ : /^\d+$/;
    if (!integerPattern.test(cleaned)) {
      result.errors.push("Must be a valid integer");
      return result;
    }
    numericValue = parseInt(cleaned, 10);
    result.formatted = numericValue.toLocaleString();
  } else if (type === 'decimal' || type === 'currency') {
    const decimalPattern = allowNegative ? /^-?\d*\.?\d+$/ : /^\d*\.?\d+$/;
    if (!decimalPattern.test(cleaned)) {
      result.errors.push("Must be a valid decimal number");
      return result;
    }
    numericValue = parseFloat(cleaned);
    
    if (type === 'currency') {
      result.formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(numericValue);
    } else {
      result.formatted = numericValue.toString();
    }
  }
  
  result.value = numericValue;
  
  // Range validation
  if (min !== null && numericValue < min) {
    result.errors.push(`Must be at least ${min}`);
  }
  
  if (max !== null && numericValue > max) {
    result.errors.push(`Must be no more than ${max}`);
  }
  
  result.isValid = result.errors.length === 0;
  
  return result;
}

// Test numeric validation
const numericTests = [
  { input: "123", options: { type: 'integer', min: 1, max: 1000 } },
  { input: "0", options: { type: 'integer', min: 1 } },
  { input: "123.45", options: { type: 'decimal' } },
  { input: "$1,234.56", options: { type: 'currency', min: 0 } },
  { input: "-50", options: { type: 'integer', allowNegative: false } },
  { input: "abc", options: { type: 'integer' } },
  { input: "99.999", options: { type: 'decimal', max: 100 } }
];

console.log("🔢 Testing numeric input validation:");
numericTests.forEach(({ input, options }, index) => {
  const result = validateNumericInput(input, options);
  console.log(`  ${result.isValid ? '✅' : '❌'} Test ${index + 1}: "${input}" -> ${result.isValid ? `${result.formatted} (${result.value})` : result.errors.join(', ')}`);
});

// 7. 📅 DATE VALIDATION

console.log("\n7. 📅 Date Validation");

function validateDate(dateString, options = {}) {
  const {
    format = 'YYYY-MM-DD',
    minDate = null,
    maxDate = null,
    required = false
  } = options;
  
  const result = {
    isValid: false,
    errors: [],
    date: null,
    formatted: ''
  };
  
  if (!dateString && !required) {
    result.isValid = true;
    return result;
  }
  
  if (!dateString && required) {
    result.errors.push("Date is required");
    return result;
  }
  
  // Try to parse the date
  const dateObj = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    result.errors.push("Invalid date format");
    return result;
  }
  
  result.date = dateObj;
  result.formatted = dateObj.toLocaleDateString();
  
  // Range validation
  if (minDate) {
    const minDateObj = new Date(minDate);
    if (dateObj < minDateObj) {
      result.errors.push(`Date must be on or after ${minDateObj.toLocaleDateString()}`);
    }
  }
  
  if (maxDate) {
    const maxDateObj = new Date(maxDate);
    if (dateObj > maxDateObj) {
      result.errors.push(`Date must be on or before ${maxDateObj.toLocaleDateString()}`);
    }
  }
  
  result.isValid = result.errors.length === 0;
  
  return result;
}

// Test date validation
const today = new Date().toISOString().split('T')[0];
const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

const dateTests = [
  { date: "2023-12-25", options: {} },
  { date: "invalid-date", options: {} },
  { date: "2023-02-30", options: {} }, // Invalid date
  { date: today, options: { minDate: today, maxDate: futureDate } },
  { date: "2020-01-01", options: { minDate: today } },
  { date: "2025-12-31", options: { maxDate: today } }
];

console.log("📅 Testing date validation:");
dateTests.forEach(({ date, options }, index) => {
  const result = validateDate(date, options);
  console.log(`  ${result.isValid ? '✅' : '❌'} Test ${index + 1}: "${date}" -> ${result.isValid ? result.formatted : result.errors.join(', ')}`);
});

console.log("\n🎓 Input validation examples complete!");
console.log("💡 Key takeaways:");
console.log("   - Always validate on both client and server side");
console.log("   - Use appropriate regex patterns for different input types");
console.log("   - Provide clear, helpful error messages");
console.log("   - Clean and format input data consistently");
console.log("   - Consider edge cases and boundary conditions");
console.log("   - Test validation with both valid and invalid inputs");

// 📚 COMPREHENSIVE VALIDATION EXAMPLE

/*
COMPLETE FORM VALIDATION EXAMPLE:

const formValidator = {
  validateRegistrationForm: (formData) => {
    const results = {};
    
    results.email = validateEmail(formData.email);
    results.password = validatePassword(formData.password);
    results.firstName = validateTextInput(formData.firstName, {
      minLength: 2, maxLength: 50, required: true
    });
    results.lastName = validateTextInput(formData.lastName, {
      minLength: 2, maxLength: 50, required: true
    });
    results.phone = validatePhoneNumber(formData.phone, 'us');
    results.birthDate = validateDate(formData.birthDate, {
      maxDate: new Date().toISOString().split('T')[0],
      required: true
    });
    
    const isValid = Object.values(results).every(r => r.isValid);
    
    return {
      isValid,
      results,
      cleanedData: Object.fromEntries(
        Object.entries(results).map(([key, result]) => [
          key, 
          result.cleaned || result.formatted || result.value
        ])
      )
    };
  }
};

USAGE:
const formData = {
  email: "user@example.com",
  password: "MyStr0ng!Pass",
  firstName: "John",
  lastName: "Doe",
  phone: "(555) 123-4567",
  birthDate: "1990-01-01"
};

const validation = formValidator.validateRegistrationForm(formData);
if (validation.isValid) {
  // Process cleaned data
  saveUser(validation.cleanedData);
} else {
  // Show validation errors
  showErrors(validation.results);
}
*/