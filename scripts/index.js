const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileModal = editProfileModal.querySelector(
  ".modal__close-button"
);
const inputName = document.querySelector("#name");
const inputDescription = document.querySelector("#description");
const saveProfileModal = document.querySelector(".modal__submit-button");
const modalForm = document.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards");

function openModal() {
  editProfileModal.classList.add("modal_opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closeModal() {
  editProfileModal.classList.remove("modal_opened");
}

function handleSaveModal(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  return cardElement;
}

profileEditButton.addEventListener("click", openModal);
closeProfileModal.addEventListener("click", closeModal);
modalForm.addEventListener("submit", handleSaveModal);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
