// main.js - Interactive Planetary Calculator with Node.js prompts
const readline = require("readline");

// ========================================
// CALCULATOR CLASSES (from previous artifact)
// ========================================

class Planet {
  #name;
  #gravityMultiplier;

  constructor(name, gravityMultiplier) {
    this.#name = name;
    this.#gravityMultiplier = gravityMultiplier;
  }

  getName() {
    return this.#name;
  }

  getGravity() {
    return this.#gravityMultiplier;
  }

  calculateWeight(earthWeight) {
    return earthWeight * this.#gravityMultiplier;
  }

  calculateJumpHeight(earthJumpHeight) {
    return earthJumpHeight / this.#gravityMultiplier;
  }

  describe() {
    return `${this.#name} (${this.#gravityMultiplier}x Earth gravity)`;
  }
}

class Person {
  #name;
  #earthWeight;
  #earthJumpHeight;

  constructor(name, earthWeight, earthJumpHeight) {
    this.#name = name;
    this.#earthWeight = earthWeight;
    this.#earthJumpHeight = earthJumpHeight;
  }

  getName() {
    return this.#name;
  }

  getEarthWeight() {
    return this.#earthWeight;
  }

  getEarthJumpHeight() {
    return this.#earthJumpHeight;
  }

  describe() {
    return `${this.#name}: ${this.#earthWeight} lbs, ${
      this.#earthJumpHeight
    }" vertical jump`;
  }
}

class PlanetaryStats {
  #person;
  #planet;
  #weight;
  #jumpHeight;

  constructor(person, planet, weight, jumpHeight) {
    this.#person = person;
    this.#planet = planet;
    this.#weight = weight;
    this.#jumpHeight = jumpHeight;
  }

  getPerson() {
    return this.#person;
  }

  getPlanet() {
    return this.#planet;
  }

  getWeight() {
    return this.#weight;
  }

  getJumpHeight() {
    return this.#jumpHeight;
  }

  getWeightDifference() {
    return this.#weight - this.#person.getEarthWeight();
  }

  getJumpDifference() {
    return this.#jumpHeight - this.#person.getEarthJumpHeight();
  }

  formatWeight() {
    return `${this.#weight.toFixed(1)} lbs`;
  }

  formatJumpHeight() {
    return `${this.#jumpHeight.toFixed(1)}"`;
  }

  describe() {
    const weightChange = this.getWeightDifference();
    const jumpChange = this.getJumpDifference();

    const weightDirection = weightChange > 0 ? "heavier" : "lighter";
    const jumpDirection = jumpChange > 0 ? "higher" : "lower";

    return `🌍 On ${this.#planet.getName()}:
   Weight: ${this.formatWeight()} (${Math.abs(weightChange).toFixed(
      1
    )} lbs ${weightDirection} than Earth)
   Jump Height: ${this.formatJumpHeight()} (${Math.abs(jumpChange).toFixed(
      1
    )}" ${jumpDirection} than Earth)`;
  }
}

class PlanetaryCalculator {
  #planets;

  constructor() {
    this.#planets = new Map();
    this.#initializePlanets();
  }

  #initializePlanets() {
    this.addPlanet(new Planet("Mercury", 0.38));
    this.addPlanet(new Planet("Venus", 0.91));
    this.addPlanet(new Planet("Earth", 1.0));
    this.addPlanet(new Planet("Mars", 0.38));
    this.addPlanet(new Planet("Jupiter", 2.36));
    this.addPlanet(new Planet("Saturn", 0.92));
    this.addPlanet(new Planet("Uranus", 0.89));
    this.addPlanet(new Planet("Neptune", 1.13));
    this.addPlanet(new Planet("Moon", 0.17));
    this.addPlanet(new Planet("Sun", 27.5));
  }

  addPlanet(planet) {
    this.#planets.set(planet.getName().toLowerCase(), planet);
  }

  getPlanet(planetName) {
    return this.#planets.get(planetName.toLowerCase());
  }

  getAvailablePlanets() {
    return Array.from(this.#planets.values());
  }

  calculateStats(person, planetName) {
    const planet = this.getPlanet(planetName);
    if (!planet) {
      throw new Error(`Planet "${planetName}" not found`);
    }

    const planetWeight = planet.calculateWeight(person.getEarthWeight());
    const planetJumpHeight = planet.calculateJumpHeight(
      person.getEarthJumpHeight()
    );

    return new PlanetaryStats(person, planet, planetWeight, planetJumpHeight);
  }

  compareAllPlanets(person) {
    const results = [];
    for (const planet of this.#planets.values()) {
      const stats = new PlanetaryStats(
        person,
        planet,
        planet.calculateWeight(person.getEarthWeight()),
        planet.calculateJumpHeight(person.getEarthJumpHeight())
      );
      results.push(stats);
    }
    return results.sort(
      (a, b) => a.getPlanet().getGravity() - b.getPlanet().getGravity()
    );
  }
}

