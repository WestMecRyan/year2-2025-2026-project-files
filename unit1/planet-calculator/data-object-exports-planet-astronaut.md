# Week 1: JavaScript Fundamentals with Planetary Calculator Project
## Modular Approach with Objects and ES6 Modules

## Overview
Students will build a modular planetary jump calculator using objects and ES6 import/export, preparing them for object-oriented programming in Week 2. Each day focuses on a specific data type while building toward a modular application structure.

---

## **Monday: Numbers & Basic Calculator Logic**

### Learning Objectives
- Review number data types, arithmetic operations, and functions
- Introduction to module exports for reusable functions

### Project Goal
Create calculation functions and export them for reuse.

### Files to Create

**calculations.js** (export functions)
```javascript
// Monday's calculations.js - Core calculation functions

/**
 * Calculate weight on another planet
 * @param {number} earthWeight - Weight in pounds on Earth
 * @param {number} gravityMultiplier - Planet's gravity relative to Earth
 * @returns {number} Weight on the target planet
 */
export function calculatePlanetaryWeight(earthWeight, gravityMultiplier) {
    return earthWeight * gravityMultiplier;
}

/**
 * Calculate jump height on another planet
 * @param {number} earthJumpHeight - Jump height in inches on Earth
 * @param {number} gravityMultiplier - Planet's gravity relative to Earth
 * @returns {number} Jump height on the target planet
 */
export function calculateJumpHeight(earthJumpHeight, gravityMultiplier) {
    return earthJumpHeight / gravityMultiplier;
}

/**
 * Calculate both weight and jump for convenience
 * @param {number} earthWeight
 * @param {number} earthJump
 * @param {number} gravityMultiplier
 * @returns {object} Object with weight and jumpHeight properties
 */
export function calculatePlanetaryStats(earthWeight, earthJump, gravityMultiplier) {
    return {
        weight: calculatePlanetaryWeight(earthWeight, gravityMultiplier),
        jumpHeight: calculateJumpHeight(earthJump, gravityMultiplier)
    };
}
```

**main.js** (import and test)
```javascript
// Monday's main.js - Test our calculations

import {
    calculatePlanetaryWeight,
    calculateJumpHeight,
    calculatePlanetaryStats
} from './calculations.js';

// Test data
const myWeight = 150; // pounds
const myJump = 24; // inches
const marsGravity = 0.38;
const moonGravity = 0.17;

// Test individual functions
console.log("=== Monday: Basic Calculations ===");
console.log(`My weight on Mars: ${calculatePlanetaryWeight(myWeight, marsGravity)} lbs`);
console.log(`My jump on Moon: ${calculateJumpHeight(myJump, moonGravity)} inches`);

// Test combined function
const marsStats = calculatePlanetaryStats(myWeight, myJump, marsGravity);
console.log(`Mars stats:`, marsStats);
```

### Activities
1. **Warm-up**: Review number types and arithmetic operations
2. **Build together**: Create and export calculation functions
3. **Practice**: Students test with their own weight/jump data
4. **Challenge**: Add more complex calculations (escape velocity, orbital period)

---

## **Tuesday: Strings & Formatting + Data Objects**

### Learning Objectives
- Review string methods, template literals, and object structure
- Create data objects for planets and astronauts

### Project Goal
Create data files with objects-of-objects and add string formatting.

### Files to Create/Modify

