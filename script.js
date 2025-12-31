document.addEventListener("DOMContentLoaded", () => {

  // --- Obtener parámetros URL ---
  function getParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(pair=>{
      const [key,value] = pair.split("=");
      params[key] = decodeURIComponent(value||'');
    });
    return params;
  }

  // --- Confeti al abrir el mensaje ---
  function startConfeti() {
    const canvas = document.getElementById("confeti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const count = 150;

    for(let i=0; i<count; i++){
      hearts.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height - canvas.height,
        size: Math.random()*20+10,
        speed: Math.random()*2+1,
        angle: Math.random()*Math.PI*2
      });
    }

    function drawHeart(x, y, size){
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.bezierCurveTo(0,-size/2, -size,-size/2, -size,0);
      ctx.bezierCurveTo(-size,size/2, 0,size*0.75, 0,size);
      ctx.bezierCurveTo(0,size*0.75, size,size/2, size,0);
      ctx.bezierCurveTo(size,-size/2, 0,-size/2, 0,0);
      ctx.fillStyle='red';
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      hearts.forEach(h=>{
        h.y += h.speed;
        h.x += Math.sin(h.angle)*0.5;
        h.angle += 0.01;
        drawHeart(h.x,h.y,h.size);
        if(h.y>canvas.height+h.size){ h.y=-h.size; h.x=Math.random()*canvas.width; }
      });
      requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener("resize", ()=>{
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // --- Fondo de corazones animado ---
  function startFondoCorazones() {
    const canvas = document.getElementById("fondo-corazones");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const count = 50;
    for(let i=0;i<count;i++){
      hearts.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*30+15,
        speed: Math.random()*0.5+0.2,
        angle: Math.random()*Math.PI*2
      });
    }

    function drawHeart(x,y,size){
      ctx.save();
      ctx.translate(x,y);
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.bezierCurveTo(0,-size/2, -size,-size/2, -size,0);
      ctx.bezierCurveTo(-size,size/2, 0,size*0.75, 0,size);
      ctx.bezierCurveTo(0,size*0.75, size,size/2, size,0);
      ctx.bezierCurveTo(size,-size/2, 0,-size/2, 0,0);
      ctx.fillStyle='rgba(255,0,100,0.3)';
      ctx.fill();
      ctx.restore();
    }

    function animate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      hearts.forEach(h=>{
        h.y += h.speed;
        h.x += Math.sin(h.angle)*0.2;
        h.angle += 0.01;
        drawHeart(h.x,h.y,h.size);
        if(h.y > canvas.height + h.size){ h.y=-h.size; h.x=Math.random()*canvas.width; }
      });
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", ()=>{
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  startFondoCorazones();

  // --- Botón abrir regalo ---
  const btnAbrir = document.getElementById("abrir-regalo");
  if(btnAbrir){
    btnAbrir.addEventListener("click", ()=>{
      document.querySelector(".regalo-screen").style.display="none";
      document.getElementById("mensaje-screen").style.display="block";

      const params = getParams();
      const id = params.id;
      const mensajes = JSON.parse(localStorage.getItem('mensajes')||'{}');
      const mensajeData = mensajes[id];

      if(mensajeData){
        document.getElementById("saludo").textContent=`Hola ${mensajeData.destino}!`;
        document.getElementById("contenido").textContent=mensajeData.mensaje;
        startConfeti();
      } else {
        document.getElementById("saludo").textContent="Mensaje no encontrado 😢";
        document.getElementById("contenido").textContent="";
      }
    });
  }

  // --- Index.html: generar enlace ---
  const form = document.getElementById("mensajeForm");
  if(form){
    form.addEventListener("submit", e=>{
      e.preventDefault();
      const data = new FormData(form);
      const nombre = data.get("nombre");
      const destino = data.get("destino");
      const mensaje = data.get("mensaje");

      const id = Math.random().toString(36).substr(2,6);
      const mensajes = JSON.parse(localStorage.getItem('mensajes')||'{}');
      mensajes[id]={nombre,destino,mensaje};
      localStorage.setItem('mensajes',JSON.stringify(mensajes));

      const url=`mensaje.html?id=${id}`;
      document.getElementById("enlace").innerHTML=`Tu enlace está listo: <a href="${url}" target="_blank">${url}</a>`;
    });
  }

});











