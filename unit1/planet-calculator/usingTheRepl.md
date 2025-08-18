## **`node main.js`**

- **Runs the file as the main entry point**
- Executes the code in `main.js` from top to bottom
- `require.main === module` is `true` in main.js
- This is what you want for running applications

## **`node -r main.js`**

- **Preloads main.js BEFORE starting the REPL**
- The `-r` flag means "require" - it loads the module first
- Then drops you into an interactive REPL
- `require.main === module` is `false` in main.js

## **Example to see the difference:**

**test.js:**

```javascript
console.log("Loading test.js...");
console.log("Is this the main module?", require.main === module);

if (require.main === module) {
  console.log("Running as main application");
} else {
  console.log("Loaded as a module/preload");
}

function sayHello() {
  console.log("Hello from test.js!");
}

// Make function available globally when preloaded
global.sayHello = sayHello;
```

**Try both:**

```bash
# Method 1: Run as main
node test.js
# Output:
# Loading test.js...
# Is this the main module? true
# Running as main application
# (then exits)

# Method 2: Preload then REPL
node -r ./test.js
# Output:
# Loading test.js...
# Is this the main module? false
# Loaded as a module/preload
# Welcome to Node.js v20.15.0
# > sayHello()
# Hello from test.js!
# >
```

## **For your planetary calculator:**

**`node main.js`** ✅

- Runs the interactive CLI application
- Starts the prompts and user interface

**`node -r main.js`** ❌

- Would load all the classes into memory
- But wouldn't start the interactive CLI
- You'd just get a REPL with the classes available

## **When to use `-r` (preload):**

**Good for testing/debugging:**

```bash
node -r ./main.js
> const calc = new PlanetaryCalculator()
> const person = new Person('Test', 150, 30)
> calc.calculateStats(person, 'Mars')
```

**Good for development setup:**

```bash
# Load utilities before starting REPL
node -r ./utils.js -r ./helpers.js
```

**Good for loading environment configs:**

```bash
node -r dotenv/config main.js  # Loads .env file before running main
```

## **In your case:**

- Use `node main.js` to run the interactive calculator
- Use `node -r main.js` if you want to test the classes manually in REPL

The `-r` flag is basically "load this first, then give me control" while running normally is "execute this and follow its flow."
