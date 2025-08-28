// step 1. create and cache a promise object
const simplePromise = new Promise();

// step 2. pass a callback function with two arg objects
//// resolve, reject

const simplePromise = new Promise((resolve, reject) => {});

// step 3. create a success condition in the function block

const simplePromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.3;
});

// step 3. create a success condition in the function block

const simplePromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.3;
  if (success) {
    resolve("operation successful!");
  } else {
    reject("operation failed");
  }
});

// step 4. test what happens when the promise is successful in node

// step 5. test what happens when the promise is rejected in node

// step 7. Promise with a finally

// step 8. promise with a settimeout

const simplePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.3;
    if (success) {
      resolve("operation successful!");
    } else {
      reject("operation failed");
    }
  }, 1000);
});

// step 9. Show how promises are settled on initialization vs using a function to call it