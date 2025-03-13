import {
  enableValidation,
  validationConfig,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import "./index.css";

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
//Profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

//Edit profile modal elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const inputName = document.querySelector("#name-input");
const inputDescription = document.querySelector("#description-input");
const saveProfileModal = document.querySelector(".modal__submit-button");
const editProfileForm = document.forms["edit-profile-form"];
const editProfileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);

//Add card modal elements
const addCardModal = document.querySelector("#add-card-modal");
const inputImageLink = addCardModal.querySelector("#add-card-link-input");
const inputCaption = addCardModal.querySelector("#add-card-name-input");
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.forms["add-card-form"];
const addCardSubmitButton = addCardModal.querySelector(".modal__submit-button");

//Card elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards");

//Preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

//Close button (unviersal)
const closeButtons = document.querySelectorAll(".modal__close-button");

//Modals (universal)
const modals = document.querySelectorAll(".modal");

//Functions:

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeModalEsc);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  disableButton(editProfileSubmitButton, validationConfig);
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: inputCaption.value, link: inputImageLink.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  addCardForm.reset();
  disableButton(addCardSubmitButton, validationConfig);
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

function closeModalEsc(evt) {
  modals.forEach((modal) => {
    if (modal.classList.contains("modal_opened") && evt.key === "Escape") {
      closeModal(modal);
    }
  });
}

//Event Listeners:

profileEditButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  resetValidation(
    editProfileForm,
    [inputName, inputDescription],
    validationConfig
  );
  openModal(editProfileModal);
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

modals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (
      modal.classList.contains("modal_opened") &&
      evt.target.classList.contains("modal")
    ) {
      closeModal(modal);
    }
  });
});

enableValidation(validationConfig);
