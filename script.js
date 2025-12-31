document.addEventListener("DOMContentLoaded", () => {
  function setupCanvas(canvas) {
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
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

  // --- Confeti ---
  function startConfeti() {
    const canvas = document.getElementById("confeti");
    if (!canvas) return;
    let ctx = setupCanvas(canvas);

    const hearts = [];
    const count = 80; // reducido

    function resetHearts() {
      hearts.length = 0;
      for (let i = 0; i < count; i++) {
        hearts.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight - window.innerHeight,
          size: Math.random() * 18 + 10,
          speedY: Math.random() * 2 + 1.2,
          driftAmp: Math.random() * 0














