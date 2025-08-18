const start = Date.now();
setTimeout(() => { console.log(`hello fired at ${Date.now() - start}`); }, 500);
let counter = true;
let time = 0;
let intervalId =
    setInterval(() => { time += 20; console.log(time); if (time > 600) { clearInterval(intervalId); return; } }, 20);
console.log('all done');
