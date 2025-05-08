// Función que redirige al usuario al index.html (inicio)
function redireccion() {
  window.location.href = "/index.html";
}

// Clase UI: controla todo lo visual del juego
export class UI {
  constructor() {}

  /**
   *  Muestra el texto de la pregunta en pantalla
   * @param {string} text question to render
   */
  showQuestion(text) {
    const questionTitle = document.getElementById("question");
    questionTitle.innerText = text;
  }

 /**
 * Muestra las opciones de respuesta y gestiona la lógica visual
 * @param {string[]} choices the choices of the question
 */
showChoices(choices, quiz, callback) {
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
  
    // Agrega estilos para respuestas correctas e incorrectas
    const style = document.createElement("style");
    style.innerHTML = `
      .choice.correct {
        background-color: #4CAF50 !important; /* verde */
        color: white;
      }
  
      .choice.incorrect {
        background-color: #F44336 !important; /* rojo */
        color: white;
      }
  
      .choice:disabled {
        cursor: not-allowed;
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);
  
    // Crea un botón por cada opción
    for (let i = 0; i < choices.length; i++) {
      const button = document.createElement("button");
      button.innerText = choices[i];
      button.className = "button choice"; // Asegura que tenga ambas clases
  
      // Evento al hacer clic en una opción
      button.addEventListener("click", () => {
        const correctAnswer = quiz
          .getQuestionIndex()
          .answer.trim()
          .toLowerCase();
        const userAnswer = button.innerText.trim().toLowerCase();
  
        const buttons = document.querySelectorAll(".choice");

        // Desactiva todos los botones y marca correcto/incorrecto
        buttons.forEach((btn) => {
          btn.disabled = true;
          const btnText = btn.innerText.trim().toLowerCase();
          if (btnText === correctAnswer) {
            btn.classList.add("correct");
          } else {
            if (btn === button) {
              btn.classList.add("incorrect");
            }
          }
        });
  
        // Espera un momento antes de pasar a la siguiente pregunta
        setTimeout(() => {
          callback(button.innerText);
        }, 500);
      });
  
      choicesContainer.append(button);
    }
  }
  
  //Inicia un temporizador visual de cuenta regresiva
  startTimer(duration, onTimeOut) {
    clearInterval(this.timerInterval); // Limpia si ya había uno corriendo
    const timerDisplay = document.getElementById("timer");
    let time = duration;

    timerDisplay.textContent = `Tiempo: ${time}s`;
    this.timerInterval = setInterval(() => {
      time--;
      timerDisplay.textContent = `Tiempo: ${time}s`;
      if (time <= 0) {
        clearInterval(this.timerInterval);
        onTimeOut(); // Llama a la función de fin de tiempo
      }
    }, 1000);
  }


  // Detiene el temporizador actual
  resetTimer() {
    clearInterval(this.timerInterval);
  }

  /**
   * Muestra el progreso del quiz (ej. Pregunta 3 de 10)
   * @param {number} currentIndex 
   * @param {number} total 
   */
  showProgress(currentIndex, total) {
    const element = document.getElementById("progress");
    element.innerHTML = `Question ${currentIndex} of ${total}`;
  }

  //Muestra la imagen asociada a la pregunta
  showImage(imageUrl) {
    const imageElement = document.getElementById("question-image");
    if (imageElement) {
      imageElement.src = imageUrl;
      imageElement.alt = "Imagen de la pregunta";
      imageElement.style.opacity = "1";
  
      // Estilos directamente en la función
      imageElement.style.width = "100%";
      imageElement.style.maxWidth = "400px";
      imageElement.style.height = "250px";
      imageElement.style.objectFit = "contain";
      imageElement.style.borderRadius = "10px";
      imageElement.style.margin = "20px auto";
      imageElement.style.display = "block";
      imageElement.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    }
  }

  //Muestra pantalla final con ranking y formulario para guardar puntaje
  showRanking(score) {
    const container = document.getElementById("quiz");

    // 🔴 Ocultar el temporizador
    const timer = document.getElementById("timer");
    if (timer) timer.style.display = "none"; // Oculta temporizador

    // Formulario para guardar el nombre y puntaje
    const showNamePrompt = () => {
      container.innerHTML = `
                    <div style="text-align: center; margin-top: 30px;">
                        <h2 style="margin-bottom: 20px;">🎉 ¡Juego terminado!</h2>
                        <p style="font-size: 1.2em;">Tu puntaje es: <strong>${score}</strong></p>
                        <p>Ingresa tu nombre para guardar tu puntuación:</p>
                        <input id="name-input" type="text" placeholder="Tu nombre" 
                            style="padding: 10px; width: 250px; border: 2px solid #888; border-radius: 10px; font-size: 1em;">
                        <br><br>
                        <button id="save-score-btn"
                            style="padding: 10px 20px; font-size: 1em; background-color: #4CAF50; color: white; border: none; border-radius: 10px; cursor: pointer; transition: background-color 0.3s, transform 0.3s;">
                            Guardar puntuación 📝
                        </button>
                    </div>
                `;

      document
        .getElementById("save-score-btn")
        .addEventListener("click", saveScore);
    };

    // Guarda el puntaje en localStorage
    const saveScore = () => {
      const name =
        document.getElementById("name-input").value.trim() || "Anónimo";
      const ranking = JSON.parse(localStorage.getItem("quizRanking")) || [];
      ranking.push({ name, score });
      ranking.sort((a, b) => b.score - a.score);
      localStorage.setItem("quizRanking", JSON.stringify(ranking));

      showRankingTable(ranking);
    };

    // Muestra la tabla con los puntajes
    const showRankingTable = (ranking) => {
      const container = document.getElementById("quiz");
      document.body.style.overflow = "hidden"; // Deshabilitar el scroll del body

      const tableRows = ranking
        .map(
          (entry, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${entry.name}</td>
                        <td>${entry.score}</td>
                    </tr>
                `
        )
        .join("");

