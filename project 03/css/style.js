// variables and DOM elements
const screen = document.querySelector('.front-screen');
const video = document.querySelector('.video');
const controls = document.querySelector('.controls');
const playBtnScr = document.getElementById('playBtnScreen');
const panels = document.querySelectorAll('.panel');



// ALL FUNCTIONS
// 1 - function to set settings for screen play icon
function screenIconAnimation(){
    playBtnScr.classList.toggle('playBtnScreen2') 
}
// 2 - function to animate the screen icon using function-1
let repeatCount = 0;
function animateScreenIconPlay(){
    repeatCount++;
    if (repeatCount / 60 === 1) {
        screenIconAnimation();
        repeatCount = 0;
    }
    requestAnimationFrame(animateScreenIconPlay);
}
// 3 - function for show controls
function controlsShow(){
    controls.style.visibility = 'visible';
}
// 4 - function for hide controls
function controlsHide(){
    controls.style.visibility = 'hidden';
}
// 5 - function  for doule tap message
function showDoubleTapAnimation() {
    panels.forEach((element)=>{
        element.classList.toggle('hide');
    });
}

// ALL EVENT LISTENERS
// 1 - Adjust front screen as screen changes
window.addEventListener('resize',()=>{
    screen.style.transform = "translateY(-100%)";
});
// 2 - on mouse move on front-screen , display controls
screen.addEventListener('mousemove',()=>{
    controlsShow();
})
screen.addEventListener('click',()=>{
    controlsShow();
})
// 3 - display controls when mouseenter on controls
controls.addEventListener('mouseenter',controlsShow)
// 4 - disappear controls when mouse stops
// for computer
screen.addEventListener('mouseleave',()=>{
    controlsHide();
})
// for mobile
screen.addEventListener('mouseup',()=>{
    controlsHide();
})


// ALL CALL BACK FUNCTIONS
// playing animation of screen play icon
animateScreenIconPlay();
// displaying double tap message
setTimeout(() => {
    showDoubleTapAnimation();
}, 3000);