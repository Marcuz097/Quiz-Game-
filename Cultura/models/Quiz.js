// Importa la clase Question para poder trabajar con objetos de tipo pregunta
import { Question } from "./Question.js"

// Clase principal que controla el estado del quiz
export class Quiz {

    // Índice para saber qué pregunta se está mostrando actualmente
    questionsIndex = 0;

    // Puntuación total (basada en respuestas correctas)
    score = 0;  
   
    /**
     * Constructor que recibe un arreglo de preguntas
     * @param {Question[]} questions - Lista de objetos tipo Question
     */
    constructor(questions) {
        this.questions = questions; // Guarda todas las preguntas
    }

    /**
     * Devuelve la pregunta actual según el índice
     * @returns {Question} - La pregunta actual del quiz 
     */
    getQuestionIndex() {
        return this.questions[this.questionsIndex];
    }

    isEnded() {
        return this.questions.length === this.questionsIndex;
    }
    
    //También retorna la pregunta actual (redundante con getQuestionIndex)
    getCurrentQuestion() {
        return this.questions[this.questionsIndex];
    }
    

    /**
     * Procesa la respuesta del jugador
     * @param {string} answer some text
     */
    guess(answer) {
        console.log(answer); // (opcional) Muestra la respuesta elegida en consola
        const current = this.getCurrentQuestion(); // Obtiene la pregunta actual

        // Si la respuesta es correcta, suma los puntos de la pregunta
        if (answer === current.answer){
                this.score += current.points || 10; // Usa los puntos definidos, o 10 por defecto
            
        }

         // Avanza al siguiente índice (siguiente pregunta)  
        this.questionsIndex++;
    }

}

