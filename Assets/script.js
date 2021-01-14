// variables
var introSection = document.getElementById('intro')
var startButton = document.getElementById("start")
var quizSection = document.getElementById('quiz')
var quizAnswers = document.getElementById('quiz-answers')
var scoreBoardSection = document.getElementById('score-board')
var scoreTimer = document.getElementById('score-timer')
var gameOverSection = document.getElementById('game-over')
var leaderBoard = JSON.parse(localStorage.getItem('leaderBoard')) || []

var isWin = false
var currentQuestionIndex = 0
var timerCount = 30
var timer = null

// Quiz Questions
var quizQuestions = [
    {
        question: "What is JavaScript?",
        answers: {
            a: "A. language used to style an HTML document",
            b: "B. a scripting or programming language that allows you to implement complex features on web pages",
            c: "C. the standard markup language for Web pages"
        },
        correctAnswer: "b"
    },
    {
        question: "What does a CSS rule-set contain?",
        answers: {
            a: "A. variable",
            b: "B. boolean",
            c: "C. selector and a declaration block"
        },
        correctAnswer: "c"
    },
    {
        question: "A JavaScript function is defined with the ________ keyword?",
        answers: {
            a: "A. function",
            b: "B. variable",
            c: "C. name"
        },
        correctAnswer: "a"
    },
    {
        question: "How can you access an array element?",
        answers: {
            a: "A. by its variable",
            b: "B. by using .length",
            c: "C. by its index number"
        },
        correctAnswer: "c"
    },
    {
        question: "Which of the following operators means it's not equal to?",
        answers: {
            a: "A. &=",
            b: "B. !=",
            c: "C. =="
        },
        correctAnswer: "b"
    }
];

// The startQuiz function is called when the start button is clicked
function startQuiz() {
    quizSection.classList.remove("hidden")
    introSection.classList.add("hidden")
    showCurrentQuestion()
    startTimer()
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

function showGameOverScreen() {
    clearInterval(timer)
    gameOverSection.classList.remove('hidden')
    quizSection.classList.add('hidden')
    var score = document.getElementById('score')
    score.value = timerCount
    document.getElementById('submit').addEventListener("click", submitPlayerInfo)
}

function submitPlayerInfo(e) {
    e.preventDefault()
    var playerInfo = {
        score: timerCount,
        initials: document.getElementById('initials').value
    }
    leaderBoard.push(playerInfo)
    localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard))
    showLeaderBoard()
}

function showLeaderBoard() {
    var leaderBoardSection = document.getElementById('leader-board')
    leaderBoardSection.classList.remove('hidden')
    gameOverSection.classList.add('hidden')
    var playerScores = document.getElementById('player-scores')
    leaderBoard.forEach(function(playerScore) {
        console.log('playerScore', playerScore);
        // const [score, initials] = playerScore
        var playerEntry = document.createElement('p')
        playerEntry.innerHTML = `${playerScore.initials}: ${playerScore.score}`
        playerScores.appendChild(playerEntry)
    })
    Object.entries(leaderBoard).forEach(entry => {
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
    if (currentQuestionIndex >= quizQuestions.length - 1) {
        showGameOverScreen()
        return
    }
    var currentQuestion = quizQuestions[currentQuestionIndex]
    var answerButton = event.target
    console.log("answer button", answerButton);
    var answerKey = answerButton.getAttribute("answer-key")
    currentQuestionIndex += 1
    quizAnswers.innerHTML = ""
    var answerFeedbackMessage = ''
    if (currentQuestion.correctAnswer === answerKey) {
        answerFeedbackMessage = 'Correct!'
    } else {
        answerFeedbackMessage = 'Wrong!'
        timerCount -= 5
    }
    var answerFeedback = document.getElementById('answer-feedback')
    answerFeedback.innerHTML = answerFeedbackMessage
    setTimeout(function() {
        answerFeedback.innerHTML = ""
    }, 1000)
    showCurrentQuestion()
}

// The startTimer function starts and stops the timer and shows the score
function startTimer() {
    scoreTimer.innerHTML = timerCount
    timer = setInterval(function() {
        timerCount--
        if (timerCount <= 0) {
            showGameOverScreen()
        } else {
            scoreTimer.innerHTML = timerCount
        }
    }, 1000)
}

// startButton event listener calls startQuiz function on click
startButton.addEventListener("click", startQuiz)
