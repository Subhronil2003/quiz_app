const questions = [
  {
    question:
      " Which among the following is not a trophy or cup related to Hockey?",
    answer: [
      { text: "Bombay Gold Cup", correct: false },
      { text: "Gurmeet Trophy", correct: false },
      { text: "Indira Gold Cup", correct: false },
      { text: "Narang Cup", correct: true },
    ],
  },
  {
    question:
      "Who among the following cricketers was the first to score a century for the Indian Test cricket team in his Debut Test match ?",
    answer: [
      { text: "Sunil Gawaskar", correct: false },
      { text: "Kapil Dev", correct: false },
      { text: "Lala Amarnath", correct: true },
      { text: " Nawab Pataudi", correct: false },
    ],
  },
  {
    question: " Where were the first Summer Olympics held?",
    answer: [
      { text: "Singapore", correct: false },
      { text: "South Korea", correct: false },
      { text: "Germany", correct: false },
      { text: "Greece", correct: true },
    ],
  },
  {
    question: " Who is the top scorer in Indian National Football Team?",
    answer: [
      { text: "Sunil Chhetri", correct: true },
      { text: "Gurpreet Singh Sandhu", correct: false },
      { text: "Nishu Kumar", correct: false },
      { text: "Udanta Singh", correct: false },
    ],
  },
  {
    question: " How many laws are there in all in Laws of Cricket?",
    answer: [
      { text: " 40", correct: false },
      { text: "54", correct: false },
      { text: "48", correct: false },
      { text: "42", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You score ${score} out of${questions.length}!`;
  nextButton.innerHTML = "PLAY AGAIN";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
