// restaurant.js
const MENU_ITEMS = require('./menu-items.js');

class Chef {
    constructor(chefName = 'Chef', specialDish = 'Soup') {
        this.chefName = chefName;
        this.specialDish = specialDish;
    }

    cook(dish = this.specialDish) {
        console.log(`Chef ${this.chefName} is cooking ${dish}`);
        setTimeout(() => {
            console.log(`${dish} is ready!`);
        }, 2000);
    }

    getMenu() {
        console.log("Here's our menu:");
        Object.values(MENU_ITEMS).forEach(item => {
            console.log(item.dishName);
        });
    }
}

class Customer {
    constructor(customerName = 'Guest', favoriteFood = 'Hotdogs') {
        this.customerName = customerName;
        this.favoriteFood = favoriteFood;
    }

    requestMenu(chef) {
        console.log(`${this.customerName}: May I see a menu please?`);
        chef.getMenu();
    }

    requestSpecial(chef) {
        console.log(`${this.customerName}: I would like the special please!`);
        chef.cook();
    }
}

// Example usage:
const chef = new Chef('Mario', 'Pizza Margherita');
const customer = new Customer('Alice', 'Pizza');

customer.requestMenu(chef);

module.exports = Chef;