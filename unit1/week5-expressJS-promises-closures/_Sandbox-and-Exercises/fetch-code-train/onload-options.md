Option 1: DOMContentLoaded event (recommended)

```javascript
document.addEventListener("DOMContentLoaded", fetchImageAwait);
```

Option 2: window.onload

```javascript
javascriptwindow.onload = fetchImageAwait;
```

Option 3: load event listener

```javascript
javascriptwindow.addEventListener("load", fetchImageAwait);
```
Key differences:

DOMContentLoaded fires when the HTML is fully loaded and parsed (faster, doesn't wait for images/stylesheets)
window.onload fires when everything is completely loaded (images, stylesheets, etc.)