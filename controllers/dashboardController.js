const User = require("../models/user.js");
const Dashboard = require("../models/dashboard.js");
const { jwtEncrypt } = require("../services/userServices.js");

const createDashboard = async (title, description, token, res) => {
  // const header = res.header("Authorization", "text/html");
  // console.log(header);
  const { id } = jwtEncrypt(token, "login");
  const newDashboard = await Dashboard.create({
    parent_id: id,
    title,
    description,
  });
  console.log(newDashboard);
  await User.findByIdAndUpdate(id, {
    $push: { dashboards: newDashboard },
  });
};

module.exports = createDashboard;
