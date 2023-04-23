const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user.model");

exports.updateViews = async (userId, productId) => {
  try {
    const profile = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { views: productId },
      },
      {
        new: true,
      }
    );
    return {
      status: 200,
      data: profile,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};

exports.getProfile = async (userId) => {
  try {
    const profile = await User.findOne({ _id: userId });

    return {
      status: 200,
      data: profile,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};

exports.registerUser = async (email) => {
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const token = jwt.sign(
        {
          userId: existingUser._id,
        },
        config.jwt.jwtsecret
      );
      return {
        status: 200,
        data: { token: token, user: existingUser },
      };
    } else {
      const newUser = await User.create({
        email,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign(
        {
          userId: savedUser._id,
        },
        config.jwt.jwtsecret
      );
      return {
        status: 200,
        data: { token: token, user: savedUser },
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};

exports.updateUser = async (userId, updates) => {
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }

  // check if username is already taken
  if (updates.username && updates.username != user.username) {
    const existingUser = await User.findOne({ username: updates.username });

    if (existingUser) {
      return {
        status: 404,
        message: "Username already exist",
      };
    }
  }

  const updatedUser = {
    username: updates.username,
    name: updates.name,
    mobile: updates.mobile,
    address: updates.address,
    pincode: updates.pincode,
    city: updates.city,
  };
  try {
    const profile = await User.findOneAndUpdate({ _id: userId }, updatedUser, {
      new: true,
    });
    return {
      status: 200,
      data: profile,
    };
  } catch (error) {
    return {
      status: 500,
      error: error.message,
    };
  }
};