**data/planets.js** (planet data as objects)
```javascript
// Tuesday's data/planets.js - Planet data as object-of-objects

export const planets = {
    mercury: {
        name: "Mercury",
        gravity: 0.38,
        description: "The smallest planet, closest to the Sun"
    },
    venus: {
        name: "Venus",
        gravity: 0.91,
        description: "The hottest planet with thick atmosphere"
    },
    earth: {
        name: "Earth",
        gravity: 1.0,
        description: "Our home planet with perfect conditions"
    },
    mars: {
        name: "Mars",
        gravity: 0.38,
        description: "The red planet, potential future colony"
    },
    jupiter: {
        name: "Jupiter",
        gravity: 2.36,
        description: "The largest planet, a gas giant"
    },
    saturn: {
        name: "Saturn",
        gravity: 0.92,
        description: "The ringed planet, beautiful gas giant"
    },
    uranus: {
        name: "Uranus",
        gravity: 0.89,
        description: "The tilted ice giant"
    },
    neptune: {
        name: "Neptune",
        gravity: 1.13,
        description: "The windiest planet, deep blue ice giant"
    },
    moon: {
        name: "Moon",
        gravity: 0.17,
        description: "Earth's natural satellite"
    }
};

// Helper function to get planet by name (case-insensitive)
export function getPlanet(planetName) {
    const key = planetName.toLowerCase();
    return planets[key] || null;
}

// Get all planet names
export function getPlanetNames() {
    return Object.keys(planets).map(key => planets[key].name);
}
```

**data/astronauts.js** (astronaut data as objects)
```javascript
// Tuesday's data/astronauts.js - Astronaut data as object-of-objects

export const astronauts = {
    neil: {
        name: "Neil Armstrong",
        earthWeight: 165,
        earthJumpHeight: 20,
        mission: "Apollo 11 - First person on Moon"
    },
    sally: {
        name: "Sally Ride",
        earthWeight: 130,
        earthJumpHeight: 22,
        mission: "STS-7 - First American woman in space"
    },
    chris: {
        name: "Chris Hadfield",
        earthWeight: 180,
        earthJumpHeight: 18,
        mission: "ISS Commander - Space educator"
    },
    mae: {
        name: "Mae Jemison",
        earthWeight: 140,
        earthJumpHeight: 25,
        mission: "STS-47 - First African American woman in space"
    }
};

// Helper function to get astronaut by name (case-insensitive)
export function getAstronaut(astronautName) {
    const key = astronautName.toLowerCase().split(' ')[0]; // Use first name as key
    return astronauts[key] || null;
}

// Get all astronaut names
export function getAstronautNames() {
    return Object.keys(astronauts).map(key => astronauts[key].name);
}
```

**formatting.js** (string formatting functions)
```javascript
// Tuesday's formatting.js - String formatting utilities

/**
 * Format weight with proper units
 * @param {number} weight
 * @returns {string} Formatted weight string
 */
export function formatWeight(weight) {
    return `${weight.toFixed(1)} lbs`;
}

/**
 * Format jump height with proper units
 * @param {number} height
 * @returns {string} Formatted height string
 */
export function formatJumpHeight(height) {
    return `${height.toFixed(1)}"`;
}

/**
 * Create a detailed description of planetary stats
 * @param {string} astronautName
 * @param {string} planetName
 * @param {number} weight
 * @param {number} jumpHeight
 * @returns {string} Formatted description
 */
export function formatPlanetaryStats(astronautName, planetName, weight, jumpHeight) {
    return `🚀 ${astronautName} on ${planetName}:
   Weight: ${formatWeight(weight)}
   Jump Height: ${formatJumpHeight(jumpHeight)}`;
}

/**
 * Generate planet description with gravity info
 * @param {object} planet - Planet object from planets.js
 * @returns {string} Planet description
 */
export function describePlanet(planet) {
    return `${planet.name} (${planet.gravity}x Earth gravity): ${planet.description}`;
}
```

**main.js** (updated to use data objects)
```javascript
// Tuesday's main.js - Using data objects and formatting

import { calculatePlanetaryStats } from './calculations.js';
import { planets, getPlanet, getPlanetNames } from './data/planets.js';
import { astronauts, getAstronaut, getAstronautNames } from './data/astronauts.js';
import { formatPlanetaryStats, describePlanet } from './formatting.js';

console.log("=== Tuesday: Objects and Formatting ===");

