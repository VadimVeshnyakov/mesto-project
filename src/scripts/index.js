import enableValidation from './validate.js'
import {createCard, likeAndDelete} from './card.js'
import {initialCards} from './cards.js';
import {openModal, closeModal} from './modal.js'
import '../pages/index.css'
import avatar from '../images/avatar.jpg';

const placeForCards = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template')

// Поля профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

// Попапы
const profilePopup = document.querySelector('.popup_type_edit')
profilePopup.classList.add('popup_is-animated')
const cardPopup = document.querySelector('.popup_type_new-card')
cardPopup.classList.add('popup_is-animated')
const imagePopup = document.querySelector('.popup_type_image')
imagePopup.classList.add('popup_is-animated')

// Поля и кнопка изображения
const imageCloseButton = imagePopup.querySelector('.popup__close')
const image = imagePopup.querySelector('.popup__image')
const imageTitle = imagePopup.querySelector('.popup__caption')

// Кнопки профиля
const profileButton = document.querySelector('.profile__edit-button')
const profileCloseButton = profilePopup.querySelector('.popup__close')

// Кнопки карточки
const cardButton = document.querySelector('.profile__add-button')
const cardCloseButton = cardPopup.querySelector('.popup__close')

// Форма профиля
const profileFormElement = profilePopup.querySelector('.popup__form')
const nameInput = profilePopup.querySelector('.popup__input_type_name')
const jobInput = profilePopup.querySelector('.popup__input_type_description')

// Форма карточки
const cardFormElement = cardPopup.querySelector('.popup__form')
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name')
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url')

// @todo: Темплейт карточки

initialCards.forEach((item) => {
    const card = createCard(item, cardTemplate, imageContent);
    placeForCards.append(card);
});

// @todo: Функция редактирования профиля

profileButton.addEventListener('click', (evt) => {
    openModal(profilePopup)
    nameInput.value = profileTitle.textContent
    jobInput.value = profileDescription.textContent
})

profileCloseButton.addEventListener('click', (evt) => {
    closeModal(profilePopup)
})

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value
    closeModal(profilePopup)
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

// @todo: Функция создания карточки

cardButton.addEventListener('click', (evt) => {
    openModal(cardPopup)
})

cardCloseButton.addEventListener('click', (evt) => {
    closeModal(cardPopup)
})

function handleCardFormSubmit(evt) {
    evt.preventDefault(); 
    const card = createCard({name: cardNameInput.value, link: cardUrlInput.value,}, cardTemplate, imageContent)
    placeForCards.prepend(card);
    closeModal(cardPopup)
}

cardFormElement.addEventListener('submit', handleCardFormSubmit); 

// @todo: Функция лайка и удаления карточки

placeForCards.addEventListener('click', likeAndDelete);

// @todo: Вывести карточки на страницу

function imageContent(cardImage, cardTitle) {
    imageTitle.textContent = cardTitle.textContent;
    image.setAttribute('src', cardImage.getAttribute('src'));
    image.setAttribute('alt', cardImage.getAttribute('alt'));
    openModal(imagePopup)
}

imageCloseButton.addEventListener('click', (evt) => {
    closeModal(imagePopup)
})

// Валидация

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationSettings);
