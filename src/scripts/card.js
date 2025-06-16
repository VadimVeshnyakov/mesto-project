export function createCard(item, cardTemplate, imageContent) {
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

export function likeAndDelete(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active')
    }
    if (evt.target.classList.contains('card__delete-button')) {
        evt.target.closest('.card').remove()
    }
}