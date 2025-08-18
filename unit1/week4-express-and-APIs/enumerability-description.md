A property's enumerability is determined by its **property descriptor**, specifically the `enumerable` attribute. Here's how it works:

## Property Descriptors Control Enumerability

Every property has a descriptor with four attributes:
```javascript
{
  value: someValue,
  writable: true/false,
  enumerable: true/false,  // ← This controls enumerability
  configurable: true/false
}
```

## How Properties Get Their Enumerable Status

**1. Regular assignment - enumerable by default:**
```javascript
const obj = {};
obj.name = 'John';  // enumerable: true

// Or object literal
const obj2 = { name: 'John' };  // enumerable: true
```

**2. Object.defineProperty - enumerable: false by default:**
```javascript
const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'John'
  // enumerable defaults to false if not specified!
});

Object.keys(obj);  // [] - empty because name is not enumerable
```

**3. Explicitly setting enumerable:**
```javascript
Object.defineProperty(obj, 'age', {
  value: 25,
  enumerable: true   // Explicitly make it enumerable
});

Object.keys(obj);  // ['age']
```

## Built-in Properties Are Usually Non-enumerable

This is why array methods and properties like `length` don't show up:

```javascript
const arr = [1, 2, 3];

// Check built-in properties
Object.getOwnPropertyDescriptor(arr, 'length');
// { value: 3, writable: true, enumerable: false, configurable: false }

Object.getOwnPropertyDescriptor(arr, 'push');
// undefined - it's inherited, not own property

// Check inherited Array.prototype.push
Object.getOwnPropertyDescriptor(Array.prototype, 'push');
// { value: function, writable: true, enumerable: false, configurable: true }
```

## Checking and Modifying Enumerability

```javascript
const obj = { a: 1, b: 2 };

// Check if enumerable
Object.propertyIsEnumerable.call(obj, 'a');  // true

// Make a property non-enumerable
Object.defineProperty(obj, 'a', { enumerable: false });
Object.keys(obj);  // ['b'] - 'a' is now hidden

// See all properties (including non-enumerable)
Object.getOwnPropertyNames(obj);  // ['a', 'b']
```

## What Uses Enumerability

Operations that respect the `enumerable` flag:
- `Object.keys()`
- `Object.values()`
- `Object.entries()`
- `for...in` loops
- `JSON.stringify()`
- Object spread `{...obj}`

Operations that **ignore** enumerability:
- `Object.getOwnPropertyNames()`
- `Object.hasOwnProperty()`
- Direct property access `obj.prop`

## Practical Example

```javascript
const user = {
  name: 'Alice',
  email: 'alice@example.com'
};

// Add a non-enumerable internal ID
Object.defineProperty(user, '_id', {
  value: '12345',
  enumerable: false,
  writable: false
});

console.log(user._id);           // '12345' - direct access works
console.log(Object.keys(user));  // ['name', 'email'] - _id hidden
console.log(JSON.stringify(user)); // {"name":"Alice","email":"alice@example.com"}
```

So enumerability is essentially a "visibility" flag that determines whether a property participates in enumeration operations, allowing you to hide implementation details while keeping them accessible.