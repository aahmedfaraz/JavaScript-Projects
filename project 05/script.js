// DOM Elements
const changeThemeButton = document.getElementById('change-theme');
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double-money');
const resetMoneyButton = document.getElementById('reset-money');
const showMillionairesOnlyButton = document.getElementById('show-millionaires-only');
const sortByRichestButton = document.getElementById('sort-by-richest');
const calculateTotalWealthButton = document.getElementById('calculate-total-wealth');
const resetButton = document.getElementById('reset');
const homeButton = document.getElementById('home');
const mainContainer = document.getElementById('main');
// Required Variables
let IslightMode = true;
let moneyIsModified = false;
let totalWealthIsAlreadyDisplayed = false;
let totalWorthHasBeenRequested = false;
// Arrays
let userDataArray = [];
let defaultWorthArray = [];//To save default worths of all users - RESET PURPOSE
let defaultDataArray = [];// To save first 3 initial users - RESET PURPOSE

// ALL Functions
// 1 - Function to set properties for dark mode
function darkMode() {
    document.getElementById('change-theme').innerText = 'Light Mode';
    document.documentElement.style.setProperty('--theme-color-1','white');
    document.documentElement.style.setProperty('--theme-color-2','black');
    document.documentElement.style.setProperty('--hover-value', 223);
    document.documentElement.style.setProperty('--active-value', 190);
    IslightMode = false;
}

// 2 - Function to set properties for light mode (as before)
function lightMode() {
    document.getElementById('change-theme').innerText = 'Dark Mode';
    document.documentElement.style.setProperty('--theme-color-1','black');
    document.documentElement.style.setProperty('--theme-color-2','white');
    document.documentElement.style.setProperty('--hover-value', 32);
    document.documentElement.style.setProperty('--active-value', 65);
    IslightMode = true;
}

// 3 - Function to perform theme/mode changing
function changeMode(){    
    if(IslightMode)
        darkMode();
    else
        lightMode();
}

// 4 - Function to fetch a random user from api
// API: randomuser.me/api
async function generateRandomUser() {
    const response = await fetch(`https://randomuser.me/api`);
    const data = await response.json();
    const user = data.results[0];
    const newUser = {//newUser object
        thumbnail: user.picture.thumbnail,
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random() * (1500000 - 700000)) + 700000,
    }  
    addUser(newUser);
    defaultWorthArray.push(newUser.worth);
    // saving default users
    if(userDataArray.length === 3) {
        defaultDataArray = userDataArray.map(element => element);
    }
}

// 5 - Function to add newly generated user into the dataArray
function addUser(newUser) {
    userDataArray.push(newUser);
    updateDOM();
}

// 6 - Function to update the UI with DOM
function updateDOM(inputData = userDataArray) {
    mainContainer.innerHTML = '<h2><strong>Name</strong>Net Worth</h2>';
    inputData.forEach(element => {
        const newElement = document.createElement('div');
        newElement.classList.add('userBar')
        newElement.innerHTML = `<strong><img class='thumbnail' src='${element.thumbnail}'>${element.name}</strong>$${setFormat(element.worth)}`;
        mainContainer.appendChild(newElement);
    });
    if(totalWorthHasBeenRequested){
        displayTotalWorth();
    };
}

// 7 - Function to reset DOM
function resetDOM() {
    userDataArray = defaultDataArray.map(element => element);
    totalWorthHasBeenRequested = false;
    totalWealthIsAlreadyDisplayed = false;
    updateDOM();
}

// 8 - Function to set Format of Number
function setFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// 9 - Function to double Worth
function doubleWorth() {
    userDataArray = userDataArray.map( element => {
        return {...element, worth: element.worth * 2};
    });
    updateDOM();
    moneyIsModified = true;
    permissionResetMoneyButton();
}

// 10 - Function to reset Worth of all
function resetMoney() {
    if(moneyIsModified) {
        userDataArray = userDataArray.map( element => {
            return {...element,worth: defaultWorthArray[userDataArray.indexOf(element)]};
        } )
        updateDOM();    
        moneyIsModified = false;
        permissionResetMoneyButton();
    }
}

// 11 - Function for permission to use reset money Button 
function permissionResetMoneyButton() {
    if(moneyIsModified) {
        resetMoneyButton.style.cursor = 'pointer'
    }
    else {
        resetMoneyButton.style.cursor = 'not-allowed'
    }
}

// 12 - Function to sort users by Richest
function sortByRichest() {
    userDataArray.sort( (a,b) => b.worth - a.worth );
    defaultWorthArray.sort( (a,b) => b - a );
    updateDOM();
}

// 13 - Function to show millionaires only
function showMillionaires() {
    userDataArray = userDataArray.filter( element => element.worth > 1000000 );
    defaultWorthArray = defaultWorthArray.filter(element => element > 1000000);
    updateDOM();
}

// 14 - Function to calculate and Display total worth
function displayTotalWorth() {
    totalWorthHasBeenRequested = true;
    let totalWorth = userDataArray.reduce( (acc,element) => acc += element.worth ,0 );
    const totalWorthDOM = document.createElement('h2');
    totalWorthDOM.classList.add('total');
    totalWorthDOM.innerHTML = `Total<strong>$${setFormat(totalWorth)}</strong>`;
    mainContainer.appendChild(totalWorthDOM);
    totalWealthIsAlreadyDisplayed = true;
}

// 15 - Functio to avoid repeat output of total worth
function calculateTotalWorth() {
    if(totalWealthIsAlreadyDisplayed) {
        updateDOM();
    } else {
        displayTotalWorth();
    }
}

// ALL Event Listeners
// 1 - Theme Button - on click - will change the mode/theme
changeThemeButton.addEventListener('click', changeMode);
// 2 - Add User Button - on click - will add user in dataArray and Update DOM
addUserButton.addEventListener('click',generateRandomUser);
// 3 - Reset Button - on click - reset DOM
resetButton.addEventListener('click', resetDOM);
// 4 - Double Money Button - on click - Doubles the worth of every user and Update DOM
doubleMoneyButton.addEventListener('click',doubleWorth);
// 5 - Reset Money Button - on click - Reset Worth of all users
resetMoneyButton.addEventListener('click',resetMoney);
// 6 - Sort by Richest Button - on click - Sort users and Update DOM
sortByRichestButton.addEventListener('click',sortByRichest);
// 7 - Show Millionaires Only Button - on click - show only millionaire
showMillionairesOnlyButton.addEventListener('click',showMillionaires);
// 8 - Calculate total worth Button - on click - show total wealth on DOM
calculateTotalWealthButton.addEventListener('click',calculateTotalWorth);

// Calling Functions required to run on Startup
generateRandomUser();
generateRandomUser();
generateRandomUser();