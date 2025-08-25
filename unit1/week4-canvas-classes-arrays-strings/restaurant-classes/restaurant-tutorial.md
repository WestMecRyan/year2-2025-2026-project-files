// RESTAURANT CLASSES TUTORIAL
// Let's build a restaurant using classes!

// 1. CHEF CLASS - The person who cooks food
```js
class Chef {
  constructor(name, specialty) {
    this.name = name;
    this.specialty = specialty;
    this.isAvailable = true;
  }

  cook(dish) {
    if (!this.isAvailable) {
      return `${this.name} is busy cooking something else!`;
    }

    this.isAvailable = false;
    console.log(`👨‍🍳 ${this.name} is now cooking ${dish}...`);

    // Simulate cooking time
    setTimeout(() => {
      this.isAvailable = true;
      console.log(`✅ ${dish} is ready!`);
    }, 2000);

    return `${this.name} started cooking ${dish}`;
  }

  introduce() {
    return `Hi! I'm Chef ${this.name}, I specialize in ${this.specialty}`;
  }
}

// 2. WAITER CLASS - The person who takes orders and serves food
class Waiter {
  constructor(name) {
    this.name = name;
    this.orders = []; // Array to keep track of orders
  }

  takeOrder(customerName, dish) {
    const order = {
      customer: customerName,
      dish: dish,
      timestamp: new Date(),
      status: 'received'
    };

    this.orders.push(order);
    console.log(`📝 ${this.name} took order: ${dish} for ${customerName}`);
    return order;
  }

  serveFood(customerName, dish) {
    console.log(`🍽️ ${this.name} is serving ${dish} to ${customerName}`);
    return `${dish} served to ${customerName}`;
  }

  getOrderHistory() {
    return this.orders;
  }
}

// 3. CUSTOMER CLASS - The people who visit the restaurant
class Customer {
  constructor(name, favoriteFood) {
    this.name = name;
    this.favoriteFood = favoriteFood;
    this.satisfaction = 0; // 0-10 scale
  }

  placeOrder(dish) {
    console.log(`🙋‍♂️ ${this.name} wants to order: ${dish}`);
    return dish;
  }

  receiveF食物(dish) {
    if (dish === this.favoriteFood) {
      this.satisfaction = 10;
      console.log(`😍 ${this.name} loves the ${dish}! Satisfaction: ${this.satisfaction}/10`);
    } else {
      this.satisfaction = 7;
      console.log(`😊 ${this.name} enjoys the ${dish}. Satisfaction: ${this.satisfaction}/10`);
    }
  }
}

// 4. RESTAURANT CLASS - Brings everything together
class Restaurant {
  constructor(name) {
    this.name = name;
    this.chefs = [];
    this.waiters = [];
    this.customers = [];
    this.isOpen = false;
  }

  addChef(chef) {
    this.chefs.push(chef);
    console.log(`👨‍🍳 ${chef.name} joined ${this.name}!`);
  }

  addWaiter(waiter) {
    this.waiters.push(waiter);
    console.log(`👨‍💼 ${waiter.name} joined ${this.name}!`);
  }

  openRestaurant() {
    this.isOpen = true;
    console.log(`🎉 ${this.name} is now OPEN for business!`);
  }

  closeRestaurant() {
    this.isOpen = false;
    console.log(`🔒 ${this.name} is now CLOSED. See you tomorrow!`);
  }

  serveCustomer(customer, dish) {
    if (!this.isOpen) {
      console.log(`❌ Sorry, ${this.name} is closed!`);
      return;
    }

    // Get available waiter and chef
    const waiter = this.waiters.find(w => w.name); // Just get first waiter for simplicity
    const chef = this.chefs.find(c => c.isAvailable);

    if (!waiter) {
      console.log(`❌ No waiters available!`);
      return;
    }

    if (!chef) {
      console.log(`❌ No chefs available!`);
      return;
    }

    // Process the order
    console.log(`\n=== Processing Order for ${customer.name} ===`);
    customer.placeOrder(dish);
    waiter.takeOrder(customer.name, dish);
    chef.cook(dish);

    // Simulate serving after cooking (in real app, you'd use promises/async)
    setTimeout(() => {
      waiter.serveFood(customer.name, dish);
      customer.receiveF食物(dish);
      console.log(`=== Order Complete! ===\n`);
    }, 2500);
  }
}

// 🎬 LET'S CREATE OUR RESTAURANT AND TEST IT!
console.log("=== WELCOME TO OUR RESTAURANT SIMULATION! ===\n");

// Create restaurant
const myRestaurant = new Restaurant("Bella Vista");