// Show available data
console.log("Available Astronauts:", getAstronautNames().join(", "));
console.log("Available Planets:", getPlanetNames().join(", "));
console.log();

// Example calculation using objects
const astronaut = getAstronaut("Neil Armstrong");
const planet = getPlanet("mars");

if (astronaut && planet) {
    const stats = calculatePlanetaryStats(
        astronaut.earthWeight,
        astronaut.earthJumpHeight,
        planet.gravity
    );

    console.log(describePlanet(planet));
    console.log(formatPlanetaryStats(
        astronaut.name,
        planet.name,
        stats.weight,
        stats.jumpHeight
    ));
    console.log(`Mission: ${astronaut.mission}`);
}
```

### Activities
1. **Warm-up**: String method practice with template literals
2. **Build together**: Create data objects and formatting functions
3. **Practice**: Students add their own astronauts to the data
4. **Challenge**: Create themed formatting (emojis, colors, ASCII art)

---

## **Wednesday: Booleans & Validation Logic**

### Learning Objectives
- Review boolean operations and conditional statements
- Add validation and safety checks using object data

### Project Goal
Add validation functions and conditional logic for safe calculations.

### Files to Create/Modify

**validation.js** (boolean logic and validation)
```javascript
// Wednesday's validation.js - Boolean logic and validation functions

/**
 * Validate astronaut data
 * @param {object} astronaut
 * @returns {boolean} True if valid astronaut object
 */
export function isValidAstronaut(astronaut) {
    return astronaut &&
           typeof astronaut.name === 'string' &&
           typeof astronaut.earthWeight === 'number' &&
           astronaut.earthWeight > 0 && astronaut.earthWeight < 500 &&
           typeof astronaut.earthJumpHeight === 'number' &&
           astronaut.earthJumpHeight > 0 && astronaut.earthJumpHeight < 100;
}

/**
 * Validate planet data
 * @param {object} planet
 * @returns {boolean} True if valid planet object
 */
export function isValidPlanet(planet) {
    return planet &&
           typeof planet.name === 'string' &&
           typeof planet.gravity === 'number' &&
           planet.gravity > 0;
}

/**
 * Check if gravity conditions are extreme
 * @param {number} gravity
 * @returns {boolean} True if gravity is extreme
 */
export function isExtremeGravity(gravity) {
    return gravity > 5.0 || gravity < 0.1;
}

/**
 * Check if gravity conditions are survivable
 * @param {number} gravity
 * @returns {boolean} True if likely survivable
 */
export function isSurvivableGravity(gravity) {
    return gravity >= 0.1 && gravity <= 10.0;
}

/**
 * Check if jumping conditions are safe
 * @param {number} jumpHeight - Calculated jump height on planet
 * @returns {boolean} True if safe jumping conditions
 */
export function isSafeJumping(jumpHeight) {
    return jumpHeight >= 1 && jumpHeight <= 200; // Reasonable bounds
}

/**
 * Determine if astronaut can walk normally on planet
 * @param {number} earthWeight
 * @param {number} gravity
 * @returns {boolean} True if walking is feasible
 */
export function canWalkNormally(earthWeight, gravity) {
    const planetWeight = earthWeight * gravity;
    return planetWeight <= earthWeight * 3; // Can handle up to 3x weight
}
```

**warnings.js** (conditional messaging)
```javascript
// Wednesday's warnings.js - Conditional warning messages

import { isExtremeGravity, isSurvivableGravity, isSafeJumping, canWalkNormally } from './validation.js';

/**
 * Generate gravity warning message
 * @param {object} planet
 * @returns {string} Warning message
 */
export function getGravityWarning(planet) {
    const gravity = planet.gravity;

    if (!isSurvivableGravity(gravity)) {
        return `💀 DANGER: ${planet.name}'s gravity (${gravity}x) is lethal!`;
    }

    if (isExtremeGravity(gravity)) {
        if (gravity > 5) {
            return `⚠️  WARNING: ${planet.name}'s gravity would make movement extremely difficult!`;
        } else {
            return `🦘 AMAZING: You could jump incredibly high on ${planet.name}!`;
        }
    }

    return `✅ ${planet.name} has manageable gravity conditions.`;
}

