const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/usersRoutes");
const dashboardRoutes = require("./routes/dashboardsRoutes");
const listRoutes = require("./routes/listsRoutes");
const cardRoutes = require("./routes/cardsRoutes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/list", listRoutes);
app.use("/card", cardRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening on port 5000...");
});
