const {
  createNewList,
  addListInDashboard,
  findLists,
  deleteOneList,
  deleteListRef,
  editOneList,
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
  return lists;
};

const deleteList = async (dashboard_id, list_id) => {
  await deleteOneList(list_id);
  await deleteListRef(dashboard_id, list_id);
};

const editList = async (id, title) => {
  await editOneList(id, title);
};

module.exports = { createList, getLists, deleteList, editList };
