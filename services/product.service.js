const { Scrapyar, CreativeScrapyar } = require("../models/product.model");
const User = require("../models/user.model");

exports.getScrapyar = async () => {
  try {
    const products = await Scrapyar.find().limit(10);
    return {
      status: 200,
      data: products,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
};

exports.getCreativeScrapyar = async () => {
  try {
    const products = await CreativeScrapyar.find().limit(10);
    return {
      status: 200,
      data: products,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
};

exports.scrapyarProduct = async (id) => {
  try {
    const product = await Scrapyar.findOne({ _id: id });
    return {
      status: 200,
      data: product,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
};

exports.creativeScrapyarProduct = async (id) => {
  try {
    const product = await CreativeScrapyar.findOne({ _id: id });
    return {
      status: 200,
      data: product,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
};

exports.createScrapyar = async (userId, productDetails) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }

  const addProduct = {
    title: productDetails.title,
    tagline: productDetails.tagline,
    description: productDetails.description,
    category: productDetails.category,
    usage: productDetails.usage,
    brand: productDetails.brand,
    price: productDetails.price,
    image: productDetails.img,
    contact: user,
  };

  try {
    const newProduct = await Scrapyar.create(addProduct);
    const savedProduct = await newProduct.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { listedByMe: savedProduct } },
      { new: true }
    );

    await updatedUser.save();

    return {
      status: 200,
      data: savedProduct,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
};

exports.createCreativeScrapyar = async (userId, productDetails) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }

  const addProduct = {
    title: productDetails.title,
    tagline: productDetails.tagline,
    description: productDetails.description,
    category: productDetails.category,
    usage: productDetails.usage,
    brand: productDetails.brand,
    price: productDetails.price,
    image: productDetails.img,
    contact: userId,
  };

  try {
    const newProduct = await CreativeScrapyar.create(addProduct);
    const savedProduct = await newProduct.save();

    return {
      status: 200,
      data: savedProduct,
    };
  } catch (error) {
    return {
      status: 500,
      error: error,
    };
  }
};
