// closure-examples.js - Understanding JavaScript Closures from Basics to Advanced

console.log("🔒 JavaScript Closures - From Basics to Mastery\n");

// 1. 📚 WHAT IS A CLOSURE? - Basic Understanding

console.log("1. 📚 Basic Closure Concept");

function outerFunction(x) {
  console.log(`  📦 Outer function called with: ${x}`);
  
  // This inner function has access to 'x' even after outerFunction returns
  function innerFunction(y) {
    console.log(`  🎯 Inner function: ${x} + ${y} = ${x + y}`);
    return x + y;
  }
  
  console.log(`  📤 Outer function returning inner function`);
  return innerFunction;
}

console.log("🔄 Creating closures:");
const addFive = outerFunction(5); // outerFunction executes and returns innerFunction
const addTen = outerFunction(10);

console.log("🔄 Using closures:");
console.log(`  Result 1: ${addFive(3)}`);  // Inner function still has access to x=5
console.log(`  Result 2: ${addTen(7)}`);   // Inner function still has access to x=10
console.log(`  Result 3: ${addFive(1)}`);  // x=5 is still preserved

// 2. 🎯 CLOSURE CREATING A PERSISTENT STATE

console.log("\n2. 🎯 Closures for Persistent State");

function createCounter(initialValue = 0) {
  let count = initialValue; // This variable is "closed over"
  
  console.log(`  🏗️ Counter created with initial value: ${initialValue}`);
  
  return function() {
    count++; // Accessing and modifying the outer variable
    console.log(`  📊 Count is now: ${count}`);
    return count;
  };
}

const counter1 = createCounter(0);
const counter2 = createCounter(100);

console.log("🔢 Using independent counters:");
counter1(); // 1
counter1(); // 2
counter2(); // 101
counter1(); // 3
counter2(); // 102

console.log("💡 Notice: Each closure maintains its own copy of the 'count' variable!");

// 3. 🏭 FUNCTION FACTORIES WITH CLOSURES

console.log("\n3. 🏭 Function Factories");

function createGreeter(greeting) {
  console.log(`  🎭 Creating greeter with: "${greeting}"`);
  
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

function createMultiplier(factor) {
  console.log(`  🧮 Creating multiplier with factor: ${factor}`);
  
  return function(number) {
    return number * factor;
  };
}

console.log("👋 Testing greeting functions:");
const sayHello = createGreeter("Hello");
const sayGoodbye = createGreeter("Goodbye");

console.log(`  ${sayHello("Alice")}`);
console.log(`  ${sayGoodbye("Bob")}`);

console.log("🧮 Testing multiplier functions:");
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(`  Double 5: ${double(5)}`);
console.log(`  Triple 4: ${triple(4)}`);

// 4. 📊 CLOSURES WITH MULTIPLE VARIABLES

console.log("\n4. 📊 Complex Closures with Multiple Variables");

function createAccount(accountHolder, initialBalance) {
  let balance = initialBalance;
  let transactionHistory = [];
  
  console.log(`  🏦 Account created for ${accountHolder} with $${initialBalance}`);
  
  function recordTransaction(type, amount) {
    const timestamp = new Date().toLocaleTimeString();
    transactionHistory.push(`${timestamp}: ${type} $${amount}`);
  }
  
  return {
    deposit: function(amount) {
      balance += amount;
      recordTransaction("Deposit", amount);
      console.log(`  💰 Deposited $${amount}. New balance: $${balance}`);
      return balance;
    },
    
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        recordTransaction("Withdrawal", amount);
        console.log(`  💸 Withdrew $${amount}. New balance: $${balance}`);
        return balance;
      } else {
        console.log(`  ❌ Insufficient funds. Current balance: $${balance}`);
        return balance;
      }
    },
    
    getBalance: function() {
      return balance;
    },
    
    getHistory: function() {
      console.log(`  📋 Transaction history for ${accountHolder}:`);
      transactionHistory.forEach(transaction => {
        console.log(`    ${transaction}`);
      });
      return transactionHistory.slice(); // Return copy, not original
    },
    
    getAccountHolder: function() {
      return accountHolder;
    }
  };
}

const aliceAccount = createAccount("Alice", 100);
const bobAccount = createAccount("Bob", 50);

console.log("🏦 Testing bank accounts:");
aliceAccount.deposit(25);
aliceAccount.withdraw(30);
bobAccount.deposit(75);
bobAccount.withdraw(200); // Should fail
aliceAccount.getHistory();

// 5. 🔄 CLOSURES IN LOOPS - THE CLASSIC PROBLEM

