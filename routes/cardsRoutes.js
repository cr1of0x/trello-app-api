const express = require("express");
const {
  createCard,
  editCard,
  deleteAllCardsFromList,
  moveAllCardsInAnotherList,
  moveCardInAnotherList,
  moveCardOnCardInSameList,
  moveCardOnCardInAnotherList,
  editCardDescription,
} = require("../controllers/cardController.js");
const { controllerHandler } = require("../utils/controllerUtils.js");
const router = express.Router();
const verifyAcessToken = require("../utils/verifyAcessToken.js");

const c = controllerHandler;

router.post(
  "/create-card",
  verifyAcessToken,
  c(createCard, (req) => [req.body.list_id, req.body.formData])
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
  c(moveAllCardsInAnotherList, (req) => [
    req.body.list_from_id,
    req.body.list_to_id,
    req.body.cards,
  ])
);

router.post(
  "/move-card-in-another-list",
  verifyAcessToken,
  c(moveCardInAnotherList, (req) => [
    req.body.card_id,
    req.body.list_from_id,
    req.body.list_to_id,
  ])
);

router.post(
  "/move-card-on-card-in-same-list",
  verifyAcessToken,
  c(moveCardOnCardInSameList, (req) => [
    req.body.dragged_card_id,
    req.body.top_card_id,
    req.body.list_to_id,
  ])
);

router.post(
  "/move-card-on-card-in-another-list",
  verifyAcessToken,
  c(moveCardOnCardInAnotherList, (req) => [
    req.body.dragged_card_id,
    req.body.top_card_id,
    req.body.list_from_id,
    req.body.list_to_id,
  ])
);

router.post(
  "/edit-card-description",
  verifyAcessToken,
  c(editCardDescription, (req) => [req.body.id, req.body.descript])
);

module.exports = router;
