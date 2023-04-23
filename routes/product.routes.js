const express = require("express");
const router = express.Router();
const Authenticate = require("../middlewares/auth.middleware").Authenticate;
const productController = require("../controllers/product.controller");

router.post("/addToScrapyar", Authenticate, productController.AddToScrapyar);
router.post(
  "/addToCreativeScrapyar",
  Authenticate,
  productController.AddToCreativeScrapyar
);

router.get("/getScrapyar", productController.GetFromScrapyar);
router.get("/getCreativeScrapyar", productController.GetFromCreativeScrapyar);
router.get("/getScrapyar/:id", productController.GetScrapyarProduct);
router.get(
  "/getCreativeScrapyar/:id",
  productController.GetCreativeScrapyarProduct
);

module.exports = router;
