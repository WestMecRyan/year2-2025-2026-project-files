The OOP vs functional programming debate is fascinating. Let me show you how the Cookie example would look in both paradigms:The key differences between OOP and Functional Programming:

## **Object-Oriented Programming (OOP)**

- **State**: Lives inside objects, can be mutated
- **Behavior**: Methods belong to objects
- **Approach**: "Objects do things to themselves"
- **Example**: `cookie.bake()` changes the cookie

## **Functional Programming (FP)**

- **State**: Immutable data structures
- **Behavior**: Pure functions that take data and return new data
- **Approach**: "Functions transform data"
- **Example**: `bake(cookie)` returns a new baked cookie

## **Key Functional Programming Principles:**

1. **Pure Functions**: No side effects, same input = same output
2. **Immutability**: Never change data, always create new data
3. **Function Composition**: Build complex operations from simple functions
4. **Higher-Order Functions**: Functions that take or return other functions

## **The Real World:**

Most modern JavaScript applications use **both approaches**:

- React: Functional components + class components
- Redux: Functional state management
- Modern frameworks: Mix of paradigms

**Neither is "better"** - they're tools for different problems:

- **OOP**: Great for modeling complex entities (game characters, UI components)
- **FP**: Great for data processing, state management, and avoiding bugs

The "argument" usually comes down to personal preference and the specific problem you're solving!
// ========================================
// OBJECT-ORIENTED PROGRAMMING APPROACH
// ========================================

class Cookie {
#flavor;
#baked;

    constructor(flavor) {
        this.#flavor = flavor;
        this.#baked = false;
    }

    getFlavor() {
        return this.#flavor;
    }

    setFlavor(newFlavor) {
        this.#flavor = newFlavor;
    }

    bake() {
        this.#baked = true;
        return this;
    }

    isBaked() {
        return this.#baked;
    }

    describe() {
        const status = this.#baked ? 'baked' : 'unbaked';
        return `A ${status} ${this.#flavor} cookie`;
    }

}

// OOP Usage:
console.log('=== OOP APPROACH ===');
const oopCookie = new Cookie('chocolate');
console.log(oopCookie.describe()); // "A unbaked chocolate cookie"
oopCookie.bake();
console.log(oopCookie.describe()); // "A baked chocolate cookie"
oopCookie.setFlavor('oatmeal');
console.log(oopCookie.describe()); // "A baked oatmeal cookie"

// ========================================
// FUNCTIONAL PROGRAMMING APPROACH
// ========================================

// In FP, we use pure functions and immutable data structures
// Instead of classes, we use factory functions and function composition

// Factory function to create cookie objects
const createCookie = (flavor, baked = false) => ({
flavor,
baked
});

// Pure functions that take cookies and return new cookies (immutable)
const getFlavor = (cookie) => cookie.flavor;

const setFlavor = (cookie, newFlavor) => ({
...cookie,
flavor: newFlavor
});

const bake = (cookie) => ({
...cookie,
baked: true
});

const isBaked = (cookie) => cookie.baked;

const describe = (cookie) => {
const status = cookie.baked ? 'baked' : 'unbaked';
return `A ${status} ${cookie.flavor} cookie`;
};

// Higher-order functions for more complex operations
const bakeCookie = (cookie) => bake(cookie);

const makeCookieWithFlavor = (flavor) => (cookie) => setFlavor(cookie, flavor);

// Function composition helper
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

// FP Usage:
console.log('\n=== FUNCTIONAL APPROACH ===');
let fpCookie = createCookie('chocolate');
console.log(describe(fpCookie)); // "A unbaked chocolate cookie"

// Each operation returns a NEW cookie (immutability)
fpCookie = bake(fpCookie);
console.log(describe(fpCookie)); // "A baked chocolate cookie"

fpCookie = setFlavor(fpCookie, 'oatmeal');
console.log(describe(fpCookie)); // "A baked oatmeal cookie"

