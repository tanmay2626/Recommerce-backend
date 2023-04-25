const express = require("express");
const router = express.Router();
const Authenticate = require("../middlewares/auth.middleware").Authenticate;
const transactionsController = require("../controllers/transaction.controller");

router.get(
  "/payment/secret",
  Authenticate,
  transactionsController.PaymentSecretHandler
);
router.post(
  "/payment/create",
  Authenticate,
  transactionsController.TransactionHandler
);

module.exports = router;
