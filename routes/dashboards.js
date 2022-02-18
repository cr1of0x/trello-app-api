const express = require("express");
const {
  createDashboard,
  getDashboards,
  deleteDashboard,
  editDashboard,
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
  "/createdashboard",
  verifyAcessToken,
  c(createDashboard, (req) => [req.body, req.payload])
);

router.get(
  "/getdashboards",
  verifyAcessToken,
  c(getDashboards, (req) => [req.payload])
);

router.post(
  "/deletedashboard",
  verifyAcessToken,
  c(deleteDashboard, (req) => [req.body.id, req.payload])
);

router.post(
  "/editdashboard",
  verifyAcessToken,
  c(editDashboard, (req) => [req.body.id, req.body.title])
);

module.exports = router;
