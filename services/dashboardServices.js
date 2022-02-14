const pushDashboard = (email, title, description) => {
  User.find({ email })
    .exec()
    .then((e) => {
      console.log(e);
      e[0].dashboards.push({ title, description });
      e[0].save();
    });
};

module.exports = { pushDashboard };
