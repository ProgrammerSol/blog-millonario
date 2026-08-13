// ==========================================
// 1. SELECTORES
// ==========================================
const indicadorProgreso = document.querySelector('#progress-indicator');//numero de pregunta (1 de 5)
const textoPreguntaElemento = document.querySelector('#question-text');//inyecta el texto de cada nueva pregunta dinámicamente cada vez que el usuario avanza.
const contenedorRespuestas = document.querySelector('#answers-container');//insertar los botones de respuesta creados para la pregunta actual.
const visorPuntaje = document.querySelector('#score-display');//la calificación final ("4/5").
const descripcionResultado = document.querySelector('#result-description');//mensaje personalizado ("¡Excelente mentalidad!...").


// ==========================================
// 2. VARIABLES Y DATOS
// ==========================================
const preguntas = [ //guarda todo el bloque de información.
    {
        textoPregunta: "¿Qué sueles hacer cuando recibes tus ingresos mensuales?",
        respuestas: [
            { texto: "Ahorro e invierto un porcentaje antes de gastar", esCorrecta: true },//objetos
            { texto: "Gasto en lo que necesito y si sobra lo guardo", esCorrecta: false },
            { texto: "Pago deudas y vivo al límite hasta el próximo mes", esCorrecta: false },
            { texto: "No llevo un control específico de mis ingresos", esCorrecta: false }
        ]
    },
    {
        textoPregunta: "¿Cómo percibes el riesgo al momento de invertir?",
        respuestas: [
            { texto: "Como una oportunidad analizada para hacer crecer el capital", esCorrecta: true },
            { texto: "Como algo peligroso que siempre se debe evitar", esCorrecta: false },
            { texto: "Como una apuesta de suerte o azar", esCorrecta: false },
            { texto: "No tengo experiencia ni interés en invertir", esCorrecta: false }
        ]
    },
    {
        textoPregunta: "Frente a un gasto imprevisto o emergencia, tú...",
        respuestas: [
            { texto: "Tengo un fondo de emergencia ahorrado para esto", esCorrecta: true },
            { texto: "Debo pedir prestado a familiares o amigos", esCorrecta: false },
            { texto: "Uso la tarjeta de crédito y me preocupo después", esCorrecta: false },
            { texto: "Quedo completamente desprotegido financieramente", esCorrecta: false }
        ]
    },
    {
        textoPregunta: "¿Cuál es tu enfoque principal al comprar un objeto costoso?",
        respuestas: [
            { texto: "Evalúo si es un activo, un lujo necesario o un pasivo", esCorrecta: true },
            { texto: "Si me gusta y lo puedo financiar, lo compro de inmediato", esCorrecta: false },
            { texto: "Compro para mantener estatus social con los demás", esCorrecta: false },
            { texto: "Evito comprar cualquier cosa por miedo a gastar", esCorrecta: false }
        ]
    },
    {
        textoPregunta: "Para ti, el concepto de 'educación financiera' significa...",
        respuestas: [
            { texto: "Una herramienta clave para lograr la libertad y estabilidad", esCorrecta: true },
            { texto: "Algo complejo que solo entienden los economistas", esCorrecta: false },
            { texto: "Aprender únicamente a recortar gastos básicos", esCorrecta: false },
            { texto: "Un tema irrelevante para el día a día", esCorrecta: false }
        ]
    }
];

let indicePreguntaActual = 0;
let puntajeTotal = 0;
let seleccionTemporalCorrecta = false;


// ==========================================
// 3. FUNCIONES
// ==========================================

// Cambiar entre pantallas usando forEach en lugar de un ciclo for tradicional
const cambiarPantalla = (idPantalla) => {
    document.querySelectorAll('.view').forEach(vista => {
        vista.style.display = 'none';
        vista.className = 'view';
    });

    const pantallaActiva = document.querySelector(`#${idPantalla}`);
    pantallaActiva.style.display = 'block';
    pantallaActiva.className = 'view active';
};

const iniciarTest = () => {
    indicePreguntaActual = 0;
    puntajeTotal = 0;
    cambiarPantalla('view-preguntas');
    cargarPreguntaActual();
};

const cargarPreguntaActual = () => {
    seleccionTemporalCorrecta = false;
    
    // Obtenemos la pregunta y sus respuestas usando destructuración de objetos
    const { textoPregunta, respuestas } = preguntas[indicePreguntaActual];
    
    indicadorProgreso.innerHTML = `${indicePreguntaActual + 1} de 5`;
    textoPreguntaElemento.innerHTML = textoPregunta;

    // Limpiamos el contenedor
    contenedorRespuestas.innerHTML = "";

    // Usamos .forEach() en lugar del ciclo 'for' clásico para recorrer las respuestas
    respuestas.forEach(({ texto, esCorrecta }) => {
        const boton = document.createElement('button');
        boton.className = 'answer-btn';
        boton.innerHTML = texto;

        boton.addEventListener('click', () => {
            // Usamos .forEach() para quitar la clase 'selected' de todos los botones de golpe
            document.querySelectorAll('.answer-btn').forEach(btn => btn.className = 'answer-btn');

            // Añadimos la selección al botón actual
            boton.className = 'answer-btn selected';
            seleccionTemporalCorrecta = esCorrecta;
        });

        contenedorRespuestas.appendChild(boton);
    });
};

const siguientePregunta = () => {
    // Operador ternario para sumar puntos si la selección fue correcta
    puntajeTotal = seleccionTemporalCorrecta ? puntajeTotal + 1 : puntajeTotal;
    indicePreguntaActual++;

    // Condicional para avanzar o terminar
    indicePreguntaActual < preguntas.length ? cargarPreguntaActual() : mostrarResultadosFinales();
};

const mostrarResultadosFinales = () => {
    cambiarPantalla('view-resultados');
    visorPuntaje.innerHTML = `${puntajeTotal}/5`;

    let mensajeConsejo = "";

    if (puntajeTotal === 5) {
        mensajeConsejo = "¡Excelente mentalidad! Tienes bases sólidas de inteligencia financiera.";
    } else if (puntajeTotal >= 3) {
        mensajeConsejo = "¡Buen trabajo! Vas por el camino correcto, pero puedes optimizar tus finanzas.";
    } else {
        mensajeConsejo = "Es un buen momento para replantear tus hábitos y aprender más sobre finanzas.";
    }

    descripcionResultado.innerHTML = mensajeConsejo;
};

const reiniciarTest = () => {
    cambiarPantalla('view-inicio');
};
  