class Cookie {
    #color;
    #secretIngredient = "sugar!";
    constructor(color) {
        this.#color = color;
    }
    getColor() {
        console.log(this.#color);
    }
    setColor(newColor) {
        this.#color = newColor;
    }
}
module.exports = Cookie;