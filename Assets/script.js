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
        currentQuestionIndex += 1
        quizAnswers.innerHTML = "Correct"
        showCurrentQuestion()
    } else {
        currentQuestionIndex +=1
        quizAnswers.innerHTML = "Wrong answer"
        showCurrentQuestion()
    }
}

// The startTimer function starts and stops the timer and shows the score
function startTimer() {
    timer = setInterval(function() {
        timerCount--
    }, 60000)
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
        question: "What is JavaScript?",
        answers: {
            a: "language used to style an HTML document",
            b: "a scripting or programming language that allows you to implement complex features on web pages",
            c: "the standard markup language for Web pages"
        },
        correctAnswer: "b"
    },
    {
        question: "What does a CSS rule-set contain?",
        answers: {
            a: "variable",
            b: "boolean",
            c: "selector and a declaration block"
        },
        correctAnswer: "c"
    },
    {
        question: "A JavaScript function is defined with the ________ keyword?",
        answers: {
            a: "function",
            b: "variable",
            c: "name"
        },
        correctAnswer: "a"
    },
    {
        question: "How can you access an array element?",
        answers: {
            a: "by its variable",
            b: "by using .length",
            c: "by its index number"
        },
        correctAnswer: "c"
    },
    {
        question: "Which of the following operators means it's not equal to?",
        answers: {
            a: "&=",
            b: "!=",
            c: "=="
        },
        correctAnswer: "b"
    }
];