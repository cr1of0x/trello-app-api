const {
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
} = require("../services/userServices");
const ApiError = require("../validators/apiError.js");
const EMAIL = "email";

const signin = async (email, password) => {
  const existingUser = await isUserExists(email);
  if (!existingUser) throw new ApiError("User doesnt exists!", "email");
  const checkPassword = await isPasswordCorrect(
    password,
    existingUser.password
  );
  if (!checkPassword) throw new ApiError("Invalid password!", "password");
};

const signup = async (body) => {
  const result = await joiValidation(body);
  const existingUser = await isUserExists(result.email);
  if (existingUser)
    throw new ApiError("User with such email already exists!", "email");
  const token = createToken(
    {
      login: result.login,
      email: result.email,
      password: result.password,
      type: result.type,
    },
    "email_secret"
  );
  return sendVerificationEmail(token, result.email);
};

const verification = async (token) => {
  const { login, email, password, type } = jwtEncrypt(token, "email_secret");
  const hashedPassword = await hashingPassword(password);
  const existingUser = await isUserExists(email);
  if (existingUser)
    throw new ApiError("User with such email already exists", "email");
  return createEmailUser(login, email, hashedPassword, type);
};

const gmail = async (login, email, type) => {
  const existingUser = await isUserExists(email);
  if (existingUser)
    throw new ApiError("User with such email already exists!", "email");
  const token = createToken({ login, email, type }, "email_secret");
  return sendGoogleEmail(token, email);
};

const gmailVerification = async (token) => {
  const { login, email, type } = jwtEncrypt(token, "email_secret");
  const existingUser = await isUserExists(email);
  if (existingUser)
    throw new ApiError("User with such email already exists", "email");
  return createGoogleUser(login, email, type);
};

const gmailLogin = async (email) => {
  const existingUser = await isUserExists(email);
  if (!existingUser) throw new ApiError("User doesnt exists!", "email");
  if (existingUser.type === EMAIL)
    throw new ApiError("Please insert a password!", "password");
  const token = createToken({ email, id: existingUser._id }, "secret");
  return token;
};

module.exports = {
  signin,
  signup,
  verification,
  gmail,
  gmailVerification,
  gmailLogin,
};
