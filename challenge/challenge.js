// === VARIABLES GLOBALES ===
let record = parseInt(localStorage.getItem("record")) || 0; // Obtiene el récord guardado o 0 si no existe
let timer; // Variable para el temporizador del desafío
let currentQuestion = 0; // Índice de la pregunta actual
let correctAnswers = 0; // Contador de respuestas correctas
let isChallengeRunning = false; // Controla si el desafío ya está en marcha para evitar múltiples temporizadores

// === MOSTRAR RÉCORD ===
document.getElementById(
  "record"
).innerText = `Último récord: ${record} preguntas correctas`; // Muestra el récord actual en pantalla

// === EVENTOS ===
document
  .getElementById("startChallenge")
  .addEventListener("click", startChallengeCountdown); // Inicia la cuenta regresiva del desafío
document.getElementById("resetRecord").addEventListener("click", resetRecord); // Reinicia el récord
document.getElementById("music-btn").addEventListener("click", toggleMusic); // Controla el botón de música

// === FUNCIONES PRINCIPALES ===

// Inicia la cuenta regresiva antes de empezar el desafío
function startChallengeCountdown() {
  if (isChallengeRunning) return; // Si ya está corriendo, no hace nada
  isChallengeRunning = true;

  let countdown = 3; // Cuenta regresiva de 3 segundos
  const countdownElement = document.getElementById("countdown");
  const interval = setInterval(() => {
    countdownElement.innerText = countdown;
    countdown--;
    if (countdown < 0) {
      clearInterval(interval);
      startChallenge(); // Inicia el desafío cuando termina la cuenta
    }
  }, 1000);
}

// Inicia el desafío y carga la primera pregunta
function startChallenge() {
  shuffleQuestions(questions); // Mezcla aleatoriamente las preguntas
  currentQuestion = 0;
  correctAnswers = 0;

  // Oculta elementos iniciales y muestra las preguntas
  document.getElementById("countdown").style.display = "none";
  document.getElementById("startChallenge").style.display = "none";
  document.getElementById("questions").style.display = "block";

  startTimer(); // Inicia el temporizador
  loadQuestion(); // Carga la primera pregunta
}

// Finaliza el desafío y muestra los resultados
function endChallenge() {
  clearInterval(timer); // Detiene el temporizador
  record = Math.max(record, correctAnswers); // Guarda el récord más alto
  localStorage.setItem("record", record); // Actualiza el localStorage

  document.getElementById("questions").style.display = "none";
  const resultContainer = document.getElementById("result");
  resultContainer.style.display = "block";

  let message = "¡Felicidades!";
  const confetti = document.getElementById("confetti");
  const trophyIcon = document.getElementById("trophyIcon");


  if (correctAnswers === questions.length) {
    message += " Has ganado el trofeo de primer lugar.";
    trophyIcon.innerHTML = "🏆"; // Trofeo de primer lugar
    trophyIcon.id = "trophy1"; // Establecer el estilo de primer lugar
    confetti.style.display = "block";
  } else if (correctAnswers >= 45) {
    message += " Has ganado el trofeo de segundo lugar.";
    trophyIcon.innerHTML = "🥈"; // Trofeo de segundo lugar
    confetti.style.display = "block";
  } else if (correctAnswers >= 40) {
    message += " Has ganado el trofeo de tercer lugar.";
    trophyIcon.innerHTML = "🥉"; // Trofeo de tercer lugar
    confetti.style.display = "block";
  } else {
    message += " No obtuviste un trofeo.";
  }

  document.getElementById("resultMessage").innerText = message;
  document.getElementById(
    "resultScore"
  ).innerText = `Respuestas correctas: ${correctAnswers}`;
}

// === FUNCIONES AUXILIARES ===

