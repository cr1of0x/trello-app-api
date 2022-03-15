const Card = require("../models/cardModel.js");
const List = require("../models/listModel.js");

const createNewCard = (list_id, title) => {
  return Card.create({
    list_id,
    title,
  });
};

const addCardInList = (list_id, newCard) => {
  return List.findByIdAndUpdate(list_id, {
    $push: { cards: newCard },
  });
};

const editOneCard = (id, title) => {
  return Card.findByIdAndUpdate(id, {
    $set: { title },
  });
};

const deleteAllCardsRef = (list_id) => {
  return List.findByIdAndUpdate(list_id, {
    $set: { cards: [] },
  });
};

const changeListIdInCard = (card_id, list_id) => {
  return Card.findByIdAndUpdate(card_id, { $set: { list_id } });
};

const moveAllCards = (cards, list_to_id) => {
  return Promise.all(
    cards.map(async (card) => {
      await changeListIdInCard(card._id, list_to_id);
      await addCardInList(list_to_id, card);
    })
  );
};

module.exports = {
  createNewCard,
  addCardInList,
  editOneCard,
  deleteAllCardsRef,
  changeListIdInCard,
  moveAllCards,
};
