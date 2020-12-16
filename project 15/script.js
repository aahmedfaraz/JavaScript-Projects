// GET DOM elements
// GET input field
const input = document.getElementById('input');
// GET search button
const searchButton = document.getElementById('search');
// GET main container to display result
const main = document.getElementById('main');
// GET pagination container
const pagination = document.getElementById('pagination');
// Other variables
let urlMain = 'https://api.lyrics.ovh';
let currentURL = '';

// All Functions
// 1 - Function to return data fetched from an URL
async function getData(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

// 2 - Function to display url data to DOM
async function displayDOM(url) {
    currentURL = url;
    // Get data
    const data = await getData(url);
    // Display to DOM
    main.innerHTML = `
    <ul>
        ${data.data.map(song => `
        <li><span class="data">${song.title} - ${song.artist.name}</span><button class="btn" song-artist="${song.artist.name}" song-title="${song.title}" onClick="displayLyrics('${song.title}','${song.artist.name}')">Get Lyrics</button></li>
        `).join('')}
    </ul>
    `;
    // Add Pagination if required
    if(data.prev || data.next) {
        pagination.innerHTML = `
            ${data.prev ? `<button class="pgn-btn" onClick="displayDOM('https://cors-anywhere.herokuapp.com/${data.prev}')">Prev</button>`:''}
            ${data.next ? `<button class="pgn-btn" onClick="displayDOM('https://cors-anywhere.herokuapp.com/${data.next}')">Next</button>`:''}
        `;
    } else {
        pagination.innerHTML = '';
    }
}

// 3 - Function to Get lyrics and display to DOM
async function displayLyrics(title,artist) {
    const data = await getData(`${urlMain}/v1/${artist}/${title}`);
    main.innerHTML = `
    <button class="lyr-btn" onClick="displayDOM('${currentURL}')"> back </button>
    <h3>${title} - ${artist}</h3>
    <p>${data.lyrics ? data.lyrics.replace(/\r\n|\r|\n/g,'</br>').replace(/<br><br>/g,'</br>') : '...'}</p>
    `;
    pagination.innerHTML = '';
}

// All Evenet Listeners
// 1 - Event Listener for Search Button
searchButton.addEventListener('click',e =>{
    e.preventDefault();
    const keyword = input.value.trim();
    if(keyword) {
        displayDOM(`${urlMain}/suggest/${keyword}`);
    } else {
        alert('Please enter a valid keyword');
    }
});