// Create staff
const chef1 = new Chef("Mario", "Italian cuisine");
const chef2 = new Chef("Sakura", "Japanese cuisine");
const waiter1 = new Waiter("Alice");
const waiter2 = new Waiter("Bob");

// Create customers
const customer1 = new Customer("John", "pizza");
const customer2 = new Customer("Emma", "sushi");

// Add staff to restaurant
myRestaurant.addChef(chef1);
myRestaurant.addChef(chef2);
myRestaurant.addWaiter(waiter1);
myRestaurant.addWaiter(waiter2);

// Open restaurant
myRestaurant.openRestaurant();

// Test individual classes
console.log("\n=== MEET OUR STAFF ===");
console.log(chef1.introduce());
console.log(chef2.introduce());

// Serve some customers
console.log("\n=== SERVING CUSTOMERS ===");
myRestaurant.serveCustomer(customer1, "pizza");

// Wait a bit then serve another customer
setTimeout(() => {
  myRestaurant.serveCustomer(customer2, "sushi");
}, 1000);

// Close restaurant after some time
setTimeout(() => {
  myRestaurant.closeRestaurant();
}, 5000);
```
/*
🎯 KEY CONCEPTS DEMONSTRATED:

1. CLASS DEFINITION: Each class represents a "blueprint" for creating objects
2. CONSTRUCTOR: Sets up initial properties when creating a new instance
3. METHODS: Functions that belong to the class (what objects can DO)
4. PROPERTIES: Variables that belong to the class (what objects HAVE)
5. INSTANCES: Actual objects created from the class blueprint
6. OBJECT INTERACTION: How different objects work together
7. ENCAPSULATION: Each class manages its own data and behavior

🏗️ TRY THESE EXERCISES:
1. Add a Menu class that stores available dishes and prices
2. Create a Manager class that can hire/fire staff
3. Add a Kitchen class that can handle multiple orders
4. Create a Reservation class for booking tables
5. Add methods to calculate total sales, tips, etc.
*/
# Menu
// ============================================
// FILE: menu.js (This would be a separate file)
// ============================================

// JavaScript doesn't have true enums, but we can create enum-like objects
// Using Object.freeze() makes it immutable (can't be changed)
```js
const MENU_ITEMS = Object.freeze({
  // Italian dishes
  PIZZA_MARGHERITA: {
    name: "Pizza Margherita",
    cuisine: "Italian",
    difficulty: 3,
    cookTime: 15,
    price: 18.99
  },
  SPAGHETTI_CARBONARA: {
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    difficulty: 4,
    cookTime: 20,
    price: 22.99
  },
  RISOTTO: {
    name: "Mushroom Risotto",
    cuisine: "Italian",
    difficulty: 5,
    cookTime: 25,
    price: 24.99
  },

  // Japanese dishes
  SUSHI_ROLL: {
    name: "California Roll",
    cuisine: "Japanese",
    difficulty: 4,
    cookTime: 10,
    price: 16.99
  },
  RAMEN: {
    name: "Tonkotsu Ramen",
    cuisine: "Japanese",
    difficulty: 5,
    cookTime: 30,
    price: 19.99
  },
  TEMPURA: {
    name: "Vegetable Tempura",
    cuisine: "Japanese",
    difficulty: 3,
    cookTime: 12,
    price: 15.99
  },

  // American dishes
  BURGER: {
    name: "Classic Cheeseburger",
    cuisine: "American",
    difficulty: 2,
    cookTime: 12,
    price: 16.99
  },
  STEAK: {
    name: "Grilled Ribeye Steak",
    cuisine: "American",
    difficulty: 4,
    cookTime: 18,
    price: 32.99
  }
});

// Helper functions for the menu
const MenuHelper = {
  // Get all dishes a chef can make based on their specialty
  getDishesForCuisine(cuisine) {
    return Object.values(MENU_ITEMS).filter(item => item.cuisine === cuisine);
  },

  // Find a dish by name (case insensitive)
  findDishByName(dishName) {
    return Object.values(MENU_ITEMS).find(
      item => item.name.toLowerCase() === dishName.toLowerCase()
    );
  },

  // Get all available dishes
  getAllDishes() {
    return Object.values(MENU_ITEMS);
  },

  // Check if a dish exists on the menu
  isDishAvailable(dishName) {
    return this.findDishByName(dishName) !== undefined;
  }
};

// Export for use in other files
// In Node.js you'd use: module.exports = { MENU_ITEMS, MenuHelper };
// In ES6 modules you'd use: export { MENU_ITEMS, MenuHelper };
// For this demo, we'll just make them available globally:
window.MENU_ITEMS = MENU_ITEMS;
window.MenuHelper = MenuHelper;

