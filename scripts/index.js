const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
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
  {
    name: "Roebling bridge",
    link: "https://images.unsplash.com/photo-1600186203774-769f73209d00?q=80&w=2613&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hong Kong skyline",
    link: "https://plus.unsplash.com/premium_photo-1661887277173-f996f36b8fb2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
// const closeProfileModal = editProfileModal.querySelector(
//   ".modal__close-button"
// );
const inputName = document.querySelector("#name-input");
const inputDescription = document.querySelector("#description-input");
const saveProfileModal = document.querySelector(".modal__submit-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const addCardModal = document.querySelector("#add-card-modal");
const inputImageLink = addCardModal.querySelector("#add-card-link-input");
const inputCaption = addCardModal.querySelector("#add-card-name-input");
const addCardButton = document.querySelector(".profile__add-button");
// const closeAddCardModal = addCardModal.querySelector(".modal__close-button");
const addCardForm = addCardModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards");

const previewModal = document.querySelector("#preview-modal");
// const previewModalCloseButton = previewModal.querySelector(
//   ".modal__close-button"
// );
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

const closeButtons = document.querySelectorAll(".modal__close-button");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: inputCaption.value, link: inputImageLink.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  addCardForm.reset();
  closeModal(addCardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;

    openModal(previewModal);
  });

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(modal);
  });
});

// closeAddCardModal.addEventListener("click", () => {
//   closeModal(addCardModal);
// });

// closeProfileModal.addEventListener("click", () => {
//   closeModal(editProfileModal);
// });

// previewModalCloseButton.addEventListener("click", () => {
//   closeModal(previewModal);
// });
