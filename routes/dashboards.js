const express = require("express");
const createDashboard = require("../controllers/dashboardController.js");
const router = express.Router();

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const c = controllerHandler;

router.post(
  "/createdashboard",
  c(createDashboard, (req, res) => [
    req.body.title,
    req.body.description,
    req.body.token,
    res,
  ])
);

module.exports = router;
