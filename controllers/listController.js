const Card = require("../models/cardModel");
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
  const lists = await findLists(dashboard_id);
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

module.exports = { createList, getLists, deleteList, editList, copyList };
