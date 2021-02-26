// All DOM Elements  (DOM = Document Object Module)
// Overall usables
const preLoader = document.getElementById('pre-loader');
const backButton = document.querySelectorAll('.back');
const pageButtons = document.querySelectorAll('.page-button');
// All Pages DOMs
const mainPage = document.getElementById('main-page');
const registrationPage = document.getElementById('registration-page');
const registeredPage = document.getElementById('registered-page');
const historyPage = document.getElementById('history-page');
const entriesPage = document.getElementById('entries-page');
// HOME Page DOMs
const infoButton = document.getElementById('info');
const closeButton = document.getElementById('close');
const infoMessageBox = document.getElementById('message-box');
const startupContainer = document.getElementById('startup-container');
// REGISTRATIONS Page DOMs
const nameInput = document.getElementById('name');
const carInput = document.getElementById('car');
const phoneInput = document.getElementById('phone');
const cnicInput = document.getElementById('cnic');
const regButton = document.getElementById('register-button');
// REGISTERED Page DOMs
const registeredMsg = document.getElementById('registered-msg');
const allRegisteredDataContainer = document.getElementById('all-data');
// HISTORY Page DOMs
const driversContainerInHistory = document.getElementById('all-drivers-list');
const historyDataContainer = document.getElementById('driver-history-container');
const historyMsg = document.getElementById('history-msg');
const driversListInHistory = document.getElementById('all-drivers');
const listOfIndividualHistory = document.getElementById('all-history');
const individualName = document.getElementById('indv-name');
const recordMsg = document.getElementById('record-msg');
// ENTRIES Page DOMs
const cardInput = document.getElementById('card');
const dayInput = document.getElementById('day');
const timeInInput = document.getElementById('time-in');
const timeOutInput = document.getElementById('time-out');
const scanButton = document.getElementById('scan');
const enterRecordButton = document.getElementById('enter-record');

// All Classes
// Record Class
class Record {
    constructor(day, timeIn, timeOut) {
        this.day = day;
        this.timeIn = timeIn;
        this.timeOut = timeOut;
    }
}
// Driver Class
class Driver {
    constructor(name, car, phone, cnic) {
        this.name = name;
        this.car = car;
        this.phone = phone;
        this.cnic = cnic;
        this.records = [];
    }
}
// All Arrays and Variables
let allDrivers = [{
    name: "Robert",
    car: "Bugatti",
    phone: "03001234567",
    cnic: "1234-1234-12",
    records: [{
        day: "Monday",
        timeIn: "12:00",
        timeOut: "17:00"
    },
    {
        day: "Wednesday",
        timeIn: "09:00",
        timeOut: "11:00"
    },]
}, {
    name: "Thomas",
    car: "Mercedes",
    phone: "03111234567",
    cnic: "1234-1234-13",
    records: []
}, {
    name: "Peter",
    car: "Lamborghini",
    phone: "03221234567",
    cnic: "1234-1234-14",
    records: [{
        day: "Friday",
        timeIn: "09:00",
        timeOut: "14:00"
    },
    {
        day: "Sunday",
        timeIn: "13:00",
        timeOut: "23:00"
    },]
}];
let recordPage = false;

// ALL FUNCTIONS
// Function to disappear pre-loader and start site
function start() {
    preLoader.style.display = 'none';
    showAndDisappearStartupLogo();
}
// All HOME Page Functions
// 1 - Function to deal with display of Student's info message from (i) button
function showInfoMessageBox() {
    infoMessageBox.classList.toggle('show');
}
// 2 - Function to deal with display of logo in the beginning
function showAndDisappearStartupLogo() {
    startupContainer.classList.add('show');
    setTimeout(() => {
        startupContainer.classList.remove('show');
        mainPage.classList.add('show');
    }, 4000);
}
// All REGISTRATION Page Functions
// 1 - Function to write Card files
function generateCardFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
// 2 - Function to register Drivers
function register(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const car = carInput.value.trim();
    const phone = phoneInput.value.trim();
    const cnic = cnicInput.value.trim();
    // Checking all the inputs are entered
    if (name === '' || car === '' || phone === '' || cnic === '') {
        alert('Fill all the credentials');
        return;
    }
    const newDriver = new Driver(name, car, phone, cnic);
    if (isDriverValid(newDriver)) {
        // Start file download.
        allDrivers.push(newDriver);
        generateCardFile(`${name.toLowerCase()}Card.txt`, `${name}:${car}:${phone}:${cnic}`);
        alert("The Driver have been Registered");
        resetAllInputs();
    } else {
        alert("This Driver already exist");
    }
}
// 3 - Function to check if driver already exist
function isDriverValid(newDriver) {
    let result = true;
    allDrivers.forEach(driver => {
        if (JSON.stringify(newDriver) == JSON.stringify(driver)) {
            console.log(JSON.stringify(newDriver) == JSON.stringify(driver));
            result = false;
        };
    })
    return result;
}
// 4 - Reset all Inputs
function resetAllInputs() {
    nameInput.value = '';
    carInput.value = '';
    phoneInput.value = '';
    cnicInput.value = '';
}
// 5 - Function to show particular page at one time
function show(page) {
    const allPages = [mainPage, registrationPage, registeredPage, historyPage, entriesPage];
    allPages.forEach(page => {
        page.classList.contains('show') ? page.classList.remove('show') : '';
    })
    page.classList.add('show');
}

