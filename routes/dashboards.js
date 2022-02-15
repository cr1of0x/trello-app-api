const express = require("express");
const {
  createDashboard,
  getDashboards,
} = require("../controllers/dashboardController.js");
const router = express.Router();
const verifyAcessToken = require("../utils/verifyAcessToken.js");

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
  verifyAcessToken,
  c(createDashboard, (req) => [
    req.body.title,
    req.body.description,
    req.payload,
  ])
);

router.get(
  "/getdashboards",
  verifyAcessToken,
  c(getDashboards, (req) => [req.payload])
);

module.exports = router;
