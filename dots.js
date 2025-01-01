
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const gridSize = 40; // Distance between dots
const maxDotSize = 15; // Maximum dot size
const baseDotSize = 2; // Minimum dot size
const effectRadius = 200; // Radius of effect around the cursor
let dotColour = window.getComputedStyle(document.documentElement).getPropertyValue('--contrast').trim();

let dots = [];
let mouseX = null;
let mouseY = null;

// Resize canvas to fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDots();
}

// Generate dots on a grid
function createDots() {
    dots = [];
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            dots.push({ x, y });
        }
    }
}

// Draw dots with dynamic sizing based on mouse proximity
function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
    const distance = mouseX !== null && mouseY !== null 
        ? Math.hypot(mouseX - dot.x, mouseY - dot.y)
        : Infinity;
    const size = distance < effectRadius 
        ? baseDotSize + (maxDotSize - baseDotSize) * (1 - distance / effectRadius)
        : baseDotSize;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${dotColour}, 0.05)`;
    ctx.fill();
    });
}

// Animation loop
function animate() {
    drawDots();
    requestAnimationFrame(animate);
}

// Update mouse position
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Clear mouse position on leaving canvas
canvas.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
});

// Initialize canvas and animation
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();