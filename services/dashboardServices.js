const Dashboard = require("../models/dashboard.js");
const User = require("../models/user.js");

const createNewDashboard = (user_id, title, description) => {
  return Dashboard.create({
    user_id,
    title,
    description,
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

module.exports = {
  createNewDashboard,
  addDashboardInUser,
  findDashboards,
  deleteOneDashboard,
  deleteDashboardRef,
  editOneDashboard,
};
