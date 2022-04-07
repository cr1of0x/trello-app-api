const req = require("express/lib/request");
const ApiError = require("../validators/apiError");
const jwt = require("jsonwebtoken");

const verifyAcessToken = (req, res, next) => {
  if (!req.get("authorization")) throw new ApiError("Unathorized", "auth");
  const authHeader = req.get("authorization");
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  jwt.verify(token, "login", (err, payload) => {
    if (err) {
      throw new ApiError("Unathorized", "auth");
    }
    req.payload = payload;
    next();
  });
};

module.exports = verifyAcessToken;
