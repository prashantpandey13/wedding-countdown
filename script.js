const weddingDate = new Date("April 20, 2026 00:00:00").getTime();

let prev = { d: null, h: null, m: null, s: null };

function animateChange(id, newVal, key) {
  if (prev[key] !== newVal) {
    const el = document.getElementById(id);

    el.classList.add("flip");

    setTimeout(() => {
      el.innerText = newVal;
      el.classList.remove("flip");
    }, 300);

    prev[key] = newVal;
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  animateChange("days", d, "d");
  animateChange("hours", h, "h");
  animateChange("minutes", m, "m");
  animateChange("seconds", s, "s");
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

  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  heart.style.fontSize = (15 + Math.random() * 20) + "px";
  heart.style.pointerEvents = "none";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(createHeart, 800); // slower = more premium

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

// 💘 Cupid impact sequence (runs once)
setTimeout(() => {
  const heart = document.querySelector(".main-heart");
  const wrap = document.querySelector(".heart-wrap");

  if (!heart || !wrap) return;

  // Activate heartbeat + glow
  heart.classList.add("heart-beat");

  // ✨ Spark burst (controlled, not noisy)
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement("div");
    spark.innerHTML = "✨";

    spark.style.position = "absolute";
    spark.style.left = "50%";
    spark.style.top = "50%";
    spark.style.transform = `translate(-50%, -50%) rotate(${i * 45}deg)`;
    spark.style.fontSize = "12px";
    spark.style.pointerEvents = "none";

    wrap.appendChild(spark);

    setTimeout(() => spark.remove(), 800);
  }

}, 1800);

const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicToggle");

let isPlaying = false;

btn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    btn.innerText = "🔇";
  } else {
    music.play();
    btn.innerText = "🎶";
  }
  isPlaying = !isPlaying;
});