// Mezcla aleatoriamente las preguntas del array
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Inicia el temporizador de 7 minutos
function startTimer() {
  let timeLeft = 420; // 7 minutos en segundos
  const timerElement =
    document.getElementById("timer") || document.createElement("div");
  timerElement.id = "timer";
  timerElement.style.color = "red"; // Estilo del texto del temporizador
  document.getElementById("challenge-container").appendChild(timerElement);

  clearInterval(timer); // Asegura que no haya temporizadores previos activos
  timer = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `Tiempo restante: ${minutes}:${
      seconds < 7 ? "0" : ""
    }${seconds}`; // Formato MM:SS

    if (timeLeft <= 0) {
      clearInterval(timer);
      endChallenge(); // Termina el desafío si se acaba el tiempo
    }
    timeLeft--;
  }, 1000);
}

// Carga una nueva pregunta y sus respuestas como botones
function loadQuestion() {
  const questionContainer = document.getElementById("questions");
  const current = questions[currentQuestion];
  questionContainer.innerHTML = `
        <p>Pregunta ${currentQuestion + 1}: ${current.question}</p>
        ${current.answers
          .map(
            (answer, index) =>
              `<button class="answer-btn" onclick="answerQuestion(${
                index === current.correct
              })">${answer}</button>`
          )
          .join("")}
    `;
}

// Maneja la respuesta del jugador
function answerQuestion(isCorrect) {
  if (!isCorrect) {
    clearInterval(timer); // Detiene el temporizador si falla
    record = Math.max(record, correctAnswers);
    localStorage.setItem("record", record); // Guarda el récord si fue superado
    // Si obtuvo al menos 40, se le muestra el resultado final con trofeo
    if (correctAnswers >= 40) {
      endChallenge();
    } else {
      // Si no calificó a ningún trofeo, se muestra mensaje de pérdida
      document.getElementById("questions").style.display = "none";
      const loseMessage = document.getElementById("loseMessage");
      loseMessage.style.display = "block";
      document.getElementById("currentRecord").innerText = correctAnswers;
    }
  } else {
    correctAnswers++;
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      endChallenge(); // Termina si ya no hay más preguntas
    } else {
      loadQuestion(); // Si no, carga la siguiente pregunta
    }
  }
}

// Reinicia el récord del jugador
function resetRecord() {
  localStorage.removeItem("record");
  record = 0;
  document.getElementById(
    "record"
  ).innerText = `Último récord: ${record} preguntas correctas`;
  window.location.href = "challenge.html"; // Recarga la página
}

// Activa o desactiva la música de fondo
function toggleMusic() {
  const music = document.getElementById("bg-music");
  const musicButton = document.getElementById("music-btn");

  if (music.paused) {
    music
      .play()
      .then(() => {
        musicButton.innerText = "🔇 Desactivar Música";
      })
      .catch((error) => {
        console.error("Error al reproducir la música:", error);
        alert("No se pudo reproducir la música.");
      });
  } else {
    music.pause();
    musicButton.innerText = "🎵 Activar Música";
  }
}

// Agrega el evento de control de música nuevamente por si se recarga
document.getElementById("music-btn").addEventListener("click", toggleMusic);

// === PREGUNTAS (50) ===
const questions = [
  // Cultura General (10)
  {
    question: "¿Quién pintó la Mona Lisa?",
    answers: ["Van Gogh", "Da Vinci", "Picasso", "Miguel Ángel"],
    correct: 1,
  },
  {
    question: "¿Cuál es la capital de Japón?",
    answers: ["Beijing", "Tokio", "Seúl", "Bangkok"],
    correct: 1,
  },
  {
    question: "¿Cuál es el idioma más hablado en el mundo?",
    answers: ["Inglés", "Mandarín", "Hindi", "Español"],
    correct: 1,
  },
  {
    question: "¿Qué animal representa la sabiduría?",
    answers: ["Perro", "Gato", "Búho", "Tigre"],
    correct: 2,
  },
  {
    question: "¿Cuál es la moneda oficial de la Unión Europea?",
    answers: ["Dólar", "Euro", "Libra", "Yen"],
    correct: 1,
  },
  {
    question: "¿En qué país se originaron los Juegos Olímpicos?",
    answers: ["Italia", "Egipto", "Grecia", "Francia"],
    correct: 2,
  },
  {
    question: "¿Cuál de estos instrumentos es característico del jazz?",
    answers: ["Saxofón", "Piano", "Trombón", "Guitarra"],
    correct: 0,
  },
  {
    question: "¿Cuál es la capital de Argentina?",
    answers: ["Lima", "Buenos Aires", "Santiago", "Montevideo"],
    correct: 1,
  },
  {
    question: "¿Cuántos planetas hay en el sistema solar?",
    answers: ["7", "8", "9", "10"],
    correct: 1,
  },
  {
    question: "¿De qué color es el oro?",
    answers: ["Amarillo", "Gris", "Rojo", "Verde"],
    correct: 0,
  },

  // Informática (15)
  {
    question: "¿Qué es HTML?",
    answers: [
      "Lenguaje de diseño web",
      "Sistema operativo",
      "Aplicación",
      "Base de datos",
    ],
    correct: 0,
  },
  {
    question: "¿Cuál es la función de un compilador?",
    answers: [
      "Encriptar",
      "Traducir código",
      "Diseñar páginas",
      "Reproducir videos",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es una dirección IP?",
    answers: ["Dirección web", "Disco duro", "Software", "Lenguaje"],
    correct: 0,
  },
  {
    question: "¿Qué es la memoria RAM?",
    answers: ["Memoria volátil", "Disco", "CPU", "Router"],
    correct: 0,
  },
  {
    question: "¿Para qué sirve una base de datos?",
    answers: ["Jugar", "Guardar datos", "Codificar", "Traducir"],
    correct: 1,
  },
  {
    question: "¿Qué es una URL?",
    answers: ["Idioma", "Aplicación", "Dirección web", "Virus"],
    correct: 2,
  },
  {
    question: "¿Cuál es el sistema operativo de código abierto más utilizado?",
    answers: ["Windows", "macOS", "Linux", "Unix"],
    correct: 2,
  },
  {
    question: "¿Qué es GitHub?",
    answers: [
      "Base de datos",
      "Sistema operativo",
      "Repositorio de código",
      "Navegador",
    ],
    correct: 2,
  },
  {
    question: "¿Cuál de estos es un lenguaje de diseño visual?",
    answers: ["Java", "HTML", "CSS", "Python"],
    correct: 2,
  },
  {
    question: "¿Para qué sirve un algoritmo?",
    answers: [
      "Reproducir música",
      "Dar instrucciones",
      "Aplicar color",
      "Descifrar código",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es un firewall?",
    answers: ["Antena", "Sistema de protección", "Editor", "Idioma"],
    correct: 1,
  },
  {
    question: "¿Qué es el phishing?",
    answers: [
      "Ataque para robar datos",
      "Sistema de respaldo",
      "Inicio de sesión",
      "Diseño gráfico",
    ],
    correct: 0,
  },
  {
    question: "¿Qué es una aplicación (app)?",
    answers: ["Periférico", "Programa informático", "Red", "Cable"],
    correct: 1,
  },
  {
    question: "¿Qué es una red informática?",
    answers: [
      "Cable",
      "Conexión entre computadoras",
      "Base de datos",
      "Consola",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es Python?",
    answers: ["Hardware", "Framework", "Lenguaje de programación", "Algoritmo"],
    correct: 2,
  },

  // Sociales (15)
  {
    question: "¿Qué es la democracia?",
    answers: [
      "Dictadura",
      "Forma de gobierno participativa",
      "Ley",
      "Religión",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es la ONU?",
    answers: [
      "Universidad",
      "Empresa",
      "Organización internacional",
      "Partido",
    ],
    correct: 2,
  },
  {
    question: "¿Qué significa igualdad de género?",
    answers: [
      "Igualdad salarial",
      "Igualdad de derechos entre géneros",
      "Uniforme",
      "Leyes",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es la pobreza extrema?",
    answers: [
      "Sin celular",
      "Falta de acceso a necesidades básicas",
      "Sin auto",
      "Sin WiFi",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es el racismo?",
    answers: [
      "Religión",
      "Política",
      "Discriminación por motivos étnicos",
      "Clima",
    ],
    correct: 2,
  },
  {
    question: "¿Qué es un refugiado?",
    answers: [
      "Turista",
      "Persona que huye por guerra o persecución",
      "Empleado",
      "Estudiante",
    ],
    correct: 1,
  },
  {
    question: "¿Qué derecho protege la libertad de opinar?",
    answers: ["Expresión", "Salud", "Trabajo", "Educación"],
    correct: 0,
  },
  {
    question: "¿Qué es la discriminación?",
    answers: ["Igualdad", "Trato injusto por diferencias", "Fiesta", "Comida"],
    correct: 1,
  },
  {
    question: "¿Qué es una ONG?",
    answers: [
      "Partido político",
      "Organización sin fines de lucro",
      "Religión",
      "Entidad estatal",
    ],
    correct: 1,
  },
  {
    question: "¿Cuál es la edad mínima para votar en muchos países?",
    answers: ["16", "18", "21", "17"],
    correct: 1,
  },
  {
    question: "¿Qué es el cambio climático?",
    answers: [
      "Teoría",
      "Variación ambiental causada por el ser humano",
      "Invierno",
      "Temporada",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es la educación inclusiva?",
    answers: [
      "Segregación",
      "Exclusión",
      "Incorporación de la diversidad",
      "Privatización",
    ],
    correct: 2,
  },
  {
    question: "¿Qué se conmemora el 8 de marzo?",
    answers: [
      "Día Internacional de la Mujer",
      "Día del Padre",
      "Día del Trabajo",
      "Día de la Independencia",
    ],
    correct: 0,
  },
  {
    question: "¿Qué es la ciudadanía?",
    answers: [
      "Pasaporte",
      "Condición legal de pertenencia a un Estado",
      "Vacuna",
      "Derecho humano",
    ],
    correct: 1,
  },
  {
    question: "¿Cuál es el objetivo principal del reciclaje?",
    answers: [
      "Ganar dinero",
      "Reducir la contaminación",
      "Destruir basura",
      "Fabricar plástico",
    ],
    correct: 1,
  },

  // Recursos Humanos (10)
  {
    question: "¿Qué es una entrevista laboral?",
    answers: [
      "Evaluación de desempeño",
      "Conversación con un reclutador",
      "Capacitación",
      "Fiesta",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es un currículum vitae (CV)?",
    answers: ["Hoja de vida", "Contrato", "Carnet", "Identificación"],
    correct: 0,
  },
  {
    question: "¿Qué mide un test psicométrico?",
    answers: [
      "Condición física",
      "Inteligencia y personalidad",
      "Gustos musicales",
      "Edad",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es el onboarding?",
    answers: [
      "Despido",
      "Proceso de integración de nuevos empleados",
      "Evaluación anual",
      "Vacaciones",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es el clima laboral?",
    answers: [
      "Clima exterior",
      "Ambiente en el lugar de trabajo",
      "Tiempo de descanso",
      "Vestimenta",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es la capacitación?",
    answers: [
      "Vacaciones",
      "Formación para empleados",
      "Préstamo",
      "Celebración",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es el liderazgo?",
    answers: [
      "Mandar",
      "Capacidad de influir y guiar a otros",
      "Obedecer",
      "Escuchar solamente",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es la rotación de personal?",
    answers: [
      "Reclutamiento",
      "Frecuencia en el cambio de empleados",
      "Ascensos",
      "Pérdidas",
    ],
    correct: 1,
  },
  {
    question: "¿Qué es la evaluación de desempeño?",
    answers: [
      "Revisión del rendimiento laboral",
      "Reunión",
      "Pago mensual",
      "Reclamo",
    ],
    correct: 0,
  },
  {
    question: "¿Qué son las habilidades blandas?",
    answers: ["Técnicas", "Sociales y comunicativas", "Digitales", "Mecánicas"],
    correct: 1,
  },
];
