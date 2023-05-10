const express = require("express")
const router = express.Router()
const { validateBody, authenticate } = require("../../middlewares")
const { schemas } = require("../../models/user")
const ctrl = require("../../controllers/auth/index")
// const getCurrent = require("../../controllers/auth/getCurrent")
// console.log(getCurrent)

// singup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

// router.patch(
//   "/",
//   authenticate,
//   validateBody(schemas),
//   ctrl.updateSubscription
// );

module.exports = router;
