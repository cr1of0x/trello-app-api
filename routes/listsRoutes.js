const express = require("express");
const {
  createList,
  getLists,
  deleteList,
  editList,
} = require("../controllers/listController.js");
const { controllerHandler } = require("../utils/controllerUtils.js");
const router = express.Router();
const verifyAcessToken = require("../utils/verifyAcessToken.js");

const c = controllerHandler;

router.post(
  "/create-list",
  verifyAcessToken,
  c(createList, (req) => [req.body.id, req.body.formData])
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

router.post(
  "/edit-list",
  verifyAcessToken,
  c(editList, (req) => [req.body.id, req.body.title])
);

module.exports = router;
