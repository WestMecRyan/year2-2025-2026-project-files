`Math.random()` uses a **Pseudorandom Number Generator (PRNG)** algorithm. Here's what happens internally:

**The basic process:**
1. **Seed initialization**: The PRNG starts with an initial seed value (usually based on current time)
2. **Mathematical transformation**: Applies a deterministic algorithm to transform the current state
3. **State update**: Updates internal state for the next call
4. **Normalization**: Converts the result to a float between 0 and 1

**Common algorithms used:**
- **Linear Congruential Generator (LCG)**: `next = (a * current + c) % m`
- **Mersenne Twister**: More complex but higher quality randomness
- **xorshift**: Fast bitwise operations like `x ^= x << 13`

**Simplified example of what might happen:**
```javascript
// Conceptual implementation (not actual browser code)
let seed = Date.now(); // Initial seed

function mathRandom() {
  seed = (seed * 1664525 + 1013904223) % Math.pow(2, 32); // LCG formula
  return seed / Math.pow(2, 32); // Normalize to 0-1
}
```

**Key points:**
- It's **pseudorandom** - appears random but follows a deterministic pattern
- Same seed = same sequence of numbers
- Modern browsers use cryptographically secure algorithms
- The actual implementation varies by JavaScript engine (V8, SpiderMonkey, etc.)

For truly random numbers, you'd use `crypto.getRandomValues()` which uses hardware entropy sources.