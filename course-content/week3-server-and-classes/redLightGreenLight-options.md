
```javascript
function redLightGreenLight() {
  let currentLight = 'red'; // Start with red

  function alternatingLight() {
    // Use ternary to alternate between lights
    currentLight = currentLight === 'red' ? 'green' : 'red';
    console.log(`${currentLight} light!`);

    const nextDelay = Math.floor(Math.random() * 5000 + 1000);
    setTimeout(alternatingLight, nextDelay);
  }

  alternatingLight();
}
```

**Or if you want to keep the array approach but ensure no repeats:**

```javascript
function redLightGreenLight() {
  const options = ['red light!', 'green light!'];
  let lastIndex = -1; // Track last choice

  function randomLight() {
    // Use ternary to pick the other option
    const newIndex = lastIndex === 0 ? 1 : 0;
    console.log(options[newIndex]);
    lastIndex = newIndex;

    setTimeout(randomLight, Math.floor(Math.random() * 5000 + 1000));
  }

  randomLight();
}
```

The ternary operator (`condition ? valueIfTrue : valueIfFalse`) is perfect for this kind of toggle behavior!