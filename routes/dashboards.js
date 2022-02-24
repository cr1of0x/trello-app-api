const express = require("express");
const {
  createDashboard,
  getDashboards,
  deleteDashboard,
  editDashboard,
  addDashboardToFavorite,
  deleteDashboardFromFavorite,
} = require("../controllers/dashboardController.js");
const router = express.Router();
const verifyAcessToken = require("../utils/verifyAcessToken.js");

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result);
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ error });
    }
  }
};

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
  "/favorite-dashboard",
  verifyAcessToken,
  c(addDashboardToFavorite, (req) => [req.body.id])
);

router.post(
  "/not-favorite-dashboard",
  verifyAcessToken,
  c(deleteDashboardFromFavorite, (req) => [req.body.id])
);

module.exports = router;
