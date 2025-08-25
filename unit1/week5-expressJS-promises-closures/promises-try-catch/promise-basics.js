// promise-basics.js - Understanding Promise Creation and Consumption

console.log("🎯 Promise Basics - From Creation to Consumption\n");

// 1. 📚 UNDERSTANDING PROMISES - The Foundation

console.log("1. 📚 Basic Promise Creation");

// Creating a simple promise
const simplePromise = new Promise((resolve, reject) => {
  console.log("⏳ Promise executor runs immediately!");
  
  // Simulate async operation
  setTimeout(() => {
    const success = Math.random() > 0.3; // 70% success rate
    
    if (success) {
      resolve("✅ Operation successful!");
    } else {
      reject("❌ Operation failed!");
    }
  }, 1000);
});

// Consuming the promise
console.log("🔄 Promise created, now consuming...");
simplePromise
  .then(result => {
    console.log("Success handler:", result);
  })
  .catch(error => {
    console.log("Error handler:", error);
  })
  .finally(() => {
    console.log("🏁 Finally block always runs\n");
  });

// 2. 🎯 PROMISE STATES DEMONSTRATION

console.log("2. 🎯 Promise States Demo");

function createPromiseWithDelay(delay, shouldSucceed = true) {
  return new Promise((resolve, reject) => {
    console.log(`⏰ Creating promise with ${delay}ms delay`);
    
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(`✅ Resolved after ${delay}ms`);
      } else {
        reject(`❌ Rejected after ${delay}ms`);
      }
    }, delay);
  });
}

// Demonstrate different promise states
const shortPromise = createPromiseWithDelay(500, true);
const longPromise = createPromiseWithDelay(2000, false);

console.log("📊 Promise states right after creation:");
console.log("Short promise state:", shortPromise); // Will show [object Promise]
console.log("Long promise state:", longPromise);   // Will show [object Promise]

// Handle the promises
shortPromise.then(result => console.log("Short:", result));
longPromise.catch(error => console.log("Long:", error));

// 3. 🔗 PROMISE CHAINING

console.log("\n3. 🔗 Promise Chaining");

function step1() {
  console.log("🔢 Step 1: Starting with number 5");
  return Promise.resolve(5);
}

function step2(number) {
  console.log(`🔢 Step 2: Multiplying ${number} by 2`);
  return Promise.resolve(number * 2);
}

function step3(number) {
  console.log(`🔢 Step 3: Adding 3 to ${number}`);
  return Promise.resolve(number + 3);
}

function step4(number) {
  console.log(`🔢 Step 4: Final result is ${number}`);
  return number;
}

// Chain the operations
step1()
  .then(step2)
  .then(step3)
  .then(step4)
  .then(finalResult => {
    console.log(`🎉 Chain completed! Final value: ${finalResult}`);
  })
  .catch(error => {
    console.log("❌ Chain failed:", error);
  });

// 4. 🎲 PROMISE WITH RANDOM SUCCESS/FAILURE

console.log("\n4. 🎲 Random Promise Examples");

function randomPromise(name, successRate = 0.5) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < successRate) {
        resolve(`${name} succeeded! 🎉`);
      } else {
        reject(`${name} failed! 💥`);
      }
    }, Math.random() * 1000 + 500); // Random delay 500-1500ms
  });
}

// Create multiple random promises
const promises = [
  randomPromise("Task A", 0.8),
  randomPromise("Task B", 0.6),
  randomPromise("Task C", 0.4)
];

// Handle each promise individually
promises.forEach((promise, index) => {
  promise
    .then(result => console.log(`Promise ${index + 1}:`, result))
    .catch(error => console.log(`Promise ${index + 1}:`, error));
});

// 5. 🔄 PROMISE.ALL AND PROMISE.ALLSETTLED

console.log("\n5. 🔄 Promise Utility Methods");

// Promise.all - Fails fast if any promise rejects
setTimeout(() => {
  console.log("\n🚀 Testing Promise.all (fails if any promise fails):");
  
  const fastPromises = [
    Promise.resolve("Fast 1 ✅"),
    Promise.resolve("Fast 2 ✅"),
    Promise.resolve("Fast 3 ✅")
  ];
  
  Promise.all(fastPromises)
    .then(results => {
      console.log("Promise.all succeeded:", results);
    })
    .catch(error => {
      console.log("Promise.all failed:", error);
    });
    
}, 3000);

// Promise.allSettled - Waits for all, doesn't fail fast
setTimeout(() => {
  console.log("\n🛡️ Testing Promise.allSettled (waits for all, never fails):");
  
  const mixedPromises = [
    Promise.resolve("Success 1 ✅"),
    Promise.reject("Error 1 ❌"),
    Promise.resolve("Success 2 ✅"),
    Promise.reject("Error 2 ❌")
  ];
  
  Promise.allSettled(mixedPromises)
    .then(results => {
      console.log("Promise.allSettled results:");
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`  ${index + 1}. ✅ Fulfilled:`, result.value);
        } else {
          console.log(`  ${index + 1}. ❌ Rejected:`, result.reason);
        }
      });
    });
    
}, 4000);

// 6. 🏃‍♂️ PROMISE.RACE - First to Complete Wins

setTimeout(() => {
  console.log("\n🏃‍♂️ Testing Promise.race (first to complete wins):");
  
  const racingPromises = [
    new Promise(resolve => setTimeout(() => resolve("Turtle 🐢"), 2000)),
    new Promise(resolve => setTimeout(() => resolve("Rabbit 🐰"), 500)),
    new Promise(resolve => setTimeout(() => resolve("Cheetah 🐆"), 300))
  ];
  
  Promise.race(racingPromises)
    .then(winner => {
      console.log("Race winner:", winner);
    });
    
}, 5000);

