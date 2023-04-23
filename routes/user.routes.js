const express = require("express");
const router = express.Router();
const Authenticate = require("../middlewares/auth.middleware").Authenticate;
const userController = require("../controllers/user.controller");

router.get("/user", Authenticate, userController.getUserHandler);

router.post("/signin", userController.registerHandler);
router.post("/oauth/signin", userController.registerHandler);
router.post("/updateUser", Authenticate, userController.updateUser);
router.put("/updateViews/:id", Authenticate, userController.viewsHandler);

module.exports = router;
