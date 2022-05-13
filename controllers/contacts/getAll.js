const Contact = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const result = await Contact.find({ owner: _id });
    res.json({ result, message: "List users" });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