// ========================================
// ADVANCED FUNCTIONAL APPROACH
// ========================================

// Using function composition to chain operations
console.log('\n=== ADVANCED FUNCTIONAL ===');

const processedCookie = pipe(
createCookie,
bake,
(cookie) => setFlavor(cookie, 'snickerdoodle'),
describe
)('vanilla');

console.log(processedCookie); // "A baked snickerdoodle cookie"

// Working with arrays of cookies (functional style)
const cookieBatch = [
createCookie('chocolate'),
createCookie('vanilla'),
createCookie('oatmeal')
];

// Functional operations on collections
const bakedBatch = cookieBatch.map(bake);
const descriptions = bakedBatch.map(describe);
const chocolateCookies = bakedBatch.filter(cookie => cookie.flavor === 'chocolate');

console.log('\nBatch descriptions:');
descriptions.forEach(desc => console.log(`- ${desc}`));

// ========================================
// COMPARISON EXAMPLES
// ========================================

console.log('\n=== COMPARISON: MUTABILITY ===');

// OOP: Mutates the original object
const oopCookie2 = new Cookie('sugar');
console.log('Before baking:', oopCookie2.describe());
oopCookie2.bake(); // Changes the original object
console.log('After baking:', oopCookie2.describe());

// FP: Returns new objects, originals unchanged
const fpCookie2 = createCookie('sugar');
console.log('Original:', describe(fpCookie2));
const bakedVersion = bake(fpCookie2); // Original unchanged
console.log('Original after "baking":', describe(fpCookie2));
console.log('Baked version:', describe(bakedVersion));

// ========================================
// FUNCTIONAL STATE MANAGEMENT
// ========================================

console.log('\n=== FUNCTIONAL STATE MANAGEMENT ===');

// Instead of changing object properties, we manage state functionally
const cookieReducer = (state, action) => {
switch (action.type) {
case 'BAKE':
return bake(state);
case 'CHANGE_FLAVOR':
return setFlavor(state, action.flavor);
case 'RESET':
return createCookie(action.flavor || 'plain');
default:
return state;
}
};

// Usage like Redux pattern
let cookieState = createCookie('chocolate');
console.log('Initial:', describe(cookieState));

cookieState = cookieReducer(cookieState, { type: 'BAKE' });
console.log('After baking:', describe(cookieState));

cookieState = cookieReducer(cookieState, { type: 'CHANGE_FLAVOR', flavor: 'peanut butter' });
console.log('After flavor change:', describe(cookieState));

// ========================================
// WHEN TO USE EACH APPROACH
// ========================================

console.log('\n=== WHEN TO USE EACH ===');
console.log(`
OOP is good when:

- You have complex entities with behavior
- You need encapsulation and data hiding
- You're modeling real-world objects
- You need inheritance and polymorphism
- Working with mutable state makes sense

FP is good when:

- You want predictable, testable code
- You're doing data transformations
- You want to avoid side effects
- You're working with concurrent/parallel code
- You want to compose small functions into larger ones

In practice, most modern JavaScript uses BOTH approaches!
`);

// ========================================
// HYBRID APPROACH (MODERN JAVASCRIPT)
// ========================================

console.log('\n=== HYBRID APPROACH ===');

// Modern JS often combines both paradigms
class ModernCookie {
constructor(flavor, baked = false) {
this.flavor = flavor;
this.baked = baked;
}

    // Functional-style methods that return new instances
    withFlavor(newFlavor) {
        return new ModernCookie(newFlavor, this.baked);
    }

    baked() {
        return new ModernCookie(this.flavor, true);
    }

    describe() {
        const status = this.baked ? 'baked' : 'unbaked';
        return `A ${status} ${this.flavor} cookie`;
    }

}

const hybridCookie = new ModernCookie('chocolate')
.baked()
.withFlavor('double chocolate');

console.log('Hybrid result:', hybridCookie.describe());
