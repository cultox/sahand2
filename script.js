const quizData = [
    {
        question: "Which English team has won the most Premier League titles of all time?",
        a: "Manchester United",
        b: "Manchester City",
        c: "Liverpool",
        d: "Arsenal",
        correct: "a",
        image: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/48/Manchester-United-icon.png"
    },
    {
        question: "Which of these teams holds the longest unbeaten run in football?",
        a: "Arsenal",
        b: "Bayern Munich",
        c: "Juventus",
        d: "AC Milan",
        correct: "d",
        image: "https://icons.iconarchive.com/icons/giannis-zographos/italian-football-club/48/AC-Milan-icon.png"
    },
    {
        question: "Which country holds the most FIFA World Cup titles?",
        a: "France",
        b: "Germany",
        c: "Brazil",
        d: "Italy",
        correct: "c",
        image: "https://cdn3.emoji.gg/emojis/4291-brazil.png"
    },
    {
        question: "Who is the all-time goal-scoring record holder in the Champions League?",
        a: "Lionel Messi",
        b: "Karim Benzema",
        c: "Robert Lewandowski",
        d: "Cristiano Ronaldo",
        correct: "d",
        image: "https://cdn.emojidex.com/emoji/px64/ronaldo.png?1580472710"
    }
]

const quizContainer = document.getElementById('quiz')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const answerImage = document.getElementById('answer-image')
let username = ''

const usernameInput = document.getElementById('username')
const registerBtn = document.getElementById('register-btn')

registerBtn.addEventListener('click', () => {
    username = usernameInput.value.trim()
    if (username !== '') {
        document.querySelector('.register-container').style.display = 'none'
        quizContainer.style.display = 'block';
        loadQuiz()
    } else {
        alert('Please enter a username')
    }
});

let currentQuestion = 0
let score = 0

function loadQuiz() {
    const currentQuizData = quizData[currentQuestion]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function getSelectedAnswer() {
    const answerEls = document.querySelectorAll('input[name="answer"]')
    let selectedAnswer = null
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            selectedAnswer = answerEl.id
        }
    });
    return selectedAnswer
}

function displayFeedback(isCorrect, imageUrl) {
    const feedbackContainer = document.getElementById('feedback')
    feedbackContainer.innerHTML = isCorrect ? `<span class="correct-feedback">Correct!</span>` : `<span class="wrong-feedback">Wrong!</span>`
    if (imageUrl) {
        answerImage.src = imageUrl
        answerImage.style.display = 'block'
    }
}

function clearFeedback() {
    const feedbackContainer = document.getElementById('feedback')
    feedbackContainer.innerHTML = ''
    answerImage.style.display = 'none'
}

submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelectedAnswer()
    if (!selectedAnswer) {
        alert('Please select an answer.')
        return;
    }
    const currentQuizData = quizData[currentQuestion]
    const isCorrect = selectedAnswer === currentQuizData.correct
    if (isCorrect) {
        score++
    }
    displayFeedback(isCorrect, currentQuizData.image)
    setTimeout(() => {
        currentQuestion++
        clearFeedback()
        if (currentQuestion < quizData.length) {
            loadQuiz()
        } else {
            const result = document.createElement('h2')
            result.innerText = `Your result is ${score}/${quizData.length} questions correct`
            quizContainer.innerHTML = ''
            quizContainer.appendChild(result)
        }
    }, 1000)
})
