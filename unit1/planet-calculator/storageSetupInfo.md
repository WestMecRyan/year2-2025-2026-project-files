## **Current Storage (Memory Only):**

```javascript
class PeopleManager {
  #people; // This is just an array in memory

  constructor() {
    this.#people = []; // Empty array when page loads
  }

  addPerson(person) {
    this.#people.push(person); // Adds to memory array
  }
}
```

## **What This Means:**

✅ **While the page is open**: People are stored and displayed
❌ **When you refresh the page**: All data is lost
❌ **When you close the browser**: All data is lost
❌ **No persistence**: Data doesn't survive between sessions

## **Where the Data Lives:**

```
Browser Memory (RAM)
├── PeopleManager instance
│   └── #people array
│       ├── Person object 1
│       ├── Person object 2
│       └── Person object 3
└── (Gone when page reloads)
```

## **To Add Persistence, You'd Need:**

### **Option 1: Local Storage (Browser)**

```javascript
// Save to browser storage
savePeople() {
    const peopleData = this.#people.map(person => person.toObject());
    localStorage.setItem('people', JSON.stringify(peopleData));
}

// Load from browser storage
loadPeople() {
    const saved = localStorage.getItem('people');
    if (saved) {
        const peopleData = JSON.parse(saved);
        this.#people = peopleData.map(data =>
            new Person(data.name, data.age)
        );
    }
}
```

### **Option 2: Database (Server-side)**

```javascript
// Would need backend API calls
async savePerson(person) {
    await fetch('/api/people', {
        method: 'POST',
        body: JSON.stringify(person.toObject())
    });
}
```

### **Option 3: File Download/Upload**

```javascript
// Export to JSON file
exportData() {
    const data = JSON.stringify(this.#people.map(p => p.toObject()));
    // Trigger download
}
```

## **Test the Current Behavior:**

1. **Add some people** to the form
2. **Refresh the page** (F5)
3. **Notice**: All people disappear!

This is because we're only using **volatile memory storage**. The data exists only as long as the JavaScript variables exist in the browser's memory.

**Want me to show you how to add localStorage persistence so the data survives page refreshes?** That would make it much more practical!
