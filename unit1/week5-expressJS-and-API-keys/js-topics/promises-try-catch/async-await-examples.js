// async-await-examples.js - Modern Asynchronous JavaScript Patterns

console.log("🚀 Modern Async/Await Patterns - Making Async Code Look Sync\n");

// 1. 📚 BASIC ASYNC/AWAIT SYNTAX

console.log("1. 📚 Basic Async/Await vs Promise Chains");

// Traditional promise approach
function fetchUserDataPromises(userId) {
  console.log("🔗 Using traditional promise chains:");
  
  return fetch(`/api/users/${userId}`)
    .then(response => {
      console.log("  📡 User response received");
      return response.json();
    })
    .then(user => {
      console.log("  👤 User data parsed:", user.name);
      return fetch(`/api/posts/${user.id}`);
    })
    .then(response => {
      console.log("  📡 Posts response received");
      return response.json();
    })
    .then(posts => {
      console.log(`  📝 Posts parsed: ${posts.length} posts`);
      return { user, posts };
    })
    .catch(error => {
      console.log("  ❌ Promise chain failed:", error.message);
      throw error;
    });
}

// Modern async/await approach
async function fetchUserDataAsync(userId) {
  console.log("✨ Using modern async/await:");
  
  try {
    const userResponse = await fetch(`/api/users/${userId}`);
    console.log("  📡 User response received");
    
    const user = await userResponse.json();
    console.log("  👤 User data parsed:", user.name);
    
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    console.log("  📡 Posts response received");
    
    const posts = await postsResponse.json();
    console.log(`  📝 Posts parsed: ${posts.length} posts`);
    
    return { user, posts };
  } catch (error) {
    console.log("  ❌ Async function failed:", error.message);
    throw error;
  }
}

// Mock fetch for demonstration
function fetch(url) {
  console.log(`    🌐 Fetching: ${url}`);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('users')) {
        resolve({
          json: () => Promise.resolve({ id: 123, name: 'John Doe' })
        });
      } else if (url.includes('posts')) {
        resolve({
          json: () => Promise.resolve([
            { id: 1, title: 'First Post' },
            { id: 2, title: 'Second Post' }
          ])
        });
      } else {
        reject(new Error('Not found'));
      }
    }, Math.random() * 500 + 200);
  });
}

// Demonstrate both approaches
setTimeout(async () => {
  try {
    const result = await fetchUserDataAsync(123);
    console.log("✅ Async/await completed successfully\n");
  } catch (error) {
    console.log("❌ Async/await failed\n");
  }
}, 1000);

// 2. 🎯 ASYNC FUNCTIONS ALWAYS RETURN PROMISES

console.log("2. 🎯 Understanding Async Function Return Values");

async function returnsString() {
  return "I'm just a string";
}

async function returnsNumber() {
  return 42;
}

async function returnsPromise() {
  return Promise.resolve("I'm already a promise");
}

async function demonstrateAsyncReturns() {
  console.log("🔍 Testing async function return values:");
  
  // These all return promises, regardless of what they actually return
  const stringResult = returnsString();
  const numberResult = returnsNumber();
  const promiseResult = returnsPromise();
  
  console.log("  Direct returns (all are promises):");
  console.log("    String function returns:", typeof stringResult, stringResult.constructor.name);
  console.log("    Number function returns:", typeof numberResult, numberResult.constructor.name);
  console.log("    Promise function returns:", typeof promiseResult, promiseResult.constructor.name);
  
  // To get actual values, we need to await
  console.log("  Awaited values:");
  console.log("    String value:", await stringResult);
  console.log("    Number value:", await numberResult);
  console.log("    Promise value:", await promiseResult);
}

demonstrateAsyncReturns();

// 3. 🚫 COMMON ASYNC/AWAIT MISTAKES

console.log("\n3. 🚫 Common Async/Await Mistakes and Solutions");

// Mistake 1: Forgetting await
async function forgettingAwait() {
  console.log("❌ Mistake: Forgetting await");
  
  const promise = fetch('/api/data');
  console.log("  Without await:", promise); // This is a Promise object!
  
  const data = await fetch('/api/data');
  console.log("  With await:", await data.json()); // This is the actual data
}

