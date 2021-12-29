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

function hideErrorBanner() {
    document.getElementById('error-banner').style.display = 'none';
}

function showErrorBanner() {
    document.getElementById('error-banner').style.display = 'block';
}

function setupErrorBanner() {
    // Hide error banner
    document.getElementById('normal-order').addEventListener('change', hideErrorBanner);
    document.getElementById('stop-order').addEventListener('change', hideErrorBanner);

    // Show error banner
    document.querySelector('label[for=trailing-order]').addEventListener('click', showErrorBanner);
    document.querySelector('label[for=oso-order]').addEventListener('click', showErrorBanner);
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', showErrorBanner);
    })
}

function setupFormRadio() {
    document.getElementById('normal-order').onchange = toggleForm;
    document.getElementById('stop-order').onchange = toggleForm;
}

window.onload = () => {
    preventReloadBuySell();
    setupErrorBanner();
    setupFormRadio();
}