/**
 * Generate jump safety warning
 * @param {number} jumpHeight
 * @param {string} planetName
 * @returns {string} Jump safety message
 */
export function getJumpWarning(jumpHeight, planetName) {
    if (!isSafeJumping(jumpHeight)) {
        if (jumpHeight > 200) {
            return `🚀 CAUTION: You might jump so high on ${planetName} you'd need a parachute!`;
        } else {
            return `⚠️  Your jumping would be severely limited on ${planetName}.`;
        }
    }

    if (jumpHeight > 50) {
        return `🏀 You could practically fly on ${planetName}!`;
    }

    return `✅ Normal jumping conditions on ${planetName}.`;
}

/**
 * Generate walking ability message
 * @param {object} astronaut
 * @param {object} planet
 * @returns {string} Walking ability message
 */
export function getWalkingAbility(astronaut, planet) {
    if (canWalkNormally(astronaut.earthWeight, planet.gravity)) {
        return `🚶 ${astronaut.name} can walk normally on ${planet.name}.`;
    } else {
        return `🤖 ${astronaut.name} would need assistance to move on ${planet.name}.`;
    }
}
```

**main.js** (updated with validation)
```javascript
// Wednesday's main.js - Adding validation and warnings

import { calculatePlanetaryStats } from './calculations.js';
import { getPlanet, getPlanetNames } from './data/planets.js';
import { getAstronaut, getAstronautNames } from './data/astronauts.js';
import { formatPlanetaryStats } from './formatting.js';
import { isValidAstronaut, isValidPlanet } from './validation.js';
import { getGravityWarning, getJumpWarning, getWalkingAbility } from './warnings.js';

/**
 * Safe calculation with validation and warnings
 * @param {string} astronautName
 * @param {string} planetName
 * @returns {boolean} Success status
 */
function safeCalculateStats(astronautName, planetName) {
    const astronaut = getAstronaut(astronautName);
    const planet = getPlanet(planetName);

    // Validation checks
    if (!astronaut) {
        console.log(`❌ Astronaut "${astronautName}" not found.`);
        return false;
    }

    if (!planet) {
        console.log(`❌ Planet "${planetName}" not found.`);
        return false;
    }

    if (!isValidAstronaut(astronaut)) {
        console.log(`❌ Invalid astronaut data for ${astronaut.name}.`);
        return false;
    }

    if (!isValidPlanet(planet)) {
        console.log(`❌ Invalid planet data for ${planet.name}.`);
        return false;
    }

    // Calculate stats
    const stats = calculatePlanetaryStats(
        astronaut.earthWeight,
        astronaut.earthJumpHeight,
        planet.gravity
    );

    // Display results with warnings
    console.log(formatPlanetaryStats(astronaut.name, planet.name, stats.weight, stats.jumpHeight));
    console.log(getGravityWarning(planet));
    console.log(getJumpWarning(stats.jumpHeight, planet.name));
    console.log(getWalkingAbility(astronaut, planet));

    return true;
}

console.log("=== Wednesday: Validation and Warnings ===");

// Test with different scenarios
console.log("Testing Neil Armstrong on Mars:");
safeCalculateStats("Neil Armstrong", "mars");

console.log("\nTesting Sally Ride on Jupiter:");
safeCalculateStats("Sally Ride", "jupiter");

console.log("\nTesting invalid data:");
safeCalculateStats("Unknown Person", "mars");
safeCalculateStats("Neil Armstrong", "pluto");
```

### Activities
1. **Warm-up**: Boolean logic exercises and truth tables
2. **Build together**: Create validation and warning functions
3. **Practice**: Students add custom validation rules
4. **Challenge**: Create complex multi-condition scenarios

---

## **Thursday: Arrays & Bulk Operations**

### Learning Objectives
- Review array methods and iteration patterns
- Process multiple astronauts and planets efficiently

### Project Goal
Add bulk operations and comparison features using arrays.

### Files to Create/Modify

**bulk-operations.js** (array processing functions)
```javascript
// Thursday's bulk-operations.js - Array operations for bulk calculations