// ========================================
// INTERACTIVE CLI CLASS
// ========================================

class InteractiveCLI {
  #calculator;
  #rl;
  #currentPerson;

  constructor() {
    this.#calculator = new PlanetaryCalculator();
    this.#rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.#currentPerson = null;
  }

  // Promise-based question wrapper
  ask(question) {
    return new Promise((resolve) => {
      this.#rl.question(question, resolve);
    });
  }

  // Display welcome message
  displayWelcome() {
    console.clear();
    console.log("🚀 =====================================");
    console.log("   PLANETARY WEIGHT & JUMP CALCULATOR");
    console.log("🚀 =====================================\n");
    console.log(
      "Discover how much you would weigh and how high you could jump"
    );
    console.log("on different planets in our solar system!\n");
  }

  // Get user information
  async getUserInfo() {
    console.log("📋 First, let's get your information:\n");

    const name = await this.ask("👤 What's your name? ");

    let weight;
    while (true) {
      const weightInput = await this.ask("⚖️  What's your weight in pounds? ");
      weight = parseFloat(weightInput);
      if (!isNaN(weight) && weight > 0) {
        break;
      }
      console.log("❌ Please enter a valid positive number for weight.");
    }

    let jumpHeight;
    while (true) {
      const jumpInput = await this.ask(
        "🦘 What's your vertical jump height in inches? (If unsure, try 24) "
      );
      jumpHeight = parseFloat(jumpInput);
      if (!isNaN(jumpHeight) && jumpHeight > 0) {
        break;
      }
      console.log("❌ Please enter a valid positive number for jump height.");
    }

    this.#currentPerson = new Person(name, weight, jumpHeight);
    console.log(`\n✅ Got it! ${this.#currentPerson.describe()}\n`);
  }

  // Display available planets
  displayPlanets() {
    console.log("🌌 Available planets and celestial bodies:\n");
    const planets = this.#calculator.getAvailablePlanets();
    planets.forEach((planet, index) => {
      console.log(`   ${index + 1}. ${planet.describe()}`);
    });
    console.log("");
  }

  // Get planet choice
  async getPlanetChoice() {
    this.displayPlanets();

    const planets = this.#calculator.getAvailablePlanets();
    let choice;

    while (true) {
      const input = await this.ask(
        "🌍 Choose a planet (enter name or number): "
      );

      // Check if it's a number
      const num = parseInt(input);
      if (!isNaN(num) && num >= 1 && num <= planets.length) {
        choice = planets[num - 1].getName();
        break;
      }

      // Check if it's a planet name
      const planet = this.#calculator.getPlanet(input);
      if (planet) {
        choice = planet.getName();
        break;
      }

      console.log(
        "❌ Invalid choice. Please enter a valid planet name or number."
      );
    }

    return choice;
  }

  // Calculate and display results
  async calculateAndDisplay(planetName) {
    try {
      const stats = this.#calculator.calculateStats(
        this.#currentPerson,
        planetName
      );

      console.log("\n🎯 =====================================");
      console.log("           CALCULATION RESULTS");
      console.log("🎯 =====================================\n");

      console.log(stats.describe());

      // Add some fun facts
      this.addFunFacts(stats);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }

