// All DOM Elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// ALL FUNCTIONS

// Function to show Error
function showError(input,message){
    const field = input.parentElement;
    field.className = "form-control error";
    const small = field.querySelector('small');
    small.innerText = message;
}

// Function to show success
function showSuccess(input){
    const field = input.parentElement;
    field.className = "form-control success";
}

// Function to check if email is valid
function isEmailValid(input){
    if (input.value.trim() !== '') {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(input.value.trim()).toLowerCase())) {
            showSuccess(input);
        } else {
            showError(input, 'Email is invalid');
        }
    }
}

// Function for format of field id for error message (capitalizing)
function correctFormat(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}

//Function to check length of the Field values
function checkLength(input,min,max){
    if (input.value.trim() !== '' ){
        if (input.value.length < min ) {
            showError(input,`${correctFormat(input.id)} needs to be atleast ${min} characters`);
        } else if (input.value.length > max ) {
            showError(input,`${correctFormat(input.id)} needs to be less than ${max} characters`);
        } else {
            showSuccess(input);
        }
    }
}

// Function for check required fields
function checkRequired(arrayOfFields){
    arrayOfFields.forEach(fieldInput => {
        if (fieldInput.value.trim() === '') {
            showError(fieldInput,`${correctFormat(fieldInput.id)} is required`);
        } else {
            showSuccess(fieldInput);
        }
    });
}

// Function for check if Password and Confirm Password match
function doTheyMatch(input1,input2){
    if (input1.value.trim() !== '' && input2.value.trim() !== '') {
        if (input1.value === input2.value) {
            showSuccess(confirmPassword);
        } else {
            showError(confirmPassword,"ConfirmPassword didn't match. Try again")
        }
    }
}

// Event listener for submit button
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    checkRequired([username,email,password,confirmPassword]);
    isEmailValid(email);
    checkLength(username,3,10);
    checkLength(password,6,30);
    doTheyMatch(password,confirmPassword);
})