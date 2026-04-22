const starsCanvas = document.querySelector(".bg-canvas");
const starsCtx = starsCanvas.getContext("2d");
starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

class Star {
  constructor(x, y, z, r) {
    this.x0 = x;
    this.y0 = y;
    this.x = x;
    this.y = y;
    this.z = z + 1;
    this.r = r / this.z;
    this.alpha = 1 / Math.pow(this.z, 2);
    this.movementMultiplier = (1 / Math.pow(this.z, 4)) * 0.1;
  }

  draw(fill) {
    starsCtx.globalAlpha = this.alpha;
    starsCtx.fillStyle = fill;
    starsCtx.beginPath();
    starsCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    starsCtx.fill();
  }

  move(mouseX, mouseY) {
    const xRelativeToCenter = mouseX - window.innerWidth / 2;
    const yRelativeToCenter = mouseY - window.innerHeight / 2;

    const dx = xRelativeToCenter * this.movementMultiplier;
    const dy = yRelativeToCenter * this.movementMultiplier;

    this.x = this.x0 + dx;
    this.y = this.y0 + dy;
  }
}

function createStars({ numOfStars, xMax, yMax, zMax, rMax }) {
  let stars = [];
  for (let i = 0; i < numOfStars; i++) {
    const x = Math.random() * xMax;
    const y = Math.random() * yMax;
    const z = Math.random() * zMax;
    const r = rMax;
    const newStar = new Star(x, y, z, r);
    stars.push(newStar);
  }
  return stars;
}

const stars = createStars({
  numOfStars: 500,
  xMax: starsCanvas.width,
  yMax: starsCanvas.height,
  zMax: 10,
  rMax: 2,
});

function drawStarsFrame() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  const fill = window
    .getComputedStyle(document.body)
    .getPropertyValue("--accent");
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw(fill);
  }
  requestAnimationFrame(drawStarsFrame);
}

document.addEventListener("mousemove", (event) => {
  for (let i = 0; i < stars.length; i++) {
    stars[i].move(event.clientX, event.clientY);
  }
});

function resizeStars() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  drawStarsFrame();
}
resizeStars();
window.addEventListener("resize", resizeStars);
