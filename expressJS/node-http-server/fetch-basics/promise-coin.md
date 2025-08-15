Here's a simple example for teaching basic promises with a coin flip:

```javascript
// Create a promise that simulates a coin flip
function coinFlip() {
  return new Promise((resolve, reject) => {
    // Simulate some delay like a real coin flip
    setTimeout(() => {
      const result = Math.floor(Math.random() * 3) + 1; // Random number 1, 2, or 3

      if (result === 1 || result === 2) {
        resolve(result); // Success case
      } else {
        reject(result); // Error case for the weird coin
      }
    }, 1000); // 1 second delay
  });
}

// Using the promise with .then() and .catch()
coinFlip()
  .then((result) => {
    if (result === 1) {
      console.log("Heads!");
    } else if (result === 2) {
      console.log("Tails!");
    }
  })
  .catch((result) => {
    console.log("You have a weird coin!");
  });
```

Or if you want all outcomes to be handled in `.then()` instead of using reject:

```javascript
function coinFlip() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = Math.floor(Math.random() * 3) + 1;
      resolve(result);
    }, 1000);
  });
}

coinFlip()
  .then((result) => {
    if (result === 1) {
      console.log("Heads!");
    } else if (result === 2) {
      console.log("Tails!");
    } else {
      console.log("You have a weird coin!");
    }
  })
  .catch((error) => {
    console.log("Something went wrong:", error);
  });
```

This gives students a clear, relatable example of how promises work with both success and error handling.