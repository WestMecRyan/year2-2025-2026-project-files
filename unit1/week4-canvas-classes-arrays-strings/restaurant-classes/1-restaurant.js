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

module.exports = Chef;