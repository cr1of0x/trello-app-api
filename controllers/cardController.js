const {
  createNewCard,
  addCardInList,
  editOneCard,
  deleteAllCardsRef,
  moveAllCards,
  deleteOneCardRef,
  changeListIdInCard,
  replaceCardsArrayInList,
  moveCardsArray,
} = require("../services/cardServices");
const { deleteCardsOfList, findOneList } = require("../services/listServices");
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

const moveCardInAnotherList = async (card_id, list_from_id, list_to_id) => {
  await deleteOneCardRef(card_id, list_from_id);
  await changeListIdInCard(card_id, list_to_id);
  await addCardInList(list_to_id, card_id);
};

const moveCardOnCardInSameList = async (
  dragged_card_id,
  top_card_id,
  list_to_id
) => {
  const LIST = await findOneList(list_to_id);
  const CARDS = await LIST.cards;
  moveCardsArray(CARDS, dragged_card_id, top_card_id);
  await replaceCardsArrayInList(CARDS, list_to_id);
};

const moveCardOnCardInAnotherList = async (
  dragged_card_id,
  top_card_id,
  list_from_id,
  list_to_id
) => {
  await moveCardInAnotherList(dragged_card_id, list_from_id, list_to_id);
  await moveCardOnCardInSameList(dragged_card_id, top_card_id, list_to_id);
};

module.exports = {
  createCard,
  editCard,
  deleteAllCardsFromList,
  moveAllCardsInAnotherList,
  moveCardInAnotherList,
  moveCardOnCardInSameList,
  moveCardOnCardInAnotherList,
};
