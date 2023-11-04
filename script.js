const questions = [
    {
        question: "What is the square root of 64?",
        answers: [
            { text: "8", correct: true},
            { text: "6", correct: false},
            { text: "10", correct: false},
            { text: "12", correct: false},
        ]
    },
    {
        question: "What is the value of 5! (5 factorial)?",
        answers: [
            { text: "25", correct: false},
            { text: "60", correct: false},
            { text: "120", correct: true},
            { text: "100", correct: false},
        ] 
    },
    {
        question: "What is the value of π (pi) correct to two decimal places?",
        answers: [
            { text: "2.71", correct: false},
            { text: "3.14", correct: true},
            { text: "3.61", correct: false},
            { text: "3.18", correct: false},
        ] 
    },
    {
        question: "Solve the equation: 2x + 5 = 17.",
        answers: [
            { text: "x = 10", correct: false},
            { text: "x = 8", correct: false},
            { text: "x = 2", correct: false},
            { text: "x = 6", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentIndex = 0;
let score = 0;

function startQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    if (currentIndex < questions.length) {
        let currentQuestion = questions[currentIndex];
        let questionNum = currentIndex + 1;
        questionElement.innerHTML = questionNum + ". " + currentQuestion.question;
        // Clear answer buttons
        answerButtons.innerHTML = "";

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            button.addEventListener("click", () => {
                checkAnswer(answer.correct, button);
                if (index === currentQuestion.answers.length-1) { // Last question
                    if (answer.correct) {
                        button.classList.add("correct");
                    } else {
                        button.classList.add("wrong");
                    }
                    showScore();
                }
            });
            answerButtons.appendChild(button);
        });
    } else {
        // Quiz ended, display score
        questionElement.innerHTML = `Quiz Ended! Your score is ${score} out of ${questions.length}!`;
        // Clear answer buttons
        answerButtons.innerHTML = "";
        // Hide next button
        nextButton.style.display = "none";
    }
}

function checkAnswer(isCorrect, button) {
    if (isCorrect) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    // Disable all buttons after an answer is clicked
    const buttons = answerButtons.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    currentIndex++;
    if (currentIndex < questions.length) {
        nextButton.style.display = "block";
    }
}

nextButton.addEventListener("click", () => {
    showQuestion();
});

startQuiz();
