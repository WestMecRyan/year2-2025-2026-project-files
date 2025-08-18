// wrong
// function redLightGreenLight() {
//   let time1;
//   let time2;
//   setInterval(() => {
//     time1 = Math.floor(Math.random() * 5 + 1);
//     console.log('red light!');
//   }, time1);
//   setInterval(() => {
//     time2 = Math.floor(Math.random() * 5 + 1);
//     console.log('green light!');
//   }, time2);
// }
// redLightGreenLight();
// right
function redLightGreenLight() {
  let light = 'red';
  function redLight() {
    if (light === 'green') {
      console.log('red light!');
      light = 'red';
    }

    let nextRedDelay = Math.floor(Math.random() * 5 + 1) * 1000; // 1-6 seconds
    setTimeout(redLight, nextRedDelay); // Schedule next red light with new random delay
  }

  function greenLight() {
    if (light === 'red') {
      console.log('green light!');
      light = 'green';
    }
    let nextGreenDelay = Math.floor(Math.random() * 5 + 1) * 1000; // 1-6 seconds
    setTimeout(greenLight, nextGreenDelay); // Schedule next green light with new random delay
  }

  // Start both sequences
  redLight();
  greenLight();
}
redLightGreenLight();