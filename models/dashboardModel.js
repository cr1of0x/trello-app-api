const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  isFavorite: { type: Boolean },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
