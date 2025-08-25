# Closures and Encapsulation

## Learning Objectives
- Understand what closures are and how they work in JavaScript
- Learn the relationship between scope, closures, and the execution context
- Master practical applications of closures in real-world scenarios
- Implement data privacy and encapsulation using closures
- Use closures for module patterns and factory functions
- Avoid common closure pitfalls and memory leaks

## 🤔 What Are Closures?

A **closure** is a feature in JavaScript where an inner function has access to variables from its outer (enclosing) function's scope, even after the outer function has finished executing. This creates a "closed over" environment that preserves the outer function's variables.

### Simple Analogy
Think of a closure like a backpack:
- The inner function is like a person carrying the backpack
- The outer function's variables are like items in the backpack
- Even after leaving the outer function (like leaving home), the inner function still has access to those variables (items in the backpack)

## 🔍 Understanding Scope and Closures

### Lexical Scoping
JavaScript uses lexical scoping, which means the scope of a variable is determined by where it's declared in the code.

```javascript
function outerFunction(x) {
  // This is the outer function's scope
  
  function innerFunction(y) {
    // This inner function has access to:
    // 1. Its own parameters (y)
    // 2. The outer function's parameters (x)
    // 3. Global variables
    console.log(x + y);
  }
  
  return innerFunction;
}
```

### The Closure in Action
```javascript
function createMultiplier(multiplier) {
  // This variable is "closed over" by the inner function
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10 (5 * 2)
console.log(triple(5));  // 15 (5 * 3)

// The multiplier variable is still accessible!
```

## 📦 Practical Applications of Closures

### 1. Data Privacy (Private Variables)
Closures allow you to create private variables that cannot be accessed from outside:

```javascript
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2

// count is not directly accessible
console.log(counter.count); // undefined
```

### 2. Function Factories
Create specialized functions with pre-configured behavior:

```javascript
function createValidator(type) {
  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\d{3}-\d{3}-\d{4}$/,
    url: /^https?:\/\/.+/
  };
  
  return function(input) {
    return patterns[type].test(input);
  };
}

const isValidEmail = createValidator('email');
const isValidPhone = createValidator('phone');

console.log(isValidEmail('test@example.com')); // true
console.log(isValidPhone('123-456-7890'));     // true
```

### 3. Module Pattern
Create modules with public and private methods:

```javascript
const Calculator = (function() {
  // Private variables
  let history = [];
  
  // Private function
  function log(operation, result) {
    history.push(`${operation} = ${result}`);
  }
  
  // Public API
  return {
    add: function(a, b) {
      const result = a + b;
      log(`${a} + ${b}`, result);
      return result;
    },
    
    subtract: function(a, b) {
      const result = a - b;
      log(`${a} - ${b}`, result);
      return result;
    },
    
    getHistory: function() {
      return history.slice(); // Return copy, not original
    },
    
    clearHistory: function() {
      history = [];
    }
  };
})();

Calculator.add(5, 3);        // 8
Calculator.subtract(10, 4);  // 6
console.log(Calculator.getHistory()); // ['5 + 3 = 8', '10 - 4 = 6']
```

## 🎯 Advanced Closure Patterns

### 1. Currying
Transform a function that takes multiple arguments into a series of functions that take one argument:

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// Example usage
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

### 2. Memoization
Cache function results for performance optimization:

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    
    console.log('Computing result...');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: Expensive fibonacci calculation
const fibonacci = memoize(function(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // Computed
console.log(fibonacci(10)); // Cached
```

### 3. Event Handler Management
Closures are perfect for maintaining state in event handlers:

```javascript
function createButtonHandler(buttonName) {
  let clickCount = 0;
  
  return function(event) {
    clickCount++;
    console.log(`${buttonName} clicked ${clickCount} times`);
    
    if (clickCount >= 5) {
      console.log(`${buttonName} has been clicked too many times!`);
      event.target.disabled = true;
    }
  };
}

// Usage (in browser environment)
/*
document.getElementById('saveButton').addEventListener(
  'click', 
  createButtonHandler('Save Button')
);
*/
```

## ⚠️ Common Closure Pitfalls

### 1. Loop Variable Problem
```javascript
// ❌ Common mistake with var
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // Prints 5 five times!
  }, 1000);
}