// Mistake 2: Unnecessary awaiting in sequence
async function unnecessarySequential() {
  console.log("❌ Mistake: Unnecessary sequential awaiting");
  
  const start = Date.now();
  
  // Bad - these could run in parallel!
  const user = await simulateApiCall('users', 500);
  const posts = await simulateApiCall('posts', 500);
  const comments = await simulateApiCall('comments', 500);
  
  const end = Date.now();
  console.log(`  Sequential took: ${end - start}ms (about 1500ms)`);
  
  return { user, posts, comments };
}

async function efficientParallel() {
  console.log("✅ Solution: Parallel execution");
  
  const start = Date.now();
  
  // Good - run in parallel!
  const [user, posts, comments] = await Promise.all([
    simulateApiCall('users', 500),
    simulateApiCall('posts', 500),
    simulateApiCall('comments', 500)
  ]);
  
  const end = Date.now();
  console.log(`  Parallel took: ${end - start}ms (about 500ms)`);
  
  return { user, posts, comments };
}

function simulateApiCall(endpoint, delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`${endpoint} data`), delay);
  });
}

setTimeout(async () => {
  await forgettingAwait();
  await unnecessarySequential();
  await efficientParallel();
}, 2000);

// 4. 🔄 ASYNC/AWAIT WITH LOOPS

console.log("\n4. 🔄 Async/Await with Different Loop Patterns");

const urls = ['/api/data1', '/api/data2', '/api/data3', '/api/data4'];

// Sequential processing (one after another)
async function processSequentially() {
  console.log("🔄 Sequential processing (slow but ordered):");
  const results = [];
  
  for (const url of urls) {
    console.log(`  Processing ${url}...`);
    const result = await simulateApiCall(url, 200);
    results.push(result);
  }
  
  console.log("  Sequential results:", results);
  return results;
}

// Parallel processing (all at once)
async function processInParallel() {
  console.log("⚡ Parallel processing (fast but may overwhelm server):");
  
  const promises = urls.map(url => {
    console.log(`  Starting ${url}...`);
    return simulateApiCall(url, 200);
  });
  
  const results = await Promise.all(promises);
  console.log("  Parallel results:", results);
  return results;
}

// Batch processing (controlled parallelism)
async function processByBatch(batchSize = 2) {
  console.log(`📦 Batch processing (${batchSize} at a time):`);
  const results = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`  Processing batch: ${batch.join(', ')}`);
    
    const batchPromises = batch.map(url => simulateApiCall(url, 200));
    const batchResults = await Promise.all(batchPromises);
    
    results.push(...batchResults);
  }
  
  console.log("  Batch results:", results);
  return results;
}

setTimeout(async () => {
  await processSequentially();
  console.log();
  await processInParallel();
  console.log();
  await processByBatch(2);
}, 4000);

// 5. 🛡️ ADVANCED ERROR HANDLING PATTERNS

console.log("\n5. 🛡️ Advanced Error Handling with Async/Await");

// Retry mechanism
async function withRetry(operation, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  🔄 Attempt ${attempt}/${maxRetries}`);
      const result = await operation();
      console.log(`  ✅ Success on attempt ${attempt}`);
      return result;
    } catch (error) {
      console.log(`  ❌ Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        console.log(`  💥 All ${maxRetries} attempts failed`);
        throw new Error(`Operation failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Wait before retrying
      console.log(`  ⏳ Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Timeout wrapper
async function withTimeout(operation, timeoutMs = 5000) {
  return Promise.race([
    operation(),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
    )
  ]);
}

// Circuit breaker pattern (simplified)
class SimpleCircuitBreaker {
  constructor(threshold = 3, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }
  
  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      } else {
        this.state = 'HALF_OPEN';
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
      console.log(`  🔓 Circuit breaker OPENED - will retry after ${this.timeout}ms`);
    }
  }
}

// Demonstrate error handling patterns
function unreliableOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) { // 30% success rate
        resolve("Operation succeeded! 🎉");
      } else {
        reject(new Error("Random failure"));
      }
    }, 100);
  });
}

