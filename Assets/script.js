// variables
var startButton = document.getElementById("start")
var quizSection = document.getElementById('quiz')
var introSection = document.getElementById('intro')

var isWin = false;
var currentQuestionIndex = 0;


// When the page loads, the init function is called
function init() {
    getScore()
}


// The startQuiz function is called when the start button is clicked
function startQuiz() {
    quizSection.classList.remove("hidden")
    introSection.classList.add("hidden")
    showCurrentQuestion()
    // startTimer()
}

// After clicking start, the questions will begin
function showCurrentQuestion() {
    var currentQuestion = quizQuestions[currentQuestionIndex]
    console.log("question", currentQuestion.question)
}

// Function used by init
function getScore() {

}


// The startTimer function starts and stops the timer and shows the score
function startTimer() {
    timer = setInterval(function() {
        timerCount--
    }, 1000)
}



// startButton event listener calls startQuiz function on click
startButton.addEventListener("click", startQuiz)

// Calls init() to begin when page is opened
init()














// var submitButton = document.getElementById('submit');

// Quiz Questions
var quizQuestions = [
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "correct answer",
            c: "incorrect answer"
        },
        correctAnswer: "b"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    }
];