const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
