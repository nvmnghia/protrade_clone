function focusFirstInput() {
    let firstInput = document.querySelector('input');
    firstInput.focus();
    firstInput.select();
}

window.onload = function() {
    focusFirstInput();
}
