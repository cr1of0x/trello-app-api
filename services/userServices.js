const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../verification/sendEmail");
const signupSchema = require("../validators/signupSchema");

const joiValidation = (body) => {
  try {
    return signupSchema.validateAsync(body, {
      abortEarly: false,
    });
  } catch (error) {
    throw error;
  }
};

const isUserExists = (email) => {
  return User.findOne({ email }).exec();
};

const isPasswordCorrect = (password, passwordToCompare) => {
  return bcrypt.compare(password, passwordToCompare);
};

const createToken = (value, secret) => {
  return jwt.sign(value, secret, { expiresIn: "1h" });
};

const sendVerificationEmail = (token, email) => {
  const url = `http://localhost:5000/users/verification/${token}`;

  return transporter.sendMail({
    to: email,
    subject: "Confirm Email",
    html: `To confirm registration please click <a href="${url}">"here"</a>`,
  });
};

const sendGoogleEmail = (token, email) => {
  const url = `http://localhost:5000/users/gmail/${token}`;

  return transporter.sendMail({
    to: email,
    subject: "Confirm Email",
    html: `To confirm registration please click <a href="${url}">"here"</a>`,
  });
};

const jwtEncrypt = (token, secret) => {
  return jwt.verify(token, secret);
};

const hashingPassword = (password) => {
  return bcrypt.hash(password, 12);
};

const createEmailUser = (login, email, password, type) => {
  return User.create({ login, email, password, type });
};

const createGoogleUser = (login, email, type) => {
  return User.create({ login, email, type });
};

module.exports = {
  isUserExists,
  isPasswordCorrect,
  createToken,
  sendVerificationEmail,
  jwtEncrypt,
  hashingPassword,
  createEmailUser,
  joiValidation,
  createGoogleUser,
  sendGoogleEmail,
};
