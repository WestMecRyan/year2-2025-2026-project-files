## LinkedList Structure

```js
class LinkedList {
    constructor (value) {}
   push(value) {}
   unshift(value) {}
   insert(index, value) {}
   remove(index) {}
   pop() {...}
   shift() {...}
}
```

```javascript
// A simple linked list with 3 nodes
const linkedList = {
  head: {
    value: 11,
    next: {
      value: 23,
      next: {
        value: 7,
        next: null, // This indicates the end (tail)
      },
    },
  },
};

// Accessing values by traversing
console.log(linkedList.head.value); // 11
console.log(linkedList.head.next.value); // 23
console.log(linkedList.head.next.next.value); // 7
console.log(linkedList.head.next.next.next); // null (end of list)
```

**Visual representation:**

```
linkedList
    ↓
   head
    ↓
┌────────┬──────┐    ┌────────┬──────┐    ┌────────┬──────┐
│value:11│ next │--->│value:23│ next │--->│value: 7│ null │
└────────┴──────┘    └────────┴──────┘    └────────┴──────┘
   Node 1              Node 2              Node 3 (tail)
```

**To traverse the entire list:**

```javascript
let current = linkedList.head;
while (current !== null) {
  console.log(current.value);
  current = current.next;
}
// Output: 11, 23, 7
```

**More realistic version with a tail pointer:**

```javascript
const linkedList = {
  head: {
    value: 11,
    next: {
      value: 23,
      next: {
        value: 7,
        next: null,
      },
    },
  },
  tail: null, // Points to the last node for O(1) append
};

// Set tail to point to the last node
linkedList.tail = linkedList.head.next.next;
```

This nested object structure is exactly what makes **lookup by index O(n)** - you have to follow the `next` pointers one by one to reach any specific position!
// Set tail to point to the last node
linkedList.tail = linkedList.head.next.next;

# Big O Complexity: Linked Lists vs Arrays

## Time Complexity Comparison

| Operation                          | Linked List | Array | Winner         |
| ---------------------------------- | ----------- | ----- | -------------- |
| **Push** (add to end)              | O(1)        | O(1)  | 🤝 Tie         |
| **Pop** (remove from end)          | O(n)        | O(1)  | 🏆 Array       |
| **Shift** (remove from start)      | O(1)        | O(n)  | 🏆 Linked List |
| **Unshift** (add to start)         | O(1)        | O(n)  | 🏆 Linked List |
| **Insert** (at arbitrary position) | O(n)        | O(n)  | 🤝 Tie         |
| **Delete** (at arbitrary position) | O(n)        | O(n)  | 🤝 Tie         |
| **Lookup by Index**                | O(n)        | O(1)  | 🏆 Array       |
| **Lookup by Value** (search)       | O(n)        | O(n)  | 🤝 Tie         |

## Detailed Explanations

### Push (Add to End)

- **Linked List O(1)**: Keep a tail pointer, just update tail.next and move tail
- **Array O(1)**: Direct access to end, just add element (assuming no resizing)

### Pop (Remove from End)

- **Linked List O(n)**: Must traverse entire list to find second-to-last node to update its next pointer
- **Array O(1)**: Direct access to last element, just remove it

### Shift (Remove from Start)

- **Linked List O(1)**: Just update head pointer to head.next
- **Array O(n)**: Must shift all remaining elements one position left

### Unshift (Add to Start)

- **Linked List O(1)**: Create new node, point it to current head, update head
- **Array O(n)**: Must shift all existing elements one position right

### Insert at Arbitrary Position

- **Linked List O(n)**: Must traverse to position, then O(1) to insert
- **Array O(n)**: Must shift all elements after position to make room

### Delete at Arbitrary Position

- **Linked List O(n)**: Must traverse to position, then O(1) to remove
- **Array O(n)**: Must shift all elements after position to fill gap

### Lookup by Index

- **Linked List O(n)**: Must traverse from head counting nodes
- **Array O(1)**: Direct memory access using index

### Lookup by Value (Search)

- **Linked List O(n)**: Must check each node until found
- **Array O(n)**: Must check each element until found

## When to Use Each

### Use Linked Lists When:

- Frequent insertions/deletions at the beginning
- Size changes frequently
- You don't need random access by index
- Memory is fragmented

### Use Arrays When:

- Frequent random access by index
- Frequent operations at the end
- Cache performance matters
- You need mathematical operations (sorting, etc.)

## Memory Considerations

### Linked List

- **Extra Memory**: Each node stores data + pointer(s)
- **Cache Performance**: Poor (nodes scattered in memory)
- **Memory Overhead**: Higher due to pointer storage

### Array

- **Memory Efficiency**: Contiguous memory, no extra pointers
- **Cache Performance**: Excellent (data stored together)
- **Memory Overhead**: Lower (just the data)

## JavaScript Implementation Notes

### Array Methods in JavaScript

```javascript
// All O(1) operations
arr.push(item); // Add to end
arr.pop(); // Remove from end
arr[index]; // Access by index

// All O(n) operations
arr.unshift(item); // Add to start
arr.shift(); // Remove from start
arr.splice(i, 1); // Delete at position
arr.splice(i, 0, item); // Insert at position
```

### Why Some Linked List Operations Are O(n)

**Pop is O(n) because:**

```
[Head] -> [Node1] -> [Node2] -> [Node3] -> [Tail] -> null

To remove Tail, you need Node3 to point to null
But to find Node3, you must traverse from Head!
```

**For Doubly Linked Lists:**

- Pop becomes O(1) (tail has prev pointer)
- More memory overhead (two pointers per node)

This is why the choice between linked lists and arrays depends heavily on your specific use case and which operations you perform most frequently!