      // Botón flotante para borrar el ranking
      const existingClearBtn = document.getElementById("clear-ranking");
      if (!existingClearBtn) {
        const clearBtn = document.createElement("button");
        clearBtn.id = "clear-ranking";
        clearBtn.innerText = "🗑️";
        clearBtn.title = "Borrar Ranking";
        Object.assign(clearBtn.style, {
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "transparent",
          border: "none",
          fontSize: "1.8em",
          cursor: "pointer",
          color: "#ff4d4d",
          zIndex: "1000",
          transition: "transform 0.3s ease",
        });
        clearBtn.addEventListener("click", () => {
          const confirmClear = confirm(
            "¿Estás seguro de que deseas borrar todo el ranking?"
          );
          if (confirmClear) {
            localStorage.removeItem("quizRanking");
            alert("Ranking eliminado exitosamente.");
            location.reload();
          }
        });
        document.body.appendChild(clearBtn);
      }

      // Estructura HTML del ranking
      container.innerHTML = `
                    <div style="
                        background: radial-gradient(circle at top, #1a1a1a 0%, #0d0d0d 100%);
                        padding: 30px 40px;
                        border-radius: 20px;
                        max-width: 700px;
                        margin: 30px auto 20px;
                        box-shadow: 0 0 25px rgba(255, 0, 0, 0.7);
                        color: white;
                        font-family: 'Press Start 2P', cursive;
                        text-align: center;
                        position: relative;
                        animation: fadeInUp 0.6s ease-out;
                    ">
                        <h2 style="
                            color: #ff4d4d;
                            margin-bottom: 25px;
                            text-shadow: 0 0 10px #ff1a1a;
                        ">🏆 Ranking de Puntuaciones</h2>
        
                        <div style="max-height: 300px; overflow-y: auto;">
                            <table style="
                                width: 100%;
                                border-collapse: collapse;
                                background: #111;
                                border: 2px solid #ff4d4d;
                                box-shadow: 0 0 20px #ff1a1a;
                            ">
                                <thead>
                                    <tr style="background: #ff1a1a; color: #fff;">
                                        <th style="padding: 15px; border-bottom: 2px solid #111;">#</th>
                                        <th style="padding: 15px; border-bottom: 2px solid #111;">Nombre</th>
                                        <th style="padding: 15px; border-bottom: 2px solid #111;">Puntaje</th>
                                    </tr>
                                </thead>
                                <tbody style="color: #fff;">
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

      // Botón para volver al inicio
      const redirectButton = document.createElement("button");
      redirectButton.innerText = "Volver al inicio";
      Object.assign(redirectButton.style, {
        backgroundColor: "#111",
        color: "#ff4d4d",
        border: "2px solid #ff4d4d",
        padding: "12px 24px",
        fontSize: "16px",
        borderRadius: "12px",
        cursor: "pointer",
        marginTop: "10px",
        boxShadow: "0 0 15px #ff4d4d, 0 0 30px #ff1a1a",
        transition: "transform 0.2s, box-shadow 0.2s",
      });

      redirectButton.addEventListener("click", redireccion);
      redirectButton.addEventListener("mouseover", () => {
        redirectButton.style.transform = "scale(1.1)";
        redirectButton.style.boxShadow = "0 0 20px #ff4d4d, 0 0 40px #ff1a1a";
      });
      redirectButton.addEventListener("mouseout", () => {
        redirectButton.style.transform = "scale(1)";
        redirectButton.style.boxShadow = "0 0 15px #ff4d4d, 0 0 30px #ff1a1a";
      });

      container.appendChild(redirectButton);
    };


    // Inicia el flujo para mostrar y guardar el nombre
    showNamePrompt();
  }
}
