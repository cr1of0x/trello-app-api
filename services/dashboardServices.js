const Dashboard = require("../models/dashboardModel.js");
const User = require("../models/userModel.js");
const List = require("../models/listModel.js");

const createNewDashboard = (user_id, title, description, isFavorite) => {
  return Dashboard.create({
    user_id,
    title,
    description,
    isFavorite,
  });
};

const addDashboardInUser = (user_id, newDashboard) => {
  return User.findByIdAndUpdate(user_id, {
    $push: { dashboards: newDashboard },
  });
};

const findDashboards = (user_id) => {
  return Dashboard.find({ user_id });
};

const deleteOneDashboard = (id) => {
  return Dashboard.deleteOne({ _id: id });
};

const deleteDashboardRef = (user_id, id) => {
  return User.findByIdAndUpdate(user_id, {
    $pull: { dashboards: id },
  });
};

const editOneDashboard = (id, title) => {
  return Dashboard.findByIdAndUpdate(id, {
    $set: { title },
  });
};

const editFavoriteDashboard = (id, boolean) => {
  return Dashboard.findByIdAndUpdate(id, {
    $set: { isFavorite: boolean },
  });
};

const deleteListsOfDashboard = (dashboard_id) => {
  return List.deleteMany({ dashboard_id });
};

const findOneDashboard = (dashboard_id) => {
  return Dashboard.findById(dashboard_id);
};

module.exports = {
  createNewDashboard,
  addDashboardInUser,
  findDashboards,
  deleteOneDashboard,
  deleteDashboardRef,
  editOneDashboard,
  editFavoriteDashboard,
  deleteListsOfDashboard,
  findOneDashboard,
};