import { calculatePlanetaryStats } from './calculations.js';
import { planets } from './data/planets.js';
import { astronauts } from './data/astronauts.js';
import { formatWeight, formatJumpHeight } from './formatting.js';

/**
 * Calculate stats for one astronaut on all planets
 * @param {object} astronaut
 * @returns {Array} Array of calculation results
 */
export function calculateAllPlanets(astronaut) {
    return Object.values(planets).map(planet => {
        const stats = calculatePlanetaryStats(
            astronaut.earthWeight,
            astronaut.earthJumpHeight,
            planet.gravity
        );

        return {
            astronaut: astronaut.name,
            planet: planet.name,
            weight: stats.weight,
            jumpHeight: stats.jumpHeight,
            gravity: planet.gravity
        };
    });
}

/**
 * Calculate stats for all astronauts on one planet
 * @param {object} planet
 * @returns {Array} Array of calculation results
 */
export function calculateAllAstronauts(planet) {
    return Object.values(astronauts).map(astronaut => {
        const stats = calculatePlanetaryStats(
            astronaut.earthWeight,
            astronaut.earthJumpHeight,
            planet.gravity
        );

        return {
            astronaut: astronaut.name,
            planet: planet.name,
            weight: stats.weight,
            jumpHeight: stats.jumpHeight,
            originalWeight: astronaut.earthWeight,
            originalJump: astronaut.earthJumpHeight
        };
    });
}

/**
 * Find best planet for jumping for a given astronaut
 * @param {object} astronaut
 * @returns {object} Best planet result
 */
export function findBestJumpingPlanet(astronaut) {
    const results = calculateAllPlanets(astronaut);
    return results.reduce((best, current) =>
        current.jumpHeight > best.jumpHeight ? current : best
    );
}

/**
 * Find lightest weight planet for a given astronaut
 * @param {object} astronaut
 * @returns {object} Lightest weight result
 */
export function findLightestWeightPlanet(astronaut) {
    const results = calculateAllPlanets(astronaut);
    return results.reduce((lightest, current) =>
        current.weight < lightest.weight ? current : lightest
    );
}

/**
 * Get planets sorted by gravity
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted planet objects
 */
export function getPlanetsByGravity(order = 'asc') {
    const planetArray = Object.values(planets);
    return planetArray.sort((a, b) => {
        return order === 'asc' ? a.gravity - b.gravity : b.gravity - a.gravity;
    });
}

/**
 * Filter planets by gravity range
 * @param {number} minGravity
 * @param {number} maxGravity
 * @returns {Array} Filtered planet objects
 */
export function filterPlanetsByGravity(minGravity, maxGravity) {
    return Object.values(planets).filter(planet =>
        planet.gravity >= minGravity && planet.gravity <= maxGravity
    );
}

/**
 * Compare all astronauts on a specific planet
 * @param {string} planetName
 * @returns {object} Comparison results
 */
export function compareAstronautsOnPlanet(planetName) {
    const planet = Object.values(planets).find(p =>
        p.name.toLowerCase() === planetName.toLowerCase()
    );

    if (!planet) return null;

    const results = calculateAllAstronauts(planet);

    // Sort by different criteria
    const byWeight = [...results].sort((a, b) => a.weight - b.weight);
    const byJump = [...results].sort((a, b) => b.jumpHeight - a.jumpHeight);

    return {
        planet: planet.name,
        gravity: planet.gravity,
        lightest: byWeight[0],
        heaviest: byWeight[byWeight.length - 1],
        highestJumper: byJump[0],
        lowestJumper: byJump[byJump.length - 1],
        allResults: results
    };
}
```

**display.js** (array display functions)
```javascript
// Thursday's display.js - Functions to display array results

