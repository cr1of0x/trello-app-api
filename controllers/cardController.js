const { createNewCard, addCardInList } = require("../services/cardServices");

const createCard = async (id, formData) => {
  const newCard = await createNewCard(id, formData);
  await addCardInList(id, newCard);
};

const getCards = async () => {
  console.log("cards");
};

module.exports = { createCard, getCards };
