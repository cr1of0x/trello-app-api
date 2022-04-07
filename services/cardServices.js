const Card = require("../models/cardModel.js");
const List = require("../models/listModel.js");
const arraymove = require("../utils/arrayMove.js");
const { description } = require("../validators/cardSchema.js");

const createNewCard = (list_id, title, description) => {
  return Card.create({
    list_id,
    title,
    description,
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

const editOneCardDescription = (id, description) => {
  return Card.findByIdAndUpdate(id, {
    $set: { description },
  });
};

const deleteAllCardsRef = (list_id) => {
  return List.findByIdAndUpdate(list_id, {
    $set: { cards: [] },
  });
};

const deleteOneCardRef = (card_id, list_id) => {
  return List.findByIdAndUpdate(list_id, {
    $pull: { cards: card_id },
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

const replaceCardsArrayInList = (cards, list_id) => {
  return List.findByIdAndUpdate(list_id, {
    $set: { cards: cards },
  });
};

const moveCardsArray = (cards, dragged_card_id, top_card_id) => {
  const topCardIndex = cards.indexOf(top_card_id);
  const draggedCardIndex = cards.indexOf(dragged_card_id);
  arraymove(cards, draggedCardIndex, topCardIndex);
};

module.exports = {
  createNewCard,
  addCardInList,
  editOneCard,
  deleteAllCardsRef,
  changeListIdInCard,
  moveAllCards,
  deleteOneCardRef,
  replaceCardsArrayInList,
  moveCardsArray,
  editOneCardDescription,
};
