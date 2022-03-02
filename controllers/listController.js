const {
  createNewList,
  addListInDashboard,
  findLists,
  deleteOneList,
  deleteListRef,
} = require("../services/listServices");

const createList = async (dashboard_id, title) => {
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

module.exports = { createList, getLists, deleteList };
