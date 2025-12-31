document.addEventListener("DOMContentLoaded", () => {
  // --- Ajuste para GitHub Pages ---
  const basePath = "/TU_REPO"; // ✅ reemplaza con el nombre de tu repositorio si usas GitHub Pages

  function setupCanvas(canvas) {
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    const width = window.innerWidth;
    const height = document.body.scrollHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width, height };
  }

  function getParams() {
    const params = {};
    const query = window.location.search.substring(1);
    if (!query) return params;
    query.split("&").forEach(pair => {
      const [key, value] = pair.split("=");
      if (key) params[key] = decodeURIComponent(value || "");
    });
    return params;
  }

  function startFondoCorazones() {
    const canvas = document.getElementById("fondo-corazones");
    if (!canvas) return;
    let { ctx, width, height } = setupCanvas(canvas);

    const hearts = [];
    const count = width < 480 ? 20 : 35;

    function resetHearts() {
      hearts.length = 0;
      for (let i = 0; i < count; i++) {
        hearts.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 26 + 14,
          speedY: Math.random() * 0.5 + 0.2,
          driftAmp: Math.random() * 0.4 + 0.15,
          angle: Math.random() * Math.PI * 2,
          color: "rgba(255,0,100,0.28)"
        });
      }
    }

    function drawHeart(x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, 0);
      ctx.bezierCurveTo(-size, size / 2, 0, size * 0.75, 0, size);
      ctx.bezierCurveTo(0, size * 0.75, size, size / 2, size, 0);
      ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const h of hearts) {
        h.y += h.speedY;
        h.x += Math.sin(h.angle) * h.driftAmp;
        h.angle += 0.01;
        drawHeart(h.x, h.y, h.size, h.color);
        if (h.y > height + h.size) {
          h.y = -h.size;
          h.x = Math.random() * width;
          h.angle = Math.random() * Math.PI * 2;
        }
      }
      requestAnimationFrame(animate);
    }

    resetHearts();
    animate();

    window.addEventListener("resize", () => {
      ({ ctx, width, height } = setupCanvas(canvas));
      resetHearts();
    }, { passive: true });
  }

  function startConfeti() {
    const canvas = document.getElementById("confeti");
    if (!canvas) return;
    let { ctx, width, height } = setupCanvas(canvas);

    const hearts = [];
    const count = 80;

    function resetHearts() {
      hearts.length = 0;
      for (let i = 0; i < count; i++) {
        hearts.push({
          x: Math.random() * width,
          y: Math.random() * height - height,
          size: Math.random() * 18 + 10,
          speedY: Math.random() * 2 + 1.2,
          driftAmp: Math.random() * 0.8 + 0.3,
          angle: Math.random() * Math.PI * 2,
          color: "rgba(255,0,90,0.95)"
        });
      }
    }

    function drawHeart(x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, 0);
      ctx.bezierCurveTo(-size, size / 2, 0, size * 0.75, 0, size);
      ctx.bezierCurveTo(0, size * 0.75, size, size / 2, size, 0);
      ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const h of hearts) {
        h.y += h.speedY;
        h.x += Math.sin(h.angle) * h.driftAmp;
        h.angle += 0.015;
        drawHeart(h.x, h.y, h.size, h.color);
        if (h.y > height + h.size) {
          h.y = -h.size;
          h.x = Math.random() * width;
          h.angle = Math.random() * Math.PI * 2;
        }
      }
      requestAnimationFrame(animate);
    }

    resetHearts();
    animate();

    window.addEventListener("resize", () => {
      ({ ctx, width, height } = setupCanvas(canvas));
      resetHearts();
    }, { passive: true });
  }

  startFondoCorazones();

  const btnAbrir = document.getElementById("abrir-regalo");
  if (btnAbrir) {
    btnAbrir.addEventListener("click", () => {
      const regalo = document.querySelector(".regalo-screen");
      const overlay = document.getElementById("mensaje-screen");
      const card = document.getElementById("mensaje-card");

      if (regalo) regalo.style.display = "none";
      if (overlay) overlay.style.display = "block";
      if (card) card.classList.add("show");

      const params = getParams();
      const id = params.id;
      const mensajes = JSON.parse(localStorage.getItem('mensajes') || '{}');
      const mensajeData = mensajes[id];

      if (mensajeData) {
        document.getElementById("saludo").textContent = `Hola ${mensajeData.destino}!`;
        document.getElementById("contenido").textContent = mensajeData.mensaje;
        startConfeti();
      } else {
        document.getElementById("saludo").textContent = "Mensaje no encontrado 😢";
        document.getElementById("contenido").textContent = "";
      }
    });
  }

  const form = document.getElementById("mensajeForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const nombre = data.get("nombre");
      const destino = data.get("destino");
      const mensaje = data.get("mensaje");

      const id = Math.random().toString(36).substr(2, 6);
      const mensajes = JSON.parse(localStorage.getItem('mensajes') || '{}');
      mensajes[id] = { nombre, destino, mensaje };
      localStorage.setItem('mensajes', JSON.stringify(mensajes));

      const url = `${window.location.origin}${basePath}/mensaje.html?id=${id}`;
      document.getElementById("enlace").innerHTML =
        `Tu enlace está listo: <a href="${url}" target="_blank">${url}</a>`;
    });
  }
});













