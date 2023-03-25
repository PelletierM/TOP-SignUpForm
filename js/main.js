let inputFields = document.querySelectorAll("input");

inputFields.forEach(function(inputField) {
    inputField.addEventListener("focusin", function(e){
        e.target.parentElement.classList.add("in-focus")
        e.target.parentElement.querySelector("label").classList.add("is-active");
    })
    inputField.addEventListener("focusout", function(e){
        console.log(e);
        e.target.parentElement.classList.remove("in-focus")
        if(e.target.value == "") {
            e.target.parentElement.querySelector("label").classList.remove("is-active");
        }
    })
})