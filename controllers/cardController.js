const {
  createNewCard,
  addCardInList,
  editOneCard,
} = require("../services/cardServices");
const { joiValidation } = require("../services/userServices");
const cardSchema = require("../validators/cardSchema");

const createCard = async (id, formData) => {
  const { title } = await joiValidation(formData, cardSchema);
  const newCard = await createNewCard(id, title);
  await addCardInList(id, newCard);
};

const editCard = async (id, title) => {
  await editOneCard(id, title);
};

module.exports = { createCard, editCard };
