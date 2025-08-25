// error-handling-patterns.js - Comprehensive Error Handling in Async JavaScript

console.log("🛡️ Error Handling Patterns - Building Robust Async Applications\n");

// 1. 🎯 BASIC TRY/CATCH WITH ASYNC/AWAIT

console.log("1. 🎯 Basic Try/Catch Patterns");

// Simple async function with error handling
async function basicErrorHandling() {
  try {
    console.log("  🔄 Attempting risky operation...");
    const result = await riskyOperation();
    console.log("  ✅ Operation succeeded:", result);
    return result;
  } catch (error) {
    console.log("  ❌ Operation failed:", error.message);
    throw error; // Re-throw if calling code needs to handle it
  } finally {
    console.log("  🧹 Cleanup code runs regardless of success/failure");
  }
}

function riskyOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Success! 🎉");
      } else {
        reject(new Error("Random failure occurred"));
      }
    }, 200);
  });
}

// Demonstrate basic error handling
setTimeout(async () => {
  try {
    await basicErrorHandling();
  } catch (error) {
    console.log("  🚨 Caught at higher level:", error.message);
  }
  console.log();
}, 500);

// 2. 🔍 ERROR TYPES AND CLASSIFICATION

console.log("2. 🔍 Error Classification and Handling");

// Custom error classes for better error handling
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
    this.retryable = true;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.retryable = false;
  }
}

class BusinessLogicError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'BusinessLogicError';
    this.code = code;
    this.retryable = false;
  }
}

// Simulate different types of errors
function simulateApiCall(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      
      if (random < 0.2) {
        reject(new NetworkError('Connection timeout', 408));
      } else if (random < 0.4) {
        reject(new ValidationError('Invalid email format', 'email'));
      } else if (random < 0.6) {
        reject(new BusinessLogicError('Insufficient balance', 'INSUFFICIENT_FUNDS'));
      } else {
        resolve({ data: 'API call successful', endpoint });
      }
    }, 100);
  });
}

// Handle different error types appropriately
async function handleDifferentErrorTypes(endpoint) {
  try {
    console.log(`  📡 Calling API: ${endpoint}`);
    const result = await simulateApiCall(endpoint);
    console.log("  ✅ API call succeeded:", result.data);
    return result;
    
  } catch (error) {
    console.log(`  ❌ API call failed: ${error.name} - ${error.message}`);
    
    if (error instanceof NetworkError) {
      console.log("  🔄 Network error - could retry");
      // Could implement retry logic here
      
    } else if (error instanceof ValidationError) {
      console.log(`  📝 Validation error in field: ${error.field} - fix input`);
      // Could return specific validation feedback
      
    } else if (error instanceof BusinessLogicError) {
      console.log(`  💼 Business logic error: ${error.code} - handle gracefully`);
      // Could show user-friendly message
      
    } else {
      console.log("  🤷 Unknown error type - log and monitor");
      // Generic error handling
    }
    
    throw error;
  }
}

setTimeout(async () => {
  console.log("🔍 Testing different error types:");
  
  for (let i = 1; i <= 3; i++) {
    try {
      await handleDifferentErrorTypes(`/api/test${i}`);
    } catch (error) {
      // Errors are handled in the function above
    }
    console.log();
  }
}, 1000);

// 3. 🔄 RETRY PATTERNS WITH EXPONENTIAL BACKOFF

console.log("3. 🔄 Retry Patterns with Exponential Backoff");

