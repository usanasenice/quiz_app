let currentQuestion = 0; // Declare and initialize currentQuestion at the top
let score = 0;
//json holding the questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter"
  },
  {
    question: "What is the smallest continent?",
    choices: ["Africa", "Australia", "Europe", "Antarctica"],
    answer: "Australia"
  }
];
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
function renderQuestion() {
  const question = questions[currentQuestion];
  questionText.textContent = question.question;
  choicesContainer.innerHTML = "";
  for (let choice of question.choices) {
    const choiceElement = document.createElement("div");
    choiceElement.classList.add("mb-2");
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "choice";
    radioInput.value = choice;
    radioInput.addEventListener("change", handleChoice);

    const label = document.createElement("label");
    label.textContent = choice;
    label.prepend(radioInput);

    choiceElement.appendChild(label);
    choicesContainer.appendChild(choiceElement);
  }
}
function handleChoice(event) {
  const selectedChoice = event.target.value;
  const currentQuestionObj = questions[currentQuestion]; 
  if (selectedChoice === currentQuestionObj.answer) {
    feedback.textContent = "Correct!";
    score++;
  } else {
    feedback.textContent = `Incorrect. The correct answer is ${currentQuestionObj.answer}.`;
  }
  scoreDisplay.textContent = `Score: ${score}`;
}
function showNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
    feedback.textContent = "";
  } else {
    questionText.textContent = "Quiz completed!";
    choicesContainer.innerHTML = "";
    feedback.textContent = `Your final score is ${score} out of ${questions.length}.`;
    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }
}
function showPrevQuestion() {
  currentQuestion--;
  if (currentQuestion >= 0) {
    renderQuestion();
    feedback.textContent = "";
  } else {
    currentQuestion = 0;
  }
}
prevBtn.addEventListener("click", showPrevQuestion);
nextBtn.addEventListener("click", showNextQuestion);
renderQuestion();