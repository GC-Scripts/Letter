// Función para generar un ID aleatorio
function generarID(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for(let i=0; i<length; i++){
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Función para obtener parámetros de URL
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

// --- Si estamos en mensaje.html ---
if (document.getElementById("saludo")) {
  const params = getParams();
  const id = params.id;
  const mensajeData = JSON.parse(localStorage.getItem('mensajes') || '{}')[id];

  if (mensajeData) {
    document.getElementById("saludo").textContent = `Hola ${mensajeData.destino}!`;
    document.getElementById("contenido").textContent = mensajeData.mensaje;
    if (typeof startConfetti === "function") startConfetti();
  } else {
    document.getElementById("saludo").textContent = "Mensaje no encontrado 😢";
    document.getElementById("contenido").textContent = "";
  }
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

    // Crear ID único
    const id = generarID();

    // Guardar mensaje en localStorage
    const mensajes = JSON.parse(localStorage.getItem('mensajes') || '{}');
    mensajes[id] = { nombre, destino, mensaje };
    localStorage.setItem('mensajes', JSON.stringify(mensajes));

    // Generar enlace bonito
    const url = `mensaje.html?id=${id}`;
    const enlaceDiv = document.getElementById("enlace");
    enlaceDiv.innerHTML = `Tu enlace está listo: <a href="${url}" target="_blank">${url}</a>`;
  });
}