// All REGISTERED Page Functions
function updateRegisteredPageDOM() {
    if (allDrivers.length !== 0) {
        registeredMsg.classList.add('hide');
        allRegisteredDataContainer.classList.remove('hide');
        allRegisteredDataContainer.innerHTML = '';
        allDrivers.forEach((driver, index) => {
            const dataElement = document.createElement('div');
            dataElement.classList.add('data');
            dataElement.innerHTML = `
                <p>${driver.name}</p>
                <p>${driver.car}</p>
                <p>${driver.phone}</p>
                <p>${driver.cnic}</p>
                <button class="delete" id="${index}">X</button>
            `;
            allRegisteredDataContainer.appendChild(dataElement)
        })
    } else {
        registeredMsg.classList.remove('hide');
        allRegisteredDataContainer.classList.add('hide');
        allRegisteredDataContainer.innerHTML = '';
    }
}
// All HISTORY Page Functions
// 1 - Function to Update History Container
function updateDriversContainerInHistory() {
    if (allDrivers.length !== 0) {
        // Show it
        driversListInHistory.classList.add('show');
        // Hide it
        historyMsg.classList.remove('show');
        // refresh it
        driversListInHistory.innerHTML = '';
        // Append All drivers
        allDrivers.forEach((driver, index) => {
            const listElement = document.createElement('li');
            listElement.className = 'driver-element'
            listElement.id = `driver:${index}`
            listElement.innerHTML = `
                <span>${driver.name}</span>
                <span>${driver.car}</span>
                <span>${driver.phone}</span>
                <span>${driver.cnic}</span>
            `
            driversListInHistory.appendChild(listElement);

            // ADD Event listener for each list element
            listElement.addEventListener('click', e => {
                e.path.forEach(node => {
                    if (node.className === 'driver-element') {
                        const index = node.id.split(':')[1];
                        // Hide them
                        driversContainerInHistory.classList.remove('show');
                        // Show them
                        historyDataContainer.classList.add('show');
                        individualName.innerText = `${allDrivers[index].name}`
                        showRecordsOfDriver(allDrivers[index]);
                        return;
                    }
                })
            })
        })
    } else {
        // Show them
        driversContainerInHistory.classList.add('show');
        historyMsg.classList.add('show');
        // Hide them
        driversListInHistory.classList.remove('show');
        historyDataContainer.classList.remove('show');
    }
}
// 2 - Function to show records
function showRecordsOfDriver(driver) {
    recordPage = true;
    if (driver.records.length !== 0) {
        listOfIndividualHistory.innerHTML = ''
        recordMsg.classList.remove('show');
        driver.records.forEach(record => {
            const listElement = document.createElement('li');
            listElement.innerHTML = `
                <span>${record.day}</span>
                <span>${record.timeIn}</span>
                <span>${record.timeOut}</span>
            `
            listOfIndividualHistory.appendChild(listElement);
        })
    } else {
        listOfIndividualHistory.innerHTML = ''
        recordMsg.classList.contains('show') ? '' : recordMsg.classList.add('show');
    }
}
// Global Function to update important areas at every change
function updateAll() {
    updateRegisteredPageDOM();
    updateDriversContainerInHistory();
    permissionToInput(false);
}
// All ENTRIES Page Functions
// 1 - Function to disable and enable inputs
function permissionToInput(permission) {
    dayInput.disabled = !permission;
    timeInInput.disabled = !permission;
    timeOutInput.disabled = !permission;
}
// 2 - Fucntion to check driver validation
function checkDriver() {
    if (cardInput.files.length !== 0) {
        const cardFile = cardInput.files[0];
        const reader = new FileReader();
        reader.readAsText(cardFile);
        reader.onload = () => {
            const data = reader.result.split(':');
            if (data.length !== 4) {
                alert("Invalid Folder, Select valid Card");
                return -1;
            };
            const [name, car, phone, cnic] = data;
            let driveFound = false;
            allDrivers.forEach((driver, index) => {
                if (driver.name === name && driver.car === car && driver.phone === phone && driver.cnic === cnic) {
                    alert("The Card is Valid, The Driver have been recognized\n=> You can Now Enter other credentials");
                    permissionToInput(true);
                    driveFound = true;
                    driverIndex = index;
                    return;
                }
            })
            if (!driveFound) {
                alert("The Driver does not exist")
                return -1;
            }
        };
    } else {
        alert("=> No Card selected\n=> Select Driver's Card File")
        return -1;
    }
}
// 3 - Function to check time validation
function checkTimeValidation(timeIn, timeOut) {
    const timeInData = timeIn.split(':');
    const timeOutData = timeOut.split(':');
    if (timeOutData[0] < timeInData[0]) return false;
    if (timeOutData[0] > timeInData[0]) return true;
    if (timeOutData[0] === timeInData[0]) {
        if (timeOutData[1] < timeInData[1]) return false;
        if (timeOutData[1] > timeInData[1]) return true;
        if (timeOutData[1] === timeInData[1]) {
            return true;
        }
    }
}

