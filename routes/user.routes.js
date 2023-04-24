const express = require("express");
const router = express.Router();
const Authenticate = require("../middlewares/auth.middleware").Authenticate;
const userController = require("../controllers/user.controller");

router.get("/user/user", Authenticate, userController.getUserHandler);

router.post("/user/register", userController.registerHandler);
router.post("/user/signin", userController.signinHandler);
router.post("/user/oauth/signin", userController.oAuthHandler);
router.put("/user/updateUser", Authenticate, userController.updateUser);
router.put("/user/updateViews", Authenticate, userController.viewsHandler);

module.exports = router;
