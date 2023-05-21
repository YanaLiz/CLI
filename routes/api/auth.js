const express = require("express");
const router = express.Router();
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth/index");

// singup
router.get("/verify/:verificationToken",ctrl.verifyUser);
router.post("/verify", validateBody(schemas.loginSchema, ctrl.resendVerify));
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.getAvatar);

module.exports = router;

