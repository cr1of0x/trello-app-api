const dashboardSchema = require("../validators/dashboardSchema.js");
const { joiValidation, isUserExists } = require("../services/userServices.js");
const {
  createNewDashboard,
  addDashboardInUser,
  findDashboards,
} = require("../services/dashboardServices.js");
const User = require("../models/user.js");

const createDashboard = async (body, token) => {
  const user_id = token.id;
  const { title, description } = await joiValidation(body, dashboardSchema);
  const newDashboard = await createNewDashboard(user_id, title, description);
  await addDashboardInUser(user_id, newDashboard);
};

const getDashboards = async (token) => {
  const user_id = token.id;
  const data = await findDashboards(user_id);
  return data;
};

const deleteDashboard = async (id, token) => {
  const user_id = token.id;
  console.log(id, user_id);
};

module.exports = { createDashboard, getDashboards, deleteDashboard };
