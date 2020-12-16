// ALL VARIABLES 
// all DOM objects
const body = document.body; 
const screen = document.querySelector('.screen');
const main = document.querySelector('.main-container');
let seatContainer = document.querySelector('.container');
let movie = document.getElementById('movie');
let seats = Array.from(document.querySelectorAll('.seat.available'));
let allseats = Array.from(document.querySelectorAll('.seat'));
const buyButton = document.getElementById('buy');
const resetButton = document.getElementById('reset');
let totalSeats = document.getElementById('count');
let totalPrice = document.getElementById('total');
// required variables and arrays
let occupiedSeats = [];
let selectedSeats = [];
const trailerLink = ['https://www.youtube.com/embed/qSqVVswa420','https://www.youtube.com/embed/RFinNxS5KN4','https://www.youtube.com/embed/rBxcF-r9Ibs','https://www.youtube.com/embed/ej3ioOneTy8'];
// ticket
let theater = document.getElementById('theater');
let seatsTicket = document.getElementById('seats');
let listSeatsTicket = document.getElementById('seatNos');
let priceTicket = document.getElementById('price');
let date = document.getElementById('date');
let ticket = document.querySelector('.ticket');
let okButton;


// ALL FUNCTIONS
// 1 - function for playing the movie trailer
function playTrailer(index){
    screen.innerHTML = `<iframe width='560' height='315' src='${trailerLink[index]}?autoplay=1&loop=1&controls=0' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'></iframe>`;
}

// 2 - function to check and mention occupied seats
function checkOccupiedSeats(){
    for (let i = 1; i < seats.length; i++) {
        occupiedSeats = localStorage.getItem('occupiedSeats').split(',').map((element)=>{return JSON.parse(element)})
        for (let j = 0; j < occupiedSeats.length; j++) {
            if(JSON.stringify(occupiedSeats[j]) === seats[i].innerText){
                seats[i].className = 'seat occupied';
            }
        }
        for (let j = 0; j < occupiedSeats.length; j++) {
            if(JSON.stringify(occupiedSeats[j]) === seats[i].innerText){
                seats[i].className = 'seat occupied';
            }
        }
    }
}

// 3 - function for default values of seats
function resetAllSeats(){
    for (let i = 1; i < allseats.length; i++) {
        if( allseats[i].innerText != ''){
            allseats[i].className = "seat available";
        }
    }
}

// 4 - function to disappear Main Body
function dissapearMain() {
    main.style.transform = 'rotateY(90deg)';
    main.style.visibility = 'hidden'
}

// 5 - fucntion to display result
function displayResult(count,total){
    totalSeats.innerText = count;
    totalPrice.innerText = total;
}

// 6 - function to display extra feature ticket
function displayTicket(seatsList,price){
    ticket.innerHTML = `<h1 class="cinema">Cinema Ticket</h1><h1>Movie 3D</h1><div class="ticketDetails">THEATER NO<span id="theaterNo">${Math.floor(1 + Math.random() * 5)}</span></div><div class="ticketDetails">SEATS<span id="seats">${seatsList.length}</span></div><div class="ticketDetails">SEAT Nos<span id="seatNumbers">${seatsList.toString()}</span></div><div class="ticketDetails">PRICE<span id="totalPrice">$${price}</span></div><hr><div class="ticketDetails">DATE<span id="date">Tomorrow</span></div><div class="ticketDetails">TIME<span id="day">2:00 PM</span></div><hr><div style="font-size: 16px; margin-top: 2vh;">Thank You | Enjoy the Movie</div><button class="ok">OK</button>`;
    ticket.style.transitionDelay = '0.5s'
    main.style.transitionDelay = '0s'
    ticket.style.visibility = 'visible';
    ticket.style.transform = 'rotateY(0deg)';
    okButton = document.querySelector('.ok');
}


// ALL EVENT LISTENERS
// 1 - event listener for changing the trailer as movie is changed
movie.addEventListener('change',(event)=>{
    localStorage.setItem('movieIndex',event.target.selectedIndex);
    playTrailer( localStorage.getItem('movieIndex') );
    localStorage.setItem('movieIndex',JSON.parse(movie.selectedIndex));
    displayResult(JSON.stringify(selectedSeats.length),JSON.stringify(selectedSeats.length * movie[localStorage.getItem('movieIndex')].value));
});

// 2 - event listener to apply .selected class on selected seats
seatContainer.addEventListener("click",(event)=>{
    if(event.target.className == "seat available"){// selected
        event.target.className = "seat selected";
        selectedSeats.push(JSON.parse(event.target.innerText));
        displayResult(JSON.stringify(selectedSeats.length),JSON.stringify(selectedSeats.length * movie[localStorage.getItem('movieIndex')].value));
    }else if (event.target.className == "seat selected") {
        event.target.className = "seat available";
        for (let i = 0; i < selectedSeats.length; i++) {// deselected
            if(selectedSeats[i] === JSON.parse(event.target.innerText)){
                selectedSeats.splice(i,1);
                break;
            }            
        }
        displayResult(JSON.stringify(selectedSeats.length),JSON.stringify(selectedSeats.length * movie[localStorage.getItem('movieIndex')].value));
    } else {/**ignore this event**/}
});

// 3 - event listener to make selected seat occupied for next person
buyButton.addEventListener('click',()=>{
    if(selectedSeats.length > 0 ){
        // 1. storing selected seats into occupied seats
        occupiedSeats.push(...selectedSeats.map((element)=>{return (element)}));
        // 2. storing occupied seats to local storage 
        localStorage.setItem('occupiedSeats',occupiedSeats);
        // 3. displaying ticket
        dissapearMain();
        displayTicket(selectedSeats,JSON.stringify(selectedSeats.length * movie[localStorage.getItem('movieIndex')].value));
        // 4. result back to zero
        displayResult(0,0);
        // 5. making selectedSeats Blank for next turn
        selectedSeats = [];
        // 6. marking occupied seats
        checkOccupiedSeats();
    } else {
        console.log("can't buy, no seat is selected");
    }
});

// 4 - event listener to reset all values
resetButton.addEventListener('click',()=>{
    selectedSeats = [];
    occupiedSeats = [];
    localStorage.removeItem('occupiedSeats');
    resetAllSeats();
    displayResult(0,0);
});

// 5 - event listener for ok button of ticket
ticket.addEventListener('click',(e)=>{
    if (e.target.className === 'ok') {
        ticket.style.transitionDelay = '0s'
        main.style.transitionDelay = '0.5s'
        ticket.style.transform = 'rotateY(-90deg)';
        main.style.visibility = 'visible';
        main.style.transform = 'rotateY(0deg)'
    }
});



// ALL CALLED FUNCTIONS REQUIRED ON START
// calling function to Load trailer
playTrailer((localStorage.getItem('movieIndex') != null)? localStorage.getItem('movieIndex') : 0);

// calling function to load previous occupied seats if not empty
if (localStorage.getItem('occupiedSeats') != null){
    occupiedSeats = localStorage.getItem('occupiedSeats').split(',').map((element)=>{return JSON.parse(element)});
    checkOccupiedSeats();
}

// making the app to load active selected movie on start
if (localStorage.getItem('movieIndex') != null) {
    movie.selectedIndex = localStorage.getItem('movieIndex');
}

// calling function to display initial zero result in the start
displayResult(0,0);