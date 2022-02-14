const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
  parent_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
