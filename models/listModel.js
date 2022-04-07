const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  dashboard_id: { type: String, required: true },
  title: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

module.exports = mongoose.model("List", listSchema);
