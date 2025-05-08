//Donde estan las preguntas y respuestas de cada nivel de dificultad y sus respectivas image
export const data = {
   facil: [
     {
       question: '¿Cuál es el cerebro de la computadora?',
       imageUrl: "img/1.png",
       choices: ['Monitor', 'RAM', 'CPU', 'Disco duro'],
       answer: 'CPU'
     },
     {
       question: '¿Qué significa RAM?',
       imageUrl: 'img/2.png',
       choices: ['Real Audio Machine ', 'Random Access Memory', 'Read Active Module', 'Ready Access Memory'],
       answer: 'Random Access Memory'
     },
     {
       question: '¿Qué tipo de dispositivo es el teclado?',
       imageUrl: 'img/3.png',
       choices: ['Dispositivo de entrada', 'Dispositivo de salida', ' Unidad de almacenamiento', 'Procesador'],
       answer: 'Dispositivo de entrada'
     },
     {
      question: '¿Cuál de estas es una extensión de imagen?',
      imageUrl: 'img/4.png',
      choices: ['.docx', '.jpg', ' .exe', '.mp3'],
      answer: '.jpg'
    },
    {
      question: '¿Qué es el software?',
      imageUrl: 'img/5.png',
      choices: ['Partes físicas de la computadora', 'Solo el sistema operativo', 'Conjunto de programas', 'Discos duros y cables'],
      answer: 'Conjunto de programas'
    },
    {
      question: '¿Qué es el hardware?',
      imageUrl: 'img/6.png',
      choices: ['Navegadores', 'Componentes físicos', 'Aplicaciones móviles', ' Archivos del sistema'],
      answer: 'Componentes físicos'
    },
    {
      question: '¿Qué lenguaje se usa para estructurar páginas web?',
      imageUrl: 'img/7.png',
      choices: [' Python', 'HTML', 'C++', ' Java'],
      answer: 'HTML'
    },
    {
      question: '¿Cuál es un sistema operativo móvil?',
      imageUrl: 'img/8.png',
      choices: [' Linux', 'Android', 'MySQL', 'Visual Studio'],
      answer: 'Android'
    },
    {
      question: '¿Qué hace un navegador web?',
      imageUrl: 'img/9.png',
      choices: [' Almacena programas', 'Accede a sitios web', 'Ejecuta comandos', ' Protege contra virus'],
      answer: 'Accede a sitios web'
    },
    {
      question: '¿Qué es un archivo PDF?',
      imageUrl: 'img/10.png',
      choices: ['Archivo ejecutable', 'Archivo de imagen', 'Documento portátil', ' Base de datos'],
      answer: 'Documento portátil'
    }
   
   ],
   medio: [
     {
       question: '¿Qué es una dirección IP?',
       imageUrl: 'img/11.png',
       choices: ['El nombre de una computadora', ' Identificador de red', 'Tipo de memoria', 'Programa de inicio'],
       answer: 'Identificador de red'
     },
     {
       question: '¿Qué es una red LAN?',
       imageUrl: 'img/12.png',
       choices: ['Red entre países', 'Red local', ' Red inalámbrica', 'Conjunto de servidores web'],
       answer: 'Red local'
     },
     {
      question: '¿Qué hace un compilador?',
      imageUrl: 'img/13.png',
      choices: ['Traduce código fuente', 'Guarda archivos', ' Ejecuta scripts', 'Protege la memoria'],
      answer: 'Traduce código fuente'
    },
    {
      question: '¿Qué es una base de datos?',
      imageUrl: 'img/14.png',
      choices: ['Archivo comprimido', 'Colección de datos organizados', ' Página web', 'Lenguaje de programación'],
      answer: 'Colección de datos organizados'
    },
    {
      question: '¿Qué sistema numérico usa solo 0 y 1?',
      imageUrl: 'img/15.png',
      choices: ['Decimal', 'Octal', ' Binario', 'Hexadecimal'],
      answer: 'Binario'
    },
    {
      question: '¿Qué es un sistema operativo?',
      imageUrl: 'img/16.png',
      choices: ['Antivirus', 'Navegador', ' Administrador del hardware y software', 'Programa de correo'],
      answer: 'Administrador del hardware y software'
    },
    {
      question: '¿Qué es un archivo ejecutable?',
      imageUrl: 'img/17.png',
      choices: ['Imagen', 'Archivo que se puede ejecuta', ' Texto', 'Video'],
      answer: 'Archivo que se puede ejecuta'
    },
    {
      question: '¿Qué es "la nube"?',
      imageUrl: 'img/18.png',
      choices: ['Virus de internet', 'Memoria física externa', ' Almacenamiento en internet', 'Parte de la RAM'],
      answer: 'Almacenamiento en internet'
    },
    {
      question: '¿Qué es una API?',
      imageUrl: 'img/19.png',
      choices: [' Sistema de archivos', 'Interfaz para comunicación entre programas', 'Lenguaje de marcado', 'Protocolo de red'],
      answer: 'Interfaz para comunicación entre programas'
    },
    {
      question: '¿Qué lenguaje se usa mucho en ciencia de datos?',
      imageUrl: 'img/20.png',
      choices: ['PHP', ' Python', '  HTML', 'Java'],
      answer: 'Python'
    }

   ],
   dificil: [
     {
       question: '¿Qué es la criptografía?',
       imageUrl: 'img/21.png',
       choices: ['Formateo de archivos', 'Protección de datos mediante cifrado', 'Técnica de compresión', 'Estilo de programación'],
       answer: 'Protección de datos mediante cifrado'
     },
     {
      question: '¿Qué es una vulnerabilidad de software?',
      imageUrl: 'img/22.png',
      choices: ['Falla que puede ser explotada', 'Nuevo parche', 'Lenguaje mal optimizadoo', 'Instrucción repetida'],
      answer: 'Falla que puede ser explotada'
    },
    {
      question: '¿Qué es un algoritmo de ordenamiento?',
      imageUrl: 'img/23.png',
      choices: ['Método para imprimir', 'Método para organizar datos', 'Comando de red', 'Extensión de archivo'],
      answer: 'Método para organizar datos'
    },
    {
      question: '¿Qué es Machine Learning?',
      imageUrl: 'img/24.png',
      choices: ['Lenguaje de programación', ' Aprendizaje automático de una máquina', 'Método de cifrado', 'Modo de entrada de datos'],
      answer: 'Aprendizaje automático de una máquina'
    },
    {
      question: '¿Qué es una dirección MAC?',
      imageUrl: 'img/25.png',
      choices: ['Dirección web', 'Identificador único de red', 'Cuenta de usuario', ' Tipo de memoria'],
      answer: 'Identificador único de red'
    },
    {
      question: '¿Qué es una tabla hash?',
      imageUrl: 'img/26.png',
      choices: ['Lista de tareas', 'Mapa de bits', 'Estructura para almacenar datos', 'Archivo comprimido'],
      answer: 'Estructura para almacenar datos'
    },
    {
      question: '¿Qué hace un firewall?',
      imageUrl: 'img/27.png',
      choices: ['Protege la red', 'Optimiza archivos', 'Crea contraseñas', 'Mejora la RAM'],
      answer: 'Protege la red'
    },
    {
      question: '¿Qué es Big Data?',
      imageUrl: 'img/28.png',
      choices: ['Disco duro externo', 'Sistema operativo', 'Volumen masivo de datos', 'Virus de gran tamaño'],
      answer: 'Volumen masivo de datos'
    },
    {
      question: '¿Qué es un sistema distribuido?',
      imageUrl: 'img/29.png',
      choices: ['Una red LAN simple', 'Interfaz gráfica', 'Algoritmo básico', 'Computadoras conectadas trabajando juntas'],
      answer: 'Computadoras conectadas trabajando juntas'
    },
    {
      question: '¿Qué es un ataque DoS?',
      imageUrl: 'img/30.png',
      choices: ['Acceso remoto permitido', 'Ataque que sobrecarga un sistema', 'Método de autenticación', 'Herramienta de diseño'],
      answer: 'Ataque que sobrecarga un sistema'
    }

   ]
 };