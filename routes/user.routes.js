const express = require("express");
const router = express.Router();
const Authenticate = require("../middlewares/auth.middleware").Authenticate;
const userController = require("../controllers/user.controller");

router.post("/signin", userController.registerHandler);
router.get("/user", Authenticate, userController.getUserHandler);

module.exports = router;
