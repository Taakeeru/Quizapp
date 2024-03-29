let questions = [
    {
        "question": "Durch wen hat Ruffy die Narbe auf seiner Brust?",
        "answer1": "Doflamingo",
        "answer2": "Akainu",
        "answer3": "Rob Lucci",
        "answer4": "Blackbeard",
        "rightAnswer": 2
    },
    {
        "question": "Wie heißt das Schwert von Falkenauge?",
        "answer1": "Yoru",
        "answer2": "Sandai Kitetsu",
        "answer3": "Gryphon",
        "answer4": "Kashu",
        "rightAnswer": 1
    },
    {
        "question": "Aus welchem speziellen Material wurde die Thousand-Sunny gebaut?",
        "answer1": "Seestein",
        "answer2": "Seeholz",
        "answer3": "Holz vom Adam-Baum",
        "answer4": "Holz vom Eve-Baum",
        "rightAnswer": 3
    },
    {
        "question": "Welchen Titel trägt Buggy momentan?",
        "answer1": "Supernova",
        "answer2": "Samurai der Meere ",
        "answer3": "Weise (Einer der 5 Weisen)",
        "answer4": "Kaiser",
        "rightAnswer": 4
    },
    {
        "question": "Wer ist der erste Admiral, der im Anime vorgestellt wird?",
        "answer1": "Kizaru",
        "answer2": "Akainu",
        "answer3": "Fujitora",
        "answer4": "Aokiji",
        "rightAnswer": 4
    },
    {
        "question": "Warum war Sanji anders als seine Geschwister?",
        "answer1": "Bei der Geburt von Sanji ist etwas schief gelaufen, weshalb er erst 2 Tage später geboren wurde als seine Geschwister",
        "answer2": "Sanji's Mutter nahm eine Droge, um die Forschung von Judge zu unterbrechen. Dies gelang ihr aber nur bei Sanji",
        "answer3": "Sanji hat sich nie für das Kämpfen interessiert, sondern wollte lieber kochen",
        "answer4": "Sanji wurde getrennt von seinen Geschwistern aufgezogen (Sanji von seiner Mutter und seine Geschwister von Judge)",
        "rightAnswer": 2
    },
    {
        "question" : "Wie heisst der Charakter, der immer wieder im Hintergrund als Easter-Egg zu sehen ist?",
        "answer1": "Koalafrau",
        "answer2": "Pandaman",
        "answer3": "Koalaman",
        "answer4": "BlackPuma",
        "rightAnswer": 2
    },
    {
        "question" : "Wie heißt der Weltaristokrat, welcher von Ruffy geschlagen wurde?",
        "answer1": "Sankt Charlos",
        "answer2": "Sankt Rosward",
        "answer3": "Sankt Jalmack",
        "answer4": "Sankt Miosgard",
        "rightAnswer": 1
    },
    {
        "question" : "Welche Insel steuern Urouge und seine Bande in der Neuen Welt an, welche von sehr vielen Blitzen getroffen wird?",
        "answer1": "Risky Red",
        "answer2": "Yukiryū",
        "answer3": "Raijin",
        "answer4": "Mystoria",
        "rightAnswer": 3
    },
    {
        "question" : "Wie heißt die Insel, auf der die Revolutionäre ihr aktuelles Hauptquartier haben?",
        "answer1": "Bartigo / Baltigo",
        "answer2": "Momoiro",
        "answer3": "Green Bit",
        "answer4": "Kamabakka",
        "rightAnswer": 2
    }
];

const slideImages = [
    'url(./img/op-bg3.jpg)',
    'url(./img/op-bg4.jpg)',
    'url(./img/op-bg1.jpg)',
    'url(./img/op-bg.jpg)'
];

let currentQuestion = 0;
let rightAnswerCount = 0;
let bgMusic = new Audio('./audio/bg-music.mp3');
let audioSuccess = new Audio('./audio/success.mp3');
let audioFail = new Audio('./audio/fail.mp3');
let audioEnd = new Audio('./audio/success-end.mp3');
let currentSlide = 0;


function init() {
    document.getElementById('questions-length').innerHTML = questions.length;
    showQuestion();
    startMusic();
}

function startMusic() {
    const playButton = document.getElementById('play-button');
    if (playButton) {
        playButton.addEventListener('click', playBackgroundMusic);
    }
}

function playBackgroundMusic() {
    bgMusic.loop = true;
    bgMusic.volume = 0.02;
    bgMusic.play();
    document.getElementById('play-button').style.display = 'none';
}


function nextSlide() {
    currentSlide = (currentSlide + 1) % slideImages.length;
    updateBackground();
}


function updateBackground() {
    document.body.style.backgroundImage = slideImages[currentSlide];
}

setInterval(nextSlide, 5000);


function showQuestion() {

    if (quizIsOver()) {
        showEndScreen();
        showResultText();
    } else {
        updateProgressbar();
        updateToNextQuestion();
    }
}


function quizIsOver() {
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('question-screen').style = 'display: none;';
    document.getElementById('score-number').innerHTML = `${rightAnswerCount}/${questions.length}`;
    audioEnd.volume = 0.03;
    audioEnd.play();
}


function showResultText() {
    if (rightAnswerCount >= 7) {
        document.getElementById('nice').style = '';
    } else {
        document.getElementById('bad').style = '';
    }
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer1'];
    document.getElementById('answer2').innerHTML = question['answer2'];
    document.getElementById('answer3').innerHTML = question['answer3'];
    document.getElementById('answer4').innerHTML = question['answer4'];
    document.getElementById('current-question').innerHTML = currentQuestion +1;
}


function updateProgressbar() {
    let precent = (currentQuestion + 1) / questions.length;
    precent = Math.round(precent * 100);
    
    document.getElementById('progress-bar').innerHTML = `${precent}%`;
    document.getElementById('progress-bar').style = `width: ${precent}%;`;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer${question['rightAnswer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        showRightAnswerStyle(selection);
    } else {
        showWrongAnswerStyle(selection, idOfRightAnswer);
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['rightAnswer']
}


function showRightAnswerStyle(selection) {
    document.getElementById(selection).parentNode.classList.add('success-style');
    audioSuccess.volume = 0.01;
    audioSuccess.play();
    rightAnswerCount++;
}


function showWrongAnswerStyle(selection, idOfRightAnswer) {
    document.getElementById(selection).parentNode.classList.add('danger-style');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('success-style');
    audioFail.volume = 0.05;
    audioFail.play();
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerCards();
    showQuestion();
}


function resetAnswerCards() {
    for (let i = 1; i <= 4; i++) {
        const answer = document.getElementById('answer' + i);
        answer.parentNode.classList.remove('success-style');
        answer.parentNode.classList.remove('danger-style');
    }
}


function restartQuiz() {
    document.getElementById('question-screen').style = '';
    document.getElementById('end-screen').style = 'display: none;';
    document.getElementById('bad').style = 'display: none;';
    document.getElementById('nice').style = 'display: none;';

    currentQuestion = 0;
    rightAnswerCount = 0;
    init();
}