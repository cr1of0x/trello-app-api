const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  isFavorite: { type: Boolean },
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
