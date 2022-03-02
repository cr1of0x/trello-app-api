const express = require("express");
const {
  createList,
  getLists,
  deleteList,
} = require("../controllers/listController.js");
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
  "/create-list",
  verifyAcessToken,
  c(createList, (req) => [req.body.id, req.body.title])
);

router.get(
  "/get-lists",
  verifyAcessToken,
  c(getLists, (req) => [req])
);

router.post(
  "/delete-list",
  verifyAcessToken,
  c(deleteList, (req) => [req.body.dashboard_id, req.body.list_id])
);

module.exports = router;
