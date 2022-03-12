const express = require("express");
const {
  createCard,
  editCard,
  deleteAllCardsFromList,
  moveAllCardsInAnotherList,
} = require("../controllers/cardController.js");
const { controllerHandler } = require("../utils/controllerUtils.js");
const router = express.Router();
const verifyAcessToken = require("../utils/verifyAcessToken.js");

const c = controllerHandler;

router.post(
  "/create-card",
  verifyAcessToken,
  c(createCard, (req) => [req.body.id, req.body.formData])
);

router.post(
  "/edit-card",
  verifyAcessToken,
  c(editCard, (req) => [req.body.id, req.body.title])
);

router.post(
  "/delete-all-cards",
  verifyAcessToken,
  c(deleteAllCardsFromList, (req) => [req.body.list_id])
);

router.post(
  "/move-all-cards-in-another-list",
  verifyAcessToken,
  c(moveAllCardsInAnotherList, (req) => [req.body])
);

module.exports = router;
