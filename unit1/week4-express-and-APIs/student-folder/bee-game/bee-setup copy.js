const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Bee {
  constructor() {}

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  fly() {
    // Move bee up and down
    // this.y += this.speed * this.direction;
    // Bounce off top and bottom
    // if (this.y <= 0 || this.y >= canvas.height - this.size) {
    //   this.direction *= -1;
    // }
  }

  update() {
    this.fly();
    this.draw();
  }
}

// Create a bee
// Animation loop
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Continue animation
  requestAnimationFrame(animate);
}

// Start animation
animate();