// ALL EVENT LISTENERS
// Overall usable Event Listener
// 1 - Event listener for Back Button
backButton.forEach(btn => btn.addEventListener('click', () => {
    if (recordPage) {
        // Show them
        driversContainerInHistory.classList.add('show');
        historyMsg.classList.add('show');
        // Hide them
        driversListInHistory.classList.remove('show');
        historyDataContainer.classList.remove('show');
        recordPage = false;
    } else {
        show(mainPage);
    }
    updateAll();
}))
// All HOME Page Event listeners
// 1 - Event listener to display Student's info message from (i) button
infoButton.addEventListener('click', showInfoMessageBox);
// 2 - Event listener to close the info message by Red Cross button
closeButton.addEventListener('click', showInfoMessageBox);
// 3 - Event listener to navigate to pages
pageButtons.forEach(button => button.addEventListener('click', (e) => {
    window.scrollTo(0, 0);
    show(document.getElementById(e.target.getAttribute('data-page')));
    updateAll();
}))
// All REGISTRATION Page Event Listeners
// 1 - Event listener to register driver
regButton.addEventListener('click', register);

// All REGISTERED Page Event listeners
// 1 - Event listeners to delete deriver
window.addEventListener('click', e => {
    if (e.target.className === "delete") {
        const index = e.target.id;
        allDrivers.splice(index, 1);
        updateAll();
    }
})
// All ENTRIES Page Event Listeners
// 1 - Event listener to scan the card info
let driverIndex = -1;
scanButton.addEventListener('click', e => {
    e.preventDefault();
    checkDriver();
})
// 2 - Event listener to enter records
enterRecordButton.addEventListener('click', e => {
    const card = cardInput.value.trim();
    const day = dayInput.value.trim();
    const timeIn = timeInInput.value.trim();
    const timeOut = timeOutInput.value.trim();
    if (card != '' && day != '' && timeIn != '' && timeOut != '') {
        if (checkTimeValidation(timeIn, timeOut)) {
            driverIndex = driverIndex === -1 ? checkDriver() : driverIndex;
            allDrivers[driverIndex].records.push(new Record(day, timeIn, timeOut));
            alert("The Record have been added");
            cardInput.value = '';
            dayInput.value = '';
            timeInInput.value = '';
            timeOutInput.value = '';
        } else {
            alert("Wrong Input, Time of Departure is before Time of Arrival")
        }
    } else {
        alert("Some Credentials are Missing")
    }
})

// All Startup Call back funtions - Required to run in start
updateAll();