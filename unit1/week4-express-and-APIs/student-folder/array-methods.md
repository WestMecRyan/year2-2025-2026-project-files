## how to view the array methods

`Object.getOwnPropertyNames(Array.prototype)`

## list of array properties and methods

```js
[
  "length",
  "constructor",
  "at",
  "concat",
  "copyWithin",
  "fill",
  "find",
  "findIndex",
  "findLast",
  "findLastIndex",
  "lastIndexOf",
  "pop",
  "push",
  "reverse",
  "shift",
  "unshift",
  "slice",
  "sort",
  "splice",
  "includes",
  "indexOf",
  "join",
  "keys",
  "entries",
  "values",
  "forEach",
  "filter",
  "flat",
  "flatMap",
  "map",
  "every",
  "some",
  "reduce",
  "reduceRight",
  "toReversed",
  "toSorted",
  "toSpliced",
  "with",
  "toLocaleString",
  "toString",
];
```

## Array.prototype.length (property)

returns the length of the arr
`myArr  // [1, 2, 3]`
`myArr.length // 3`

## Array.prototype.concat (method)

returns a new array of other arrays.
Non-destructive on original arrays.

```js
const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = array1.concat(array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]
```

## Array.prototype.find (method) & Array.prototype.findLast

returns the first item of an array that satisfies a testing function

```js
const array = [5, 12, 8, 130, 44];

const found = array.find((element) => element > 10);

console.log(found);
// Expected output: 12
> const itemLast = array.findLast((el)=>el>10);
> itemLast
// expected output 44
```

## Array.prototype.findIndex (method)

returns the index of the first item that satisfies the test function

```js
> [1,2,3].findIndex(item=>item>1)
1
```

returns -1 if not found

## Array.prototype.findLastIndex

finds the last index of an array where item matches test

```js
[1, 2, 3].findLastIndex((item) => item > 1);
2;
```

## Array.prototype.indexOf & Array.prototype.lastIndexOf

finds the first index of an exact match of an item value passed as parameter

```js
> [1,2,3,2].indexOf(2)
1
> [1,2,3,2].lastIndexOf(2)
3
```

returns -1 if value doesn't exist in array

## Array.prototype.includes

returns a boolean if the array includes a value

> ['John', 'Marge'].includes('John')
> true
> ['John', 'Marge'].includes('J')
> false

## Array.prototype.some

Returns a boolean if an array contains a value that matches a test

```js
> ['John', 'Marge'].includes('John')
true
> [1,3,5].some(el=>el%2===0)
false
> [1,2, 3,5].some(el=>el%2===0)
true
> let lowerJ = el=>el.toLowerCase().startsWith('j')
> let lowerJ = el=>e
> ['Joe', 'Marge'].some(lowerJ)
true
```

## Array.prototype.reverse

reverses the original array in place

```js
> const array = [5, 12, 8, 130, 44];
> array.reverse()
[ 44, 130, 8, 12, 5 ]
```

map, every, some, toReversed

## Array.prototype.toReversed
```js
 const array = [5, 12, 8, 130, 44];
 const reversedArray = array.toReversed();
 reversedArray // [44, 130, 8, 12, 5]
 ```

 ## Array.prototype.some && Array.prototype.every
returns a boolean depending on if one to all items meet a criteria (some) or all of the items meet a criteria (every)
```js
> let tens = numbers.every(number=>number.toString().endsWith('0'))
undefined
> tens
false
> numbers.some(number=>number.toString().endsWith('0'))
true
```
# JavaScript Array Methods - Complete Guide

## 1. Finding Elements

### `findIndex()` - Find First Index
Returns the **index** of the first element that meets the condition, or `-1` if none found.

```javascript
[1, 2, 3].findIndex(item => item > 1);  // 1 (index of element 2)
[1, 2, 3].findIndex(item => item < 1);  // -1 (none found)
```

### `findLastIndex()` - Find Last Index
Returns the **index** of the last element that meets the condition.

```javascript
[1, 2, 3, 2].findLastIndex(item => item > 1);  // 3 (last index where item > 1)
```

