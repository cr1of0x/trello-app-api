const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  dashboard_id: { type: String, required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model("List", listSchema);
