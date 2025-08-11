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
  { name: "Moon", gravity: 0.17 },
];

// Astronaut data as array of objects
const astronauts = [
  { name: "Neil Armstrong", weight: 165, jumpHeight: 20 },
  { name: "Sally Ride", weight: 130, jumpHeight: 22 },
  { name: "Chris Hadfield", weight: 180, jumpHeight: 18 },
  { name: "Mae Jemison", weight: 140, jumpHeight: 25 },
];

// ========================================
// CALCULATION FUNCTIONS
// ========================================

function calculateWeight(earthWeight, gravityMultiplier) {
  return earthWeight * gravityMultiplier;
}

function calculateJumpHeight(earthJumpHeight, gravityMultiplier) {
  return earthJumpHeight / gravityMultiplier;
}

// ========================================
// MODULE EXPORTS (for importing into other files)
// ========================================

module.exports = {
  planets,
  astronauts,
  calculateWeight,
  calculateJumpHeight,
};

globalThis.planets = planets;
globalThis.astronauts = astronauts;
globalThis.calculateWeight = calculateWeight;
globalThis.calculateJumpHeight = calculateJumpHeight;