### `find()` and `findLast()` - Get Actual Elements
Returns the **element itself**, not the index.

```javascript
const array = [5, 12, 8, 130, 44];
const firstFound = array.find(el => el > 10);     // 12 (first element > 10)
const lastFound = array.findLast(el => el > 10);  // 44 (last element > 10)
```

### `indexOf()` and `lastIndexOf()` - Simple Value Search
For exact matches only (no callback function).

```javascript
[1, 2, 3, 2].indexOf(2);      // 1 (first occurrence)
[1, 2, 3, 2].lastIndexOf(2);  // 3 (last occurrence)
[1, 2, 3, 2].lastIndexOf(5);  // -1 (not found)
```

## 2. Checking Conditions

### `includes()` - Check if Value Exists
```javascript
['John', 'Marge'].includes('John');  // true
['John', 'Marge'].includes('J');     // false (exact match only)
```

### `some()` - Check if ANY Element Meets Condition
Returns `true` if **at least one** element passes the test.

```javascript
[1, 3, 5].some(el => el % 2 === 0);     // false (no even numbers)
[1, 2, 3, 5].some(el => el % 2 === 0);  // true (2 is even)

// Case-sensitive issue and solution:
['Joe', 'Marge'].some(el => el.startsWith('j'));                    // false
['Joe', 'Marge'].some(el => el.toLowerCase().startsWith('j'));      // true

// Using a reusable function:
const startsWithJ = el => el.toLowerCase().startsWith('j');
['Joe', 'Marge'].some(startsWithJ);  // true
```

### `every()` - Check if ALL Elements Meet Condition
Returns `true` only if **every** element passes the test.

```javascript
let numbers = [10, 15, 20, 25];
numbers.every(number => number.toString().endsWith('0'));  // false (15, 25 don't end with 0)
numbers.some(number => number.toString().endsWith('0'));   // true (10, 20 end with 0)
```

## 3. Transforming Arrays

### `filter()` - Create New Array with Some Elements
Creates a **shallow copy** with only elements that pass the test.

```javascript
let words = ['the', 'four', 'crowd', 'legend'];
let shortWords = words.filter(word => word.length < 5);  // ['the', 'four']

// Modifying the filtered array doesn't affect original (with primitives)
shortWords[0] = 'end';
console.log(shortWords);  // ['end', 'four']
console.log(words);       // ['the', 'four', 'crowd', 'legend'] - unchanged
```

### Shallow Copy with Objects - Important Behavior
```javascript
let arrOfObjects = [{name: 'Joe'}, {name: 'Pam'}];
let shallowCopy = arrOfObjects.filter(item => typeof item === 'object');

// Modifying object properties affects BOTH arrays
shallowCopy[0].name = 'Sean';
console.log(shallowCopy);   // [{name: 'Sean'}, {name: 'Pam'}]
console.log(arrOfObjects);  // [{name: 'Sean'}, {name: 'Pam'}] - also changed!
```

### `map()` - Transform Every Element
Creates new array by transforming each element.

```javascript
let emails = ['test@test.com', 'some@email.com'];

// ❌ Wrong syntax (missing parentheses for object literal):
// emails.map(email => {email, username: email.split('@')[0]})

// ✅ Correct syntax:
const emailData = emails.map(email => ({
  email,
  username: email.split('@')[0],
  domain: email.split('@')[1]
}));

// Result:
// [
//   { email: 'test@test.com', username: 'test', domain: 'test.com' },
//   { email: 'some@email.com', username: 'some', domain: 'email.com' }
// ]
```

### Map vs forEach - Important Difference
```javascript
const users = [{name: 'Alice'}, {name: 'Bob'}];

// map() returns array of return values
users.map(user => console.log(`user name is ${user.name}`));
// Logs the messages AND returns [undefined, undefined]

// forEach() just executes, returns undefined
users.forEach(user => console.log(`user name is ${user.name}`));
// Just logs the messages, returns undefined
```

## 4. Array Reversal

