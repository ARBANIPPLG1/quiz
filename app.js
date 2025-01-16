const questions = [
    {
        questions: "Which is larget animal in the world?",
        answer: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        questions: "langit berwarna apa?",
        answer: [
            { text: "biru", correct: true},
            { text: "merah", correct: false},
            { text: "pink", correct: false},
            { text: "kuning", correct: false},
        ]
    },
    {
        questions: "1+1",
        answer: [
            { text: "3", correct: false},
            { text: "2", correct: true},
            { text: "4", correct: false},
            { text: "5", correct: false},
        ]
    },
    {
        questions: "9-8",
        answer: [
            { text: "2", correct: false},
            { text: "1", correct: true},
            { text: "5", correct: false},
            { text: "-1", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " +currentQuestion.questions

    currentQuestion.answer.forEach(answer => {
         const button = document.createElement("button");
         button.innerHTML = answer.text;
         button.classList.add("btn")
         answerButtons.appendChild(button);
         if(answer.correct){
            button.dataset.correct = answer.correct;
         }
         button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.add === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