// Advanced retry function with exponential backoff
async function retryWithBackoff(
  operation, 
  maxRetries = 3, 
  baseDelay = 1000, 
  maxDelay = 10000,
  backoffFactor = 2
) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`    🔄 Attempt ${attempt}/${maxRetries}`);
      const result = await operation();
      
      if (attempt > 1) {
        console.log(`    ✅ Succeeded after ${attempt} attempts`);
      }
      return result;
      
    } catch (error) {
      lastError = error;
      console.log(`    ❌ Attempt ${attempt} failed: ${error.message}`);
      
      // Check if error is retryable
      if (error.retryable === false) {
        console.log(`    🚫 Error is not retryable, failing immediately`);
        throw error;
      }
      
      if (attempt === maxRetries) {
        console.log(`    💥 All ${maxRetries} attempts failed`);
        break;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(baseDelay * Math.pow(backoffFactor, attempt - 1), maxDelay);
      console.log(`    ⏳ Waiting ${delay}ms before retry...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
}

// Test retry with different scenarios
function createRetryableOperation(successRate = 0.3) {
  let attempts = 0;
  
  return () => {
    attempts++;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < successRate) {
          resolve(`Success on attempt ${attempts}! 🎉`);
        } else {
          reject(new NetworkError(`Attempt ${attempts} failed`, 500));
        }
      }, 100);
    });
  };
}

setTimeout(async () => {
  console.log("🔄 Testing retry with exponential backoff:");
  
  try {
    const operation = createRetryableOperation(0.4); // 40% success rate
    const result = await retryWithBackoff(operation, 4, 200, 2000);
    console.log("  🎉 Final result:", result);
  } catch (error) {
    console.log("  💥 Retry failed:", error.message);
  }
  console.log();
}, 3000);

// 4. ⏰ TIMEOUT PATTERNS

console.log("4. ⏰ Timeout and Cancellation Patterns");

// Create a timeout promise
function createTimeoutPromise(ms, message = 'Operation timed out') {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), ms);
  });
}

// Timeout wrapper with AbortController (modern approach)
async function withTimeoutAndAbort(operation, timeoutMs = 5000, abortController) {
  const timeoutPromise = createTimeoutPromise(timeoutMs, `Operation timed out after ${timeoutMs}ms`);
  
  try {
    // Race between operation and timeout
    const result = await Promise.race([
      operation(abortController?.signal),
      timeoutPromise
    ]);
    return result;
  } catch (error) {
    // If timeout occurred, abort the operation
    if (abortController && error.message.includes('timed out')) {
      abortController.abort();
    }
    throw error;
  }
}

// Simulate a long-running operation that supports cancellation
function longRunningOperation(abortSignal) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      resolve("Long operation completed! 🎉");
    }, 3000);
    
    // Handle cancellation
    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new Error('Operation was cancelled'));
      });
    }
  });
}

setTimeout(async () => {
  console.log("⏰ Testing timeout patterns:");
  
  // Test successful operation within timeout
  try {
    console.log("  🔄 Testing quick operation (should succeed):");
    const quickOperation = () => Promise.resolve("Quick result!");
    const result1 = await withTimeoutAndAbort(quickOperation, 2000);
    console.log("    ✅ Result:", result1);
  } catch (error) {
    console.log("    ❌ Error:", error.message);
  }
  
  // Test operation that times out
  try {
    console.log("  🔄 Testing slow operation (should timeout):");
    const abortController = new AbortController();
    const result2 = await withTimeoutAndAbort(longRunningOperation, 1000, abortController);
    console.log("    ✅ Result:", result2);
  } catch (error) {
    console.log("    ❌ Error:", error.message);
  }
  
  console.log();
}, 5000);

// 5. 🔀 PARALLEL ERROR HANDLING

console.log("5. 🔀 Parallel Operation Error Handling");

// Simulate multiple async operations
function createAsyncTask(name, delay, successRate = 0.7) {
  return () => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < successRate) {
        resolve(`${name} completed successfully`);
      } else {
        reject(new Error(`${name} failed`));
      }
    }, delay);
  });
}

// Handle parallel operations with different strategies
async function parallelErrorHandling() {
  const tasks = [
    createAsyncTask('Task A', 200, 0.8),
    createAsyncTask('Task B', 300, 0.6),
    createAsyncTask('Task C', 150, 0.9),
    createAsyncTask('Task D', 400, 0.4)
  ];
  
  console.log("  🚀 Strategy 1: Promise.all (fail-fast):");
  try {
    const results = await Promise.all(tasks.map(task => task()));
    console.log("    ✅ All tasks succeeded:", results);
  } catch (error) {
    console.log("    ❌ At least one task failed:", error.message);
  }
  
  console.log("  🛡️ Strategy 2: Promise.allSettled (continue on failure):");
  const settledResults = await Promise.allSettled(tasks.map(task => task()));
  
  const successes = settledResults.filter(r => r.status === 'fulfilled');
  const failures = settledResults.filter(r => r.status === 'rejected');
  
  console.log(`    ✅ Successes: ${successes.length}`);
  console.log(`    ❌ Failures: ${failures.length}`);
  
  successes.forEach((result, index) => {
    console.log(`      Success ${index + 1}: ${result.value}`);
  });
  
  failures.forEach((result, index) => {
    console.log(`      Failure ${index + 1}: ${result.reason.message}`);
  });
  
  console.log("  ⚡ Strategy 3: Custom parallel with individual error handling:");
  const customResults = await Promise.all(
    tasks.map(async (task, index) => {
      try {
        const result = await task();
        return { success: true, data: result, index };
      } catch (error) {
        console.log(`    ⚠️  Task ${index + 1} failed: ${error.message}`);
        return { success: false, error: error.message, index };
      }
    })
  );
  
  const customSuccesses = customResults.filter(r => r.success);
  console.log(`    📊 Custom strategy: ${customSuccesses.length}/${tasks.length} succeeded`);
}

setTimeout(() => {
  parallelErrorHandling();
}, 7000);

// 6. 🏭 ERROR HANDLING IN REAL-WORLD PATTERNS

console.log("\n6. 🏭 Real-World Error Handling Patterns");

// Pattern 1: API Client with comprehensive error handling
class ApiClient {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = options.timeout || 5000;
    this.maxRetries = options.maxRetries || 3;
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const timeout = options.timeout || this.defaultTimeout;
    
    return retryWithBackoff(
      async () => {
        const abortController = new AbortController();
        
        try {
          const response = await withTimeoutAndAbort(
            () => this.fetch(url, { ...options, signal: abortController.signal }),
            timeout,
            abortController
          );
          
          if (!response.ok) {
            throw new NetworkError(`HTTP ${response.status}: ${response.statusText}`, response.status);
          }
          
          return await response.json();
          
        } catch (error) {
          if (error.name === 'AbortError') {
            throw new NetworkError('Request was cancelled', 408);
          }
          throw error;
        }
      },
      this.maxRetries
    );
  }
  
  // Mock fetch for demonstration
  fetch(url, options) {
    console.log(`    📡 Fetching: ${url}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.3) {
          reject(new Error('Network error'));
        } else if (random < 0.5) {
          resolve({ ok: false, status: 500, statusText: 'Internal Server Error' });
        } else {
          resolve({ 
            ok: true, 
            json: () => Promise.resolve({ data: 'API response', url }) 
          });
        }
      }, Math.random() * 200 + 100);
    });
  }
}

