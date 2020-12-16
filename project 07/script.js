// All DOM elements
// DOM for front Screen
const startButton = document.getElementById('start');
const mainContainer = document.getElementById('main');
const gameLogoScreen = document.getElementById('game-screen');
// DOM elements for icons
const restartButton = document.getElementById('restart');
const exitButton = document.getElementById('close');
// DOM for Hangman
const hangmanHook = document.querySelector('.hook');
const hangmanBody = document.querySelectorAll('.man-body');
const hangmanRightArm = document.querySelector('.right-arm');
const hangmanLeftArm = document.querySelector('.left-arm');
const hangmanLegs = document.querySelector('.legs');
// DOM for game elements
const healthBox = document.querySelector('.health');
const hintText = document.getElementById('hint');
const wordBox = document.querySelector('.word');
const wrongAttemptsBox = document.querySelector('.wrong-word');
const keyboard = document.querySelector('.keyboard');
// DOM for message-window and popup
const messageWindow = document.getElementById('message-window');
const card = document.getElementById('card');
const popup = document.getElementById('pop-up');

// Variables
let totalLives = 5;
let health = 5;
let damage = totalLives - health;
// Arrays
const wordsData = [{hint: "The Animal have no bone",answer: "JELLYFISH"},{hint: "The Animal which has teeth in it's stomach" , answer: "LOBSTER"},{hint: "The Animal with shortest memory", answer: "ELEPHANT"},{hint: "The Animal with longest memory", answer: "DOLPHIN"},{hint: "The Planet with most moons", answer: "SATURN"},{hint: "The fastest fish in the ocean", answer: "SAILFISH"},{hint: "Country with an animal on it's flag", answer: "SRI LANKA"},{hint: "The smallest bird in the world", answer: "BEE HUMMINGBIRD"},{hint: "The largest bird in the world", answer: "OSTRICH"},{hint: "The closest galaxy to our milky way", answer: "ANDROMEDA"},{hint: "The smallest country in the world", answer: "VATICAN CITY"},{hint: "Founder of facebook", answer: "MARK ZUCKERBERG"},{hint: "Founder of Apple", answer: "STEVE JOBS"},{hint: "Founder of Microsoft", answer: "BILL GATES"},{hint: "The largest shark ever exist", answer: "MEGALODON"}];
// console.log(wordsData.length);
// {hint: "", answer: ""}
let word = [];
let wordWithOutSpace = [];
let correctEntered = [];
let wrongEntered = [];
let gamePaused = false;

// All Functions
// 1 - Function to update Health in UI
function updateHealth (){
    healthBox.innerHTML = '<p>Health:</p>';
    for (let i = 1; i <= health; i++) {
        healthBox.innerHTML += '<img class="life" src="assets/images/life.svg">'
    }
    for (let i = 1; i <= damage; i++) {
        healthBox.innerHTML += '<img class="life" src="assets/images/no-life.svg">'
    }
}

// 2 - Function to update Hangman
function updateHangman() {
    hangmanHook.style.visibility = health < 5 ? 'visible': 'hidden';
    Array.from(hangmanBody).map((element) => element.style.visibility = health < 4 ? 'visible': 'hidden');
    hangmanRightArm.style.visibility = health < 3 ? 'visible': 'hidden';
    hangmanLeftArm.style.visibility = health < 2 ? 'visible': 'hidden';
    hangmanLegs.style.visibility = health < 1 ? 'visible': 'hidden';
}

// 3 - Function for start button
function startGame() {
    gameLogoScreen.classList.add('disappear');
    mainContainer.classList.add('show');
}

// 4 - Function ton display pop-up - For pressing twice a key
function displayPopup () {
    popup.classList.add('show');
    setTimeout(()=>{
        popup.classList.remove('add');
        popup.classList.add('disappear');
    },2000);
    popup.classList.remove('disappear');
}

// 5 - Funtion to generate hint and answer and update UI
function generateNewWord() {
    let index = Math.floor(Math.random()*wordsData.length);
    // let index = wordsData.length - 1;
    let hint = wordsData[index].hint;
    let answerWord = wordsData[index].answer.toUpperCase();
    wordWithOutSpace = answerWord.split("").filter((element) => element !== " ");
    word = answerWord.split("");
    hintText.innerText = hint;
    updateWord();
}

