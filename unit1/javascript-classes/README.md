# JavaScript Classes and Module Systems Primer

## Table of Contents
1. [Basic Class Structure](#basic-class-structure)
2. [Public vs Private Fields](#public-vs-private-fields)
3. [Module Export Systems](#module-export-systems)
4. [Node REPL Tips](#node-repl-tips)
5. [Variable Declaration Differences](#variable-declaration-differences)

## Basic Class Structure

### Simple Class Example
```javascript
class Cookie {
    constructor(color) {
        this.color = color;
    }

    getColor() {
        console.log(this.color);
    }

    setColor(newColor) {
        this.color = newColor;
    }
}

// Usage
let cookie1 = new Cookie('blue');
cookie1.getColor(); // Output: blue
```

## Public vs Private Fields

### Modern Private Fields (ES2022+)
```javascript
class Cookie {
    #color;                    // Private field declaration (required)
    #secretIngredient = "love"; // Private field with default value

    constructor(color) {
        this.#color = color;    // Must use # prefix
    }

    // Public method
    getColor() {
        return this.#color;
    }

    // Private method
    #validateColor(color) {
        return typeof color === 'string' && color.length > 0;
    }

    setColor(newColor) {
        if (this.#validateColor(newColor)) {
            this.#color = newColor;
        }
    }
}

// Testing privacy
let cookie = new Cookie('red');
console.log(cookie.getColor());  // ✅ Works: "red"
console.log(cookie.#color);      // ❌ SyntaxError: Private field '#color' must be declared in an enclosing class
```

### Key Rules for Private Fields
- Must be declared at class level before use
- Cannot be accessed outside the class
- Use `#` prefix for both declaration and usage
- Supported in Node.js 12+ and modern browsers

### Legacy Privacy Patterns

#### Convention-based (underscore prefix)
```javascript
class Cookie {
    constructor(color) {
        this._color = color;  // "private" by convention only
    }

    _validateColor(color) {   // "private" method
        return typeof color === 'string';
    }
}
```

#### Closure-based Privacy
```javascript
function createCookie(color) {
    let privateColor = color;  // Truly private

    return {
        getColor() {
            return privateColor;
        },
        setColor(newColor) {
            privateColor = newColor;
        }
    };
}
```

## Module Export Systems

### CommonJS (Node.js default)

#### Single Export (Default-like)
```javascript
// cookie.js
class Cookie {
    constructor(color) {
        this.color = color;
    }
}

module.exports = Cookie;

// main.js
const Cookie = require('./cookie.js');
const MyCookie = require('./cookie.js');  // Can rename on import
```

#### Multiple Named Exports
```javascript
// cookies.js
class Cookie { }
class Baker { }
const OVEN_TEMP = 350;

module.exports = {
    Cookie: Cookie,
    Baker: Baker,
    OVEN_TEMP: OVEN_TEMP
};

// main.js
const { Cookie, Baker } = require('./cookies.js');  // Destructuring required
const cookieModule = require('./cookies.js');       // Import whole object
```

#### Mixed Export Pattern
```javascript
// cookies.js
class Cookie { }
class Baker { }

module.exports = Cookie;           // Main export
module.exports.Baker = Baker;      // Additional named export
module.exports.OVEN_TEMP = 350;    // Another named export

// Exported object structure:
// [Function: Cookie] { Baker: [Function: Baker], OVEN_TEMP: 350 }

// main.js - Multiple import options
const Cookie = require('./cookies.js');              // Get main export
const { Baker } = require('./cookies.js');           // Destructure additional
const cookieModule = require('./cookies.js');        // Get everything
const Baker = cookieModule.Baker;                     // Access properties
```

### ES6 Modules

#### Named Exports
```javascript
// cookies.js
export class Cookie { }
export class Baker { }
export const OVEN_TEMP = 350;

// main.js
import { Cookie, Baker } from './cookies.js';        // Names must match
import { Cookie as MyCookie } from './cookies.js';   // Explicit renaming
```

#### Default Export
```javascript
// cookies.js
export default class Cookie { }

// main.js
import Cookie from './cookies.js';      // Can use any name
import MyCookie from './cookies.js';    // Same import, different name
```

#### Mixed Exports
```javascript
// cookies.js
export default class Cookie { }
export class Baker { }
export const OVEN_TEMP = 350;

// main.js
import Cookie, { Baker, OVEN_TEMP } from './cookies.js';
```

### Module System Comparison

| Feature | CommonJS | ES6 Modules |
|---------|----------|-------------|
| Syntax | `require()` / `module.exports` | `import` / `export` |
| Loading | Synchronous | Asynchronous |
| Default Support | Manual convention | Built-in `export default` |
| Renaming | Always possible | Explicit syntax required |
| Node.js Support | Native | Requires `.mjs` or `"type": "module"` |

## Node REPL Tips

### Common REPL Commands
```bash
node                    # Start REPL
.help                   # Show help
.exit                   # Exit REPL
.clear                  # Clear current input line
.break                  # Break out of multiline mode
```

### Loading Modules in REPL
```javascript
// Method 1: Direct require
const Cookie = require('./cookie.js');

// Method 2: Auto-loading script
// Create repl-setup.js:
const Cookie = require('./cookie.js');
global.Cookie = Cookie;
global.cookie1 = new Cookie('blue');

// Run with: node -r ./repl-setup.js
```

### Common REPL Issues

#### Variable Redeclaration Problems
```javascript
let cookie1 = new Cookie('blue');  // First attempt fails
let cookie1 = new Cookie('red');   // ❌ Error: already declared

// Solutions:
// 1. Restart REPL: .exit then node
// 2. Use var: var cookie1 = new Cookie('blue');
// 3. Use different names: let cookie2 = new Cookie('red');
```

#### Memory Cannot Be Cleared
- No built-in way to clear variable declarations
- `delete` doesn't work on `let`/`const`
- Restart REPL is the only reliable solution

## Variable Declaration Differences

### `var` vs `let` vs `const`

```javascript
// var - old style, allows redeclaration
var x = 1;
var x = 2;  // ✅ Works

// let - modern, prevents redeclaration
let y = 1;
let y = 2;  // ❌ SyntaxError: already declared
y = 3;      // ✅ Reassignment works

// const - constant, no redeclaration or reassignment
const z = 1;
const z = 2;  // ❌ SyntaxError: already declared
z = 3;        // ❌ TypeError: assignment to const
```

### Why These Differences Exist
- `var`: Pre-ES6, function-scoped, "forgiving" but error-prone
- `let`/`const`: ES6+, block-scoped, strict to prevent bugs
- REPL quirk: `var` works better for experimentation due to redeclaration allowance

### Best Practices
- Use `const` by default
- Use `let` when you need to reassign
- Avoid `var` in production code
- Use `var` in REPL for easier experimentation

## Checking Node.js Feature Support

### Version Check
```bash
node --version  # Check your Node version
```

### ES2022 Support Timeline
- Private fields (`#field`): Node 12+
- Private methods: Node 14.6+
- Top-level await: Node 14.8+
- Class static blocks: Node 16.11+

### Testing Feature Support
```javascript
// Test private fields support
try {
    eval(`
        class Test {
            #field = 'test';
            getField() { return this.#field; }
        }
        new Test().getField();
    `);
    console.log('Private fields: ✅ Supported');
} catch (e) {
    console.log('Private fields: ❌ Not supported');
}
```
## Advanced Module Patterns
## Advanced Module Patterns

### Dynamic Imports
```javascript
// ES2020+ - Dynamic imports
async function loadCookie() {
    const { Cookie } = await import('./cookie.js');
    return new Cookie('blue');
}

// CommonJS equivalent
function loadCookie() {
    const Cookie = require('./cookie.js');
    return new Cookie('blue');
}
```

### Conditional Exports
```javascript
// package.json - Different exports for different environments
{
  "exports": {
    ".": {
      "import": "./lib/cookie.mjs",
      "require": "./lib/cookie.js"
    }
  }
}
```

### Re-exporting Modules
```javascript
// index.js - Barrel exports
export { Cookie } from './cookie.js';
export { Baker } from './baker.js';
export * from './utilities.js';

// CommonJS equivalent
module.exports = {
    Cookie: require('./cookie.js'),
    Baker: require('./baker.js'),
    ...require('./utilities.js')
};
```

## Class Inheritance and Advanced Features

### Basic Inheritance
```javascript
class Cookie {
    #flavor;

    constructor(flavor) {
        this.#flavor = flavor;
    }

    describe() {
        return `A ${this.#flavor} cookie`;
    }
}

class ChocolateChipCookie extends Cookie {
    #chipCount;

    constructor(chipCount) {
        super('chocolate chip');  // Call parent constructor
        this.#chipCount = chipCount;
    }

    describe() {
        return `${super.describe()} with ${this.#chipCount} chips`;
    }
}

// Usage
const cookie = new ChocolateChipCookie(12);
console.log(cookie.describe()); // "A chocolate chip cookie with 12 chips"
```

### Static Methods and Properties
```javascript
class Cookie {
    static #recipeCount = 0;  // Private static field
    static DEFAULT_FLAVOR = 'vanilla';  // Public static field

    constructor(flavor) {
        this.flavor = flavor;
        Cookie.#recipeCount++;
    }

    static getRecipeCount() {
        return Cookie.#recipeCount;
    }

    static createDefaultCookie() {
        return new Cookie(Cookie.DEFAULT_FLAVOR);
    }
}

// Usage
const cookie1 = new Cookie('chocolate');
const cookie2 = Cookie.createDefaultCookie();
console.log(Cookie.getRecipeCount()); // 2
console.log(Cookie.DEFAULT_FLAVOR);   // 'vanilla'
```

### Getters and Setters
```javascript
class Cookie {
    #flavor;
    #bakeTime;

    constructor(flavor) {
        this.#flavor = flavor;
        this.#bakeTime = 0;
    }

    get flavor() {
        return this.#flavor;
    }

    set flavor(newFlavor) {
        if (typeof newFlavor !== 'string') {
            throw new Error('Flavor must be a string');
        }
        this.#flavor = newFlavor;
    }

    get isReady() {
        return this.#bakeTime >= 10;
    }

    bake(minutes) {
        this.#bakeTime += minutes;
    }
}

// Usage
const cookie = new Cookie('oatmeal');
console.log(cookie.flavor);  // 'oatmeal' (using getter)
cookie.flavor = 'raisin';    // Using setter
console.log(cookie.isReady); // false
cookie.bake(15);
console.log(cookie.isReady); // true
```

## Error Handling in Classes

### Constructor Validation
```javascript
class Cookie {
    #flavor;
    #size;

    constructor(flavor, size = 'medium') {
        if (!flavor || typeof flavor !== 'string') {
            throw new TypeError('Flavor must be a non-empty string');
        }

        const validSizes = ['small', 'medium', 'large'];
        if (!validSizes.includes(size)) {
            throw new Error(`Size must be one of: ${validSizes.join(', ')}`);
        }

        this.#flavor = flavor;
        this.#size = size;
    }

    getFlavor() {
        return this.#flavor;
    }
}

// Usage with error handling
try {
    const cookie1 = new Cookie('chocolate', 'medium'); // ✅ Valid
    const cookie2 = new Cookie('', 'large');           // ❌ Throws TypeError
    const cookie3 = new Cookie('vanilla', 'huge');     // ❌ Throws Error
} catch (error) {
    console.error('Cookie creation failed:', error.message);
}
```

### Method Error Handling
```javascript
class CookieJar {
    #cookies = [];
    #maxCapacity;

    constructor(maxCapacity = 10) {
        this.#maxCapacity = maxCapacity;
    }

    addCookie(cookie) {
        if (!(cookie instanceof Cookie)) {
            throw new TypeError('Only Cookie instances can be added');
        }

        if (this.#cookies.length >= this.#maxCapacity) {
            throw new Error('Cookie jar is full');
        }

        this.#cookies.push(cookie);
        return this.#cookies.length;
    }

    getCookie(index) {
        if (index < 0 || index >= this.#cookies.length) {
            throw new RangeError('Cookie index out of bounds');
        }

        return this.#cookies[index];
    }

    get count() {
        return this.#cookies.length;
    }
}
```

## Testing Your Classes

### Simple Testing Pattern
```javascript
// test-cookies.js
const Cookie = require('./cookie.js');

function testCookieCreation() {
    console.log('Testing cookie creation...');

    try {
        const cookie = new Cookie('chocolate');
        console.log('✅ Cookie created successfully');

        console.log('✅ Flavor:', cookie.getFlavor());

        cookie.setFlavor('vanilla');
        console.log('✅ Flavor changed:', cookie.getFlavor());

    } catch (error) {
        console.log('❌ Test failed:', error.message);
    }
}

function testPrivateFields() {
    console.log('Testing private field access...');

    const cookie = new Cookie('strawberry');

    try {
        // This should throw an error
        console.log(cookie.#flavor);
        console.log('❌ Private field was accessible (this is bad!)');
    } catch (error) {
        console.log('✅ Private field properly protected');
    }
}

// Run tests
testCookieCreation();
testPrivateFields();
```

### Using with Node's Built-in Assert
```javascript
const assert = require('assert');
const Cookie = require('./cookie.js');

// Test basic functionality
const cookie = new Cookie('chocolate');
assert.strictEqual(cookie.getFlavor(), 'chocolate', 'Flavor should be chocolate');

// Test error cases
assert.throws(
    () => new Cookie(''),
    /Flavor must be a non-empty string/,
    'Empty flavor should throw error'
);

console.log('All tests passed! ✅');
```

## Performance Considerations

### Private Fields vs Closures
```javascript
// Private fields (faster, more memory efficient)
class Cookie {
    #flavor;
    constructor(flavor) { this.#flavor = flavor; }
    getFlavor() { return this.#flavor; }
}

// Closure pattern (slower, more memory usage)
function createCookie(flavor) {
    return {
        getFlavor() { return flavor; }
    };
}

// Benchmark example
console.time('Private fields');
for (let i = 0; i < 100000; i++) {
    new Cookie('test');
}
console.timeEnd('Private fields');

console.time('Closures');
for (let i = 0; i < 100000; i++) {
    createCookie('test');
}
console.timeEnd('Closures');
```

### Memory Management
```javascript
class CookieFactory {
    #cookieCache = new Map();

    createCookie(flavor) {
        // Reuse existing cookies for performance
        if (this.#cookieCache.has(flavor)) {
            return this.#cookieCache.get(flavor);
        }

        const cookie = new Cookie(flavor);
        this.#cookieCache.set(flavor, cookie);
        return cookie;
    }

    clearCache() {
        this.#cookieCache.clear();
    }
}
```

## Common Patterns and Best Practices

### Builder Pattern
```javascript
class CookieBuilder {
    #flavor = 'plain';
    #size = 'medium';
    #toppings = [];

    setFlavor(flavor) {
        this.#flavor = flavor;
        return this; // Return this for method chaining
    }

    setSize(size) {
        this.#size = size;
        return this;
    }

    addTopping(topping) {
        this.#toppings.push(topping);
        return this;
    }

    build() {
        return new Cookie(this.#flavor, this.#size, [...this.#toppings]);
    }
}

// Usage with method chaining
const cookie = new CookieBuilder()
    .setFlavor('chocolate')
    .setSize('large')
    .addTopping('nuts')
    .addTopping('sprinkles')
    .build();
```

### Factory Pattern
```javascript
class CookieFactory {
    static createCookie(type, ...args) {
        switch (type.toLowerCase()) {
            case 'chocolate':
                return new ChocolateCookie(...args);
            case 'oatmeal':
                return new OatmealCookie(...args);
            case 'sugar':
                return new SugarCookie(...args);
            default:
                throw new Error(`Unknown cookie type: ${type}`);
        }
    }
}

// Usage
const chocolateCookie = CookieFactory.createCookie('chocolate', 'dark');
const oatmealCookie = CookieFactory.createCookie('oatmeal', 'with raisins');
```

### Singleton Pattern
```javascript
class CookieStore {
    static #instance = null;
    #inventory = [];

    constructor() {
        if (CookieStore.#instance) {
            return CookieStore.#instance;
        }
        CookieStore.#instance = this;
    }

    static getInstance() {
        if (!CookieStore.#instance) {
            CookieStore.#instance = new CookieStore();
        }
        return CookieStore.#instance;
    }

    addCookie(cookie) {
        this.#inventory.push(cookie);
    }

    getInventoryCount() {
        return this.#inventory.length;
    }
}

// Usage
const store1 = new CookieStore();
const store2 = CookieStore.getInstance();
console.log(store1 === store2); // true - same instance
```

## Troubleshooting Guide

### Common Class Errors

#### "Private field must be declared"
```javascript
// ❌ Wrong - using private field without declaration
class Cookie {
    constructor(flavor) {
        this.#flavor = flavor; // Error!
    }
}

// ✅ Correct - declare first
class Cookie {
    #flavor; // Declare here
    constructor(flavor) {
        this.#flavor = flavor; // Now it works
    }
}
```

#### "Class constructor cannot be invoked without 'new'"
```javascript
// ❌ Wrong
const cookie = Cookie('chocolate');

// ✅ Correct
const cookie = new Cookie('chocolate');
```

#### "Super constructor must be called before accessing 'this'"
```javascript
// ❌ Wrong
class ChocolateCookie extends Cookie {
    constructor(chipCount) {
        this.chipCount = chipCount; // Error! Must call super() first
        super('chocolate');
    }
}

// ✅ Correct
class ChocolateCookie extends Cookie {
    constructor(chipCount) {
        super('chocolate'); // Call super first
        this.chipCount = chipCount;
    }
}
```

### Common Module Errors

#### "Cannot find module"
```bash
# Make sure file exists and path is correct
ls -la cookie.js

# Check current directory
pwd

# Use correct relative path
const Cookie = require('./cookie.js');  # Same directory
const Cookie = require('../cookie.js'); # Parent directory
```

#### "Unexpected token 'export'"
```javascript
// This won't work in regular Node.js without configuration
export class Cookie {} // Error in CommonJS

// Solutions:
// 1. Use CommonJS: module.exports = Cookie;
// 2. Use .mjs extension: cookie.mjs
// 3. Add "type": "module" to package.json
```

### REPL Debugging Tips

#### See what's in an object
```javascript
const cookie = new Cookie('chocolate');

// Basic inspection
console.log(cookie);

// See all properties (won't show privates)
console.log(Object.keys(cookie));
console.log(Object.getOwnPropertyNames(cookie));

// See prototype chain
console.log(Object.getPrototypeOf(cookie));

// Check constructor
console.log(cookie.constructor.name); // 'Cookie'
```

#### Force syntax errors to show
```javascript
// If REPL goes into multiline mode (...), try:
eval('cookie.#flavor');  // Forces immediate evaluation

// Or wrap in a function
(() => cookie.#flavor)(); // Immediate function execution
```

#### Reset when things get stuck
```bash
# If REPL is stuck in multiline mode:
# Press Ctrl+C twice
# Or Ctrl+D
# Or type .break
```

## Quick Reference Commands

### File Operations
```bash
# Create a new JavaScript file
touch cookie.js

# Check file contents
cat cookie.js

# Edit with VS Code
code cookie.js
```

### Node.js Operations
```bash
# Start Node REPL
node

# Run a JavaScript file
node cookie.js

# Start REPL with preloaded module
node -r ./setup.js

# Check Node version
node --version

# Syntax check without running
node --check cookie.js
```

### Common VS Code Shortcuts
```
Ctrl+B          - Toggle sidebar
Ctrl+`          - Toggle terminal
Ctrl+Shift+P    - Command palette
Ctrl+,          - Settings
F12             - Go to definition
Alt+F12         - Peek definition
Ctrl+.          - Quick fix (show error details)
```
