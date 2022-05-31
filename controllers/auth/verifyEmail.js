const { createError } = require("../../helpers/createError");
const User = require("../../models/user");
const sendMail = require("../../helpers/sendMail");
const { verifySchema } = require("../../models/schema");

const verifyEmail = async (req, res, next) => {
  try {
    const { error } = verifySchema.validate(req.body);
    if (error) {
      throw createError(400, "Email or password invalid");
    }
    const { verificationToken } = req.params;
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, `User with Email=${email} is not found`);
    }
    if (user.verify) {
      throw createError(400, "verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Confirm",
      html: `<a href="http://localhost:3000/api/users/verify/:${verificationToken}">Enter to confirm</a>`,
    };
    await sendMail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
