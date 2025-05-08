// Se exporta la clase Question para poder usarla en otros módulos del proyecto
export class Question {
  /**
   * Constructor de la clase Question
   * 
   * @param {string} text - El texto de la pregunta.
   * @param {string[]} choices - Un arreglo con las opciones de respuesta.
   * @param {string} answer - La respuesta correcta.
   * @param {string} imageUrl - La URL de una imagen asociada a la pregunta.
   * @param {number} points - Puntos que vale la pregunta (por defecto: 10).
   */
  constructor(text, choices, answer, imageUrl, points = 10 ) {
    // Asigna el texto de la pregunta
    this.text = text;
    
    // Asigna la imagen asociada a la pregunta (puede ser null o string)
    this.imageUrl = imageUrl;

    // Asigna las posibles respuestas (opciones)
    this.choices = choices;

    // Asigna la respuesta correcta
    this.answer = answer;

    // Asigna el valor en puntos que tiene esta pregunta
    this.points = points;
    
  }

}