// Pattern 2: Database operation with connection pooling errors
class DatabaseService {
  constructor() {
    this.connected = false;
    this.connectionPool = [];
  }
  
  async connect() {
    if (this.connected) return;
    
    try {
      console.log("    🔌 Connecting to database...");
      // Simulate connection that might fail
      if (Math.random() < 0.2) {
        throw new Error('Database connection failed');
      }
      this.connected = true;
      console.log("    ✅ Database connected");
    } catch (error) {
      console.log("    ❌ Database connection failed:", error.message);
      throw new Error('Unable to connect to database');
    }
  }
  
  async query(sql, params = []) {
    await this.connect(); // Ensure connection
    
    try {
      console.log(`    🔍 Executing query: ${sql}`);
      
      // Simulate query that might fail
      const random = Math.random();
      if (random < 0.1) {
        throw new Error('Connection lost');
      } else if (random < 0.2) {
        throw new ValidationError('Invalid SQL syntax', 'sql');
      }
      
      return { rows: [{ id: 1, data: 'Query result' }] };
      
    } catch (error) {
      if (error.message === 'Connection lost') {
        console.log("    🔄 Connection lost, attempting to reconnect...");
        this.connected = false;
        // Could implement reconnection logic here
      }
      throw error;
    }
  }
}

// Pattern 3: File processing with graceful error handling
class FileProcessor {
  async processFiles(filePaths) {
    const results = {
      processed: [],
      failed: [],
      summary: {}
    };
    
    for (const filePath of filePaths) {
      try {
        console.log(`    📁 Processing file: ${filePath}`);
        const result = await this.processFile(filePath);
        results.processed.push({ filePath, result });
        console.log(`    ✅ File processed: ${filePath}`);
      } catch (error) {
        console.log(`    ❌ File processing failed: ${filePath} - ${error.message}`);
        results.failed.push({ filePath, error: error.message });
        
        // Continue processing other files instead of failing completely
      }
    }
    
    results.summary = {
      total: filePaths.length,
      succeeded: results.processed.length,
      failed: results.failed.length,
      successRate: (results.processed.length / filePaths.length * 100).toFixed(1)
    };
    
    return results;
  }
  