console.log("\n5. 🔄 Closures in Loops - Common Pitfalls and Solutions");

console.log("❌ The Problem - Using var in loops:");
function demonstrateProblem() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push(function() {
      return `Function ${i}`; // All functions will reference the same 'i'
    });
  }
  
  return functions;
}

const problemFunctions = demonstrateProblem();
console.log("  Results (all show the same value):");
problemFunctions.forEach((fn, index) => {
  console.log(`    Function ${index}: ${fn()}`); // All print "Function 3"
});

console.log("\n✅ Solution 1 - Using let (block scoping):");
function solutionWithLet() {
  const functions = [];
  
  for (let i = 0; i < 3; i++) {
    functions.push(function() {
      return `Function ${i}`; // Each function gets its own 'i'
    });
  }
  
  return functions;
}

const letFunctions = solutionWithLet();
console.log("  Results (each shows correct value):");
letFunctions.forEach((fn, index) => {
  console.log(`    Function ${index}: ${fn()}`);
});

console.log("\n✅ Solution 2 - Using IIFE (Immediately Invoked Function Expression):");
function solutionWithIIFE() {
  const functions = [];
  
  for (var i = 0; i < 3; i++) {
    functions.push((function(capturedI) {
      return function() {
        return `Function ${capturedI}`;
      };
    })(i)); // Immediately invoke to capture current value of 'i'
  }
  
  return functions;
}

const iifeFunctions = solutionWithIIFE();
console.log("  Results (each shows correct value):");
iifeFunctions.forEach((fn, index) => {
  console.log(`    Function ${index}: ${fn()}`);
});

// 6. 🎨 PRACTICAL EXAMPLE: EVENT HANDLER WITH STATE

console.log("\n6. 🎨 Practical Example - Stateful Event Handler");

function createClickHandler(buttonName) {
  let clickCount = 0;
  let lastClickTime = null;
  
  return function(event) {
    clickCount++;
    const currentTime = new Date();
    
    let timeSinceLastClick = 'first click';
    if (lastClickTime) {
      const diff = (currentTime - lastClickTime) / 1000;
      timeSinceLastClick = `${diff.toFixed(2)} seconds ago`;
    }
    
    console.log(`  🖱️ ${buttonName} clicked ${clickCount} times (last click: ${timeSinceLastClick})`);
    
    if (clickCount >= 3) {
      console.log(`  ⚠️ ${buttonName} has been clicked ${clickCount} times - consider disabling!`);
    }
    
    lastClickTime = currentTime;
    
    return {
      buttonName,
      clickCount,
      lastClickTime: lastClickTime.toISOString()
    };
  };
}

// Simulate click events
const saveButtonHandler = createClickHandler("Save Button");
const deleteButtonHandler = createClickHandler("Delete Button");

console.log("🖱️ Simulating button clicks:");
setTimeout(() => saveButtonHandler(), 100);
setTimeout(() => saveButtonHandler(), 500);
setTimeout(() => deleteButtonHandler(), 800);
setTimeout(() => saveButtonHandler(), 1200);
setTimeout(() => deleteButtonHandler(), 1500);

// 7. 🔧 ADVANCED EXAMPLE: CONFIGURATION FACTORY

console.log("\n7. 🔧 Advanced Example - Configuration Factory");

function createConfigurableFunction(config) {
  const { 
    prefix = '', 
    suffix = '', 
    transform = (x) => x,
    logCalls = false 
  } = config;
  
  let callCount = 0;
  
  console.log(`  ⚙️ Function configured with prefix: "${prefix}", suffix: "${suffix}"`);
  
  return function(input) {
    callCount++;
    
    if (logCalls) {
      console.log(`    📞 Function called ${callCount} times with input: "${input}"`);
    }
    
    const transformed = transform(input);
    const result = prefix + transformed + suffix;
    
    return result;
  };
}

// Create different configured functions
const titleFormatter = createConfigurableFunction({
  prefix: '### ',
  suffix: ' ###',
  transform: (text) => text.toUpperCase(),
  logCalls: true
});