  // Add interesting comparisons
  addFunFacts(stats) {
    const planet = stats.getPlanet();
    const weightRatio =
      stats.getWeight() / this.#currentPerson.getEarthWeight();
    const jumpRatio =
      stats.getJumpHeight() / this.#currentPerson.getEarthJumpHeight();

    console.log("\n🔍 Fun Facts:");

    if (weightRatio < 0.5) {
      console.log(
        `   💡 You'd weigh less than half your Earth weight on ${planet.getName()}!`
      );
    } else if (weightRatio > 2) {
      console.log(
        `   💡 You'd weigh more than double your Earth weight on ${planet.getName()}!`
      );
    }

    if (jumpRatio > 3) {
      console.log(
        `   🦘 You could jump more than 3x higher on ${planet.getName()}!`
      );
    } else if (jumpRatio < 0.5) {
      console.log(
        `   🦘 Your jumping ability would be severely limited on ${planet.getName()}.`
      );
    }

    if (planet.getName() === "Moon") {
      console.log(
        "   🌙 This is why astronauts could hop so easily on the Moon!"
      );
    } else if (planet.getName() === "Jupiter") {
      console.log("   🪐 Jupiter's gravity would make walking very difficult!");
    } else if (planet.getName() === "Sun") {
      console.log(
        "   ☀️  The Sun's gravity is so strong you could barely move!"
      );
    }
  }

  // Main menu for additional options
  async showMainMenu() {
    while (true) {
      console.log("\n📋 What would you like to do next?");
      console.log("   1. Try another planet");
      console.log("   2. Compare all planets");
      console.log("   3. Enter new person data");
      console.log("   4. Quit");

      const choice = await this.ask("\n👆 Enter your choice (1-4): ");

      switch (choice) {
        case "1":
          const planetName = await this.getPlanetChoice();
          await this.calculateAndDisplay(planetName);
          break;

        case "2":
          await this.compareAllPlanets();
          break;

        case "3":
          await this.getUserInfo();
          break;

        case "4":
          console.log(
            "\n👋 Thanks for using the Planetary Calculator! Goodbye!"
          );
          this.close();
          return;

        default:
          console.log("❌ Invalid choice. Please enter 1, 2, 3, or 4.");
      }
    }
  }

  // Compare all planets
  async compareAllPlanets() {
    console.log("\n🌌 =====================================");
    console.log("      COMPARISON: ALL PLANETS");
    console.log("🌌 =====================================\n");

    const results = this.#calculator.compareAllPlanets(this.#currentPerson);

    results.forEach((stats, index) => {
      console.log(`${index + 1}. ${stats.describe()}`);
      console.log("");
    });

    // Find extremes
    const sortedByWeight = [...results].sort(
      (a, b) => a.getWeight() - b.getWeight()
    );
    const sortedByJump = [...results].sort(
      (a, b) => b.getJumpHeight() - a.getJumpHeight()
    );

    console.log("🏆 EXTREMES:");
    console.log(
      `   Lightest: ${sortedByWeight[0]
        .getPlanet()
        .getName()} (${sortedByWeight[0].formatWeight()})`
    );
    console.log(
      `   Heaviest: ${sortedByWeight[sortedByWeight.length - 1]
        .getPlanet()
        .getName()} (${sortedByWeight[
        sortedByWeight.length - 1
      ].formatWeight()})`
    );
    console.log(
      `   Highest Jump: ${sortedByJump[0]
        .getPlanet()
        .getName()} (${sortedByJump[0].formatJumpHeight()})`
    );
    console.log(
      `   Lowest Jump: ${sortedByJump[sortedByJump.length - 1]
        .getPlanet()
        .getName()} (${sortedByJump[
        sortedByJump.length - 1
      ].formatJumpHeight()})`
    );
  }

  // Main application flow
  async run() {
    try {
      this.displayWelcome();
      await this.getUserInfo();

      const planetName = await this.getPlanetChoice();
      await this.calculateAndDisplay(planetName);

      await this.showMainMenu();
    } catch (error) {
      console.log(`\n💥 An unexpected error occurred: ${error.message}`);
      this.close();
    }
  }

  // Clean up
  close() {
    this.#rl.close();
  }
}

// ========================================
// APPLICATION ENTRY POINT
// ========================================

async function main() {
  const app = new InteractiveCLI();

  // Handle Ctrl+C gracefully
  process.on("SIGINT", () => {
    console.log("\n\n👋 Goodbye!");
    app.close();
    process.exit(0);
  });

  await app.run();
}

// Start the application
if (require.main === module) {
  main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

// Export for testing
module.exports = {
  Planet,
  Person,
  PlanetaryCalculator,
  PlanetaryStats,
  InteractiveCLI,
};