// ============================================
// FILE: restaurant.js (Updated with menu integration)
// ============================================

// In a real app, you'd import like this:
// const { MENU_ITEMS, MenuHelper } = require('./menu.js');  // Node.js
// import { MENU_ITEMS, MenuHelper } from './menu.js';       // ES6

// UPDATED CHEF CLASS with menu integration
class Chef {
  constructor(name, specialty) {
    this.name = name;
    this.specialty = specialty; // e.g., "Italian", "Japanese", "American"
    this.isAvailable = true;
    this.skillLevel = 5; // 1-5, affects what dishes they can make
  }

  // Get all dishes this chef can make
  getMyDishes() {
    return MenuHelper.getDishesForCuisine(this.specialty).filter(
      dish => dish.difficulty <= this.skillLevel
    );
  }

  // Check if chef can make a specific dish
  canMake(dishName) {
    const dish = MenuHelper.findDishByName(dishName);
    if (!dish) return false;

    return dish.cuisine === this.specialty && dish.difficulty <= this.skillLevel;
  }

  cook(dishName) {
    if (!this.isAvailable) {
      return `${this.name} is busy cooking something else!`;
    }

    // Check if the dish exists and chef can make it
    if (!MenuHelper.isDishAvailable(dishName)) {
      return `❌ Sorry, "${dishName}" is not on our menu!`;
    }

    if (!this.canMake(dishName)) {
      const dish = MenuHelper.findDishByName(dishName);
      if (dish.cuisine !== this.specialty) {
        return `❌ ${this.name} specializes in ${this.specialty} cuisine, not ${dish.cuisine}!`;
      } else {
        return `❌ ${this.name} needs more experience to make ${dishName} (difficulty ${dish.difficulty})!`;
      }
    }

    const dish = MenuHelper.findDishByName(dishName);
    this.isAvailable = false;
    console.log(`👨‍🍳 ${this.name} is now cooking ${dish.name}... (${dish.cookTime} mins)`);

    // Simulate cooking time based on dish complexity
    setTimeout(() => {
      this.isAvailable = true;
      console.log(`✅ ${dish.name} is ready! ($${dish.price})`);
    }, dish.cookTime * 100); // Scaled down for demo

    return `${this.name} started cooking ${dish.name}`;
  }

  introduce() {
    const myDishes = this.getMyDishes();
    const dishNames = myDishes.map(d => d.name).join(", ");
    return `Hi! I'm Chef ${this.name}, I specialize in ${this.specialty} cuisine. I can make: ${dishNames}`;
  }
}

// UPDATED RESTAURANT CLASS with menu validation
class Restaurant {
  constructor(name) {
    this.name = name;
    this.chefs = [];
    this.waiters = [];
    this.customers = [];
    this.isOpen = false;
  }

  addChef(chef) {
    this.chefs.push(chef);
    console.log(`👨‍🍳 ${chef.name} joined ${this.name}!`);
  }

  addWaiter(waiter) {
    this.waiters.push(waiter);
    console.log(`👨‍💼 ${waiter.name} joined ${this.name}!`);
  }

  openRestaurant() {
    this.isOpen = true;
    console.log(`🎉 ${this.name} is now OPEN for business!`);
    this.printMenu();
  }

  closeRestaurant() {
    this.isOpen = false;
    console.log(`🔒 ${this.name} is now CLOSED. See you tomorrow!`);
  }

  printMenu() {
    console.log(`\n📋 === ${this.name} MENU ===`);
    const allDishes = MenuHelper.getAllDishes();

    // Group by cuisine
    const cuisines = [...new Set(allDishes.map(d => d.cuisine))];

    cuisines.forEach(cuisine => {
      console.log(`\n🍴 ${cuisine.toUpperCase()} CUISINE:`);
      const cuisineDishes = allDishes.filter(d => d.cuisine === cuisine);
      cuisineDishes.forEach(dish => {
        console.log(`   ${dish.name} - $${dish.price} (${dish.cookTime} mins)`);
      });
    });
    console.log(`==========================================\n`);
  }

  // Find a chef who can make the requested dish
  findChefForDish(dishName) {
    return this.chefs.find(chef => chef.canMake(dishName) && chef.isAvailable);
  }

