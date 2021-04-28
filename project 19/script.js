// All DOM Elements
const hourNeedle = document.getElementById('hours-needle');
const minuteNeedle = document.getElementById('minutes-needle');
const secondNeedle = document.getElementById('seconds-needle');
const yearDOM = document.getElementById('year');
const yearMessage = document.getElementById('year-message');
const monthsDOM = document.getElementById('months');
const daysDOM = document.getElementById('days');
const hoursDOM = document.getElementById('hours');
const minutesDOM = document.getElementById('minutes');
const secondsDOM = document.getElementById('seconds');
const newYearSticker = document.getElementById('new-year-sticker');
const message = document.getElementById('message');
const newYearEffectButton = document.getElementById('new-year-effect');
const newYearBadge = document.getElementById('badge-happy-new-year');
// All variables
let year,month,day,hour,minute,second;
let hourDeg,minuteDeg,secondDeg;
// Getting Current Time
const date = new Date();
// Full days of each month this year
const fullMonth = [31,parseInt( isleapYear(date.getFullYear()) ? 29 : 28 ),31,30,31,30,31,31,30,31,30,31];

// All Functions
// 1 - Function for clock update time and DOM both
function startClock() {
    // Getting Data out of Date Object
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    // Announce New Year if it is
    if(month === 0 && day === 1) happyNewYear();
    
    // Updating DOM in message
    yearMessage.innerText = year + 1;

    // Setting Degrees for Needles
    hourDeg = 180 + (hour * 30) + (minute > 30 ? (2.5 * 6) : 0);
    minuteDeg = 180 + (minute * 6);
    secondDeg = 180 + (second * 6);
    
    // Applying Degrees on DOM of Needles
    hourNeedle.style.transform = `translateX(-50%) rotateZ(${hourDeg}deg)`;
    minuteNeedle.style.transform = `translateX(-50%) rotateZ(${minuteDeg}deg)`;
    secondNeedle.style.transform = `translateX(-50%) rotateZ(${secondDeg}deg)`;
    
    // Interval to run at every Second to update Clock
    setInterval(()=> {
        second++;
        setTime();
        hourNeedle.style.transform = `translateX(-50%) rotateZ(${hourDeg}deg)`;
        minuteNeedle.style.transform = `translateX(-50%) rotateZ(${minuteDeg}deg)`;
        secondNeedle.style.transform = `translateX(-50%) rotateZ(${secondDeg}deg)`;
        updateTimeLeft();
    },1000)
}

// 2 - Function to update degrees of needles
function setTime() {
    // Minute Completed
    if(second === 60){
        second = 0;
        minute++;
    }
    if(minute === 30 && second === 0) {
        // Update degree for Hour half way
        hourDeg += 15;
    }
    // Hour Completed
    if(minute === 60 && second === 0){
        minute = 0;
        hour++;
        hour = hour < 24 ? hour : 0;
        // Update degree for Hour
        hourDeg += 15;
    }
    // Update degree for Minute
    minuteDeg = 180 + (minute * 6);
    // Update degree for Seconds
    secondDeg = 180 + (second * 6);
}

// 3 - Function to update time lefted
function updateTimeLeft() {
    // Updating DOM
    secondsDOM.innerText = format(60 - second);
    minutesDOM.innerText = format(60 - minute);
    hoursDOM.innerText = format(23 - hour);
    if(hour === 0 && minute === 0 && second === 0) {
        day++;
        if(fullMonth[month] <= day){
            day = 1;
            month++;
            if(month === 12){
                month=0;
                year++;
                // HAPPY NEW YEAR
                happyNewYear();
            }
        }
    };
    daysDOM.innerText = format(fullMonth[month] - day);
    monthsDOM.innerText = format(12 - (month + 1));
    yearDOM.innerText = year + 1;
}

// 4 - Function to return a two digit number
function format(number){
    return number.toString().length < 2 ? `0${number}` : number;
}

// 5 - Function will return true on leap year
function isleapYear(year) {
    return (year % 100 === 0) ? ( year % 400 === 0) : (year % 4 === 0);
}

// 6 - Function to run on New Year
function happyNewYear() {
    newYearBadge.innerText = `Happy New Year ${year}`
    newYearBadge.classList.add('show');
    newYearSticker.classList.add('show');
    message.classList.add('show');
}

// 7 - Function for New Year Effect button
function newYearEffect() {
    if(newYearEffectButton.innerText === 'See New Year Effects' && !newYearSticker.classList.contains('show')){
        happyNewYear();
        newYearEffectButton.innerText = 'Reset';
    } else if (newYearEffectButton.innerText === 'Reset') {
        newYearBadge.classList.remove('show');
        newYearSticker.classList.remove('show');
        message.classList.remove('show');
        newYearEffectButton.innerText = 'See New Year Effects';
    }
}

// Event listener to close New Year Message
document.querySelector('.close-message').addEventListener('click', () => {
    message.classList.remove('show');
})

// Event listener to see New Year effect
newYearEffectButton.addEventListener('click', newYearEffect);

// Starting Clock at start
startClock();