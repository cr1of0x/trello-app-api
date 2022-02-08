const Joi = require('joi')

const signupSchema = Joi.object({
    login: Joi.string().min(3).max(12).required().error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case "string.empty":
              err.message = "Login should not be empty!";
              break;
            case "string.min":
              err.message = `Login should have at least ${err.local.limit} characters!`;
              break;
            case "string.max":
              err.message = `Login should have at most ${err.local.limit} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
              case "string.empty":
                err.message = "Email should not be empty!";
                break;
              case "string.email":
                err.message = `You should have valid email adress`;
                break;
              default:
                break;
            }
          });
          return errors;
    }),

    password: Joi.string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
              case "string.empty":
                err.message = "Password should not be empty!";
                break;
              case "string.pattern.base":
                err.message = `Passwords need 1 lower case letter 1 upper case letter and 1 service symbol`;
                break;
              default:
                break;
            }
          });
          return errors;
    }),

    confirmPassword: Joi.ref('password'),

    type: Joi.string().required()
})

module.exports = signupSchema