### `reverse()` - Mutates Original Array
```javascript
const array = [5, 12, 8, 130, 44];
array.reverse();  // [44, 130, 8, 12, 5] - original array is changed
```

### `toReversed()` - Creates New Array (Modern)
```javascript
// ❌ Doesn't work on strings:
// 'hello'.toReversed()  // TypeError

// ✅ Works on arrays:
let someString = 'hello';
let reversed = someString.split('').toReversed().join('');  // 'olleh'
```

## 5. String Methods

### `includes()` for Strings
```javascript
'Tony'.includes('o');    // true
'Tony'.includes('xyz');  // false
'Tony'.includes();       // false (undefined parameter)

// ❌ Common mistakes:
// 'Tony'.contains()  // TypeError: contains doesn't exist
// 'Tony'.includes(['o', 'a'])  // false (looking for array, not individual chars)
```

### Checking Multiple Characters - Correct Approaches
```javascript
// ❌ Wrong - this doesn't work:
// 'Tony'.includes('aeiou'.split('').forEach(item => return item))
// Problems: 1) return outside function, 2) forEach returns undefined

// ✅ Correct ways to check for vowels:

// Method 1: Check if any vowel exists
const hasVowel1 = ['a', 'e', 'i', 'o', 'u'].some(vowel =>
  'Tony'.toLowerCase().includes(vowel)
);

// Method 2: Check if any character is a vowel
const hasVowel2 = 'Tony'.toLowerCase().split('').some(char =>
  'aeiou'.includes(char)
);

// Method 3: Using regex (cleanest)
const hasVowel3 = /[aeiou]/i.test('Tony');

// All return true for 'Tony'
```

## 6. Common Mistakes and Fixes

### Syntax Errors
```javascript
// ❌ Wrong:
{email, username: email.split('@')[0]}  // Missing parentheses

// ✅ Correct:
({email, username: email.split('@')[0]})  // Wrapped in parentheses

// ❌ Wrong:
forEach(item => return item)  // return outside function

// ✅ Correct:
forEach(item => item)  // or just use map() if you need returns
```

### Logic Errors
```javascript
// ❌ Wrong:
for (let j = 0; j < vowelArr; j++)  // Comparing to array, not length

// ✅ Correct:
for (let j = 0; j < vowelArr.length; j++)  // Compare to length
```

### Method Confusion
```javascript
// Use some() when you want to check if ANY element meets condition
array.some(item => condition)

// Use every() when you want to check if ALL elements meet condition
array.every(item => condition)

// Use includes() for exact value matching
array.includes(exactValue)

// Use find() when you want the element itself
array.find(item => condition)

// Use findIndex() when you want the position
array.findIndex(item => condition)
```

## 7. Vowel Counting - Complete Example

```javascript
let statement = 'How many vowels are in this statement';
let vowelCount = 0;
let vowelArr = ['a', 'e', 'i', 'o', 'u'];

// Method 1: Nested loops (your corrected approach)
for (let i = 0; i < statement.length; i++) {
    for (let j = 0; j < vowelArr.length; j++) {  // Fixed: added .length
        if (statement[i].toLowerCase() === vowelArr[j]) {
            vowelCount++;
        }
    }
}

// Method 2: More efficient with includes()
let vowelCount2 = 0;
for (let char of statement.toLowerCase()) {
    if (vowelArr.includes(char)) {
        vowelCount2++;
    }
}

// Method 3: One-liner with filter()
const vowelCount3 = statement
    .toLowerCase()
    .split('')
    .filter(char => vowelArr.includes(char))
    .length;

// All methods give the same result: 9 vowels
```

## Key Takeaways

1. **Array vs String methods**: Arrays have more methods than strings
2. **Shallow copy**: `filter()`, `map()`, spread operator create shallow copies
3. **some() vs every()**: `some()` = at least one, `every()` = all
4. **Mutating vs non-mutating**: `reverse()` changes original, `toReversed()` creates new
5. **Return values**: `map()` returns array, `forEach()` returns undefined
6. **Object literals in arrows**: Need parentheses `() => ({key: value})`
7. **Regex test()**: Best for pattern matching like vowel detection