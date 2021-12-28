function preventReloadBuySell() {
    const forms = document.querySelectorAll('form');
    const prevent = event => event.preventDefault();
    forms.forEach(form => {
        form.addEventListener('submit', prevent);
    });
}

window.onload = () => {
    preventReloadBuySell();
}
