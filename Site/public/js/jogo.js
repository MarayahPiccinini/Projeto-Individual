const $startGameButton = document.querySelector(".start_quiz");
const $questionsContainer = document.querySelector(".questions_container");
const $answersContainer = document.querySelector(".answers_container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next_question ");
const $audioJogo = document.querySelector(".musica");
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

let currentQuestionIndex = 0;
let totalCorrect = 0;

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide")
  displayNextQuestion();
}
function displayNextQuestion() {
  resetState();
  if (questions.length == currentQuestionIndex) {
    return finishGame();
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  $audioJogo.innerHTML=questions[currentQuestionIndex].audio
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAnswer = document.createElement("button")
    newAnswer.classList.add("button", "answer")
    newAnswer.textContent = answer.text
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer)
  })
}
function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}
function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }
  document.querySelectorAll(".answer").forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
    button.disabled = true;
  });
  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame() {
  const totalQuestion = questions.length
  const performance = Math.floor(totalCorrect*100 / totalQuestion)

  let message = ""
  switch(true){
    case performance >= 90:
      message = "Você é bom mesmo!"
      break
      case(performance>= 70):
      message = "É...ta sabendo bastante"
      break
      case(performance>= 50):
      message = "Você precisa escutar mais música"
      break
      default:
        message = "Ta ruizinho"
  }
  $questionsContainer.innerHTML = `
  <p class="final-message">
  Você acertou ${totalCorrect} de ${totalQuestion} questões!
  <span> Resultado: ${message}</span>
  </p>
  <button onclick=window.location.reload()>
  Refazer Teste
  </button>
  `
}


const questions = [
  {audio: '<audio class="audio-player" src="./assets/Audio/Emicida - AmarElo (Sample Sujeito de Sorte) part Pabllo Vittar, Majur e Thiago Jamelão (Lyric Video).mp3" type="audio/mp3"></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "X", correct: true },
      { text: "P", correct: false },
      { text: "T", correct: false },
      { text: "O", correct: false },
    ],
  },
  {audio:'<audio class="audio-player" src="./assets/Audio/Emicida - Levanta e anda (Feat. Rael).mp3" type="audio/mp3"></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "A", correct: false },
      { text: "B", correct: true },
      { text: "C", correct: false },
      { text: "X", correct: false },
    ],
  },
  { audio:'<audio class="audio-player" src="./assets/Audio/MV BILL - Traficando Informação (clipe).mp3" type="audio/mp3"></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "F", correct: false },
      { text: "E", correct: false },
      { text: "L", correct: false },
      { text: "I", correct: true },
    ],
  },
  {audio:'<audio class="audio-player" src="./assets/Audio/Negra Li - Brasilândia (Prod. Paiva  Lotto).mp3" type="audio/mp3"></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "D", correct: false },
      { text: "S", correct: true },
      { text: "G", correct: false },
      { text: "J", correct: false },
    ],
  },
  {  audio:'<audio class="audio-player" src="./assets/Audio/Pitty - Desconstruindo Amélia (Webclipe).mp3" type="audio/mp3"></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "L", correct: false },
      { text: "M", correct: false },
      { text: "N", correct: false },
      { text: "O", correct: true },
    ],
  },
];
