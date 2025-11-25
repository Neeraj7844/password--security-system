const canvas = document.getElementById("bgAnim");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* --------- PARTICLES --------- */
let particles = [];
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.speedY = (Math.random() - 0.5) * 0.7;
    this.alpha = Math.random() * 0.5 + 0.4;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    ) {
      this.reset();
    }
  }
  draw() {
    ctx.fillStyle = `rgba(56,189,248,${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --------- FLOATING LINES --------- */
let lines = [];
class FloatingLine {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = Math.random() * 140 + 40;
    this.speed = Math.random() * 1 + 0.3;
    this.alpha = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y -= this.speed;
    if (this.y + this.length < 0) {
      this.y = canvas.height + Math.random() * 200;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    const grd = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x,
      this.y + this.length
    );
    grd.addColorStop(0, `rgba(99,102,241,${this.alpha})`);
    grd.addColorStop(1, `rgba(168,85,247,0)`);

    ctx.strokeStyle = grd;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

/* --------- PULSE WAVES --------- */
let pulseRadius = 0;
function drawPulse() {
  pulseRadius += 0.5;
  if (pulseRadius > 450) pulseRadius = 0;

  const grd = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    pulseRadius * 0.2,
    canvas.width / 2,
    canvas.height / 2,
    pulseRadius
  );
  grd.addColorStop(0, "rgba(59,130,246,0.15)");
  grd.addColorStop(1, "rgba(59,130,246,0)");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* --------- CLOUD EFFECT --------- */
let cloudOffset = 0;
function drawClouds() {
  cloudOffset += 0.002;

  const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, `rgba(30,58,138,${0.25 + Math.sin(cloudOffset) * 0.15})`);
  grd.addColorStop(1, `rgba(17,24,39,${0.25 + Math.cos(cloudOffset) * 0.15})`);

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* --------- INIT --------- */
function init() {
  particles = [];
  for (let i = 0; i < 80; i++) particles.push(new Particle());

  lines = [];
  for (let i = 0; i < 25; i++) lines.push(new FloatingLine());
}

/* --------- ANIMATION LOOP --------- */
function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = "rgba(2,6,23,0.75)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawClouds();
  drawPulse();

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  lines.forEach((l) => {
    l.update();
    l.draw();
  });
}

init();
animate();
