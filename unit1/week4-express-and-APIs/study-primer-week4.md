# WEEK4 - JavaScript Fundamentals & Web Development - Study Primer

## JavaScript Array Methods & Data Handling

### Finding Elements in Arrays

Arrays provide multiple methods to locate elements:

```javascript
let numbers = [5, 12, 8, 130, 44];

// find() - returns the first element that matches
let found = numbers.find((element) => element > 10); // Returns: 12

// findIndex() - returns the index of first match
let index = numbers.findIndex((element) => element > 10); // Returns: 1

// indexOf() - finds exact matches only
let position = numbers.indexOf(12); // Returns: 1
let notFound = numbers.indexOf(99); // Returns: -1
```

### Testing Array Contents

```javascript
let fruits = ["apple", "banana", "cherry"];

// includes() - checks for exact values
fruits.includes("apple"); // Returns: true
fruits.includes("grape"); // Returns: false

// some() - tests if ANY element passes condition
let hasLongName = fruits.some((fruit) => fruit.length > 5); // Returns: true

// every() - tests if ALL elements pass condition
let allShort = fruits.every((fruit) => fruit.length < 10); // Returns: true
```

### Array Transformation

```javascript
let numbers = [1, 2, 3, 4];

// filter() - creates new array with elements that pass test
let evenNumbers = numbers.filter((num) => num % 2 === 0); // [2, 4]

// forEach() - executes function for each element, returns undefined
numbers.forEach((num) => console.log(num * 2)); // Logs: 2, 4, 6, 8
// forEach returns undefined, not a new array
```

## Memory & Data Types

### Primitive vs Reference Types

**Primitives** (numbers, strings, booleans) store actual values:

```javascript
let a = 5;
let b = a; // b gets a COPY of the value
a = 10;
console.log(b); // Still 5 - separate values
```

**Objects and Arrays** store references to memory locations:

```javascript
let obj1 = { name: "John" };
let obj2 = obj1; // obj2 points to SAME object in memory
obj1.name = "Jane";
console.log(obj2.name); // 'Jane' - both variables reference same object

let arr1 = [1, 2, 3];
let arr2 = arr1; // arr2 points to SAME array
arr1.push(4);
console.log(arr2); // [1, 2, 3, 4] - same array modified
```

### Number Precision & Conversion

```javascript
// Floating-point precision issues
0.1 + 0.2; // Returns: 0.30000000000000004

// Fix with toFixed() and parseFloat()
let result = (0.1 + 0.2).toFixed(2); // "0.30" (string)
let precise = parseFloat(result); // 0.30 (number)

// String to number conversion
parseInt("123abc"); // 123
parseFloat("3.14abc"); // 3.14
```

## Classes, Properties, and Methods

### Class Definition and Constructor

```javascript
class Bee {
  constructor(type, health, damage) {
    this.type = type; // Property
    this.health = health; // Property
    this.damage = damage; // Property
    this.alive = true; // Property
  }

  // Method to attack
  attack(target) {
    if (this.alive) {
      target.health -= this.damage;
      console.log(`${this.type} attacks for ${this.damage} damage!`);
    }
  }

  // Method to check status
  isAlive() {
    return this.health > 0 && this.alive;
  }
}
```

### Creating Instances and Using Methods

```javascript
// Creating instances (objects) from the class
let workerBee = new Bee("Worker", 50, 10);
let queenBee = new Bee("Queen", 100, 25);

// Accessing properties
console.log(workerBee.health); // 50
console.log(queenBee.type); // "Queen"

// Calling methods
workerBee.attack(queenBee); // Worker attacks Queen
console.log(queenBee.health); // 75 (100 - 25)
```

### Properties vs Methods

- **Properties**: Store data/state (like `health`, `type`, `damage`)
- **Methods**: Perform actions/behaviors (like `attack()`, `isAlive()`)

## Date and Time

### Unix Epoch & Date.now()

```javascript
// Date.now() returns milliseconds since Unix Epoch
let timestamp = Date.now(); // Returns number of milliseconds since Unix Epoch
// Unix Epoch = January 1, 1970, 00:00:00 UTC
```

## Web Development & HTTP

### HTTP Methods (CRUD Operations)

```javascript
// GET - Retrieve data (READ)
// Used for: Loading web pages, fetching user profiles, getting search results

// POST - Send data to create something (CREATE)
// Used for: Submitting forms, creating new accounts, uploading files

// PUT - Update entire resource (UPDATE)
// PATCH - Update part of resource (UPDATE)

// DELETE - Remove resource (DELETE)
```

### HTTP Status Code Ranges

```javascript
// 1xx - Informational responses
// 2xx - Success (200 OK, 201 Created)
// 3xx - Redirection (301 Moved Permanently, 302 Found)
// 4xx - Client errors (404 Not Found, 400 Bad Request)
// 5xx - Server errors (500 Internal Server Error, 503 Service Unavailable)
```

### Server Data Processing

```javascript
// POST data arrives in chunks, requiring event listeners
function getPostData(req, callback) {
  let body = "";

  // 'data' event fires for each chunk received
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // 'end' event fires when all chunks received
  req.on("end", () => {
    callback(body); // Now we have complete data
  });
}
```

### Input Validation & Security

```javascript
// Always validate user input to prevent attacks
function sanitizeInput(userInput) {
  // Remove or escape dangerous characters
  return userInput.replace(/[<>]/g, ""); // Basic example
}

// XSS Prevention
// Dangerous: res.write(`<h1>Hello ${userInput}</h1>`);
// Safe: res.write(`<h1>Hello ${sanitizeInput(userInput)}</h1>`);
```

## String Manipulation

### Basic String Operations

```javascript
// Reversing strings
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Palindrome testing
function isPalindrome(str) {
  let cleaned = str.toLowerCase();
  return cleaned === reverseString(cleaned);
}
```