// 7. 🎯 PRACTICAL EXAMPLE: Simulated API Call

console.log("\n7. 🎯 Practical Example: Simulated API Call");

function simulateApiCall(endpoint, delay = 1000) {
  return new Promise((resolve, reject) => {
    console.log(`📡 Making API call to: ${endpoint}`);
    
    setTimeout(() => {
      // Simulate different response scenarios
      const randomNum = Math.random();
      
      if (randomNum < 0.1) {
        // 10% chance of network error
        reject({
          error: "NETWORK_ERROR",
          message: "Unable to connect to server",
          endpoint
        });
      } else if (randomNum < 0.2) {
        // 10% chance of server error
        reject({
          error: "SERVER_ERROR",
          message: "Internal server error",
          endpoint,
          status: 500
        });
      } else {
        // 80% chance of success
        resolve({
          data: `Response data from ${endpoint}`,
          status: 200,
          timestamp: new Date().toISOString(),
          endpoint
        });
      }
    }, delay);
  });
}

// Use the simulated API
simulateApiCall("/api/users")
  .then(response => {
    console.log("✅ API Success:", response);
  })
  .catch(error => {
    console.log("❌ API Error:", error);
  });

// 8. 🔄 PROMISE CHAINING WITH ERROR HANDLING

console.log("\n8. 🔄 Promise Chain with Error Handling");

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 999) {
        reject(new Error("User not found"));
      } else {
        resolve({ id, name: `User${id}`, email: `user${id}@example.com` });
      }
    }, 300);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: `${user.name}'s first post`, userId: user.id },
        { id: 2, title: `${user.name}'s second post`, userId: user.id }
      ]);
    }, 200);
  });
}

function formatUserData(user, posts) {
  return {
    user,
    posts,
    summary: `${user.name} has ${posts.length} posts`
  };
}

// Successful chain
console.log("🔗 Testing successful promise chain:");
fetchUser(123)
  .then(user => {
    console.log("  📦 User fetched:", user.name);
    return fetchUserPosts(user).then(posts => ({ user, posts }));
  })
  .then(({ user, posts }) => {
    console.log(`  📝 Posts fetched: ${posts.length} posts`);
    return formatUserData(user, posts);
  })
  .then(result => {
    console.log("  ✅ Final result:", result.summary);
  })
  .catch(error => {
    console.log("  ❌ Chain failed:", error.message);
  });

// Failed chain (user not found)
setTimeout(() => {
  console.log("\n🔗 Testing failed promise chain:");
  fetchUser(999) // This will fail
    .then(user => {
      console.log("  📦 User fetched:", user.name);
      return fetchUserPosts(user).then(posts => ({ user, posts }));
    })
    .then(({ user, posts }) => {
      console.log(`  📝 Posts fetched: ${posts.length} posts`);
      return formatUserData(user, posts);
    })
    .then(result => {
      console.log("  ✅ Final result:", result.summary);
    })
    .catch(error => {
      console.log("  ❌ Chain failed:", error.message);
    });
}, 1000);

// 9. 🎯 PROMISE CREATION PATTERNS

console.log("\n9. 🎯 Common Promise Creation Patterns");

// Pattern 1: Promise.resolve() for immediate success
const immediateSuccess = Promise.resolve("Immediate success! ⚡");
immediateSuccess.then(result => console.log("Immediate:", result));

// Pattern 2: Promise.reject() for immediate failure
const immediateFailure = Promise.reject("Immediate failure! 💥");
immediateFailure.catch(error => console.log("Immediate error:", error));

// Pattern 3: Converting callback-based functions to promises
function callbackFunction(callback) {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      callback(null, "Callback success!");
    } else {
      callback("Callback error!");
    }
  }, 500);
}

function promisifiedFunction() {
  return new Promise((resolve, reject) => {
    callbackFunction((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Use the promisified function
promisifiedFunction()
  .then(result => console.log("✅ Promisified success:", result))
  .catch(error => console.log("❌ Promisified error:", error));

console.log("\n🎓 Promise basics demonstration complete!");
console.log("💡 Key takeaways:");
console.log("   - Promises represent eventual completion of async operations");
console.log("   - Use .then() for success, .catch() for errors, .finally() for cleanup");
console.log("   - Promise chains allow sequential async operations");
console.log("   - Promise utilities (all, allSettled, race) handle multiple promises");
console.log("   - Always handle promise rejections to avoid unhandled errors");

// 📚 LEARNING EXERCISES:

/*
EXERCISES TO TRY:

1. Create a promise that resolves with your name after 2 seconds
2. Create a promise chain that:
   - Starts with number 10
   - Multiplies by 3
   - Subtracts 5
   - Divides by 5
3. Create a function that returns a promise which fails 30% of the time
4. Use Promise.all to fetch data from multiple "endpoints" simultaneously
5. Create a timeout promise that rejects after a certain time
6. Convert a setTimeout into a promise-based delay function

COMMON MISTAKES TO AVOID:

1. Forgetting to return promises in chains
2. Not handling promise rejections (.catch())
3. Creating unnecessary promise wrappers (over-promisifying)
4. Mixing callback and promise patterns inconsistently
5. Not understanding that promise executors run immediately

REAL-WORLD APPLICATIONS:

- API calls (fetch)
- File system operations (fs.promises)
- Database queries
- Image loading
- Animation sequences
- User input validation
- Timer-based operations
*/