setTimeout(async () => {
  console.log("\n🔄 Testing retry mechanism:");
  try {
    const result = await withRetry(unreliableOperation, 3, 500);
    console.log("Retry result:", result);
  } catch (error) {
    console.log("Retry failed:", error.message);
  }
  
  console.log("\n⏰ Testing timeout mechanism:");
  try {
    const slowOperation = () => new Promise(resolve => setTimeout(() => resolve("Slow result"), 2000));
    const result = await withTimeout(slowOperation, 1000);
    console.log("Timeout result:", result);
  } catch (error) {
    console.log("Timeout error:", error.message);
  }
  
}, 6000);

// 6. 🎯 PRACTICAL ASYNC PATTERNS

console.log("\n6. 🎯 Practical Async Patterns");

// Pattern 1: Async initialization
class DataService {
  constructor() {
    this.initialized = false;
    this.data = null;
  }
  
  async init() {
    if (this.initialized) return;
    
    console.log("  🔧 Initializing data service...");
    this.data = await simulateApiCall('initialization', 300);
    this.initialized = true;
    console.log("  ✅ Data service initialized");
  }
  
  async getData() {
    await this.init(); // Ensure initialization
    return this.data;
  }
}

// Pattern 2: Async queue processing
class AsyncQueue {
  constructor(concurrency = 2) {
    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
  }
  
  async add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { task, resolve, reject } = this.queue.shift();
    
    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    }
    
    this.running--;
    this.process(); // Process next item
  }
}

// Pattern 3: Async memoization/caching
const asyncCache = new Map();

async function memoizedAsyncFunction(key) {
  if (asyncCache.has(key)) {
    console.log(`  💾 Cache hit for: ${key}`);
    return asyncCache.get(key);
  }
  
  console.log(`  🔄 Computing for: ${key}`);
  const result = await simulateApiCall(key, 200);
  asyncCache.set(key, result);
  return result;
}

// Demonstrate practical patterns
setTimeout(async () => {
  console.log("\n🏭 Demonstrating practical patterns:");
  
  // Data service pattern
  const service = new DataService();
  const data1 = await service.getData(); // Will initialize
  const data2 = await service.getData(); // Will reuse initialization
  
  // Async queue pattern
  const queue = new AsyncQueue(2);
  const tasks = ['task1', 'task2', 'task3', 'task4'].map(name => 
    () => simulateApiCall(name, 300)
  );
  
  console.log("  📋 Adding tasks to queue...");
  const queueResults = await Promise.all(tasks.map(task => queue.add(task)));
  console.log("  ✅ Queue processing complete:", queueResults);
  
  // Memoization pattern
  console.log("  🧠 Testing memoization:");
  await memoizedAsyncFunction('expensive-calc');
  await memoizedAsyncFunction('expensive-calc'); // Should hit cache
  
}, 8000);

console.log("\n🎓 Async/await examples complete!");
console.log("💡 Key takeaways:");
console.log("   - Async functions always return promises");
console.log("   - Use await for cleaner, more readable async code");
console.log("   - Be careful about sequential vs parallel execution");
console.log("   - Implement proper error handling with try/catch");
console.log("   - Consider patterns like retry, timeout, and circuit breakers");
console.log("   - Use async patterns for initialization, queuing, and caching");

// 📚 ADVANCED EXERCISES:

/*
ADVANCED EXERCISES TO TRY:

1. Implement an async function that processes an array of URLs with:
   - Configurable concurrency limit
   - Retry logic for failed requests
   - Progress reporting
   
2. Create an async cache with TTL (time-to-live) expiration

3. Build an async pipeline that transforms data through multiple stages

4. Implement an async event emitter that can await event handlers

5. Create a priority queue for async tasks

6. Build an async middleware system similar to Express.js

PERFORMANCE CONSIDERATIONS:

1. Don't await unnecessarily in sequence - use Promise.all for parallel operations
2. Consider memory usage when processing large datasets
3. Implement backpressure for high-volume operations
4. Use streams for large data processing
5. Cache expensive computations appropriately

DEBUGGING TIPS:

1. Use meaningful variable names in async functions
2. Break complex async chains into smaller functions
3. Add logging at key points in async operations
4. Use async stack traces in Node.js
5. Consider using performance monitoring tools

REAL-WORLD APPLICATIONS:

- API orchestration and data aggregation
- File processing and uploads
- Database migrations and batch operations
- Web scraping and data collection
- Microservice communication
- Image/video processing pipelines
*/