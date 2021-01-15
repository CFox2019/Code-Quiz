// variables
var introSection = document.getElementById('intro')
var startButton = document.getElementById("start")
var quizSection = document.getElementById('quiz')
var quizAnswers = document.getElementById('quiz-answers')
var scoreBoardSection = document.getElementById('score-board')
var scoreTimer = document.getElementById('score-timer')
var gameOverSection = document.getElementById('game-over')
var leaderBoardSection = document.getElementById('leader-board')

var isWin = false
var currentQuestionIndex = 0
var timerCount = 60
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
    currentQuestionIndex = 0
    timerCount = 60
    quizSection.classList.remove("hidden")
    introSection.classList.add("hidden")
    showCurrentQuestion()
    startTimer()
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

// After clicking start, the questions will begin
function showCurrentQuestion() {
    quizAnswers.innerHTML = ""
    var currentQuestion = quizQuestions[currentQuestionIndex]

    var quizQuestion = document.getElementById('quiz-question')
    quizQuestion.textContent = currentQuestion.question

    Object.entries(currentQuestion.answers).forEach(entry => {
        var [key, value] = entry;
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
    var leaderBoard = getLeaderBoard()
    leaderBoard.push(playerInfo)
    localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard))
    showLeaderBoard()
}

function showLeaderBoard() {
    clearInterval(timer)
    var leaderBoard = getLeaderBoard()
    leaderBoardSection.classList.remove('hidden')
    gameOverSection.classList.add('hidden')
    introSection.classList.add('hidden')
    quizSection.classList.add('hidden')
    var playerScores = document.getElementById('player-scores')
    playerScores.innerHTML = ""
    leaderBoard.forEach(function(playerScore) {
        var playerEntry = document.createElement('p')
        playerEntry.innerHTML = `${playerScore.initials}: ${playerScore.score}`
        playerScores.appendChild(playerEntry)
    })
    document.getElementById('submit-go-back-btn').addEventListener("click", showIntroScreen)
    document.getElementById('submit-clear-scores-btn').addEventListener("click", clearScoresEntry)
}

// Answer click will receive the user selected answer and validate if it is correct
function answerClicked(event) {
    var currentQuestion = quizQuestions[currentQuestionIndex]
    var answerButton = event.target
    console.log("answer button", answerButton);
    var answerKey = answerButton.getAttribute("answer-key")
    currentQuestionIndex += 1
    var answerFeedbackMessage = ''
    if (currentQuestion.correctAnswer === answerKey) {
        answerFeedbackMessage = 'Correct!'
    } else {
        answerFeedbackMessage = 'Wrong!'
        timerCount -= 10
    }
    var answerFeedback = document.getElementById('answer-feedback')
    answerFeedback.innerHTML = answerFeedbackMessage
    setTimeout(function() {
        answerFeedback.innerHTML = ""
    }, 1000)
    if (currentQuestionIndex >= quizQuestions.length - 1) {
        showGameOverScreen()
    } else {
        showCurrentQuestion()
    }
}

// This function will clear scores on leader board screen, if clear highscores is clicked
function clearScoresEntry() {
    localStorage.removeItem('leaderBoard')
    showLeaderBoard()
}

function showIntroScreen() {
    leaderBoardSection.classList.add('hidden')
    gameOverSection.classList.add('hidden')
    quizSection.classList.add('hidden')
    introSection.classList.remove('hidden')
}

function getLeaderBoard() {
    return (JSON.parse(localStorage.getItem('leaderBoard')) || []).sort((a, b) => {
        if (b.score < a.score) {
            return -1
        } else if (b.score > a.score) {
            return 1
        } else {
            return 0
        }
    }).splice(0, 5)
}

// Event listeners
startButton.addEventListener("click", startQuiz)
document.getElementById('view-highscores').addEventListener("click", (e) => {
    e.preventDefault()
    showLeaderBoard()
})
