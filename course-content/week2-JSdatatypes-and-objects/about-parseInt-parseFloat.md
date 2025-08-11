# parseInt and parseFloat Exercises for Node REPL

## Setup Instructions
1. Open terminal/command prompt
2. Type `node` and press Enter to start the REPL
3. Try each exercise below and predict the result before hitting Enter!

---

## Part 1: Basic Parsing Warm-up

### Exercise 1.1: Simple Cases
Type each line in the REPL and predict what you'll get:

```javascript
parseInt("42")
parseInt("42.7")
parseFloat("42")
parseFloat("42.7")
```

**Questions:**
- Which function keeps decimal places?
- What happens to `.7` when using `parseInt`?

---

## Part 2: Tricky Strings - Predict the Results!

### Exercise 2.1: Strings with Spaces
Before running each line, write down what you think the result will be:

```javascript
parseInt("  42  ")           // Your prediction: ____
parseFloat("  42.5  ")       // Your prediction: ____
parseInt(" 42 pounds")       // Your prediction: ____
parseFloat(" 42.5 kg")       // Your prediction: ____
```

### Exercise 2.2: Numbers Mixed with Text
```javascript
parseInt("42abc")            // Your prediction: ____
parseFloat("42.5xyz")        // Your prediction: ____
parseInt("age: 42")          // Your prediction: ____
parseFloat("weight: 42.5")   // Your prediction: ____
```

### Exercise 2.3: Text First
```javascript
parseInt("abc42")            // Your prediction: ____
parseFloat("hello42.5")      // Your prediction: ____
parseInt("years42old")       // Your prediction: ____
parseFloat("kg42.5weight")   // Your prediction: ____
```

---

## Part 3: Edge Cases and Special Values

### Exercise 3.1: Empty and Special Strings
```javascript
parseInt("")                 // Your prediction: ____
parseFloat("")               // Your prediction: ____
parseInt("   ")              // Your prediction: ____
parseFloat("   ")            // Your prediction: ____
```

### Exercise 3.2: Multiple Numbers
```javascript
parseInt("42 and 37")        // Your prediction: ____
parseFloat("42.5 or 37.2")   // Your prediction: ____
parseInt("42-37")            // Your prediction: ____
parseFloat("42.5-37.2")      // Your prediction: ____
```

### Exercise 3.3: Signs and Special Characters
```javascript
parseInt("+42")              // Your prediction: ____
parseInt("-42")              // Your prediction: ____
parseFloat("+42.5")          // Your prediction: ____
parseFloat("-42.5")          // Your prediction: ____
parseInt("$42")              // Your prediction: ____
parseFloat("$42.50")         // Your prediction: ____
```

---

## Part 4: Real-World Scenarios (Planetary Calculator Context)

### Exercise 4.1: User Input Simulation
Imagine these are values a user typed into your planetary calculator:

```javascript
// Weight inputs
parseInt("150 lbs")          // Your prediction: ____
parseFloat("150.5 pounds")   // Your prediction: ____
parseInt("I weigh 150")      // Your prediction: ____
parseFloat("My weight: 150.5") // Your prediction: ____

// Jump height inputs
parseInt("24 inches")        // Your prediction: ____
parseFloat("24.5\"")         // Your prediction: ____
parseInt("jump: 24")         // Your prediction: ____
parseFloat("24.5 inch jump") // Your prediction: ____
```

### Exercise 4.2: Gravity Values
```javascript
// Gravity multiplier inputs
parseFloat("0.38")           // Your prediction: ____
parseFloat("0.38x")          // Your prediction: ____
parseFloat("mars: 0.38")     // Your prediction: ____
parseFloat("gravity 0.38")   // Your prediction: ____
```

---

## Part 5: Discovery Exercises

### Exercise 5.1: parseInt with Radix (Advanced)
Try these and see what happens:

```javascript
parseInt("42", 10)           // Base 10 (normal)
parseInt("42", 8)            // Base 8 (octal)
parseInt("FF", 16)           // Base 16 (hexadecimal)
parseInt("1010", 2)          // Base 2 (binary)
```

**Questions:**
- What does the second parameter do?
- What's the decimal value of binary "1010"?

### Exercise 5.2: Comparison Challenge
```javascript
// Try these comparisons:
parseInt("42.9") === parseFloat("42.9")     // Your prediction: ____
parseInt("42") === parseFloat("42")         // Your prediction: ____
parseInt("42abc") === parseFloat("42abc")   // Your prediction: ____
```

---

## Part 6: Build Your Own Tests

### Exercise 6.1: Create Test Cases
Make up 5 tricky strings and test them with both functions:

```javascript
// Example format:
let testString1 = "your_string_here";
console.log(`parseInt("${testString1}") = ${parseInt(testString1)}`);
console.log(`parseFloat("${testString1}") = ${parseFloat(testString1)}`);
```

### Exercise 6.2: Validation Function
Write a function that checks if a string can be parsed as a valid number:

```javascript
function isValidNumber(str) {
    // Your code here - use parseInt or parseFloat
    // Return true if it's a valid number, false if NaN
}

// Test it:
isValidNumber("42")          // Should return true
isValidNumber("42.5")        // Should return true
isValidNumber("abc")         // Should return false
```

---

## Answer Key - Try the exercises first!

<details>
<summary>Click to reveal answers after you've tried them</summary>

### Part 2 Answers:
- `parseInt("  42  ")` → `42` (ignores whitespace)
- `parseFloat("  42.5  ")` → `42.5` (ignores whitespace)
- `parseInt(" 42 pounds")` → `42` (stops at first non-digit)
- `parseFloat(" 42.5 kg")` → `42.5` (stops at first non-digit)
- `parseInt("42abc")` → `42` (stops at 'a')
- `parseFloat("42.5xyz")` → `42.5` (stops at 'x')
- `parseInt("age: 42")` → `NaN` (starts with non-digit)
- `parseFloat("weight: 42.5")` → `NaN` (starts with non-digit)

### Key Rules:
1. **Both functions ignore leading/trailing whitespace**
2. **They parse from the beginning until they hit an invalid character**
3. **If the string doesn't START with a number, you get NaN**
4. **parseInt discards decimal portions**
5. **parseFloat keeps decimal portions**

### Common Gotchas:
- `parseInt("08")` might behave unexpectedly in older JavaScript (octal)
- Always use `parseInt(str, 10)` to ensure base-10 parsing
- `NaN` is "falsy" but `typeof NaN === "number"`
- Use `isNaN()` to check if parsing failed

</details>

---

## Bonus Challenge: Planetary Calculator Integration

Try using these parsing functions in a mini calculator:

```javascript
// Copy your planetary calculator data
const astronauts = [
    { name: "Neil Armstrong", weight: 165, jumpHeight: 20 },
    { name: "Sally Ride", weight: 130, jumpHeight: 22 }
];

// Function to safely parse user input
function parseWeight(input) {
    const weight = parseFloat(input);
    return isNaN(weight) ? null : weight;
}

// Test it:
parseWeight("150.5 lbs")     // Should return 150.5
parseWeight("invalid")       // Should return null
```

**Discussion Questions:**
- When would you use `parseInt` vs `parseFloat` in the planetary calculator?
- How would you handle invalid user input gracefully?
- What validation should you add before doing calculations?