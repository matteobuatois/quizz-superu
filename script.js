const quizData = [
    {
        q: "Lequel de ces labels garantit une qualité supérieure et le respect du bien-être animal ?",
        options: ["Label Rouge", "Nutriscore", "Eco-Score"],
        answer: 0
    },
    {
        q: "Que garantit le logo 'Bleu-Blanc-Cœur' dans l'alimentation des animaux ?",
        options: ["Plus de vitamines", "Des Oméga 3 naturels (Lin)", "Moins de sel"],
        answer: 1
    },
    {
        q: "Quelle est la distance maximale pour qu'un produit soit considéré 'Local' dans nos magasins ?",
        options: ["80 km", "250 km", "500 km"],
        answer: 0
    }
];

let currentIdx = 0;
let score = 0;

// Éléments du DOM
const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const progressEl = document.getElementById('progress');
const finalScoreEl = document.getElementById('final-score');
const resultMsgEl = document.getElementById('result-message');

// Événements
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('reset-btn').addEventListener('click', startQuiz);

function startQuiz() {
    currentIdx = 0;
    score = 0;
    homeScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentData = quizData[currentIdx];
    questionEl.innerText = currentData.q;
    progressEl.innerText = `Question ${currentIdx + 1} / ${quizData.length}`;
    
    answersEl.innerHTML = '';
    currentData.options.forEach((opt, index) => {
        const button = document.createElement('button');
        button.innerText = opt;
        button.classList.add('btn');
        button.onclick = () => checkAnswer(index);
        answersEl.appendChild(button);
    });
}

function checkAnswer(idx) {
    if (idx === quizData[currentIdx].answer) {
        score++;
    }
    
    currentIdx++;
    if (currentIdx < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreEl.innerText = `${score} / ${quizData.length}`;
    
    if (score === 3) {
        resultMsgEl.innerText = "🏆 Score parfait ! Vous connaissez nos produits sur le bout des doigts. Allez tourner la roue !";
    } else if (score >= 1) {
        resultMsgEl.innerText = "👏 Bravo ! Vous avez de bonnes bases sur nos engagements. Tentez votre chance à la roue !";
    } else {
        resultMsgEl.innerText = "🌱 C'est l'occasion de découvrir nos producteurs locaux ! Allez quand même tourner la roue !";
    }
}
