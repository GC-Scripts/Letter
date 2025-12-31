function startConfetti() {
  const canvas = document.getElementById("confeti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 150;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c, i) => {
      ctx.beginPath();
      ctx.lineWidth = c.r / 2;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
      ctx.stroke();
      c.tilt += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d) + 3 + c.r/2)/2;

      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(draw);
  }

  draw();
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
