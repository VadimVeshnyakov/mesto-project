const placeForCards = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template')

// Поля профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

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

function createCard(item) {
    const cardItem = cardTemplate.content.cloneNode(true);
    const cardTitle = cardItem.querySelector('.card__title');
    const cardImage = cardItem.querySelector('.card__image');

    cardTitle.textContent = item.name;
    cardImage.setAttribute('src', item.link);
    cardImage.setAttribute('alt', item.name);

    cardImage.addEventListener('click', (evt) => {
        imageContent(cardImage, cardTitle)
    })

    return cardItem;
}

initialCards.forEach((item) => {
    const card = createCard(item);
    placeForCards.append(card);
});

// @todo: DOM узлы

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

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
    const card = createCard({name: cardNameInput.value, link: cardUrlInput.value,})
    placeForCards.prepend(card);
    closeModal(cardPopup)
}

cardFormElement.addEventListener('submit', handleCardFormSubmit); 

// @todo: Функция лайка и удаления карточки

placeForCards.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active')
    }
    if (evt.target.classList.contains('card__delete-button')) {
        evt.target.closest('.card').remove()
    }
});

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