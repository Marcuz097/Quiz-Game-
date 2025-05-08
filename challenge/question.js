// Esta función carga y muestra la pregunta actual en el contenedor de preguntas
function loadQuestion() {
    // Obtiene el contenedor donde se mostrarán las preguntas
    const questionContainer = document.getElementById("questions");

    // Toma la pregunta actual del arreglo 'questions' usando el índice 'currentQuestion'
    const current = questions[currentQuestion];

    // Inserta en el HTML del contenedor:
    // 1. El texto de la pregunta
    // 2. Una serie de botones generados dinámicamente para cada respuesta
    //    - Cada botón tiene un evento 'onclick' que llama a la función 'answerQuestion'
    //    - Se pasa 'true' si es la respuesta correcta, o 'false' si no lo es
    questionContainer.innerHTML = `
        <p>Pregunta ${currentQuestion + 1}: ${current.question}</p>
        ${current.answers
            .map(
                (answer, index) =>
                    `<button onclick="answerQuestion(${index === current.correct})">${answer}</button>`
            )
            .join("")}
    `;
}