import { formatWeight, formatJumpHeight } from './formatting.js';

/**
 * Display results table for multiple calculations
 * @param {Array} results - Array of calculation results
 * @param {string} title - Table title
 */
export function displayResultsTable(results, title) {
    console.log(`\n📊 ${title}`);
    console.log("=".repeat(60));
    console.log("Astronaut".padEnd(15) + "Planet".padEnd(12) + "Weight".padEnd(12) + "Jump Height");
    console.log("-".repeat(60));

    results.forEach(result => {
        console.log(
            result.astronaut.padEnd(15) +
            result.planet.padEnd(12) +
            formatWeight(result.weight).padEnd(12) +
            formatJumpHeight(result.jumpHeight)
        );
    });
    console.log("=".repeat(60));
}

/**
 * Display comparison summary
 * @param {object} comparison - Comparison results object
 */
export function displayComparison(comparison) {
    console.log(`\n🏆 COMPARISON RESULTS FOR ${comparison.planet.toUpperCase()}`);
    console.log(`Gravity: ${comparison.gravity}x Earth`);
    console.log();

    console.log("🪶 Lightest:",
        `${comparison.lightest.astronaut} - ${formatWeight(comparison.lightest.weight)}`);
    console.log("🏋️  Heaviest:",
        `${comparison.heaviest.astronaut} - ${formatWeight(comparison.heaviest.weight)}`);
    console.log("🦘 Best Jumper:",
        `${comparison.highestJumper.astronaut} - ${formatJumpHeight(comparison.highestJumper.jumpHeight)}`);
    console.log("⬇️  Lowest Jump:",
        `${comparison.lowestJumper.astronaut} - ${formatJumpHeight(comparison.lowestJumper.jumpHeight)}`);
}

/**
 * Display planets sorted by gravity
 * @param {Array} planets - Sorted planet array
 * @param {string} order - Sort order description
 */
export function displayPlanetsByGravity(planets, order) {
    console.log(`\n🌍 PLANETS SORTED BY GRAVITY (${order})`);
    console.log("=".repeat(40));

    planets.forEach((planet, index) => {
        console.log(`${index + 1}. ${planet.name} - ${planet.gravity}x gravity`);
    });
}
```

**main.js** (updated with array operations)
```javascript
// Thursday's main.js - Bulk operations and arrays

import { getAstronaut, getPlanet } from './data/planets.js';
import { astronauts } from './data/astronauts.js';
import {
    calculateAllPlanets,
    findBestJumpingPlanet,
    findLightestWeightPlanet,
    compareAstronautsOnPlanet,
    getPlanetsByGravity,
    filterPlanetsByGravity
} from './bulk-operations.js';
import { displayResultsTable, displayComparison, displayPlanetsByGravity } from './display.js';

console.log("=== Thursday: Array Operations and Bulk Calculations ===");

// Example 1: One astronaut, all planets
const neil = Object.values(astronauts)[0]; // Neil Armstrong
const neilResults = calculateAllPlanets(neil);
displayResultsTable(neilResults, `${neil.name} on All Planets`);

// Example 2: Find best conditions for Neil
const bestJump = findBestJumpingPlanet(neil);
const lightestWeight = findLightestWeightPlanet(neil);

console.log(`\n🎯 BEST CONDITIONS FOR ${neil.name}:`);
console.log(`Best for jumping: ${bestJump.planet} (${formatJumpHeight(bestJump.jumpHeight)})`);
console.log(`Lightest weight: ${lightestWeight.planet} (${formatWeight(lightestWeight.weight)})`);

// Example 3: Compare all astronauts on Mars
const marsComparison = compareAstronautsOnPlanet("mars");
if (marsComparison) {
    displayComparison(marsComparison);
}

