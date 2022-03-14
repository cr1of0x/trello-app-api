const Card = require("../models/cardModel.js");
const Dashboard = require("../models/dashboardModel.js");
const List = require("../models/listModel.js");
const { createNewCard, addCardInList } = require("./cardServices.js");

const createNewList = (dashboard_id, title) => {
  return List.create({
    dashboard_id,
    title,
  });
};

const addListInDashboard = (dashboard_id, newList) => {
  return Dashboard.findByIdAndUpdate(dashboard_id, {
    $push: { lists: newList },
  });
};

const findLists = (dashboard_id) => {
  return List.find({ dashboard_id });
};

const deleteOneList = (list_id) => {
  return List.deleteOne({ _id: list_id });
};

const deleteListRef = (dashboard_id, list_id) => {
  return Dashboard.findByIdAndUpdate(dashboard_id, {
    $pull: { lists: list_id },
  });
};

const editOneList = (id, title) => {
  return List.findByIdAndUpdate(id, {
    $set: { title },
  });
};

const deleteCardsOfList = (list_id) => {
  return Card.deleteMany({ list_id });
};

const addingCardsInList = (lists) => {
  return Promise.all(
    lists.map(async (list) => {
      const cards = await Card.find({ list_id: list._id });
      list.cards = cards;
      return list;
    })
  );
};

const createCopiedCards = (list_id, cards) => {
  return Promise.all(
    cards.map(async (card) => {
      const newCard = await createNewCard(list_id, card.title);
      await addCardInList(list_id, newCard);
    })
  );
};

module.exports = {
  createNewList,
  addListInDashboard,
  findLists,
  deleteOneList,
  deleteListRef,
  editOneList,
  deleteCardsOfList,
  addingCardsInList,
  createCopiedCards,
};
