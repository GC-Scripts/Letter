document.addEventListener("DOMContentLoaded", () => {

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

  // --- Confeti + corazones ---
  function startConfetti() {
    const canvas = document.getElementById("confeti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const count = 150;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * count,
        color: Math.random() > 0.7 ? 'red' : `hsl(${Math.random()*360}, 100%, 60%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        shape: Math.random() > 0.7 ? 'heart' : 'line'
      });
    }

    function drawHeart(x, y, size) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - size/2, x - size, y - size/2, x - size, y);
      ctx.bezierCurveTo(x - size, y + size/2, x, y + size/1.5, x, y + size);
      ctx.bezierCurveTo(x, y + size/1.5, x + size, y + size/2, x + size, y);
      ctx.bezierCurveTo(x + size, y - size/2, x, y - size/2, x, y);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(c => {
        if(c.shape === 'heart') {
          drawHeart(c.x, c.y, c.r);
        } else {
          ctx.beginPath();
          ctx.lineWidth = c.r/2;
          ctx.strokeStyle = c.color;
          ctx.moveTo(c.x + c.tilt + c.r/4, c.y);
          ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/4);
          ctx.stroke();
        }
        c.tilt += c.tiltAngleIncrement;
        c.y += (Math.cos(c.d) + 3 + c.r/2)/2;
        if(c.y > canvas.height){
          c.y = -10;
          c.x = Math.random()*canvas.width;
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

  // --- Mensaje.html: abrir regalo ---
  const cajaRegalo = document.getElementById("caja-regalo");
  if(cajaRegalo){
    cajaRegalo.addEventListener("click", () => {
      cajaRegalo.classList.add("abrir");
      setTimeout(() => {
        document.getElementById("regalo-screen").style.display = "none";
        document.getElementById("mensaje-screen").style.display = "block";

        const params = getParams();
        const id = params.id;
        const mensajeData = JSON.parse(localStorage.getItem('mensajes') || '{}')[id];

        if(mensajeData){
          document.getElementById("saludo").textContent = `Hola ${mensajeData.destino}!`;
          document.getElementById("contenido").textContent = mensajeData.mensaje;
          startConfetti();
        } else {
          document.getElementById("saludo").textContent = "Mensaje no encontrado 😢";
          document.getElementById("contenido").textContent = "";
        }

      }, 1000); // coincide con la duración de la animación
    });
  }

  // --- Index.html: generar enlace ---
  const form = document.getElementById("mensajeForm");
  if(form){
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

});