// Example 4: Filter planets by gravity
console.log("\n🔍 FILTERING EXAMPLES:");
const earthLikePlanets = filterPlanetsByGravity(0.8, 1.2);
console.log("Earth-like gravity planets:", earthLikePlanets.map(p => p.name).join(", "));

const lowGravityPlanets = filterPlanetsByGravity(0, 0.5);
console.log("Low gravity planets:", lowGravityPlanets.map(p => p.name).join(", "));

// Example 5: Sort planets by gravity
const sortedPlanets = getPlanetsByGravity('asc');
displayPlanetsByGravity(sortedPlanets, "Lowest to Highest");
```

### Activities
1. **Warm-up**: Array method practice (map, filter, reduce, sort)
2. **Build together**: Create bulk operation and display functions
3. **Practice**: Students create custom filtering and sorting functions
4. **Challenge**: Find interesting patterns in the data (correlations, extremes)

---

## **Friday: Integration & Objects Preview**

### Learning Objectives
- Combine all week's modules into a complete application
- Preview how objects will improve the current structure

### Project Goal
Create a complete modular application and show how it will evolve into classes.

### Files to Create/Modify

**app.js** (main application)
```javascript
// Friday's app.js - Complete integrated application

import readline from 'readline';
import { calculatePlanetaryStats } from './calculations.js';
import { getPlanet, getAstronaut, getPlanetNames, getAstronautNames } from './data/planets.js';
import { astronauts } from './data/astronauts.js';
import { formatPlanetaryStats } from './formatting.js';
import { safeCalculateStats } from './main.js'; // From Wednesday
import {
    calculateAllPlanets,
    findBestJumpingPlanet,
    compareAstronautsOnPlanet
} from './bulk-operations.js';
import { displayResultsTable, displayComparison } from './display.js';

class PlanetaryCalculatorApp {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Promise wrapper for readline
    question(prompt) {
        return new Promise(resolve => {
            this.rl.question(prompt, resolve);
        });
    }

    // Display welcome message
    displayWelcome() {
        console.clear();
        console.log("🚀 =====================================");
        console.log("   PLANETARY CALCULATOR v1.0");
        console.log("🚀 =====================================\n");
        console.log("Calculate weight and jump height on different planets!");
        console.log("Built with modular JavaScript and ES6 imports/exports\n");
    }

    // Display available data
    displayAvailableData() {
        console.log("👨‍🚀 Available Astronauts:");
        getAstronautNames().forEach((name, i) => console.log(`   ${i + 1}. ${name}`));

        console.log("\n🌍 Available Planets:");
        getPlanetNames().forEach((name, i) => console.log(`   ${i + 1}. ${name}`));
        console.log();
    }

    // Main menu
    async showMainMenu() {
        console.log("📋 What would you like to do?");
        console.log("   1. Calculate for specific astronaut and planet");
        console.log("   2. Show astronaut on all planets");
        console.log("   3. Compare all astronauts on one planet");
        console.log("   4. Find best conditions for astronaut");
        console.log("   5. Exit");

        const choice = await this.question("\n👆 Enter your choice (1-5): ");
        return choice;
    }

    // Option 1: Specific calculation
    async specificCalculation() {
        this.displayAvailableData();

        const astronautName = await this.question("Choose an astronaut: ");
        const planetName = await this.question("Choose a planet: ");

        const astronaut = getAstronaut(astronautName);
        const planet = getPlanet(planetName);

        if (astronaut && planet) {
            const stats = calculatePlanetaryStats(
                astronaut.earthWeight,
                astronaut.earthJumpHeight,
                planet.gravity
            );

            console.log("\n" + formatPlanetaryStats(
                astronaut.name,
                planet.name,
                stats.weight,
                stats.jumpHeight
            ));
        } else {
            console.log("❌ Invalid astronaut or planet name.");
        }
    }

    // Option 2: One astronaut, all planets
    async astronautAllPlanets() {