  serveCustomer(customer, dishName) {
    if (!this.isOpen) {
      console.log(`❌ Sorry, ${this.name} is closed!`);
      return;
    }

    // Check if dish exists on menu
    if (!MenuHelper.isDishAvailable(dishName)) {
      console.log(`❌ Sorry, "${dishName}" is not on our menu!`);
      return;
    }

    // Get available waiter and find chef who can make the dish
    const waiter = this.waiters.find(w => w.name);
    const chef = this.findChefForDish(dishName);

    if (!waiter) {
      console.log(`❌ No waiters available!`);
      return;
    }

    if (!chef) {
      console.log(`❌ No chefs available who can make ${dishName}!`);
      return;
    }

    // Process the order
    console.log(`\n=== Processing Order for ${customer.name} ===`);
    const orderResult = customer.placeOrder(dishName);
    waiter.takeOrder(customer.name, dishName);
    const cookResult = chef.cook(dishName);
    console.log(cookResult);

    if (!cookResult.includes('❌')) {
      const dish = MenuHelper.findDishByName(dishName);
      setTimeout(() => {
        waiter.serveFood(customer.name, dishName);
        customer.receiveFood(dishName);
        console.log(`💰 Total: $${dish.price}`);
        console.log(`=== Order Complete! ===\n`);
      }, dish.cookTime * 100 + 500);
    }
  }
}

// Keep existing Waiter and Customer classes (unchanged)
class Waiter {
  constructor(name) {
    this.name = name;
    this.orders = [];
  }

  takeOrder(customerName, dish) {
    const order = {
      customer: customerName,
      dish: dish,
      timestamp: new Date(),
      status: 'received'
    };

    this.orders.push(order);
    console.log(`📝 ${this.name} took order: ${dish} for ${customerName}`);
    return order;
  }

  serveFood(customerName, dish) {
    console.log(`🍽️ ${this.name} is serving ${dish} to ${customerName}`);
    return `${dish} served to ${customerName}`;
  }
}

class Customer {
  constructor(name, favoriteFood) {
    this.name = name;
    this.favoriteFood = favoriteFood;
    this.satisfaction = 0;
  }

  placeOrder(dish) {
    console.log(`🙋‍♂️ ${this.name} wants to order: ${dish}`);
    return dish;
  }

  receiveFood(dish) {
    if (dish.toLowerCase() === this.favoriteFood.toLowerCase()) {
      this.satisfaction = 10;
      console.log(`😍 ${this.name} loves the ${dish}! Satisfaction: ${this.satisfaction}/10`);
    } else {
      this.satisfaction = 7;
      console.log(`😊 ${this.name} enjoys the ${dish}. Satisfaction: ${this.satisfaction}/10`);
    }
  }
}

// 🎬 DEMO WITH MENU INTEGRATION
console.log("=== RESTAURANT WITH MENU SYSTEM ===\n");

// Create restaurant and staff
const restaurant = new Restaurant("Fusion Palace");

const italianChef = new Chef("Mario", "Italian");
const japaneseChef = new Chef("Sakura", "Japanese");
const americanChef = new Chef("Bobby", "American");

const waiter = new Waiter("Alice");

restaurant.addChef(italianChef);
restaurant.addChef(japaneseChef);
restaurant.addChef(americanChef);
restaurant.addWaiter(waiter);

// Create customers
const customer1 = new Customer("John", "Pizza Margherita");
const customer2 = new Customer("Emma", "California Roll");

restaurant.openRestaurant();

// Show what each chef can make
console.log("\n=== CHEF INTRODUCTIONS ===");
console.log(italianChef.introduce());
console.log(japaneseChef.introduce());
console.log(americanChef.introduce());

// Test valid orders
setTimeout(() => {
  restaurant.serveCustomer(customer1, "Pizza Margherita");
}, 1000);

setTimeout(() => {
  restaurant.serveCustomer(customer2, "California Roll");
}, 2000);

// Test invalid orders
setTimeout(() => {
  restaurant.serveCustomer(customer1, "Tacos"); // Not on menu
}, 3000);

setTimeout(() => {
  restaurant.serveCustomer(customer2, "Spaghetti Carbonara"); // Wrong chef specialty
}, 4000);

/*
🎯 KEY TEACHING CONCEPTS:

1. SEPARATION OF CONCERNS: Menu logic separate from restaurant logic
2. ENUMS/CONSTANTS: MENU_ITEMS as immutable reference data
3. MODULE IMPORTS: How to organize code across files
4. VALIDATION: Checking if dishes exist and chefs can make them
5. DATA STRUCTURES: Objects with multiple properties
6. HELPER FUNCTIONS: MenuHelper for common operations
7. BUSINESS LOGIC: Real-world constraints (chef specialty, skill level)

🏗️ STUDENT EXERCISES:
1. Add more cuisines (Mexican, French, etc.)
2. Create seasonal menus that change available dishes
3. Add ingredients system - chefs need specific ingredients
4. Implement chef leveling system - they get better over time
5. Add special dietary restrictions (vegan, gluten-free)
*/