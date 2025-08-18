## Pointers Primer in Javascript

```js
let num1 = 5;
let num2 = num1;
```

```js
// in the repl
num1; // 5
num2; // 5
num1 = 10;
num1; //10
num2; //5
```

# JavaScript References and Memory Primer

## Understanding Your Example

### What's Happening in Memory

```js
let num1 = 5; // Creates a new memory location with value 5
let num2 = num1; // COPIES the value 5 to a new memory location
```

**Memory visualization:**

```
Memory Address:  [1001]  [1002]
Variable:        num1    num2
Value:           5       5
```

When you do `num1 = 10`:

```
Memory Address:  [1001]  [1002]
Variable:        num1    num2
Value:           10      5     ← num2 unchanged!
```

### Why num2 Stays 5

**Primitive values are COPIED, not referenced:**

- Numbers, strings, booleans, null, undefined, symbols, bigint
- Each variable gets its own copy of the value
- Changing one doesn't affect the other

## The Difference: Primitives vs Objects

### Primitives (Copy by Value)

```js
// Numbers
let a = 5;
let b = a; // b gets a COPY of 5
a = 10;
console.log(a); // 10
console.log(b); // 5 ← Still original value

// Strings
let str1 = "hello";
let str2 = str1; // str2 gets a COPY of "hello"
str1 = "world";
console.log(str1); // "world"
console.log(str2); // "hello" ← Still original

// Booleans
let flag1 = true;
let flag2 = flag1; // flag2 gets a COPY of true
flag1 = false;
console.log(flag1); // false
console.log(flag2); // true ← Still original
```

### Objects (Copy by Reference)

```js
// Objects - this is where "pointer-like" behavior happens
let person1 = { name: "Alice", age: 25 };
let person2 = person1; // person2 gets a REFERENCE to the same object

person1.age = 30;
console.log(person1.age); // 30
console.log(person2.age); // 30 ← Same object!

// Arrays (which are objects)
let arr1 = [1, 2, 3];
let arr2 = arr1; // arr2 references the same array

arr1.push(4);
console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3, 4] ← Same array!

// Functions (which are objects)
let func1 = function () {
  return "hello";
};
let func2 = func1; // func2 references the same function

func1.customProp = "test";
console.log(func2.customProp); // "test" ← Same function object!
```

## Memory Visualization: Objects vs Primitives

### Primitives: Separate Memory Locations

```
let num1 = 5;
let num2 = num1;

Memory:
┌─────────┬───────┐
│ Address │ Value │
├─────────┼───────┤
│  1001   │   5   │ ← num1 points here
│  1002   │   5   │ ← num2 points here (separate copy)
└─────────┴───────┘
```

### Objects: Shared Memory Location

```
let obj1 = { x: 5 };
let obj2 = obj1;

Memory:
Variables:           Object in Memory:
┌──────┬─────────┐  ┌─────────┬─────────┐
│ Name │ Address │  │ Address │  Value  │
├──────┼─────────┤  ├─────────┼─────────┤
│ obj1 │  2001   │──→│  2001   │ { x: 5 }│
│ obj2 │  2001   │──→│         │         │
└──────┴─────────┘  └─────────┴─────────┘
     Both point to the same object!
```

## Common Gotchas and Examples

### Gotcha 1: Object Property Changes

```js
let config1 = { debug: true, port: 3000 };
let config2 = config1;

// Later in code...
config1.debug = false;

console.log(config2.debug); // false ← Surprise! Changed too
```

### Gotcha 2: Array Modifications

```js
function addToList(list) {
  list.push("new item"); // Modifies the original array!
  return list;
}

let myList = ["item1", "item2"];
let newList = addToList(myList);

console.log(myList); // ["item1", "item2", "new item"] ← Original changed!
console.log(newList); // ["item1", "item2", "new item"] ← Same array
```

### Gotcha 3: Reassignment vs Modification

```js
let obj1 = { count: 5 };
let obj2 = obj1;

// Modification - affects both
obj1.count = 10;
console.log(obj2.count); // 10

// Reassignment - only affects obj1
obj1 = { count: 20 };
console.log(obj1.count); // 20
console.log(obj2.count); // 10 ← obj2 still points to original object
```

## How to Create True Copies

### Shallow Copy Methods

```js
// Objects
let original = { name: "Alice", age: 25 };

// Method 1: Object.assign()
let copy1 = Object.assign({}, original);

// Method 2: Spread operator
let copy2 = { ...original };

// Method 3: JSON (limited - no functions, dates get stringified)
let copy3 = JSON.parse(JSON.stringify(original));

// Test independence
original.age = 30;
console.log(copy1.age); // 25 ← Independent!
console.log(copy2.age); // 25 ← Independent!
```

