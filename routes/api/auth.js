const express = require("express");
const controllers = require("../../controllers/auth/");
const { auth } = require("../../middlewares");
const { upload } = require("../../middlewares/postFile");

const router = express.Router();

router.post("/signup", controllers.signupUser);

router.post("/login", controllers.loginUser);

router.get("/logout", auth, controllers.logoutUser);

router.get("/current", auth, controllers.currentUser);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllers.uploadAvatar
);

router.get("/verify/:verificationToken", controllers.verificationToken);

router.post("/verify", controllers.verifyEmail);

router.patch("/", auth, controllers.updateSubUser);

module.exports = router;
