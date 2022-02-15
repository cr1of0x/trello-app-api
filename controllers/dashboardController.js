const User = require("../models/user.js");
const Dashboard = require("../models/dashboard.js");

const createDashboard = async (title, description, token) => {
  const id = token.id;
  const newDashboard = await Dashboard.create({
    user_id: id,
    title,
    description,
  });
  await User.findByIdAndUpdate(id, {
    $push: { dashboards: newDashboard },
  });
};

const getDashboards = async (token) => {
  const id = token.id;
  const data = await Dashboard.find({ user_id: id });
  return data;
};

module.exports = { createDashboard, getDashboards };
