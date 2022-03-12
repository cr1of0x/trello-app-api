const {
  createNewCard,
  addCardInList,
  editOneCard,
  deleteAllCardsRef,
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

const moveAllCardsInAnotherList = async (body) => {
  console.log(body);
};

module.exports = {
  createCard,
  editCard,
  deleteAllCardsFromList,
  moveAllCardsInAnotherList,
};
