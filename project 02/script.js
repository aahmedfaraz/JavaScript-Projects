// All DOM Elements
const container = document.getElementById('container');
const seatsContainer = document.getElementById('seats-container');
const selectMovies = document.getElementById('movies');
const totalSeats = document.getElementById('total-seats-selected');
const totalPrice = document.getElementById('total-price');
const date = new Date();
const dateElement = document.getElementById('date').innerHTML = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const movieName = document.getElementById('selected-movie');
const selectedSeatsTicket = document.getElementById('selected-seats');
const priceTicket = document.getElementById('total-price-ticket');
const screen = document.getElementById('screen');

// All Variables
const movies = [
    {
        title: 'Top Gun: Maverick',
        ticketPrice: 15,
        url: 'https://www.youtube.com/embed/qSqVVswa420',
    },
    {
        title: 'Jurassic World: Fallen Kingdom',
        ticketPrice: 20,
        url: 'https://www.youtube.com/embed/vn9mMeWcgoM',
    },
    {
        title: 'Jumanji: The Next Level',
        ticketPrice: 10,
        url: 'https://www.youtube.com/embed/rBxcF-r9Ibs',
    },
    {
        title: 'The Martian',
        ticketPrice: 12,
        url: 'https://www.youtube.com/embed/ej3ioOneTy8',
    }
]

let movieSelected = localStorage.movieSelected || 0;
// Create local storage for occupied seats to have some seat values in empty state and save the state
!localStorage.seatsOccupied && localStorage.setItem('seatsOccupied', JSON.stringify([11, 12, 13, 14, 20, 21, 28, 29, 35, 36, 37, 38]));
let seatsOccupied = JSON.parse(localStorage.getItem('seatsOccupied'));
let seatsSelected = [];

// 1 - IIFE Function to prepare every thing required in start
const init = (function () {
    // Display Movies in Select
    selectMovies.innerHTML = '';
    movies.map((movie, index) => {
        const { title, ticketPrice } = movie;
        const optionElement = document.createElement('option');
        optionElement.innerHTML = `${title} ($${ticketPrice})`;
        optionElement.value = index;
        optionElement.selected = index === parseInt(movieSelected);
        selectMovies.appendChild(optionElement);
    })

    // Play trailer for selected movie option
    showTrailer(movieSelected);

    // Displaying Seats
    seatsContainer.innerHTML = '';
    for (let row = 1; row <= 6; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        for (let seat = 1; seat <= 8; seat++) {
            const seatNumber = seat + ((row - 1) * 8);
            const seatElement = document.createElement('div');
            seatElement.className = `seat ${isOccupied(seatNumber) ? 'occupied' : 'available'}`;

            seatElement.innerHTML = `${seatNumber}`;
            seatElement.setAttribute('data-seat-number', `${seatNumber}`);
            rowElement.appendChild(seatElement);

            seatElement.addEventListener('click', e => {
                if (!seatElement.classList.contains('occupied')) {
                    e.target.classList.toggle('available');
                    e.target.classList.toggle('selected');

                    if (seatsSelected.filter(seat => seat === seatNumber).length === 0) {
                        seatsSelected.push(seatNumber);
                    } else {
                        seatsSelected = seatsSelected.filter(seat => seat !== seatNumber);
                    }
                }
                showResult();
            })
        }
        seatsContainer.appendChild(rowElement);
    }
})();

// 2 - Function to check either seat is available or occupied
function isOccupied(seatNumber) {
    return seatsOccupied.filter(seat => seat === seatNumber).length !== 0 ? true : false;
}

// 3 - Function to update Result
function showResult(seats, price) {
    totalSeats.innerHTML = seats || `${seatsSelected.length}`;
    totalPrice.innerHTML = price || `${seatsSelected.length * movies[movieSelected].ticketPrice}`;
}

// 4 - Function to Update movie
function showTrailer(index) {
    screen.innerHTML = `
    <iframe src="${movies[index].url}" title="YouTube video player" frameborder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
    `
}

// Event Listeners

// 1 - Change trailer and movie details on selecting movie
selectMovies.addEventListener('change', e => {
    movieSelected = e.target.value;
    localStorage.setItem('movieSelected', movieSelected);
    showTrailer(movieSelected);
    showResult();
})

// 2 - Generate ticket of selected seats according to movie when click on BUY button
document.getElementById('buy').addEventListener('click', () => {
    if (seatsSelected.length === 0) return alert('Please select your seat.');
    seatsOccupied = localStorage.seatsOccupied ? [...JSON.parse(localStorage.getItem('seatsOccupied')), ...seatsSelected] : [...seatsSelected];
    localStorage.setItem('seatsOccupied', JSON.stringify(seatsOccupied));

    // Update Ticket DOM
    movieName.innerHTML = `${movies[movieSelected].title}`;
    selectedSeatsTicket.innerHTML = '';
    seatsSelected.map(seat => {
        const seatElement = document.createElement('small');
        seatElement.innerHTML = seat;
        selectedSeatsTicket.appendChild(seatElement);
    });
    priceTicket.innerHTML = `$${seatsSelected.length * movies[movieSelected].ticketPrice}`;
    // Remove Selected Seats
    seatsSelected = [];
    // Update DOM for occupied seats
    document.querySelectorAll('.selected:not(.legend-seat)').forEach(seat => seat.className = 'seat occupied');
    container.classList.toggle('flip');
    showResult(0, 0);
})

// 3 - Reset all on click RESET button
document.getElementById('reset').addEventListener('click', () => {
    // Clear local storage
    localStorage.removeItem('seatsOccupied');
    localStorage.removeItem('movieSelected');
    // Clear Data
    movieSelected = 0;
    seatsSelected = [];
    seatsOccupied = [];
    // Update DOM
    document.querySelectorAll('.selected:not(.legend-seat)').forEach(seat => seat.className = 'seat available');
    document.querySelectorAll('.occupied:not(.legend-seat)').forEach(seat => seat.className = 'seat available');
    document.querySelectorAll('option').forEach(option => {
        option.selected = option.value === movieSelected;
    })
})

// 4 - Close Ticket view on click OK button
document.getElementById('ok').addEventListener('click', () => {
    container.classList.toggle('flip');
})
