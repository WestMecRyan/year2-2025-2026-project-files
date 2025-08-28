function createSimplePromise() {
  const simplePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        resolve("operation successful!");
      } else {
        reject("operation failed");
      }
    }, 2000);
  });
  simplePromise
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
// simplePromise
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {});
// console.log("end of file");
module.exports = createSimplePromise;
