const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Bee {
  constructor({ x = 10, y = 10, speed = 2, color = "yellow", size = 20 } = {}) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = 1; // 1 for up, -1 for down
    this.size = size;
    this.color = color;
    this.image = new Image();
    this.imageLoaded = false;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    this.image.src = "./bee.png";
  }

  draw() {
    if (this.imageLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  fly() {
    // Move bee up and down
    this.y += this.speed * this.direction;

    // Bounce off top and bottom
    if (this.y <= 0 || this.y >= canvas.height - this.size) {
      this.direction *= -1;
    }
  }

  update() {
    this.fly();
    this.draw();
  }
}

// Create a bee
const yellowBee = new Bee({
  x: 75,
  y: 50,
  speed: 2,
  color: "yellow",
  size: 50,
});
const blueBee = new Bee({ color: "blue" });
// Animation loop
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw bee
  yellowBee.update();
  blueBee.update();
  // Continue animation
  requestAnimationFrame(animate);
}

// Start animation
animate();
