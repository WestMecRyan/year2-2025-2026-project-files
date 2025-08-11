// planet-calc-1.js - Day 1: Numbers, Objects, and Basic Exports

// ========================================
// DATA: Arrays of Objects
// ========================================

// Planet data as array of objects
const planets = [
    { name: "Mercury", gravity: 0.38 },
    { name: "Venus", gravity: 0.91 },
    { name: "Earth", gravity: 1.0 },
    { name: "Mars", gravity: 0.38 },
    { name: "Jupiter", gravity: 2.36 },
    { name: "Saturn", gravity: 0.92 },
    { name: "Uranus", gravity: 0.89 },
    { name: "Neptune", gravity: 1.13 },
    { name: "Moon", gravity: 0.17 }
];

// Astronaut data as array of objects
const astronauts = [
    { name: "Neil Armstrong", weight: 165, jumpHeight: 20 },
    { name: "Sally Ride", weight: 130, jumpHeight: 22 },
    { name: "Chris Hadfield", weight: 180, jumpHeight: 18 },
    { name: "Mae Jemison", weight: 140, jumpHeight: 25 }
];

// ========================================
// CALCULATION FUNCTIONS
// ========================================

/**
 * Calculate weight on another planet
 * @param {number} earthWeight - Weight in pounds on Earth
 * @param {number} gravityMultiplier - Planet's gravity relative to Earth
 * @returns {number} Weight on the target planet
 */
function calculateWeight(earthWeight, gravityMultiplier) {
    return earthWeight * gravityMultiplier;
}

/**
 * Calculate jump height on another planet
 * @param {number} earthJumpHeight - Jump height in inches on Earth
 * @param {number} gravityMultiplier - Planet's gravity relative to Earth
 * @returns {number} Jump height on the target planet
 */
function calculateJumpHeight(earthJumpHeight, gravityMultiplier) {
    return earthJumpHeight / gravityMultiplier;
}

// ========================================
// TESTING SECTION (Runs when file is executed)
// ========================================

// ========================================
// MODULE EXPORTS (for importing into other files)
// ========================================

module.exports = {
    planets,
    astronauts,
    calculateWeight,
    calculateJumpHeight
};

// ========================================
// TESTING SECTION (Runs when file is executed directly)
// ========================================

// Only run tests if this file is run directly with node
if (require.main === module) {
    console.log("🚀 ========================================");
    console.log("   PLANETARY CALCULATOR - Day 1 Tests");
    console.log("🚀 ========================================\n");

    // Make data available globally for experimentation
    global.planets = planets;
    global.astronauts = astronauts;
    global.calculateWeight = calculateWeight;
    global.calculateJumpHeight = calculateJumpHeight;

    console.log("💡 Data is now available globally! Try:")
    console.log("   astronauts[0].name")
    console.log("   calculateWeight(150, 0.38)")
    console.log("   planets[3].name\n");

    // Test 1: Basic calculations with Neil Armstrong on Mars
    console.log("📋 Test 1: Neil Armstrong on Mars");
    const neil = astronauts[0]; // First astronaut (Neil Armstrong)
    const mars = planets[3];    // Fourth planet (Mars)

    console.log(`Astronaut: ${neil.name}`);
    console.log(`Earth stats: ${neil.weight} lbs, ${neil.jumpHeight}" jump`);
    console.log(`Planet: ${mars.name} (${mars.gravity}x gravity)`);

    const marsWeight = calculateWeight(neil.weight, mars.gravity);
    const marsJump = calculateJumpHeight(neil.jumpHeight, mars.gravity);

    console.log(`Mars stats: ${marsWeight.toFixed(1)} lbs, ${marsJump.toFixed(1)}" jump\n`);

    // Test 2: Sally Ride on the Moon
    console.log("📋 Test 2: Sally Ride on the Moon");
    const sally = astronauts[1]; // Second astronaut (Sally Ride)
    const moon = planets[8];     // Last planet (Moon)

    console.log(`Astronaut: ${sally.name}`);
    console.log(`Earth stats: ${sally.weight} lbs, ${sally.jumpHeight}" jump`);
    console.log(`Planet: ${moon.name} (${moon.gravity}x gravity)`);

    const moonWeight = calculateWeight(sally.weight, moon.gravity);
    const moonJump = calculateJumpHeight(sally.jumpHeight, moon.gravity);

    console.log(`Moon stats: ${moonWeight.toFixed(1)} lbs, ${moonJump.toFixed(1)}" jump\n`);

    // Test 3: Show how to access data by object keys
    console.log("📋 Test 3: Accessing object properties");
    console.log("Available astronauts:");
    astronauts.forEach((astronaut, index) => {
        console.log(`  ${index}: ${astronaut.name} - ${astronaut.weight} lbs, ${astronaut.jumpHeight}" jump`);
    });

    console.log("\nAvailable planets:");
    planets.forEach((planet, index) => {
        console.log(`  ${index}: ${planet.name} - ${planet.gravity}x gravity`);
    });

    // Test 4: Try different combinations
    console.log("\n📋 Test 4: Multiple calculations");
    console.log("Chris Hadfield on different planets:");

    const chris = astronauts[2]; // Chris Hadfield
    [0, 3, 4, 8].forEach(planetIndex => { // Mercury, Mars, Jupiter, Moon
        const planet = planets[planetIndex];
        const weight = calculateWeight(chris.weight, planet.gravity);
        const jump = calculateJumpHeight(chris.jumpHeight, planet.gravity);
        console.log(`  ${planet.name}: ${weight.toFixed(1)} lbs, ${jump.toFixed(1)}" jump`);
    });

    console.log("\n✅ All tests completed! Try modifying the astronaut and planet indices to test different combinations.");
    console.log("💡 Next: We'll add string formatting and user input!");
}