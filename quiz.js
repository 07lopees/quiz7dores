const questions = [
    {
        question: "Qual foi a primeira dor de Maria?",
        explanation: "A primeira dor foi a profecia de Simeão, que anunciou que uma espada de dor atravessaria a alma de Maria.",
        answers: [
            { text: "A perda de Jesus no Templo", correct: false },
            { text: "A profecia de Simeão que disse que uma espada traspassaria seu coração", correct: true },
            { text: "A fuga para o Egito", correct: false },
            { text: "Ver Jesus crucificado", correct: false }
        ]
    },
    {
        question: "Na segunda dor, Maria e São José tiveram que fugir para onde com o Menino Jesus?",
        explanation: "Eles fugiram para o Egito para proteger Jesus da perseguição do rei Herodes.",
        answers: [
            { text: "Nazaré", correct: false },
            { text: "Belém", correct: false },
            { text: "Egito", correct: true },
            { text: "Jerusalém", correct: false }
        ]
    },
    {
        question: "Qual foi a terceira dor de Nossa Senhora?",
        explanation: "Maria sofreu ao perder Jesus por três dias, até encontrá-lo no Templo.",
        answers: [
            { text: "Ver Jesus morto na cruz", correct: false },
            { text: "Perder Jesus por três dias no Templo quando Ele tinha 12 anos", correct: true },
            { text: "A profecia de Simeão", correct: false },
            { text: "A deposição do corpo de Jesus", correct: false }
        ]
    },
    {
        question: "Qual evangelista descreve o momento em que Maria está aos pés da cruz?",
        explanation: "Foi João, que relata Maria junto à cruz de Jesus.",
        answers: [
            { text: "Mateus", correct: false },
            { text: "Marcos", correct: false },
            { text: "Lucas", correct: false },
            { text: "João", correct: true }
        ]
    },
    {
        question: "Quantas dores de Maria são tradicionalmente meditadas?",
        explanation: "A tradição católica contempla 7 dores de Maria.",
        answers: [
            { text: "5", correct: false },
            { text: "7", correct: true },
            { text: "10", correct: false },
            { text: "15", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const quizContainer = document.querySelector(".quiz-container");
const quiz = document.getElementById("quiz");
const timerBar = document.getElementById("timer-bar");
const explanationElement = document.getElementById("explanation");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 100;

function startQuiz(){
    scoreElement.innerText = score;
    showQuestion();
}

function showQuestion(){
    resetState();

    let current = questions[currentQuestion];
    questionElement.innerText = current.question;

    answerButtons.forEach((button, index) => {
        button.innerText = current.answers[index].text;
        button.disabled = false;
        button.classList.remove("correct-answer");

        button.onclick = () => selectAnswer(current.answers[index]);
    });

    startTimer();
}

function startTimer(){
    timeLeft = 100;
    timerBar.style.width = "100%";

    timer = setInterval(() => {
        timeLeft--;
        timerBar.style.width = `${timeLeft}%`;

        if(timeLeft <= 0){
            clearInterval(timer);
            timeOut();
        }
    }, 100);
}

function stopTimer(){
    clearInterval(timer);
}

function highlightCorrectAnswer(){
    questions[currentQuestion].answers.forEach((answer, index) => {
        if(answer.correct){
            answerButtons[index].classList.add("correct-answer");
        }
    });
}

function timeOut(){
    answerButtons.forEach(btn => btn.disabled = true);

    highlightCorrectAnswer();

    explanationElement.innerText =
        questions[currentQuestion].explanation;

    explanationElement.style.display = "block";

    quizContainer.classList.add("wrong");
    nextButton.style.display = "inline-block";
}

function resetState(){
    nextButton.style.display = "none";
    explanationElement.style.display = "none";
    quizContainer.classList.remove("correct","wrong");
}

function selectAnswer(answer){
    stopTimer();

    answerButtons.forEach(btn => btn.disabled = true);

    highlightCorrectAnswer();

    if(answer.correct){
        score++;
        scoreElement.innerText = score;
        quizContainer.classList.add("correct");
    } else {
        quizContainer.classList.add("wrong");
    }

    explanationElement.innerText =
        questions[currentQuestion].explanation;

    explanationElement.style.display = "block";

    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if(currentQuestion < questions.length){
        showQuestion();
    } else {
        showResult();
    }
});

function showResult(){
    quiz.innerHTML = `
        <h2>Quiz Finalizado!</h2>
        <p>Sua pontuação foi: ${score}/5</p>
    `;

    nextButton.style.display = "none";
    timerBar.style.width = "0%";
}

startQuiz();