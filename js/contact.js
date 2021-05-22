const form = document.querySelector("#contactForm");
const contactName = document.querySelector("#contactName");
const contactNameError = document.querySelector("#contactNameError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const contentMessage = document.querySelector("#contentMessage");
const contentMessageError = document.querySelector("#contentMessageError");
const sentMessage = document.querySelector("#message");

function validateForm(event) {
    event.preventDefault(); 

    if (checkLength(contactName.value, 4) === true) {
        contactNameError.style.display = "none"; 
    } else {
        contactNameError.style.display = "block"; 
    }

    if (checkLength(subject.value, 14) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }

    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (checkLength(contentMessage.value, 24) === true) {
        contentMessageError.style.display = "none";
    } else {
        contentMessageError.style.display = "block";
    }

    if (checkLength(contactName.value, 4) === true && checkLength(subject.value, 14) === true && validateEmail(email.value) === true && checkLength(contentMessage.value, 24)) {
        submitForm(event);
    } else {
        sentMessage.innerHTML = ""; // resets last successful sent msg if form is submitted once more while sent msg is still showing
    }
}

// when submit is pressed run validateForm function
form.addEventListener("submit", validateForm); 

// function to run when the form is submitted
function submitForm(event) {
    event.preventDefault();
    // display a message once the form has been submitted
    sentMessage.innerHTML = '<div class="success">Your message has been sent!</div>';
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

