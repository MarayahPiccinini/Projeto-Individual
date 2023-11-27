const $startGameButton = document.querySelector(".start_quiz");
const $questionsContainer = document.querySelector(".questions_container");
const $answersContainer = document.querySelector(".answers_container");
const $questionText = document.querySelector(".question");
const $nextQuestionButton = document.querySelector(".next_question ");
const $audioJogo = document.getElementById("musica");
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);
var question1 = 0
var question2 = 0
var question3 = 0
var question4 = 0
var question5 = 0

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
  $audioJogo.innerHTML = questions[currentQuestionIndex].audio


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
    if(currentQuestionIndex==0){
question1=1
    }else if(currentQuestionIndex==1){
  question2=1
    }else if(currentQuestionIndex==2){
  question3=1
    }else if(currentQuestionIndex==3){
  question4=1
    }else if(currentQuestionIndex==4){
  question5=1
    }
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
  container.remove("container")
  fetch("/dashboard/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     m1:question1,
     m2:question2,
     m3:question3,
     m4:question4,
     m5:question5,
     fkUsuario:sessionStorage.ID_USUARIO
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        setTimeout(() => {
          window.location.href="./dashboard.html";
        }, "100");

        
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);

    });
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
  // $questionsContainer.innerHTML = `
  // <p class="final-message">
  // Você acertou ${totalCorrect} de ${totalQuestion} questões!
  // <span> Resultado: ${message}</span>
  // </p>
  // <button onclick=window.location.reload()>
  // Refazer Teste
  // </button>
  // // `
}


const questions = [
  {
    audio: '<audio class="audio-player" src="./assets/Audio/emicida_amarelo_Cortada.mp3" type="audio/mp3" controls></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "Amarelo-Emicida", correct: true },
      { text: "Nego Drama- Racionais", correct: false },
      { text: "julho de 94-Donga", correct: false },
      { text: "O Soldado que fica", correct: false },
    ],
  },
  {audio:'<audio class="audio-player" src="./assets/Audio/levanta_e_anda_cortada.mp3" type="audio/mp3" controls></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "Amarelo-Emicida", correct: false },
      { text: "Levanta e Anda-Emicida", correct: true },
      { text: "Soldado que Fica-Mv Bill", correct: false },
      { text: "A Vida é Desafio55 ", correct: false },
    ],
  },
  { audio:'<audio class="audio-player" src="./assets/Audio/traficando_cortada.mp3" type="audio/mp3" controls></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "Julho de 94-Djonga", correct: false },
      { text: "Brasilândia-Negra Li", correct: false },
      { text: "Olho de Tigre-Djonga", correct: false },
      { text: "Traficando informações-MvBill", correct: true },
    ],
  },
  {audio:'<audio class="audio-player" src="./assets/Audio/negraLi_cortada.mp3" type="audio/mp3" controls></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "Desconstruindo Amélia-Pitty", correct: false },
      { text: "Brasilândia-Negra Li", correct: true },
      { text: "O Soldado que Fica-MvBill", correct: false },
      { text: "Amarelo-Emicida", correct: false },
    ],
  },
  {  audio:'<audio class="audio-player" src="./assets/Audio/pitty_cortada.mp3" type="audio/mp3" controls></audio>',
    question: "Qual é a Música?",
    answers: [
      { text: "Levanta e Anda-Emicida", correct: false },
      { text: "O Soldado que Fica-MvBill", correct: false },
      { text: "Nego Drama-Racionais", correct: false },
      { text: "Desconstrindo Amélia-Pitty", correct: true },
    ],
  },
];