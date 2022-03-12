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

module.exports = {
  createNewCard,
  addCardInList,
  editOneCard,
  deleteAllCardsRef,
};
