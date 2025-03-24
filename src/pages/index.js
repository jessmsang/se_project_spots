import { data } from "browserslist";
import {
  enableValidation,
  validationConfig,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

// const initialCards = [
//   {
//     name: "Golden Gate bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Roebling bridge",
//     link: "https://images.unsplash.com/photo-1600186203774-769f73209d00?q=80&w=2613&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     name: "Hong Kong skyline",
//     link: "https://plus.unsplash.com/premium_photo-1661887277173-f996f36b8fb2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "83f8346c-1fe1-46f3-bd76-219df8d8d06b",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatarImage.src = userInfo.avatar;

    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(err);
  });

//Card elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards");
let selectedCard;
let selectedCardId;

//Profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);
const profileAvatarImage = profileAvatarContainer.querySelector(
  ".profile__avatar-image"
);
const profileAvatarButton = profileAvatarContainer.querySelector(
  ".profile__avatar-button"
);

//Edit profile modal elements
const editProfileModal = document.querySelector("#edit-profile-modal");
const inputName = document.querySelector("#name-input");
const inputDescription = document.querySelector("#description-input");
//const saveProfileModal = document.querySelector(".modal__submit-button");
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

//Preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

//Delete modal elements
const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteModalForm = deleteCardModal.querySelector(".modal__form");
const deleteModalCancelButton = deleteCardModal.querySelector(
  ".modal__cancel-button"
);

//Avatar modal elements
const avatarModal = document.querySelector("#avatar-modal");
const inputAvatarLink = avatarModal.querySelector("#avatar-link-input");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarModalSubmitButton = avatarModal.querySelector(
  ".modal__submit-button"
);

//Close button (unviersal)
const closeButtons = document.querySelectorAll(".modal__close-button");

//Modal elements (universal)
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
  const submitButton = evt.submitter;
  setButtonText(submitButton, true);
  api
    .editUserInfo({ name: inputName.value, about: inputDescription.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      disableButton(editProfileSubmitButton, validationConfig);
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true);
  api
    .addNewCard({ name: inputCaption.value, link: inputImageLink.value })
    .then((cardData) => {
      const inputValues = {
        name: inputCaption.value,
        link: inputImageLink.value,
      };
      const cardElement = getCardElement(cardData);
      cardsList.prepend(cardElement);
      addCardForm.reset();
      disableButton(addCardSubmitButton, validationConfig);
      closeModal(addCardModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true);
  api
    .editAvatarImage({ avatar: inputAvatarLink.value })
    .then((data) => {
      profileAvatarImage.src = data.avatar;
      console.log(data.avatar);
      avatarForm.reset();
      disableButton(avatarModalSubmitButton, validationConfig);
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

function handleLike(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api
    .toggleLike(cardId, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-button_liked");
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteCardModal);
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false, "Delete", "Deleting...");
    });
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const isLiked = data.isLiked;
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  cardLikeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
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
profileAvatarButton.addEventListener("click", () => {
  openModal(avatarModal);
});

deleteModalForm.addEventListener("submit", handleDeleteCardSubmit);

deleteModalCancelButton.addEventListener("click", () => {
  closeModal(deleteCardModal);
});

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

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

avatarForm.addEventListener("submit", handleEditAvatarSubmit);

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
