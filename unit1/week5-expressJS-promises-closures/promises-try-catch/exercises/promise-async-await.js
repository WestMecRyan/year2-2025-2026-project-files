async function createSimplePromise() {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
          resolve("operation successful!");
        } else {
          reject("operation failed");
        }
      }, 2000);
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = createSimplePromise;
