const Joi = require("joi");
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.string()
    .min(10)
    .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/),
  favorite: Joi.boolean(),
});

const favoritSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const verifySchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

const subSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const regSchema = {
  register: registerSchema,
  login: registerSchema,
};

module.exports = {
  contactSchema,
  favoritSchema,
  regSchema,
  verifySchema,
  subSchema,
};
