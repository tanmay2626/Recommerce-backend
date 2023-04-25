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
      data: { message: error },
    };
  }
};

exports.getCreativeScrapyar = async () => {
  try {
    const products = await CreativeScrapyar.find();
    return {
      status: 200,
      data: products,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};

exports.scrapyarProduct = async (id) => {
  try {
    const product = await Scrapyar.findOne({ _id: id }).populate("contact");
    const relatedProducts = await Scrapyar.find({
      category: { $eq: product.category },
      _id: { $nin: id },
    });
    return {
      status: 200,
      data: { product: product, related: relatedProducts },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};

exports.creativeScrapyarProduct = async (id) => {
  try {
    const product = await CreativeScrapyar.findOne({ _id: id }).populate(
      "contact"
    );
    const relatedProducts = await CreativeScrapyar.find({
      category: { $eq: "Mobile" },
      _id: { $nin: id },
    });
    return {
      status: 200,
      data: { product: product, related: relatedProducts },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
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
    image: productDetails.image,
    contact: userId,
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
      data: { message: error },
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
    age: productDetails.age,
    artist: productDetails.artist,
    price: productDetails.price,
    image: productDetails.image,
    contact: userId,
  };

  try {
    const newProduct = await CreativeScrapyar.create(addProduct);
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
    console.log(error);
    return {
      status: 500,
      data: { message: error },
    };
  }
};
