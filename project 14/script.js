// DOM Elements
const imagesContainer = document.getElementById('images-container');
const select = document.getElementById('voices');
const toggleCustomButton = document.getElementById('custom-text');
const closeButton = document.getElementById('close');
const form = document.getElementById('form');
const submit = document.getElementById('submit');
const txt = document.getElementById('text');
// Array for Details of images
const imagesData = [{"title":"Aurora Borealis","name":"aurora","description":"There are beautiful nothern lights of aurora borealis"},{"title":"Flying Bird","name":"bird","description":"There is a flying bird"},{"title":"City View","name":"city","description":"This is a top view of a city"},{"title":"Flowers","name":"flowers","description":"There are many flowers"},{"title":"Thick Forest","name":"forest","description":"It is a thick forest"},{"title":"Running Horse","name":"horse","description":"There is a running horse"},{"title":"Robin's Nest","name":"house","description":"There is a wooden house build on a lake"},{"title":"Mountains","name":"mountains","description":"There are mountains and a lake"},{"title":"Snowy Mountains","name":"snow","description":"There is heavy snow on mountains"},{"title":"Sunset View","name":"sunset","description":"There is a sunet view from sea side"},{"title":"Surfing","name":"surfing","description":"A man is surfing on a wave"},{"title":"Vulture","name":"vulture","description":"There is a vulture"}];
// variables
const spSynth = window.speechSynthesis;
let voices = [];

// All Funtions
// 1 - Function to display images on DOM
function displayImages(){
    imagesContainer.innerHTML = '';
    imagesData.forEach(image => {
        const box = document.createElement('div');
        box.className = "box";
        box.innerHTML = `
        <img class="image" data-description="${image.description}" src="assets/images/${image.name}.jpg">
        <p>${image.title}</p>
        `
        imagesContainer.appendChild(box);
    })
}

// 2 - Function to Fill options in select tag
function populateVoiceList() {
    voices = spSynth.getVoices();
    select.innerHTML = '';
    for(i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.innerText = voices[i].name + ' (' + voices[i].lang + ')';
      if(voices[i].default) {
        option.innerText += ' -- DEFAULT';
      }
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      select.appendChild(option);
    }
    select.selectedIndex = localStorage.getItem('selectedVoiceIndex') !== "-1" ? localStorage.getItem('selectedVoiceIndex') : "0";
}

// All Event Listeners
// 1 - Event listener for Appear and Hide Form on clicking TOGGLE BUTTON
toggleCustomButton.addEventListener('click', event => {
    form.classList.toggle('show');
})
// 2 - Event listener to close Form on clicking CLOSE BUTTON
closeButton.addEventListener('click', event => {
    event.preventDefault();
    form.classList.toggle('show');  
})
// 3 - Event listener to speech the text entered on clicking READ BUTTON
submit.addEventListener('click', event => {
    event.preventDefault();
    var utterThis = new SpeechSynthesisUtterance(txt.value);
    var selectedOption = select.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    spSynth.speak(utterThis);
});
// 4 - Event listener to store the recent option in localStorage with name "selectedVoiceIndex" on every change of options
select.addEventListener('change', event => {
    localStorage.setItem('selectedVoiceIndex',select.selectedIndex);
});
// 5 - Event listener to speech description of clicked image 
imagesContainer.addEventListener('click', event => {
    const nodeList = event.path;
    nodeList.forEach(element => {
        if(element.className === 'box'){
            const imageDescription = element.querySelector('img').getAttribute('data-description');
            var utterThis = new SpeechSynthesisUtterance(imageDescription);
            var selectedOption = select.selectedOptions[0].getAttribute('data-name');
            for(i = 0; i < voices.length ; i++) {
              if(voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
              }
            }
            spSynth.speak(utterThis);            
        }
    })    
})

// Init Functions
displayImages();
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}
