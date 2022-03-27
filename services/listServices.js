const Card = require("../models/cardModel.js");
const Dashboard = require("../models/dashboardModel.js");
const List = require("../models/listModel.js");
const arraymove = require("../utils/arrayMove.js");
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

const findOneList = (list_id) => {
  return List.findById(list_id);
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
      const populateList = await List.findOne({ _id: list._id }).populate(
        "cards"
      );
      return populateList;
    })
  );
};

const getListsFromDashboard = (dashboard_id) => {
  const populateDashboard = Dashboard.findOne({ _id: dashboard_id }).populate(
    "lists"
  );
  return populateDashboard;
};

const createCopiedCards = (list_id, cards) => {
  return Promise.all(
    cards.map(async (card) => {
      const newCard = await createNewCard(list_id, card.title);
      await addCardInList(list_id, newCard);
    })
  );
};

const moveListsArray = (lists, dragged_list_id, top_list_id) => {
  const topListIndex = lists.indexOf(top_list_id);
  const draggedListIndex = lists.indexOf(dragged_list_id);
  arraymove(lists, draggedListIndex, topListIndex);
};

const replaceListsArrayInDashboard = (lists, dashboard_id) => {
  return Dashboard.findByIdAndUpdate(dashboard_id, {
    $set: { lists: lists },
  });
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
  findOneList,
  getListsFromDashboard,
  moveListsArray,
  replaceListsArrayInDashboard,
};
