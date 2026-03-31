const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
const fontSize = 16;
const columns = Math.floor(width / fontSize);

const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

let mouseX = width / 2;
let mouseY = height / 2;

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Calculate distance to mouse
    const dx = x - mouseX;
    const dy = y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Light up characters near the mouse
    if (distance < 200) {
      const opacity = 1 - (distance / 200);
      ctx.fillStyle = `rgba(0, 255, 65, ${Math.max(0.5, opacity)})`;
      ctx.shadowBlur = 10 * opacity;
      ctx.shadowColor = 'rgba(0, 255, 65, 0.8)';
    } else {
      ctx.fillStyle = '#0F0';
      ctx.shadowBlur = 0;
    }

    ctx.fillText(text, x, y);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  // Draw the "Guiding Light" halo
  const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
  gradient.addColorStop(0, 'rgba(0, 255, 65, 0.15)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

setInterval(draw, 33);
