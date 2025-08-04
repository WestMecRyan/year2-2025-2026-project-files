Let's build an object-oriented planetary calculator. This will demonstrate inheritance, encapsulation, and composition nicely.This OOP calculator demonstrates several key object-oriented principles:

## **Key OOP Concepts Used:**

### **1. Encapsulation**

- Private fields (`#name`, `#gravityMultiplier`) hide internal data
- Public methods provide controlled access
- Data validation and formatting handled internally

### **2. Single Responsibility Principle**

- `Planet`: Knows about gravity and planet-specific calculations
- `Person`: Manages person's Earth-based stats
- `PlanetaryCalculator`: Handles the calculations and planet management
- `PlanetaryStats`: Represents calculation results

### **3. Composition**

- `PlanetaryCalculator` contains a collection of `Planet` objects
- `PlanetaryStats` composes `Person` and `Planet` data

### **4. Inheritance**

- `InteractivePlanetaryCalculator` extends `PlanetaryCalculator`
- Adds user-friendly methods while reusing core functionality

## **Try it out:**

```javascript
// Basic usage
const calc = new PlanetaryCalculator();
const person = new Person("You", 150, 30); // 150 lbs, 30" vertical

const moonStats = calc.calculateStats(person, "Moon");
console.log(moonStats.describe());
// On Moon: Weight: 25.5 lbs (124.5 lbs lighter), Jump: 176.5" (146.5" higher)

// Interactive version
const interactive = new InteractivePlanetaryCalculator();
interactive.createPerson("John", 200, 28);
console.log(interactive.quickCalculate("Mars").describe());
```

## **What makes this good OOP design:**

1. **Clear responsibilities** - each class has one job
2. **Data hiding** - private fields prevent direct manipulation
3. **Reusability** - can easily add new planets or extend functionality
4. **Maintainability** - changes to gravity calculations only affect Planet class
5. **Extensibility** - easy to add features like atmosphere effects, etc.
