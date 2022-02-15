const createDashboard = (id, title, description) => {
  return Dashboard.create({
    user_id: id,
    title: title,
    description: description,
  });
};

module.exports = { createDashboard };
