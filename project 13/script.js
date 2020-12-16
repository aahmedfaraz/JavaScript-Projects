// GET ALl DOM elements
// header
const clearAllButton = document.getElementById('clear-all');
const ghostAddButton= document.getElementById('add-ghost');
// Cards - Container
const cardsContainer = document.getElementById('cards-container');
// navigation
const prevButton = document.getElementById('prev');
const nextButton= document.getElementById('next');
const navigationText= document.getElementById('navigation-text');
// form - Add Card form
const formContainer = document.getElementById('form-container');
const formCloseButton = document.getElementById('form-close');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const addCard = document.getElementById('add');
// Data Array
let dataBase = localStorage.getItem('database') ? JSON.parse(localStorage.getItem('database')) : [];
// current active card index which is to be shown
let currentActiveCard = 0;


// All Functions
// 1 - Function to close form container
function closeForm(e) {
    const element = e.target;
    // close form on both conditions - on clicking close button - on click away from form
    if (element.classList.contains('form-container') || element.classList.contains('form-close'))
        formContainer.classList.remove('show');
}

// 2 - Function to display all cards on DOM
function displayCards() {
    // clear cards containerto avoid rewritting
    cardsContainer.innerHTML = '';
    // save new dataase to localStorage
    localStorage.setItem('database',JSON.stringify(dataBase));
    // display DOM cards using data in dataBase
    dataBase.forEach(data => {
        // 1 - create card
        const card = document.createElement('div');
        // 2 - assig 'card' class
        card.classList.add('card');
        // 3 - assign id = index of curret data
        card.id = dataBase.indexOf(data);
        // 4 - assigning addition position classes according to ids and currentActiveCard
        if(dataBase.indexOf(data) === currentActiveCard)
            card.classList.add('active');
        else if (dataBase.indexOf(data) < currentActiveCard)
            card.classList.add('left');
        else
            card.classList.add('right');
        // 5 - creating inner html using current data
        card.innerHTML = `
        <div class="card-front">
            <p>Question:<br>${data.question}</p>
            <button class="clear-card"><i class="fas fa-trash"></i></button>
        </div>
        <div class="card-back">
            <p>Answer:<br>${data.answer}</p>
        </div>
        `;
        // 6 - Event listener to toggle between question and answer of current card
        card.addEventListener('click', () => {
            card.classList.toggle('show-answer');
        });
        // 7 - Event listener to clear current card
        card.querySelector('.clear-card').addEventListener('click', () => {
            // 1 - remove element from data base
            dataBase.splice(currentActiveCard,1);
            // 2 - update currentActiveCard index accordig to condition
            currentActiveCard >= dataBase.length && currentActiveCard > 0? currentActiveCard-- :'';
            // 3 - update the DOM
            displayCards();
        })
        // 8 - Append card element to card-container
        cardsContainer.appendChild(card);
    });
    // update card-container for dataBase is empty or not
    if (dataBase.length > 0) {
        cardsContainer.style.border = '0';
    } else {
        cardsContainer.innerHTML = '<h1>No card exist</h1>';
        cardsContainer.style.border = '2px dashed gray';
    }
    // update navigation text
    updateNavText();
}

// 3 - Function to update navigation text
function updateNavText() {
    navigationText.innerText = `${dataBase.length > 0 ? currentActiveCard+1 : currentActiveCard}/${dataBase.length}`;
}

// All Event Listeners
// 1 - Event Listener to show form to add card
ghostAddButton.addEventListener('click', () => {
    formContainer.classList.add('show');
});

// 2 - Event Listeners to close form container
formContainer.addEventListener('click',closeForm);
formCloseButton.addEventListener('click',closeForm);

// 3 - Event listner to move to next card
nextButton.addEventListener('click',() => {
    // check if currentActiveCard index in below last index
    if (currentActiveCard + 1 < dataBase.length) {
        // 1 - Assign variables for current and next Card
        // current card
        const activeCard =  document.getElementById(`${currentActiveCard}`);
        // remove show-answer class if exist 
        activeCard.classList.contains('show-answer') ? activeCard.classList.remove('show-answer'):'';
        // moving to next card
        currentActiveCard++;
        // next Card
        const nextCard =  document.getElementById(`${currentActiveCard}`);
        // 2 - current card to go to left
        activeCard.classList.add('left');
        // 3 - After 500ms
        setTimeout(() => {
            // removing unneccesary classes
            activeCard.classList.remove('active');
            nextCard.classList.remove('right');
        },500);
        // 4 - next card to come to active position
        nextCard.classList.add('active');
        // 5 - update navigation text also
        updateNavText();
    }
})

// 4 - Event listner to move to prev card
prevButton.addEventListener('click',() => {
    // check if currentActiveCard index in above or equals zero
    if (currentActiveCard - 1 >= 0) {
        // 1 - Assign variables for current and prev Card
        // current card
        const activeCard =  document.getElementById(`${currentActiveCard}`);
        // remove show-answer class if exist 
        activeCard.classList.contains('show-answer') ? activeCard.classList.remove('show-answer'):'';
        // moving to prev card
        currentActiveCard--;
        // prev card
        const prevCard =  document.getElementById(`${currentActiveCard}`);
        // 2 - current card to go to right
        activeCard.classList.add('right');
        // 3 - After 500ms
        setTimeout(() => {
            // removing unneccesary classes
            activeCard.classList.remove('active');
            prevCard.classList.remove('left');
        },500);
        // 4 - prev card to come to active position
        prevCard.classList.add('active');
        // 5 - update navigation text also
        updateNavText();
    }
})

// 5 - Event listener to display form
ghostAddButton.addEventListener('click', () => formContainer.classList.add('show'));

// 6 - Event listener to add new card
addCard.addEventListener('click', e => {
    // prevent default reload
    e.preventDefault();
    // 1 - taking inputs
    const qst = question.value.trim();
    const ans = answer.value.trim();
    // 2 - checking for validation
    if (qst && ans) {
        // creating an object
        const object = {
            question: qst,
            answer: ans
        };
        // adding to dataBase
        dataBase.push(object);
        // updating dOM
        displayCards();
        // hidding form
        formContainer.classList.remove('show');
        // Making both inputs empty for next use
        question.value ='';
        answer.value = '';
    } else {
        // alert for invalid inputs
        alert('Please enter valid inputs');
        // clearing any wrong input for re-entering
        !qst ? question.value ='':'';
        !ans ? answer.value = '':'';
    }
})

// 7 - Event listener to clear all cards
clearAllButton.addEventListener('click', () => {    
    dataBase = [];
    displayCards();
})

// Call back functions
// update cards DOM
displayCards();
// update navigation text
updateNavText();