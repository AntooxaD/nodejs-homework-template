const Jimp = require("jimp");

const resizeAvatar = (avatar) => {
  Jimp.read(avatar)
    .then((image) => {
      return image
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(avatar); // save
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = resizeAvatar;
