// All DOM elements
const container = document.getElementById('container');
// Buttons
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dropDownButton = document.getElementById('drop-down');
const volumeButton = document.getElementById('volume');
const randomButton = document.getElementById('random');
// Mainn
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const audio = document.getElementById('audio');
// Progress bar
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
// Options  container
const songsContainer = document.getElementById('songs');
const songsListPage = document.getElementById('song-list-page');
// All Variables and Arrays
const allSongs = ['Ampyx - Rise','Titanic - My Heart Will Go On','Astronomia','Cheerleader','Imagine Dragons - Bad Liar','TheFatRat - Monody'];
let currentSong = 0;

// All Functions
// 1 - Function to show songs list on clicking drop down button
function showSongList() {
    songsListPage.classList.toggle('show');
    dropDownButton.classList.toggle('rotate');
    songsContainer.innerHTML = `<h4>All Songs</h4>`
    allSongs.forEach( song => {

        songsContainer.innerHTML += `
        <li class="song" id="${allSongs.indexOf(song)}"><img src="images/${song}.jpg" alt="thumbnail" class="thumbnail"><p>${song}</p></li>
        `
    })
    songsContainer.scrollIntoView();
}

// 2 - Function to load song
function loadSong(song) {
    title.innerText = song;
    cover.src = `images/${song}.jpg`;
    audio.src = `audios/${song}.mp3`;
}

// 3 - Fuction to play and pause song
function playPauseSong() {
    const isPlaying = container.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// 4 - Function to play song
function playSong() {
    setTimeout( () => container.classList.add('play'),500);
    playButton.querySelector('i.fas').className = 'fas fa-pause';
    audio.play();
}

// 5 - Function to pause song
function pauseSong() {
    container.classList.remove('play');
    playButton.querySelector('i.fas').className = 'fas fa-play';
    audio.pause();
}

// 6 - Function to move to next song
function moveForward() {
    currentSong++;
    if(currentSong > allSongs.length - 1) {
        currentSong = 0;
    }
    goWithTheFlow();
}

// 7 - Function to move to prev song
function moveBackward() {
    currentSong--;
    if(currentSong < 0) {
        currentSong =  allSongs.length - 1;
    }
    goWithTheFlow();
}

// 8 - Function to pick random song
function pickRandomSong() {
    let random = currentSong;
    while(random == currentSong) {
        random = Math.floor(Math.random() * allSongs.length);
    }
    currentSong = random;
    goWithTheFlow();
}

// 9 - Function to remove interrupt in changging song
function goWithTheFlow() {
    if (!audio.paused) {
        pauseSong();
        loadSong(allSongs[currentSong]);
        playSong();
    } else {
        loadSong(allSongs[currentSong]);
    }
}

// 10 - Function to update progress bar
function updateProgress(e) {
    const { currentTime, duration} = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// 11 - Function to control timing of song
function setProgress(e) {
    audio.currentTime = ( e.offsetX / this.clientWidth ) * audio.duration;
    
}

// 12 - Function to control volume
function controlVolume() {
    audio.volume = audio.volume === 1 ? 0 : audio.volume === 0 ? 0.5 : 1;
    const icon = audio.volume === 1 ? 'volume-up' : audio.volume === 0 ? 'volume-off' : 'volume-down';
    volumeButton.querySelector('i.fas').className = `fas fa-${icon}`;
}


// All Event Listeners
// 1 - Event listener to show list of all songs
dropDownButton.addEventListener('click',showSongList);
// 2 - Event listener to play/pause song
playButton.addEventListener('click',playPauseSong);
// 3 - Event listener to move to next song
nextButton.addEventListener('click',moveForward);
// 4 - Event listener to move to next song
prevButton.addEventListener('click',moveBackward);
// 5 - Event listener to pick random song
randomButton.addEventListener('click',pickRandomSong);
// 6 - Event listener to play selected song
window.addEventListener('click', e => {    
    if (e.target.className == 'song') {
        const songID = +e.path.filter(element => element.className === 'song')[0].id;
        currentSong = songID;
        goWithTheFlow();
        document.body.scrollIntoView();
    }
})
// 7 - Event listener to update progress bar
audio.addEventListener('timeupdate',updateProgress);
// 8 - Event listener to control audio by progressBar
progressContainer.addEventListener('click',setProgress);
// 9 - Event listener to control volume
volumeButton.addEventListener('click',controlVolume);
// 10 - Event listener to play next song on completed previous song
audio.addEventListener('timeupdate',e => {
    if (e.target.currentTime === e.target.duration) {
        moveForward();
        playSong();
    }
});

// Fucntions to run at initial
// Calling function to load current song
loadSong(allSongs[currentSong]);
progressBar.style.width = '0%';
audio.volume = 1;