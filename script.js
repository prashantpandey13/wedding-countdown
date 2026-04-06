const weddingDate = new Date("April 20, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  const values = [
    Math.floor(diff / (1000 * 60 * 60 * 24)),
    Math.floor((diff / (1000 * 60 * 60)) % 24),
    Math.floor((diff / (1000 * 60)) % 60),
    Math.floor((diff / 1000) % 60)
  ];

  const labels = ["Days", "Hours", "Minutes", "Seconds"];

  const container = document.getElementById("countdown");

  container.innerHTML = values.map((val, i) => `
    <div class="time-box">
      ${val}<br>${labels[i]}
    </div>
  `).join("");

  document.querySelectorAll(".time-box").forEach(box => {
    box.classList.add("pop");
    setTimeout(() => box.classList.remove("pop"), 200);
  });
}

setInterval(updateCountdown, 1000);

updateCountdown();

/* 🎊 Simple Confetti Effect */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

for (let i = 0; i < 100; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 100
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  pieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  update();
}

function update() {
  pieces.forEach(p => {
    p.y += 1;
    if (p.y > canvas.height) p.y = 0;
  });
}

setInterval(draw, 30);

const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (3 + Math.random() * 5) + "s";
  heart.style.fontSize = (15 + Math.random() * 20) + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 500);

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.innerHTML = "✨";
  sparkle.style.position = "fixed";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";
  sparkle.style.opacity = Math.random();

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 2000);
}

setInterval(createSparkle, 800);

function firecracker() {
  const fire = document.createElement("div");
  fire.innerHTML = "🎆";
  fire.style.position = "fixed";
  fire.style.left = Math.random() * 100 + "vw";
  fire.style.top = Math.random() * 80 + "vh";
  fire.style.fontSize = "30px";

  document.body.appendChild(fire);

  setTimeout(() => fire.remove(), 1500);
}

setInterval(firecracker, 7000);
