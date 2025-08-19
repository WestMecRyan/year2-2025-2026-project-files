I see several issues! The main problems are:

1. **Typo**: `foEach` should be `forEach`
2. **Logic error**: You're checking `event.hasAttribute()` instead of `screen.hasAttribute()`
3. **Hard-coded references**: Your event listener always references `screen1` instead of the button's associated screen
4. **getElementsByClassName returns HTMLCollection**: Need to convert to array for `forEach`

Here's how to fix it:The main issues in your code are:

## ❌ Problems:

1. **Typo**: `foEach` should be `forEach`
2. **Wrong target**: `event.hasAttribute()` should be `screen.hasAttribute()`
3. **HTMLCollection**: `getElementsByClassName` returns HTMLCollection, not Array
4. **Hard-coded reference**: Always uses `screen1` instead of the clicked button's screen

## ✅ Solutions:

### Method 1: Fix the forEach and find the right screen

```javascript
// Convert HTMLCollection to Array and find corresponding screen
Array.from(powerButtons).forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // Extract TV ID from button ID
    const tvId = btn.id.replace("tv-", "").replace("-power", "");
    const screen = document.getElementById(`tv-${tvId}-screen`);
    const channelSelect = document.getElementById(`tv-${tvId}-channels`);

    // Now use the correct screen, not screen1!
    if (screen.hasAttribute("data-power")) {
      screen.removeAttribute("data-power");
      // ... rest of logic
    }
  });
});
```

### Method 2: Use querySelectorAll (cleaner)

```javascript
document.querySelectorAll(".tv-power").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tvId = btn.id.replace(/^tv-/, "").replace(/-power$/, "");
    const screen = document.getElementById(`tv-${tvId}-screen`);
    const channelSelect = document.getElementById(`tv-${tvId}-channels`);

    // Your toggle logic here...
  });
});
```

### Method 3: Event Delegation (best for dynamic TVs)

```javascript
document.querySelector(".main-content").addEventListener("click", (event) => {
  if (event.target.closest(".tv-power")) {
    const btn = event.target.closest(".tv-power");
    const tvId = btn.id.replace(/^tv-/, "").replace(/-power$/, "");
    const screen = document.getElementById(`tv-${tvId}-screen`);
    // ... your logic
  }
});
```

### Method 4: Attach events when creating TV (cleanest)

```javascript
function createTVuiWithEvents(parentDiv, tvInstance) {
  createTVui(parentDiv, tvInstance); // Create the UI

  // Immediately attach events to this specific TV
  const powerBtn = document.getElementById(`tv-${tvInstance.id}-power`);
  const screen = document.getElementById(`tv-${tvInstance.id}-screen`);

  powerBtn.addEventListener("click", () => {
    // Work with this specific TV's elements
    if (screen.hasAttribute("data-power")) {
      // ... toggle logic
    }
  });
}
```

**The key insight**: Extract the TV ID from the button ID, then use that to find the corresponding screen and select elements!
