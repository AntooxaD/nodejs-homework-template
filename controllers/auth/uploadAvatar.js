require("dotenv").config();
const fs = require("fs/promises");
const path = require("path");
const resizeAvatar = require("../../helpers/resizeAvatar");
const User = require("../../models/user");
const avatarDir = path.join(__dirname, "../../", "public/", "avatars");

const uploadAvatar = async (req, res, next) => {
  const { _id: id } = req.user;

  const { path: tmpUpload, originalname } = req.file;

  const fileName = `${id}.${originalname}`;
  const resultUpload = path.join(avatarDir, fileName);

  try {
    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join("avatars", fileName);

    await User.findByIdAndUpdate(id, { avatarURL });
    resizeAvatar();
    res.status(200).json({
      status: "success",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpUpload);

    next(error);
  }
};

module.exports = uploadAvatar;
