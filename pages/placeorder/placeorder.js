function preventReloadBuySell() {
    const forms = document.querySelectorAll('form');
    const prevent = event => event.preventDefault();
    forms.forEach(form => {
        form.addEventListener('submit', prevent);
    });
}

/**
 * Given a change event of a radio for a form, toggle that form.
 *
 * @param {Event} radioEvent Change event of the radio
 */
function toggleForm(radioEvent) {
    const radio = radioEvent.target;
    const formID = `${radio.id}-form`;

    document.querySelectorAll(`form:not(#${formID})`)
        .forEach(form => form.style.display = 'none');

    document.getElementById(formID).style.display = 'block';
}

window.onload = () => {
    preventReloadBuySell();

    document.getElementById('normal-order').onchange = toggleForm;
    document.getElementById('stop-order').onchange = toggleForm;
}
