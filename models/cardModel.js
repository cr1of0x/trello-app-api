const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  list_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Card", cardSchema);
