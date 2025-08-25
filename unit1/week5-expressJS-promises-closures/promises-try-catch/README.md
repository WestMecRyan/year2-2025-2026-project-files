# Promises and Try/Catch Error Handling

## Learning Objectives
- Understand what promises are and why they're important
- Learn the difference between synchronous and asynchronous code
- Master promise creation, consumption, and chaining
- Use async/await for cleaner asynchronous code
- Implement proper error handling with try/catch
- Handle common promise patterns and edge cases

## 🤔 What Are Promises?

A **Promise** is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation. Think of it as a "promise" that something will happen in the future.

### Real-World Analogy
Imagine ordering food at a restaurant:
1. You place your order (start the async operation)
2. The waiter gives you a receipt with an order number (the promise)
3. You can do other things while waiting (non-blocking)
4. Eventually, your food arrives (promise resolves) or they tell you it's not available (promise rejects)

## 🔄 Synchronous vs Asynchronous

### Synchronous Code (Blocking)
```javascript
console.log("First");
console.log("Second");  // Waits for first to complete
console.log("Third");   // Waits for second to complete

// Output: First, Second, Third (in order)
```

### Asynchronous Code (Non-blocking)
```javascript
console.log("First");
setTimeout(() => console.log("Second"), 1000); // Async operation
console.log("Third"); // Doesn't wait!

// Output: First, Third, Second (after 1 second)
```

## 📋 Promise States

A promise can be in one of three states:

1. **Pending** 🟡 - Initial state, neither fulfilled nor rejected
2. **Fulfilled** 🟢 - Operation completed successfully
3. **Rejected** 🔴 - Operation failed

```javascript
// Promise lifecycle
const promise = new Promise((resolve, reject) => {
  // Initially: PENDING 🟡
  
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Success!"); // → FULFILLED 🟢
    } else {
      reject("Failed!");   // → REJECTED 🔴
    }
  }, 1000);
});
```

## 🎯 Why Promises Matter

### Before Promises: Callback Hell
```javascript
// ❌ Callback Hell - Hard to read and maintain
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getFinalData(c, function(d) {
        // Finally use the data...
      });
    });
  });
});
```

### With Promises: Clean Chain
```javascript
// ✅ Promise Chain - Much more readable
getData()
  .then(a => getMoreData(a))
  .then(b => getEvenMoreData(b))
  .then(c => getFinalData(c))
  .then(d => {
    // Use the final data
  })
  .catch(error => {
    // Handle any error in the chain
  });
```

## 🔧 Promise Methods

### .then() - Handle Success
```javascript
promise.then(result => {
  console.log("Success:", result);
});
```

### .catch() - Handle Errors
```javascript
promise.catch(error => {
  console.log("Error:", error);
});
```

### .finally() - Always Executes
```javascript
promise.finally(() => {
  console.log("Cleanup or final actions");
});
```

## 🚀 Modern Approach: Async/Await

Async/await makes asynchronous code look and behave more like synchronous code:

### Traditional Promise Chain
```javascript
function fetchUserData() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      return fetch(`/api/posts/${user.id}`);
    })
    .then(response => response.json())
    .then(posts => {
      console.log("User posts:", posts);
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
```

### With Async/Await
```javascript
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    
    console.log("User posts:", posts);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

## ⚠️ Error Handling Patterns

### 1. Try/Catch with Async/Await
```javascript
async function riskyOperation() {
  try {
    const result = await someAsyncOperation();
    return result;
  } catch (error) {
    console.error("Operation failed:", error);
    throw error; // Re-throw if needed
  }
}
```

### 2. Multiple Error Types
```javascript
async function handleDifferentErrors() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      console.log("Network problem, retrying...");
      // Retry logic
    } else if (error.code === 'AUTH_ERROR') {
      console.log("Authentication failed");
      // Redirect to login
    } else {
      console.log("Unknown error:", error);
      // Generic error handling
    }
  }
}
```

### 3. Graceful Degradation
```javascript
async function fetchWithFallback() {
  try {
    const primaryData = await fetchFromPrimaryAPI();
    return primaryData;
  } catch (primaryError) {
    console.warn("Primary API failed, trying fallback...");
    
    try {
      const fallbackData = await fetchFromFallbackAPI();
      return fallbackData;
    } catch (fallbackError) {
      console.error("Both APIs failed");
      return getDefaultData(); // Fallback to default
    }
  }
}
```

## 🔄 Common Promise Utilities

### Promise.all() - Wait for All
```javascript
// Run multiple operations in parallel
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);
```

### Promise.allSettled() - Wait for All (Don't Fail Fast)
```javascript
const results = await Promise.allSettled([
  fetchReliableData(),
  fetchUnreliableData(),
  fetchMoreData()
]);

// Check individual results
results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`Operation ${index} succeeded:`, result.value);
  } else {
    console.log(`Operation ${index} failed:`, result.reason);
  }
});
```

### Promise.race() - First to Complete
```javascript
// Timeout pattern
const dataWithTimeout = await Promise.race([
  fetchData(),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
]);
```

## 🎯 Best Practices

### 1. Always Handle Errors
```javascript
// ❌ Unhandled promise rejection
fetchData().then(data => console.log(data));

// ✅ Proper error handling
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 2. Avoid Mixing Promise Styles
```javascript
// ❌ Mixed styles - confusing
async function mixedStyles() {
  const data = await fetch('/api/data');
  return data.json().then(result => result.items);
}

// ✅ Consistent async/await
async function consistentStyle() {
  const data = await fetch('/api/data');
  const result = await data.json();
  return result.items;
}
```

### 3. Handle Promise Rejections Globally
```javascript
// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
```

## 📚 Files in This Module

- `promise-basics.js` - Creating and consuming promises
- `async-await-examples.js` - Modern async/await patterns
- `error-handling-patterns.js` - Try/catch and error recovery

## 🔗 Common Use Cases

1. **API Calls** - Fetching data from servers
2. **File Operations** - Reading/writing files
3. **Database Queries** - Async database operations
4. **Timer Operations** - setTimeout, setInterval
5. **User Input** - Waiting for user actions
6. **Animation** - Sequenced animations

## 🎓 Key Takeaways

- Promises handle asynchronous operations elegantly
- Async/await makes async code more readable
- Always use try/catch for error handling
- Consider using Promise utilities for complex scenarios
- Handle errors gracefully with fallback strategies
- Never ignore promise rejections