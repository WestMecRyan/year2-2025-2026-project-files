## Simple Reduce Examples to Practice

Let me give you some basic reduce functions to understand the concept:

### **Basic Reduce Concept:**

```javascript
// reduce(callback, initialValue)
// callback gets: (accumulator, currentItem, index, array)
```

### **Example 1: Sum Numbers**

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((total, number) => {
  return total + number;
}, 0); // Start with 0

console.log(sum); // 15
```

### **Example 2: Count Items**

```javascript
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const fruitCount = fruits.reduce((count, fruit) => {
  count[fruit] = (count[fruit] || 0) + 1;
  return count;
}, {}); // Start with empty object

console.log(fruitCount);
// { apple: 3, banana: 2, orange: 1 }
```

### **Example 3: Find Oldest Person**

```javascript
const people = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Bob", age: 22 },
];

const oldest = people.reduce((oldestPerson, person) => {
  return person.age > oldestPerson.age ? person : oldestPerson;
});

console.log(oldest); // { name: 'Jane', age: 30 }
```

### **Example 4: Group by Property**

```javascript
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" },
  { name: "David", grade: "B" },
];

const groupedByGrade = students.reduce((groups, student) => {
  const grade = student.grade;
  if (!groups[grade]) {
    groups[grade] = [];
  }
  groups[grade].push(student.name);
  return groups;
}, {});

console.log(groupedByGrade);
// { A: ['Alice', 'Charlie'], B: ['Bob', 'David'] }
```

### **Example 5: Build a String**

```javascript
const words = ["Hello", "world", "this", "is", "reduce"];

const sentence = words.reduce((sentence, word, index) => {
  return sentence + word + (index < words.length - 1 ? " " : "");
}, "");

console.log(sentence); // "Hello world this is reduce"
```

**The pattern:**

1. **Accumulator** - what you're building up
2. **Current item** - what you're processing now
3. **Return** - the updated accumulator

Try running these in your browser console to see how reduce works! Which one makes the most sense to you?
