function loadQuestion() {
    const questionContainer = document.getElementById("questions");
    const current = questions[currentQuestion];
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