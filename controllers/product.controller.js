const productServices = require("../services/product.service");

exports.GetFromScrapyar = async (req, res) => {
  try {
    const result = await productServices.getScrapyar();
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.GetFromCreativeScrapyar = async (req, res) => {
  try {
    const result = await productServices.getCreativeScrapyar();
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.GetScrapyarProduct = async (req, res) => {
  try {
    const result = await productServices.scrapyarProduct(req.params.id);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.GetCreativeScrapyarProduct = async (req, res) => {
  try {
    const result = await productServices.creativeScrapyarProduct(req.params.id);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.AddToScrapyar = async (req, res) => {
  try {
    const result = await productServices.createScrapyar(req.userId, req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.AddToCreativeScrapyar = async (req, res) => {
  try {
    const result = await productServices.createCreativeScrapyar(
      req.userId,
      req.body
    );
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
