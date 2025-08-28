# JavaScript Type Testing Methods

## 1. `typeof` Operator
**Best for:** Primitive types (with some quirks)

```javascript
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" ⚠️ (JavaScript quirk!)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" ⚠️ (arrays are objects)
console.log(typeof function(){}); // "function"

// Common use cases
function checkType(value) {
  if (typeof value === "string") {
    console.log("It's a string!");
  }
  if (typeof value === "number") {
    console.log("It's a number!");
  }
}
```

## 2. Number Testing

### `Number.isNaN()`
**Tests:** If value is literally `NaN` (Not a Number)

```javascript
console.log(Number.isNaN(NaN));      // true
console.log(Number.isNaN("hello"));  // false (string, not NaN)
console.log(Number.isNaN(42));       // false
console.log(Number.isNaN("42"));     // false (string, not NaN)

// vs the old isNaN() function (avoid this one)
console.log(isNaN("hello"));         // true ⚠️ (converts to NaN first)
console.log(Number.isNaN("hello"));  // false ✅ (doesn't convert)
```

### `Number.isInteger()`
**Tests:** If value is a whole number

```javascript
console.log(Number.isInteger(42));     // true
console.log(Number.isInteger(42.0));   // true
console.log(Number.isInteger(42.5));   // false
console.log(Number.isInteger("42"));   // false (string)
console.log(Number.isInteger(NaN));    // false
```

### `Number.isFinite()`
**Tests:** If value is a finite number (not Infinity or NaN)

```javascript
console.log(Number.isFinite(42));       // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN));      // false
console.log(Number.isFinite("42"));     // false (doesn't convert)
```

## 3. Array Testing

### `Array.isArray()`
**The definitive way to check for arrays**

```javascript
console.log(Array.isArray([]));           // true
console.log(Array.isArray([1, 2, 3]));    // true
console.log(Array.isArray({}));           // false
console.log(Array.isArray("hello"));      // false
console.log(Array.isArray(null));         // false

// Why typeof doesn't work for arrays
console.log(typeof []);                    // "object" ❌
console.log(Array.isArray([]));           // true ✅

// Practical example
function processData(data) {
  if (Array.isArray(data)) {
    console.log(`Array with ${data.length} items`);
    data.forEach(item => console.log(item));
  } else {
    console.log("Not an array!");
  }
}
```

## 4. `instanceof` Operator
**Tests:** If object was created by a specific constructor

```javascript
const arr = [];
const obj = {};
const date = new Date();

console.log(arr instanceof Array);    // true
console.log(obj instanceof Object);   // true
console.log(date instanceof Date);    // true
console.log(arr instanceof Object);   // true (arrays are objects too)

// Custom constructor example
function Person(name) {
  this.name = name;
}
const john = new Person("John");
console.log(john instanceof Person);  // true
console.log(john instanceof Object);  // true
```

## 5. Object.prototype.toString Method
**The most precise method** - reveals the true internal type

```javascript
function getType(value) {
  return Object.prototype.toString.call(value);
}

console.log(getType(42));          // "[object Number]"
console.log(getType("hello"));     // "[object String]"
console.log(getType(true));        // "[object Boolean]"
console.log(getType([]));          // "[object Array]"
console.log(getType({}));          // "[object Object]"
console.log(getType(null));        // "[object Null]"
console.log(getType(undefined));   // "[object Undefined]"
console.log(getType(new Date()));  // "[object Date]"
console.log(getType(/regex/));     // "[object RegExp]"

// Helper function to get clean type names
function getCleanType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(getCleanType([]));     // "array"
console.log(getCleanType({}));     // "object"
console.log(getCleanType(null));   // "null"
```

## 6. Checking for `null` and `undefined`

```javascript
// Checking for null
console.log(value === null);              // true only if null

// Checking for undefined
console.log(value === undefined);         // true only if undefined
console.log(typeof value === "undefined"); // also works

// Checking for both (nullish)
console.log(value == null);               // true for null OR undefined
console.log(value === null || value === undefined); // more explicit

// Modern nullish coalescing
const result = value ?? "default value"; // uses default if null or undefined
```