  async processFile(filePath) {
    // Simulate file processing that might fail
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.7) {
          resolve(`Processed: ${filePath}`);
        } else {
          reject(new Error(`Unable to process ${filePath}`));
        }
      }, Math.random() * 100 + 50);
    });
  }
}

// Demonstrate real-world patterns
setTimeout(async () => {
  console.log("🏭 Testing real-world error handling patterns:");
  
  // API Client
  console.log("  📡 Testing API Client:");
  const apiClient = new ApiClient('https://api.example.com');
  try {
    const data = await apiClient.request('/users/123');
    console.log("    ✅ API data:", data);
  } catch (error) {
    console.log("    ❌ API failed:", error.message);
  }
  
  // Database Service
  console.log("  🗄️ Testing Database Service:");
  const db = new DatabaseService();
  try {
    const result = await db.query('SELECT * FROM users');
    console.log("    ✅ Query result:", result);
  } catch (error) {
    console.log("    ❌ Query failed:", error.message);
  }
  
  // File Processor
  console.log("  📁 Testing File Processor:");
  const processor = new FileProcessor();
  const filePaths = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
  const results = await processor.processFiles(filePaths);
  console.log("    📊 Processing summary:", results.summary);
  
}, 10000);

console.log("\n🎓 Error handling patterns demonstration will complete in ~12 seconds");
console.log("💡 Key takeaways:");
console.log("   - Use try/catch with async/await for clean error handling");
console.log("   - Create custom error classes for better error classification");
console.log("   - Implement retry logic with exponential backoff for transient errors");
console.log("   - Use timeouts and cancellation to prevent hanging operations");
console.log("   - Handle parallel operations based on your failure tolerance");
console.log("   - Build error handling into your application architecture");

// 📚 PRODUCTION ERROR HANDLING CHECKLIST:

/*
PRODUCTION ERROR HANDLING CHECKLIST:

✅ ERROR CLASSIFICATION:
   - Create custom error classes
   - Distinguish between retryable and non-retryable errors
   - Use error codes for programmatic handling

✅ LOGGING AND MONITORING:
   - Log errors with context (user, request ID, timestamp)
   - Use structured logging (JSON format)
   - Set up alerts for critical errors
   - Track error rates and patterns

✅ GRACEFUL DEGRADATION:
   - Provide fallback values when possible
   - Continue processing other items when one fails
   - Show user-friendly error messages
   - Maintain partial functionality during errors

✅ RECOVERY STRATEGIES:
   - Implement retry logic with backoff
   - Use circuit breakers for external services
   - Cache data to survive temporary outages
   - Implement health checks and auto-recovery

✅ USER EXPERIENCE:
   - Don't expose internal error details to users
   - Provide actionable error messages
   - Show loading states and progress indicators
   - Allow users to retry failed operations

COMMON ANTI-PATTERNS TO AVOID:

❌ Silent failures (catching errors without handling)
❌ Generic error messages that don't help users
❌ Retrying non-retryable errors indefinitely
❌ Not logging errors or logging too much noise
❌ Failing entire operations when partial success is acceptable
❌ Exposing sensitive information in error messages
❌ Not testing error paths in your code

TESTING ERROR HANDLING:

1. Unit test both success and failure paths
2. Use chaos engineering to test resilience
3. Simulate network failures and timeouts
4. Test with malformed or unexpected data
5. Verify error messages are user-friendly
6. Test retry and recovery mechanisms
*/