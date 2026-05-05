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
        q: "Quelle est la distance maximale pour qu'un produit soit considéré 'Local' dans nos magasins Super U ?",
        options: ["80 km", "250 km", "500 km"],
        answer: 0
    }
];

let currentIdx = 0;
let score = 0;

const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const progressEl = document.getElementById('progress');
const finalScoreEl = document.getElementById('final-score');
const resultMsgEl = document.getElementById('result-message');

// Événements modifiés
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('reset-btn').addEventListener('click', returnToHome); // Pointe vers la nouvelle fonction

function startQuiz() {
    currentIdx = 0;
    score = 0;
    homeScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

// Nouvelle fonction pour revenir à la vraie page d'accueil
function returnToHome() {
    resultScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
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
        button.onclick = (e) => checkAnswer(index, e.target);
        answersEl.appendChild(button);
    });
}

function checkAnswer(idx, clickedButton) {
    const allButtons = document.querySelectorAll('#answers .btn');
    allButtons.forEach(btn => btn.style.pointerEvents = 'none');

    if (idx === quizData[currentIdx].answer) {
        score++;
        clickedButton.classList.add('correct');
    } else {
        clickedButton.classList.add('wrong');
        allButtons[quizData[currentIdx].answer].classList.add('correct');
    }
    
    setTimeout(() => {
        currentIdx++;
        if (currentIdx < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000); 
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreEl.innerText = `${score} / ${quizData.length}`;
    
    if (score === 3) {
        resultMsgEl.innerText = "🏆 Score parfait ! Vous connaissez nos produits sur le bout des doigts. Allez tourner la roue !";
        
        // --- LANCEMENT DES CONFETTIS ---
        // On vérifie que la librairie a bien chargé, puis on lance les confettis aux couleurs U
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#e30613', '#00569c', '#ffffff'] // Rouge U, Bleu U, Blanc
            });
        }
        
    } else if (score >= 1) {
        resultMsgEl.innerText = "👏 Bravo ! Vous avez de bonnes bases. Tentez votre chance à la roue !";
    } else {
        resultMsgEl.innerText = "🌱 C'est l'occasion de découvrir nos producteurs locaux ! Allez quand même tourner la roue !";
    }
}