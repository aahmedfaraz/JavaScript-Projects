// All DOM Elements
const container = document.getElementById('list-container');
const checkOrderButton = document.getElementById('check-btn');
const resetBackButton = document.getElementById('reset-btn');
// Arrays
const sortedCountries = ['Russia','Canada','United States','China','Brazil','Australia','India','Argentina','Kazakhstan','Algeria'];
let unsorted = shuffle(sortedCountries);
// Variables
let draggedElementIndex = -1;
let droppedElementIndex = -1;

// All Functions
// 1 - Function to update container by list
function updateContainer(inputArray) {
    // Clear any element if exist in the container
    container.innerHTML = '';
    // Run loop through the input Array to get country names
    inputArray.forEach((country,index) => {
        // 1 - create list element
        const element = document.createElement('li');
        // 2 - assign class to the list element
        element.classList.add('list-item');
        // 3 - fill required HTMLs (using country and index) in the list element
        element.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable${country === sortedCountries[index] ? " success" : " error"}" draggable="true">
            <p>${country}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
        // 4 - figure out the draggable element in the list element
        const draggable = element.querySelector('.draggable');
        // 5 - assign event listeners to the draggable
        draggable.addEventListener('dragstart' , dragStart);
        draggable.addEventListener('dragend' , dragEnd);
        draggable.addEventListener('dragenter' , dragEnter);
        draggable.addEventListener('dragover' , dragOver);
        draggable.addEventListener('dragleave' , dragLeave);
        draggable.addEventListener('drop' , drop);
        // 6 - add the list element in the <ul> container
        container.appendChild(element);
    })
}

// 2 - Function to return shuffled elements of an array 
function shuffle(inputArray) {
    // initialize result array
    const shuffledArray = [];
    // shuffle input array and put in result array
    inputArray.forEach(country=>{
        // logic applied to make sure each country on different indexes
        let newIndex = Math.floor(Math.random() * sortedCountries.length);
        while(shuffledArray[newIndex] != null){
            newIndex = Math.floor(Math.random() * sortedCountries.length);
        }
        // append
        shuffledArray[newIndex] = country;
    })
    // return result array
    return shuffledArray;
}

// Drag Drop Functions
// 3 - When started dragging
function dragStart(e) {
    // find if list-item is available in the path
    e.path.forEach((element, index) => {
        if(index < e.path.length - 2 && element.classList.contains('list-item')){// avoiding 'document' and 'Window'
            // get index (present location) of the country
            draggedElementIndex = (+element.querySelector('.number').innerText -1);
        }
    })
}

// 4 - When ended dragging
function dragEnd(e) {
    e.preventDefault();
}

// 5 - When entered on an element while dragging
function dragEnter(e) {
    e.preventDefault();
}

// 6 - When moving on an element while dragging
function dragOver(e) {
    e.preventDefault();
    this.style.opacity = '0.5';
}

// 7 - When left dragging
function dragLeave(e) {
    e.preventDefault();
    this.style.opacity = '1';
}

// 8 - When dropped
function drop(e) {
    e.preventDefault();
    this.style.opacity = '1';
    // find if list-item is available in the path
    e.path.forEach((element, index) => {
        if(index < e.path.length - 2 && element.classList.contains('list-item')){// avoiding 'document' and 'Window'
            // get index (present location) of the country
            droppedElementIndex = (+element.querySelector('.number').innerText -1);
            // swap both countries in unsorted ARRAY
            swap(draggedElementIndex,droppedElementIndex,unsorted);
            // update the DOM using UPDATED unsorted
            updateContainer(unsorted);
        }
    })
}

// 9 - Function to swap two elements of an array
function swap(index1, index2, array) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

// All Event Listeners
// 1 - Event listener for check order button
checkOrderButton.addEventListener('click', e => {
    updateContainer(sortedCountries);
    container.querySelectorAll('.draggable').forEach(draggable => draggable.classList.add('success'));
})
// 2 - Event listener for restart button
resetBackButton.addEventListener('click', updateContainer.bind(null,unsorted));

// Calling function to update DOM container
updateContainer(unsorted);