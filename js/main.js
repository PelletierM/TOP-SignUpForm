let inputFields = document.querySelectorAll("input");
let submitButton = document.querySelector("button[type='submit']");
let passwordField = document.querySelector("#password");
let passwordCheckField = document.querySelector("#password-check");
let errorMessages = {
    "valueMissing": {
        "first-name": "Please enter your first name.",
        "last-name": "Please enter your last name.",
        "email": "Please enter your email address.",
        "password": "Please enter your password.",
        "password-check": "Please confirm your password."
    },
    "typeMismatch": {
        "email": "Please enter a valid email address."
    },
    "patternMismatch": {
        "password-check": "Passwords do not match."
    },
    "valid": "This is not a valid input."
};

inputFields.forEach(function(inputField) {
    inputField.addEventListener("focusin", function(e){
        e.target.parentElement.classList.add("in-focus")
        e.target.parentElement.querySelector("label").classList.add("is-active");
    })
    inputField.addEventListener("focusout", function(e){
        e.target.parentElement.classList.remove("in-focus")
        if(e.target.value == "") {
            e.target.parentElement.querySelector("label").classList.remove("is-active");
        }
        checkValidityFocusOut(e);
    })
    inputField.addEventListener("input", function(e){
        if(e.target.validity.valid){
            e.target.parentElement.querySelector(".error-message").textContent = "";
            e.target.parentElement.classList.remove("invalid");
        }
    })
})

passwordField.addEventListener("input", function(e){
    passwordCheckField.setAttribute("pattern", passwordField.value);
    if (passwordCheckField.value === passwordField.value) {
        passwordCheckField.parentElement.querySelector(".error-message").textContent = "";
        passwordCheckField.parentElement.classList.remove("invalid");
    }
    else if (passwordCheckField.value !== "" && !passwordCheckField.classList.contains("invalid")) {
        updateErrorMessage(passwordCheckField);
        passwordCheckField.parentElement.classList.add("invalid");
    }
})

submitButton.addEventListener("click", function(e){
    let prevent = false;
    inputFields.forEach(function(inputField) {
        if (!inputField.validity.valid) {
            updateErrorMessage(inputField)
            prevent = true;
        }
    })
    if (prevent) e.preventDefault();
});

function checkValidityFocusOut(e) {
    if (e.target.value !== "" && !e.target.validity.valid) updateErrorMessage(e.target)
    }

function updateErrorMessage(inputField) {
    let errorSpan = inputField.parentElement.querySelector(".error-message");
    if(inputField.validity.valueMissing) {
        errorSpan.textContent = errorMessages["valueMissing"][inputField.name];
        }
    else if(inputField.validity.typeMismatch) {
        errorSpan.textContent = errorMessages["typeMismatch"][inputField.name];
    }
    else if(inputField.validity.patternMismatch) {
        errorSpan.textContent = errorMessages["patternMismatch"][inputField.name];
    }
    else {
        errorSpan.textContent = errorMessages["valid"]
    }
    inputField.parentElement.classList.add("invalid");
}