const listItemFormatter = createConfigurableFunction({
  prefix: '• ',
  transform: (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
});

console.log("⚙️ Testing configured functions:");
console.log(`  Title: ${titleFormatter('hello world')}`);
console.log(`  Item: ${listItemFormatter('FIRST ITEM')}`);
console.log(`  Title: ${titleFormatter('another title')}`);
console.log(`  Item: ${listItemFormatter('second item')}`);

// 8. 🧪 CLOSURE DEBUGGING AND INSPECTION

console.log("\n8. 🧪 Understanding Closure Behavior");

function createDebugClosure() {
  const outerVar = "I'm from outer scope";
  let mutableVar = 0;
  
  const innerFunction = function(input) {
    mutableVar++;
    console.log(`  🔍 Inner function called with: ${input}`);
    console.log(`  📦 Access to outerVar: "${outerVar}"`);
    console.log(`  🔢 mutableVar is now: ${mutableVar}`);
    
    return {
      input,
      outerVar,
      mutableVar,
      functionName: innerFunction.name || 'anonymous'
    };
  };
  
  // Add a method to inspect closure state
  innerFunction.inspect = function() {
    return {
      outerVar,
      mutableVar,
      type: 'closure'
    };
  };
  
  return innerFunction;
}

const debugFunction = createDebugClosure();
console.log("🧪 Testing closure inspection:");
console.log("  Result 1:", debugFunction("test1"));
console.log("  Result 2:", debugFunction("test2"));
console.log("  Closure state:", debugFunction.inspect());

// 9. 🎯 MEMORY CONSIDERATIONS

console.log("\n9. 🎯 Memory Considerations with Closures");

function demonstrateMemoryUsage() {
  console.log("  🧠 Creating closures with different memory footprints:");
  
  // Light closure - only references primitive values
  function createLightClosure(name) {
    return function() {
      return `Hello, ${name}!`;
    };
  }
  
  // Heavy closure - references large objects
  function createHeavyClosure(name) {
    const largeArray = new Array(100000).fill(`Data for ${name}`);
    const metadata = {
      name,
      created: new Date(),
      id: Math.random()
    };
    
    return function() {
      // Even though we don't use largeArray, it's still referenced by the closure
      return `Hello, ${metadata.name}! (ID: ${metadata.id})`;
    };
  }
  
  // Optimized closure - only keeps what's needed
  function createOptimizedClosure(name) {
    const largeArray = new Array(100000).fill(`Data for ${name}`);
    const metadata = {
      name,
      created: new Date(),
      id: Math.random()
    };
    
    // Extract only what we need
    const optimizedData = {
      name: metadata.name,
      id: metadata.id
    };
    
    // largeArray can now be garbage collected
    return function() {
      return `Hello, ${optimizedData.name}! (ID: ${optimizedData.id})`;
    };
  }
  
  const lightFn = createLightClosure("Light");
  const heavyFn = createHeavyClosure("Heavy");
  const optimizedFn = createOptimizedClosure("Optimized");
  
  console.log(`    Light closure: ${lightFn()}`);
  console.log(`    Heavy closure: ${heavyFn()}`);
  console.log(`    Optimized closure: ${optimizedFn()}`);
  
  return { lightFn, heavyFn, optimizedFn };
}

demonstrateMemoryUsage();

console.log("\n🎓 Closure examples complete!");
console.log("💡 Key takeaways:");
console.log("   - Closures let functions access outer scope variables");
console.log("   - Each closure maintains its own copy of referenced variables");
console.log("   - Closures are perfect for creating private variables and stateful functions");
console.log("   - Be careful with closures in loops (use let or IIFE)");
console.log("   - Consider memory implications when creating many closures");
console.log("   - Closures enable powerful patterns like factories and modules");

// 📚 CLOSURE INTERVIEW QUESTIONS PRACTICE:

/*
COMMON CLOSURE INTERVIEW QUESTIONS:

1. Q: What will this code output?
   for (var i = 0; i < 3; i++) {
     setTimeout(() => console.log(i), 100);
   }
   A: It will print "3" three times because 'var' has function scope
   
2. Q: How would you fix the above code?
   A: Use 'let' instead of 'var', or use an IIFE to capture the value

3. Q: What's the output of this code?
   function outer() {
     var a = 1;
     function inner() {
       console.log(a);
     }
     a = 2;
     return inner;
   }
   outer()();
   A: It prints "2" because closures capture variables by reference, not by value

4. Q: How can you create private variables in JavaScript?
   A: Use closures to create functions that have access to variables 
      that can't be accessed from outside

5. Q: What's a memory leak risk with closures?
   A: Closures keep references to outer scope variables, preventing 
      garbage collection if not handled properly

PRACTICAL EXERCISES:

1. Create a function that returns another function that remembers 
   how many times it's been called

2. Implement a simple module pattern using closures

3. Create a function factory that generates validators for different 
   data types

4. Build a debounce function using closures

5. Create a cache/memoization function using closures
*/