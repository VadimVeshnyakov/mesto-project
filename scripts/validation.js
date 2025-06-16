function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function toggleButtonState(inputs, buttonElement) {
    const isFormValid = inputs.every((input) => input.validity.valid);
    buttonElement.disabled = !isFormValid;
    buttonElement.classList.toggle('popup__button_disabled', !isFormValid);
}

function setEventListeners(formElement) {
    const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputs, buttonElement);

    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputs, buttonElement);
        });
    });
}

function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((formElement) => {
        setEventListeners(formElement);
    });
}

enableValidation({
    formSelector: '.popup__form'
});