## 7. String Testing

```javascript
// Basic string check
console.log(typeof "hello" === "string");  // true

// Check if it's a String object (rare)
console.log("hello" instanceof String);    // false
console.log(new String("hello") instanceof String); // true

// Universal string check
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

// Check for empty strings
console.log("" === "");           // true (empty string)
console.log("".length === 0);     // true (empty string)
console.log("hello".length > 0);  // true (has content)
```

## 8. Boolean Testing

```javascript
console.log(typeof true === "boolean");   // true
console.log(typeof false === "boolean");  // true

// Truthy vs falsy values
console.log(Boolean(1));          // true
console.log(Boolean(0));          // false
console.log(Boolean("hello"));    // true
console.log(Boolean(""));         // false
console.log(Boolean([]));         // true (empty arrays are truthy!)
console.log(Boolean({}));         // true (empty objects are truthy!)

// Check if something is literally true/false
function isActualBoolean(value) {
  return typeof value === "boolean";
}
```

## 9. Function Testing

```javascript
console.log(typeof function(){} === "function");     // true
console.log(typeof (() => {}) === "function");       // true (arrow function)
console.log(typeof console.log === "function");      // true

// Check if something is callable
function isCallable(value) {
  return typeof value === "function";
}

// Example usage
function executeIfFunction(fn) {
  if (typeof fn === "function") {
    fn();
  } else {
    console.log("Not a function!");
  }
}
```

## 10. Practical Examples

### Type Validation Function
```javascript
function validateInput(value, expectedType) {
  switch(expectedType) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number" && !Number.isNaN(value);
    case "array":
      return Array.isArray(value);
    case "object":
      return typeof value === "object" && value !== null && !Array.isArray(value);
    case "boolean":
      return typeof value === "boolean";
    default:
      return false;
  }
}

// Usage
console.log(validateInput("hello", "string"));  // true
console.log(validateInput(42, "number"));       // true
console.log(validateInput([1,2,3], "array"));   // true
```

### Safe Property Access
```javascript
function safeGetProperty(obj, prop) {
  if (typeof obj === "object" && obj !== null) {
    return obj[prop];
  }
  return undefined;
}

// Usage
const user = { name: "John", age: 30 };
console.log(safeGetProperty(user, "name"));      // "John"
console.log(safeGetProperty(null, "name"));      // undefined
console.log(safeGetProperty("string", "name"));  // undefined
```

## Quick Reference Cheat Sheet

| What you want to check | Best method | Example |
|------------------------|-------------|---------|
| Is it a string? | `typeof x === "string"` | `typeof "hello" === "string"` |
| Is it a number? | `typeof x === "number"` | `typeof 42 === "number"` |
| Is it NaN? | `Number.isNaN(x)` | `Number.isNaN(NaN)` |
| Is it an array? | `Array.isArray(x)` | `Array.isArray([1,2,3])` |
| Is it null? | `x === null` | `null === null` |
| Is it undefined? | `x === undefined` | `undefined === undefined` |
| Is it a function? | `typeof x === "function"` | `typeof console.log === "function"` |
| Is it an object? | `typeof x === "object" && x !== null && !Array.isArray(x)` | Complex check |
| Get exact type | `Object.prototype.toString.call(x)` | Most precise method |

## Common Gotchas Students Should Know

1. **`typeof null === "object"`** - This is a famous JavaScript bug that will never be fixed
2. **`typeof [] === "object"`** - Arrays are objects, use `Array.isArray()` instead
3. **`isNaN()` vs `Number.isNaN()`** - The old `isNaN()` converts values first
4. **Empty arrays and objects are truthy** - `Boolean([]) === true`
5. **`instanceof` can fail across frames/windows** - `Array.isArray()` is safer