// variables and DOM elements
const body = document.body;
const home = document.getElementById('home');
const skills = document.getElementById('skills');
const projects = document.getElementById('projects');
const contact = document.getElementById('contact');
const burger = document.getElementById('burger');
const options = document.querySelector('.option-list');
const clickable = document.querySelectorAll('.clickable');


// ALL FUNCTIONS
// 1 - function responsible for burger size
function setBurgerSize(){
    if (window.innerHeight < 700){
        burger.className = "fas fa-bars fa-2x";
    }
}

// 2 - function to display nav bar on mobile view
function displayNav(){
    burger.classList.toggle('rotate')
    options.classList.toggle('control');
}

// 3 - function to apply toggle between showing and hiding nav for nav by clicking options(clickable elements)
function allElements(nodeList){
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].addEventListener('click',()=>{
            displayNav();
        });
    }
}


// ALL EVENT LISTENERS
// 1 - window - resize
// event listener to manage burger size whenever resizing the screen
window.addEventListener('resize',()=>{
    setBurgerSize();
})

// 2 - burger - click
// to toggle between showing and hiding nav whenever clicking burger in mobile view
burger.addEventListener('click',()=>{
    displayNav();
});


// CALL BACK FUNCTIONS REQUIRED TO RUN ON START
// calling function to toggle between showing and hiding nav for nav by clicking options(clickable elements)
allElements(clickable);
// resizing burger
setBurgerSize();