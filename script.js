// Función para convertir parámetros de URL a objeto
function getParams() {
  const params = {};
  window.location.search
    .substring(1)
    .split("&")
    .forEach(pair => {
      const [key, value] = pair.split("=");
      params[key] = decodeURIComponent(value.replace(/\+/g, " "));
    });
  return params;
}

// Si estamos en mensaje.html
if (document.getElementById("saludo")) {
  const params = getParams();
  document.getElementById("saludo").textContent = `Hola ${params.destino}!`;
  document.getElementById("contenido").textContent = params.mensaje;

  // Iniciar confeti
  if (typeof startConfetti === "function") startConfetti();
}

// Si estamos en index.html
const form = document.getElementById("mensajeForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = encodeURIComponent(data.get("nombre"));
    const destino = encodeURIComponent(data.get("destino"));
    const mensaje = encodeURIComponent(data.get("mensaje"));
    const url = `mensaje.html?nombre=${nombre}&destino=${destino}&mensaje=${mensaje}`;
    const enlaceDiv = document.getElementById("enlace");
    enlaceDiv.innerHTML = `Tu enlace está listo: <a href="${url}" target="_blank">${url}</a>`;
  });
}


