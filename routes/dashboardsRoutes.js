const express = require("express");
const {
  createDashboard,
  getDashboards,
  deleteDashboard,
  editDashboard,
  addDashboardToFavorite,
} = require("../controllers/dashboardController.js");
const { controllerHandler } = require("../utils/controllerUtils.js");
const router = express.Router();
const verifyAcessToken = require("../utils/verifyAcessToken.js");

const c = controllerHandler;

router.post(
  "/create-dashboard",
  verifyAcessToken,
  c(createDashboard, (req) => [req.body, req.payload])
);

router.get(
  "/get-dashboards",
  verifyAcessToken,
  c(getDashboards, (req) => [req.payload])
);

router.post(
  "/delete-dashboard",
  verifyAcessToken,
  c(deleteDashboard, (req) => [req.body.id, req.payload])
);

router.post(
  "/edit-dashboard",
  verifyAcessToken,
  c(editDashboard, (req) => [req.body.id, req.body.title])
);

router.post(
  "/add-to-favorite-dashboard",
  verifyAcessToken,
  c(addDashboardToFavorite, (req) => [req.body.id, req.body.boolean])
);

module.exports = router;
