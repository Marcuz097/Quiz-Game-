// Importa las funciones y clases necesarias para el juego
import { getQuestionsByDifficulty } from "./data/questions.js"; // Función para obtener preguntas según dificultad
import { Quiz } from "./models/Quiz.js"; // Clase que maneja la lógica del quiz
import { UI } from "./models/UI.js"; // Clase para manejar la interfaz del usuario

// Array con los niveles de dificultad disponibles
const niveles = ["facil", "medio", "dificil"];
const dificultadContainer = document.getElementById("dificultad-container"); // Contenedor de los botones de dificultad

// Por cada nivel, se crea un botón y se agrega al contenedor
niveles.forEach(nivel => {
  const button = document.createElement("button"); // Crea el botón
  button.innerText = nivel.charAt(0).toUpperCase() + nivel.slice(1); // Capitaliza el primer carácter (ej. "Facil")
  button.className = `btn-nivel btn-${nivel}`; // Clase CSS con estilo según dificultad
  button.addEventListener("click", () => {
    iniciarQuiz(nivel); // Cuando se hace clic, se inicia el quiz con ese nivel
  });
  dificultadContainer.appendChild(button); // Se añade el botón al DOM
});

/**
 * Función principal que inicia el juego según la dificultad seleccionada
 * @param {string} dificultad Nivel seleccionado (facil, medio, dificil)
 */
function iniciarQuiz(dificultad) {
  const questions = getQuestionsByDifficulty(dificultad); // Se obtienen las preguntas para ese nivel
  const quiz = new Quiz(questions); // Se crea una instancia del quiz
  const ui = new UI(); // Se crea la interfaz de usuario

  // Oculta los botones de selección de nivel y muestra el área del quiz
  dificultadContainer.style.display = "none";
  document.getElementById("quiz").style.display = "block"; 
  document.getElementById("timer").style.display = "block";

  // Comienza mostrando la primera pregunta
  renderPage(quiz, ui);

  /**
   * Función interna que maneja el renderizado de cada pregunta
   * @param {Quiz} quiz 
   * @param {UI} ui 
   */
  function renderPage(quiz, ui) {
    if (quiz.isEnded()) {
      // Si el juego terminó, se muestra la puntuación final o ranking
      ui.showRanking(quiz.score);
    } else {
      // Si aún hay preguntas, se muestra la siguiente
      ui.showQuestion(quiz.getQuestionIndex().text); // Muestra el texto de la pregunta
      ui.showImage(quiz.getQuestionIndex().imageUrl); // Muestra la imagen asociada a la pregunta

      // Muestra las opciones de respuesta y define qué hacer al elegir una
      ui.showChoices(quiz.getQuestionIndex().choices, quiz, choice => {
        quiz.guess(choice); // Procesa la respuesta elegida
        ui.resetTimer(); // Detiene el temporizador al responder
        renderPage(quiz, ui); // Recarga la página con la siguiente pregunta
      });

      // Inicia un temporizador de 15 segundos
      ui.startTimer(15, () => {
        quiz.guess(""); // Si se acaba el tiempo, se considera como no respondida (incorrecta)
        renderPage(quiz, ui); // Pasa a la siguiente pregunta
      });

      // Muestra el progreso del juego (pregunta actual / total)
      ui.showProgress(quiz.questionsIndex + 1, quiz.questions.length);
    }
  }
}

