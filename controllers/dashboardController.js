const dashboardSchema = require("../validators/dashboardSchema.js");
const { joiValidation } = require("../services/userServices.js");
const {
  createNewDashboard,
  addDashboardInUser,
  findDashboards,
  deleteOneDashboard,
  deleteDashboardRef,
  editOneDashboard,
  editFavoriteDashboard,
  deleteListsOfDashboard,
} = require("../services/dashboardServices.js");

const createDashboard = async (body, token) => {
  const user_id = token.id;
  const { title, isFavorite, description } = await joiValidation(
    body,
    dashboardSchema
  );
  const newDashboard = await createNewDashboard(
    user_id,
    title,
    description,
    isFavorite
  );
  await addDashboardInUser(user_id, newDashboard);
};

const getDashboards = async (token) => {
  const user_id = token.id;
  const data = await findDashboards(user_id);
  return data;
};

const deleteDashboard = async (id, token) => {
  const user_id = token.id;
  await deleteOneDashboard(id);
  await deleteDashboardRef(user_id, id);
  await deleteListsOfDashboard(id);
};

const editDashboard = async (id, title) => {
  await editOneDashboard(id, title);
};

const addDashboardToFavorite = async (id, boolean) => {
  await editFavoriteDashboard(id, boolean);
};

module.exports = {
  createDashboard,
  getDashboards,
  deleteDashboard,
  editDashboard,
  addDashboardToFavorite,
};
