const Card = require("../models/cardModel");
const { findOneDashboard } = require("../services/dashboardServices");
const {
  createNewList,
  addListInDashboard,
  findLists,
  deleteOneList,
  deleteListRef,
  editOneList,
  deleteCardsOfList,
  addingCardsInList,
  createCopiedCards,
  getListsFromDashboard,
  moveListsArray,
  replaceListsArrayInDashboard,
} = require("../services/listServices");
const { joiValidation } = require("../services/userServices");
const listSchema = require("../validators/listSchema");

const createList = async (dashboard_id, formData) => {
  const { title } = await joiValidation(formData, listSchema);
  const newList = await createNewList(dashboard_id, title);
  await addListInDashboard(dashboard_id, newList);
};

const getLists = async (req) => {
  const dashboard_id = req.get("dashboard");
  const populateDashboard = await getListsFromDashboard(dashboard_id);
  const lists = populateDashboard.lists;
  const listsWithCards = await addingCardsInList(lists);
  return listsWithCards;
};

const deleteList = async (dashboard_id, list_id) => {
  await deleteOneList(list_id);
  await deleteListRef(dashboard_id, list_id);
  await deleteCardsOfList(list_id);
};

const editList = async (id, title) => {
  await editOneList(id, title);
};

const copyList = async (formData, cards, dashboard_id) => {
  const { title } = await joiValidation(formData, listSchema);
  const newList = await createNewList(dashboard_id, title);
  list_id = newList._id;
  await createCopiedCards(list_id, cards);
};

const moveList = async (draggedList, listToDrop, dashboard_id) => {
  const DASHBOARD = await findOneDashboard(dashboard_id);
  const LISTS = await DASHBOARD.lists;
  moveListsArray(LISTS, draggedList, listToDrop);
  await replaceListsArrayInDashboard(LISTS, dashboard_id);
};

module.exports = {
  createList,
  getLists,
  deleteList,
  editList,
  copyList,
  moveList,
};
