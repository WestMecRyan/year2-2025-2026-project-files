Here are some simple examples to teach string manipulation in JavaScript:

## Reversing a String

**Method 1: Using built-in methods (easiest)**
```javascript
function reverseString(str) {
    return str.split('').reverse().join('');
}

console.log(reverseString("hello")); // "olleh"
console.log(reverseString("JavaScript")); // "tpircSavaJ"
```

**Method 2: Using a for loop (more educational)**
```javascript
function reverseString(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

console.log(reverseString("world")); // "dlrow"
```

## Testing for Palindromes

**Method 1: Using the reverse function**
```javascript
function isPalindrome(str) {
    // Convert to lowercase for case-insensitive comparison
    str = str.toLowerCase();
    return str === reverseString(str);
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("Mom"));     // true
```

**Method 2: Two-pointer approach (more efficient)**
```javascript
function isPalindrome(str) {
    str = str.toLowerCase();
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(isPalindrome("level"));   // true
console.log(isPalindrome("python"));  // false
```

## Practice Examples for Students

```javascript
// Test these strings:
const testStrings = ["madam", "hello", "A man a plan a canal Panama", "race a car", ""];

// Simple palindrome checker (ignoring spaces and punctuation)
function isPalindromeAdvanced(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}

testStrings.forEach(str => {
    console.log(`"${str}" is palindrome: ${isPalindromeAdvanced(str)}`);
});
```

These examples progress from basic concepts to more advanced string manipulation, giving your students a solid foundation in working with strings in JavaScript.