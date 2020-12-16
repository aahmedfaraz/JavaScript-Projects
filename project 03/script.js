// variables and DOM elements
const body = document.body;
const info = document.querySelector('.info');
const topHeading = document.querySelector('h1');
const homeButton = document.querySelector('.home');
const play = document.getElementById('play');
const stopVid = document.getElementById('stop');
const progress = document.getElementById('progress');
const volume = document.getElementById('vol');
const fullScreen = document.getElementById('full-screen');
const rotate = document.getElementById('rotate');
const leftPanel = document.querySelector('.panel.left');
const rightPanel = document.querySelector('.panel.right');
let timeCurrent = document.getElementById('current');
let timeTotal = document.getElementById('total');
// ALREADY DECLARED VARIABLES IN style.js
// const screen = document.querySelector('.front-screen');
// const video = document.querySelector('.video');
// const controls = document.querySelector('.controls');
// const playBtnScr = document.getElementById('playBtnScreen');
// const panels = document.querySelectorAll('.panel');



// ALL FUNCTIONS
// 1 - function to play Video
function playVideo() {
    playBtnScr.style.visibility = 'hidden';
    video.play();
    play.src = 'assets/icons/pause-sm.svg'
    displayTimestampTotal();
}
// 2 - function to stop video
function pauseVideo() {
    video.pause();
    play.src = 'assets/icons/play-sm.svg'
}
// 3 - toggle video
function toggleVideo() {
    if (video.paused) {
        playVideo();
    } else {
        pauseVideo();
    }
}
// 4 - stop video
function stopVideo() {
    pauseVideo();
    video.currentTime = 0;
    playBtnScr.style.visibility = 'visible';
    video.volume = 1;
}
// 5 - function to return correct time format
function timeFormat(totalSeconds) {
    let seconds = (totalSeconds < 60) ? Math.floor(totalSeconds) : Math.floor(totalSeconds % 60);
    seconds = (Math.floor(totalSeconds % 60) < 10) ? "0" + seconds : seconds;
    let minutes = (totalSeconds < 60) ? Math.floor(totalSeconds / 60) : Math.floor(totalSeconds / 60);
    minutes = (Math.floor(totalSeconds / 60) < 10) ? "0" + minutes : minutes;
    return {
        seconds: seconds,
        minutes: minutes,
    }
}
// 6 - function to display timestamp total
function displayTimestampTotal() {
    timeTotal.innerText = `${timeFormat(video.duration).minutes}:${timeFormat(video.duration).seconds}`;
}
// 7 - function to update video progress and timeCurrent
let minsCur = 0,secsCur = 0;
function updateProgress() {
    if (video.currentTime != video.duration) {
        progress.value = (video.currentTime * 100) / video.duration;
        timeCurrent.innerText = `${timeFormat(video.currentTime).minutes}:${timeFormat(video.currentTime).seconds}`;
    } else {
        stopVideo();
    }
}
// 8 - function to update currentTime, for progress to conotrol video
function updateCurrentTime() {
    video.currentTime = (progress.value * video.duration) / 100;
}
// 9 - function to update volume
function updateVolume() {
    if (video.volume === 1){
        video.volume = 0;
    } else {
        video.volume += 0.25;
    }
    volume.src = `assets/icons/vol-${video.volume}.svg`;
}
// 10 - function to make full screen
function goToFullScreen() {
    if (fullScreen.className != 'icons blur') {
        info.classList.toggle('hide');
        rotate.classList.toggle('blur')
        topHeading.classList.toggle('hide')
        homeButton.classList.toggle('hide')
        video.classList.toggle('full');
        screen.classList.toggle('full');
    }
}
// 11 - function to update new time after double tap on panels
function updateNewTime(time) {
    video.currentTime += time;
}
// 12 - function to manage time step using func-10
function changeTime() {
    if (event.target.className === 'panel right' || event.target.className === 'panel right hide') {
        updateNewTime(10)
    } else if (event.target.className === 'panel left' || event.target.className === 'panel left hide') {
        updateNewTime(-10)
    }
}
// 13 - function to display 90 degrees rotated view
function rotateScreen() {
    if (rotate.className != 'icons blur') {
        info.classList.toggle('hide');
        rotate.classList.toggle('rotate');
        fullScreen.classList.toggle('blur');
        topHeading.classList.toggle('hide');
        homeButton.classList.toggle('hide');
        body.classList.toggle('rotate');
        video.classList.toggle('rotate');
        screen.classList.toggle('rotate');

    }
}


// EVENT LISTENERS
// 1 - playBtnScr - click
// hide playBtnScr
// play video
// toggle between play-sm and pause icon
playBtnScr.addEventListener('click',playVideo)
// 2 - play-sm - click
// hide playBtnScr
// play video / pause video
// toggle between play-sm and pause icon
play.addEventListener('click',toggleVideo);
// 3 - stop - click
// display playBtnScr
// stop video
// switch to play-sm icon
stopVid.addEventListener('click',stopVideo);
// 4 - video - timeupdate
// update progress bar
// update timestamp current
video.addEventListener('timeupdate',updateProgress);
// 5 - progress - click
// control video / update video
progress.addEventListener('change',updateCurrentTime);
// 6 - volume - click
// update volume
volume.addEventListener('click',updateVolume);
// 7 - fullScreen - click
// hide top heading
// hide bottom home button
// toggle screen between current size and full screen size
fullScreen.addEventListener('click',goToFullScreen);
// 8 - panels - dblclick
// update time +10 for right
// update time -10 for left
screen.addEventListener('dblclick',changeTime);
// 9 - rotate - click
// rotate body
// adjust screen and video size
rotate.addEventListener('click',rotateScreen);