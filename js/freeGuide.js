const form = document.querySelector("#guideForm");
const guideName = document.querySelector("#guideName");
const guideNameError = document.querySelector("#guideNameError");
const guideEmail = document.querySelector("#guideEmail");
const guideEmailError = document.querySelector("#guideEmailError");
const sentMessage = document.querySelector(".free-guide-button");

function validateForm(event) {
    event.preventDefault(); 

    if (checkLength(guideName.value, 4) === true) {
        guideNameError.style.display = "none"; 
    } else {
        guideNameError.style.display = "block"; 
    }


    if (validateEmail(guideEmail.value) === true) {
        guideEmailError.style.display = "none";
    } else {
        guideEmailError.style.display = "block";
    }


    if (checkLength(guideName.value, 4) === true && validateEmail(guideEmail.value) === true) {
        submitForm(event);
    } else {
        sentMessage.innerText = "Get it"; // resets last successful sent msg if form is submitted once more while sent msg is still showing
    }
}

// when submit is pressed run validateForm function
form.addEventListener("submit", validateForm); 

// function to run when the form is submitted
function submitForm(event) {
    event.preventDefault();
    // display a message once the form has been submitted
    sentMessage.innerText = 'Sent!';
    // clear all input values
    form.reset();
}

// this function checks if the length is meeting the required length set by len
function checkLength(value, len) { 
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

// this function validates email
function validateEmail(email) {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}