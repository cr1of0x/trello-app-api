const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const login = require("../controllers/userController.js");
const errorHandler = require("../validators/errorHandler");

const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result);
  } catch (error) {
    // need refactoring
    if (error.isJoi) {
      res.status(400).json({ error });
    } else {
      return errorHandler(error.key, error.message, res);
    }
  }
};

const c = controllerHandler;

router.post(
  "/signin",
  c(login.signin, (req) => [req.body.email, req.body.password])
);
router.post(
  "/signup",
  c(login.signup, (req) => [req.body])
);
router.get(
  "/verification/:token",
  c(login.verification, (req) => [req.params.token])
);
router.post(
  "/gmail",
  c(login.gmail, (req) => [req.body.login, req.body.email, req.body.type])
);
router.get(
  "/gmail/:token",
  c(login.gmailVerification, (req) => [req.params.token])
);
router.post(
  "/gmail-login",
  c(login.gmailLogin, (req) => [req.body.email])
);

module.exports = router;
