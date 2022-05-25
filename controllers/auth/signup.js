const { createError } = require("../../helpers/createError");
const sendMail = require("../../helpers/sendMail");
const { regSchema } = require("../../models/schema");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const signupUser = async (req, res, next) => {
  try {
    const { error } = regSchema.register.validate(req.body);
    if (error) {
      throw createError(400);
    }
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, result.message);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Confirm",
      html: `<a href="http://localhost:3000/api/users/verify/:${verificationToken}">Enter to confirm</a>`,
    };
    await sendMail(mail);
    res.status(201).json({ user: { email, avatarURL } });
  } catch (error) {
    next(error);
  }
};

module.exports = signupUser;
