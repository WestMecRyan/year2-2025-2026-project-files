// restaurant.js
const MENU_ITEMS = require('./menu-items.js');

class Chef {
    constructor(chefName = 'Chef', specialDish = 'Soup') {
        this.chefName = chefName;
        this.specialDish = specialDish
     }
    cook(dish = this.specialDish) {
        console.log(`Chef ${this.chefName} is cooking ${dish}`);
        setTimeout(() => {
            console.log(`${dish} is ready!`);
        }, 2000);
    }
}

class Customer {
    constructor(customerName = 'Guest', favoriteFood = 'Hotdogs') {
        this.customerName = customerName;
        this.favoriteFood = favoriteFood;
    }
    requestMeal() {
        // ask the chef if they can cook their favoriteFood
        // if chef can't then chef responds with the menu item names
    }
}

module.exports = Chef;