// 6 - Function to update word UI
function updateWord() {
    wordBox.innerHTML = '';
    
    for (let index = 0; index < word.length; index++) {
        if (correctEntered.includes(word[index])){
            wordBox.innerHTML += `<div class="letter">${word[index]}</div>`;
        } else if (word[index] === " "){
            wordBox.innerHTML += `<div class="space">${" "}</div>`;
        } else {
            wordBox.innerHTML += `<div class="letter">${"-"}</div>`;
        }
    }
    wordBox.innerHTML
} 

// 7 - Function to update wrong attempt words
function updateWrongAttempt() {
    wrongAttemptsBox.innerHTML = '<h5>Wrong Attempts: </h5>';
    for (let index = 0; index < wrongEntered.length; index++) {
        wrongAttemptsBox.innerHTML += `<div class="wrong-letter">${wrongEntered[index]}</div>`;
    }
}

// 8 - Function to check and show message
function checkForMessage() {
    if(IsWordCompleted()) {
        let message = "You Won";
        let subMessage = "Congratz";
        messageWindow.innerHTML = `<div class="card" id="card"><h1>${message}!</h1><div><p>Correct answer: <h3>${word.join("")}</h3></p></div><h5>${subMessage}</h5>`;
        messageWindow.classList.add('show');
        setTimeout(() => {
            messageWindow.classList.remove('show');
        },4000);
        gamePaused = true;
    } else if (wrongEntered.length === totalLives) {
        let message = "You Loose";
        let subMessage = "Better Luck Next Time";
        messageWindow.innerHTML = `<div class="card" id="card"><h1>${message}!</h1><div><p>Correct answer: <h3>${word.join("")}</h3></p></div><h5>${subMessage}</h5>`;
        messageWindow.classList.add('show');
        setTimeout(() => {
            messageWindow.classList.remove('show');
        },4000);
        gamePaused = true;
    }
}

// 9 - Function to update UI on every Key
function updateUI(enteredLetter) {
    if (correctEntered.includes(enteredLetter) || wrongEntered.includes(enteredLetter)) {
        displayPopup();
    } else {
        if(wordWithOutSpace.includes(enteredLetter)) {
            correctEntered.push(enteredLetter);
        } else {
            wrongEntered.push(enteredLetter);
            health --;
            damage = totalLives - health;
        }
        updateHealth();
        updateHangman();
        updateWord();
        updateWrongAttempt();
        checkForMessage();       
    }
}

// 10 - Function to check is word completed
function IsWordCompleted(){
    let result = false;
    let notIncluded = 0;
    wordWithOutSpace.forEach(element => {
        if(! correctEntered.includes(element)) {
            notIncluded ++;
        }
    });
    result = (notIncluded === 0) ? true: false;
    notIncluded = 0;
    return result;
}

// 11 - Function for restart Button
function restart() {
    totalLives = 5;
    health = 5;
    damage = totalLives - health;
    word = [];
    wordWithOutSpace = [];
    correctEntered = [];
    wrongEntered = [];
    gamePaused = false;
    generateNewWord();
    updateHealth();
    updateHangman();
    updateWord();
    updateWrongAttempt();
    checkForMessage();       
}

// All Event Listeners
// 1 - Event listener for start button
startButton.addEventListener('click',startGame);

// 2 - Event listener for restart Button
restartButton.addEventListener('click',restart);

// 3 - Event Listener to read keys from keyboard on screen
keyboard.addEventListener('click',(event) => {
    if(!gamePaused && event.target.className === 'key') {
        let enteredLetter = event.target.innerText;
        updateUI(enteredLetter);
    }
});

// 4 - Event Listener to read keys from keyboard
window.addEventListener('keydown',(event) => {
    if(!gamePaused && event.keyCode >=65 && event.keyCode <=  90) {
        let enteredLetter = event.key.toUpperCase();
        updateUI(enteredLetter);
    }
});

// INIT Function
// Function containing all functions require to run on startup
function init() {
    generateNewWord();
    updateHealth();
    updateHangman();
}
init();