```js
// Arrays
let originalArr = [1, 2, 3];

// Method 1: Spread operator
let copyArr1 = [...originalArr];

// Method 2: Array.from()
let copyArr2 = Array.from(originalArr);

// Method 3: slice()
let copyArr3 = originalArr.slice();

// Test independence
originalArr.push(4);
console.log(copyArr1); // [1, 2, 3] ← Independent!
```

### Deep Copy for Nested Objects

```js
let complexObj = {
  name: "Alice",
  hobbies: ["reading", "coding"],
  address: { city: "NYC", zip: "10001" },
};

// Shallow copy - nested objects still shared!
let shallowCopy = { ...complexObj };
shallowCopy.hobbies.push("swimming");
console.log(complexObj.hobbies); // ["reading", "coding", "swimming"] ← Modified!

// Deep copy - completely independent
let deepCopy = JSON.parse(JSON.stringify(complexObj));
deepCopy.hobbies.push("dancing");
console.log(complexObj.hobbies); // ["reading", "coding", "swimming"] ← Unchanged!

// For more complex deep copying, use libraries like Lodash
// const _ = require('lodash');
// let deepCopy = _.cloneDeep(complexObj);
```

## Practical Applications

### Function Parameters

```js
// Primitives - safe to modify
function doubleNumber(num) {
  num = num * 2; // This doesn't affect the original
  return num;
}

let myNum = 5;
let doubled = doubleNumber(myNum);
console.log(myNum); // 5 ← Original unchanged
console.log(doubled); // 10

// Objects - modifications affect original!
function addProperty(obj) {
  obj.newProp = "added"; // This DOES affect the original!
  return obj;
}

let myObj = { existing: "value" };
let modified = addProperty(myObj);
console.log(myObj); // { existing: "value", newProp: "added" } ← Changed!
console.log(modified); // { existing: "value", newProp: "added" } ← Same object
```

### Safe Object Modification

```js
// Unsafe - modifies original
function updateUser(user, newAge) {
  user.age = newAge; // Modifies original object
  return user;
}

// Safe - creates new object
function updateUserSafe(user, newAge) {
  return {
    ...user, // Copy all existing properties
    age: newAge, // Override age property
  };
}

let user = { name: "Bob", age: 25 };
let updatedUser = updateUserSafe(user, 30);

console.log(user); // { name: "Bob", age: 25 } ← Original unchanged
console.log(updatedUser); // { name: "Bob", age: 30 } ← New object
```

## Testing Reference vs Value in REPL

### Quick Tests You Can Run

```js
// Test 1: Primitives
let a = 5;
let b = a;
a = 10;
console.log("a:", a, "b:", b); // a: 10 b: 5

// Test 2: Objects
let obj1 = { x: 5 };
let obj2 = obj1;
obj1.x = 10;
console.log("obj1:", obj1, "obj2:", obj2); // Both show { x: 10 }

// Test 3: Check if two variables reference the same object
let arr1 = [1, 2, 3];
let arr2 = arr1;
let arr3 = [...arr1]; // Copy
console.log(arr1 === arr2); // true (same reference)
console.log(arr1 === arr3); // false (different objects, same content)

// Test 4: Reassignment vs modification
let list1 = [1, 2];
let list2 = list1;
list1 = [3, 4]; // Reassignment
console.log(list2); // [1, 2] ← Still points to original

let list3 = [1, 2];
let list4 = list3;
list3.push(3); // Modification
console.log(list4); // [1, 2, 3] ← Modified too!
```

## Key Rules to Remember

1. **Primitives are copied by value**

   - Numbers, strings, booleans, null, undefined, symbols, bigint
   - Each variable gets its own independent copy

2. **Objects are copied by reference**

   - Objects, arrays, functions, dates, etc.
   - Variables share the same object in memory

3. **Reassignment creates new reference**

   - `obj1 = newObj` makes obj1 point to a different object
   - Doesn't affect other variables that pointed to the old object

4. **Modification affects all references**

   - `obj1.prop = newValue` changes the shared object
   - All variables pointing to that object see the change

5. **Use spread operator or Object.assign() for shallow copies**

   - Creates new object with copied properties
   - Nested objects still share references

6. **Use JSON methods or libraries for deep copies**
   - Completely independent objects
   - All nested objects are also copied

Understanding these concepts is crucial for avoiding bugs and writing predictable JavaScript code!
