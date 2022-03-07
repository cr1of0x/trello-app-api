const Dashboard = require("../models/dashboardModel.js");
const List = require("../models/listModel.js");

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

module.exports = {
  createNewList,
  addListInDashboard,
  findLists,
  deleteOneList,
  deleteListRef,
  editOneList,
};
