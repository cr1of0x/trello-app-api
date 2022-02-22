const Joi = require("joi");

const dashboardSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(12)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.empty":
            err.message = "Title should not be empty!";
            break;
          case "string.min":
            err.message = `Title should have at least ${err.local.limit} characters!`;
            break;
          case "string.max":
            err.message = `Title should have at most ${err.local.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  description: Joi.string().allow(null, ""),
  formName: Joi.string(),
});

module.exports = dashboardSchema;