// ✅ Solution 1: Use let (block scoping)
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // Prints 0, 1, 2, 3, 4
  }, 1000);
}

// ✅ Solution 2: Use closure with IIFE
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Prints 0, 1, 2, 3, 4
    }, 1000);
  })(i);
}
```

### 2. Memory Leaks
Be careful about unintentional references:

```javascript
// ❌ Potential memory leak
function createHandler() {
  const largeData = new Array(1000000).fill('data');
  
  return function() {
    // Even if we don't use largeData, it's still referenced
    console.log('Handler called');
  };
}

// ✅ Better: Only close over what you need
function createHandler() {
  const largeData = new Array(1000000).fill('data');
  const importantValue = largeData[0];
  
  return function() {
    console.log('Handler called with:', importantValue);
    // largeData can now be garbage collected
  };
}
```

## 🏗️ Modern Alternatives to Closures

### 1. ES6 Classes with Private Fields
```javascript
class Counter {
  #count = 0; // Private field (ES2022)
  
  increment() {
    this.#count++;
    return this.#count;
  }
  
  decrement() {
    this.#count--;
    return this.#count;
  }
  
  get value() {
    return this.#count;
  }
}

const counter = new Counter();
console.log(counter.increment()); // 1
// console.log(counter.#count); // SyntaxError: Private field '#count' must be declared in an enclosing class
```

### 2. ES6 Modules
```javascript
// counter-module.js
let count = 0;

export function increment() {
  count++;
  return count;
}

export function decrement() {
  count--;
  return count;
}

export function getCount() {
  return count;
}

// main.js
import { increment, decrement, getCount } from './counter-module.js';

console.log(increment()); // 1
console.log(getCount());  // 1
```

### 3. WeakMap for Privacy
```javascript
const privateData = new WeakMap();

class BankAccount {
  constructor(initialBalance) {
    privateData.set(this, { balance: initialBalance });
  }
  
  deposit(amount) {
    const data = privateData.get(this);
    data.balance += amount;
    return data.balance;
  }
  
  withdraw(amount) {
    const data = privateData.get(this);
    if (data.balance >= amount) {
      data.balance -= amount;
      return data.balance;
    } else {
      throw new Error('Insufficient funds');
    }
  }
  
  getBalance() {
    return privateData.get(this).balance;
  }
}
```

## 🎯 When to Use Closures

### ✅ Good Use Cases:
- Creating private variables and methods
- Function factories and configuration
- Event handlers that need to maintain state
- Module patterns (before ES6 modules)
- Callback functions that need access to local variables
- Implementing functional programming patterns (currying, partial application)

### ❌ Avoid Closures When:
- Simple operations don't require state
- Modern alternatives (classes, modules) are more appropriate
- Performance is critical and closures add overhead
- Memory usage is a concern (closures can prevent garbage collection)

## 📚 Files in This Module

- `closure-examples.js` - Basic closure concepts and examples
- `private-variables.js` - Data privacy and encapsulation patterns
- `encapsulation-patterns.js` - Advanced patterns and real-world applications

## 🧠 Mental Model for Closures

1. **Function Creation**: When a function is created, it gets a hidden link to its lexical environment
2. **Variable Access**: The function can access variables from its creation context
3. **Persistence**: Even after the outer function returns, the inner function keeps its link to those variables
4. **Garbage Collection**: Variables are only cleaned up when no closures reference them

## 🎓 Key Takeaways

- Closures give functions access to their outer scope even after the outer function returns
- They're fundamental to JavaScript and enable powerful patterns like modules and factories
- Use closures for data privacy before ES6 classes with private fields
- Be aware of memory implications and potential leaks
- Modern JavaScript provides alternatives, but closures remain important for understanding the language
- Closures are essential for functional programming patterns in JavaScript

Understanding closures is crucial for mastering JavaScript, as they underlie many advanced concepts and patterns in the language!