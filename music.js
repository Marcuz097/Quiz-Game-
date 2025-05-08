// js/music.js
(function () {
    // Verifica si ya existe un audio con el ID "global-music" para evitar duplicados
    const existingAudio = document.getElementById("global-music");
    if (!existingAudio) {
        // Crea un nuevo elemento <audio> si no existe
        const audio = document.createElement("audio");
        audio.id = "global-music";// Le asigna un ID
        audio.src = "/THE LAST OF US .mp3"; // Ruta del archivo de música (asegúrate que sea correcta)
        audio.loop = true;// Hace que la música se repita en bucle
        document.body.appendChild(audio);// Agrega el audio al body del documento
        audio.play().catch(() => {}); // Intenta reproducir la música sin mostrar errores si aún no hay interacción del usuario
    }

    // Crea un botón para controlar la música (play/pause)
    const musicBtn = document.createElement("button");
    musicBtn.id = "music-toggle-btn";// Asigna un ID al botón
    musicBtn.textContent = "🔇 Detener Música";// Texto inicial del botón
    // Estilos CSS del botón
    musicBtn.style.position = "fixed";
    musicBtn.style.top = "20px";
    musicBtn.style.padding = "10px 15px";
    musicBtn.style.background = "#222";
    musicBtn.style.color = "#fff";
    musicBtn.style.border = "2px solid #ff1867"; // Borde rosado fuerte
    musicBtn.style.borderRadius = "10px";
    musicBtn.style.fontSize = "12px";
    musicBtn.style.cursor = "pointer";
    musicBtn.style.zIndex = 9999; // Asegura que esté por encima de otros elementos

    // Detecta si la página actual es index.html (o raíz)
    const path = window.location.pathname;
    const isIndex = path.endsWith("/index.html") || path === "/" || path === "/index.html";

    // Posiciona el botón: a la derecha en index.html, a la izquierda en otras páginas
    if (isIndex) {
        musicBtn.style.right = "20px";
    } else {
        musicBtn.style.left = "20px";
    }

    // Variable de estado para saber si la música está sonando
    let playing = true;
    // Evento click del botón: pausa o reproduce la música
    musicBtn.addEventListener("click", () => {
        const music = document.getElementById("global-music"); // Obtiene el audio
        if (music.paused) {
            music.play(); // Si está pausado, lo reproduce
            musicBtn.textContent = "🔇 Detener Música"; // Cambia el texto del botón
            playing = true;
        } else {
            music.pause(); // Si está sonando, lo pausa
            musicBtn.textContent = "🎵 Activar Música"; // Cambia el texto del botón
            playing = false;
        }
    });

    // Agrega el botón al body del documento
    document.body.appendChild(musicBtn);
})();