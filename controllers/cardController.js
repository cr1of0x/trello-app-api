const {
  createNewCard,
  addCardInList,
  editOneCard,
  deleteAllCardsRef,
  moveAllCards,
} = require("../services/cardServices");
const { deleteCardsOfList } = require("../services/listServices");
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

const deleteAllCardsFromList = async (list_id) => {
  await deleteCardsOfList(list_id);
  await deleteAllCardsRef(list_id);
};

const moveAllCardsInAnotherList = async (list_from_id, list_to_id, cards) => {
  await deleteAllCardsRef(list_from_id);
  await moveAllCards(cards, list_to_id);
};

module.exports = {
  createCard,
  editCard,
  deleteAllCardsFromList,
  moveAllCardsInAnotherList,
};
