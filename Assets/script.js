// variables
var introSection = document.getElementById('intro')
var startButton = document.getElementById("start")
var quizSection = document.getElementById('quiz')
var quizAnswers = document.getElementById('quiz-answers')
var scoreTimerSection = document.getElementById('score-timer')
var scoreBoardSection = document.getElementById('score-board')

var isWin = false;
var currentQuestionIndex = 0;


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

    var quizQuestion = document.getElementById('quiz-question')
    quizQuestion.textContent = currentQuestion.question

    Object.entries(currentQuestion.answers).forEach(entry => {
        const [key, value] = entry;
        var answerButton = document.createElement("button")
        answerButton.setAttribute("answer-key", key)
        answerButton.textContent = value
        quizAnswers.appendChild(answerButton)
        answerButton.addEventListener("click", answerClicked)
    });
}

// Answer click will receive the user selected answer and validate if it is correct
function answerClicked(event) {
    var currentQuestion = quizQuestions[currentQuestionIndex]
    var answerButton = event.target
    console.log("answer button", answerButton);
    var answerKey = answerButton.getAttribute("answer-key")
    if (currentQuestion.correctAnswer === answerKey) {
        console.log("correct answer clicked!!!");
        currentQuestionIndex += 1
        quizAnswers.innerHTML = ""
        showCurrentQuestion()
    }
}

// The startTimer function starts and stops the timer and shows the score
function startTimer() {
    timer = setInterval(function() {
        timerCount--
    }, 1000)
}



// startButton event listener calls startQuiz function on click
startButton.addEventListener("click", startQuiz)














// When the page loads, the init function is called
function init() {
    getScore()
}




// Calls init() to begin when page is opened
init()




// Function used by init
function getScore() {

}









// var submitButton = document.getElementById('submit');

// Quiz Questions
var quizQuestions = [
    {
        question: "My question will go here 1?",
        answers: {
            a: "incorrect answer",
            b: "correct answer",
            c: "incorrect answer"
        },
        correctAnswer: "b"
    },
    {
        question: "My question will go here2?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here3?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here4?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    },
    {
        question: "My question will go here5?",
        answers: {
            a: "incorrect answer",
            b: "incorrect answer",
            c: "correct answer"
        },
        correctAnswer: "c"
    }
];