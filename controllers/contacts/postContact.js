const Contact = require("../../models/contact");
const { createError } = require("../../helpers/createError");
const { contactSchema } = require("../../models/schema");

const postContact = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { body } = req;
    const result = await Contact.create({ ...body, owner: _id });

    res.json(result).status(201, "contact added");
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
