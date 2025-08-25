const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Bee {
  constructor(
    color = "yellow",
    x = 200,
    y = 50,
    size = 10,
    speed = 2,
    direction = 1
  ) {
    this.color = color;
    // this.thing = default value
    // refactor: extract size, x and y to the parameters
    this.size = size;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
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
let myBee = new Bee("red");
let bigBlueBee = new Bee("blue", 10, 50, 100, 5);
// Animation loop
let frames = 0;
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myBee.update();
  bigBlueBee.update();
  frames++;
  //   console.log(frames);
  // Continue animation
  requestAnimationFrame(animate);
}

// Start animation
animate();
