// --- Generar ID aleatorio ---
function generarID(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for(let i=0; i<length; i++){
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// --- Obtener parámetros URL ---
function getParams() {
  const params = {};
  window.location.search
    .substring(1)
    .split("&")
    .forEach(pair => {
      const [key, value] = pair.split("=");
      params[key] = decodeURIComponent(value || '');
    });
  return params;
}

// --- Función confeti ---
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
    confetti.forEach(c => {
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

// --- Si estamos en mensaje.html ---
const cajaRegalo = document.getElementById("caja-regalo");
if (cajaRegalo) {
  cajaRegalo.addEventListener("click", () => {
    // Animar la caja
    cajaRegalo.classList.add("abrir");

    // Esperar que termine la animación antes de mostrar mensaje
    setTimeout(() => {
      document.getElementById("regalo-screen").style.display = "none";
      document.getElementById("mensaje-screen").style.display = "block";

      const params = getParams();
      const id = params.id;
      const mensajeData = JSON.parse(localStorage.getItem('mensajes') || '{}')[id];

      if (mensajeData) {
        document.getElementById("saludo").textContent = `Hola ${mensajeData.destino}!`;
        document.getElementById("contenido").textContent = mensajeData.mensaje;
        startConfetti();
      } else {
        document.getElementById("saludo").textContent = "Mensaje no encontrado 😢";
        document.getElementById("contenido").textContent = "";
      }
    }, 1000); // duración de la animación
  });
}

// --- Si estamos en index.html ---
const form = document.getElementById("mensajeForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get("nombre");
    const destino = data.get("destino");
    const mensaje = data.get("mensaje");

    const id = generarID();
    const mensajes = JSON.parse(localStorage.getItem('mensajes') || '{}');
    mensajes[id] = { nombre, destino, mensaje };
    localStorage.setItem('mensajes', JSON.stringify(mensajes));

    const url = `mensaje.html?id=${id}`;
    const enlaceDiv = document.getElementById("enlace");
    enlaceDiv.innerHTML = `Tu enlace está listo: <a href="${url}" target="_blank">${url}</a>`;
  });
}







