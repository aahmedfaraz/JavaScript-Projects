// DOM Elements
const container = document.getElementById('container');
const pointerContainer = document.getElementById('pointer-container');
const colorCircle = document.getElementById('circle');
const text = document.getElementById('text');
const speechSynthesis = window.speechSynthesis;

// Function to play each iteration
function play(){
    text.innerText = 'Breathe In';
    pointerContainer.style.animationPlayState = 'running';
    colorCircle.style.animationPlayState = 'running';
    setTimeout(()=> container.classList.add('grow'),0);
    setTimeout(()=>{
        text.innerText = 'Hold';
    },3000);
    setTimeout(()=>{
        container.classList.remove('grow');
        text.innerText = 'Breathe Out';
    },5000);
}

// 1st iteration
play();
// continuous iterations
setInterval(play,8000);