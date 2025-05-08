import { Question } from "../models/Question.js";
import { data } from "./data.js";

//export const questions = data.map(question => new Question(question.question, question.choices, question.answer, question.imageUrl))

// Función que permite obtener preguntas filtradas por nivel de dificultad
export function getQuestionsByDifficulty(level) {
    // Intenta obtener el array de preguntas según el nivel indicado (ej. 'easy', 'medium', 'hard')
    // Si no existe el nivel, se devuelve un array vacío []
    const questionsForLevel = data[level] || [];
    // Mapea cada objeto de datos en una instancia de la clase Question
    return questionsForLevel.map(
     question => new Question(
        question.question,     // Texto de la pregunta 
        question.choices,      // Arreglo de opciones/respuestas
        question.answer,       // Respuesta correcta
        question.imageUrl      // URL de la imagen asociada a la pregunta
       )
    );
}