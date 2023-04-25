const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const User = require("../models/user.model");

exports.updateViews = async (userId, productId) => {
  try {
    const profile = await User.findOne({ _id: userId });
    if (!profile.views.includes(productId)) {
      const updatedProfile = await User.findOneAndUpdate(
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
        data: updatedProfile,
      };
    } else {
      return {
        status: 200,
        data: { message: "Already added." },
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};

exports.getProfile = async (userId) => {
  try {
    const profile = await User.findOne({ _id: userId }).populate("orders");

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

exports.registerOAuth = async (email) => {
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

exports.signinUser = async (email, password) => {
  if (!email || !password) {
    return {
      status: 400,
      data: { message: "Invalid email or password" },
    };
  }

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return {
        status: 400,
        data: { message: "Email is not registered" },
      };
    } else {
      const match = await bcrypt.compare(password, existingUser.password);
      if (match) {
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
        return {
          status: 400,
          data: { message: "Invalid email or password" },
        };
      }
    }
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};

exports.registerUser = async (email, password) => {
  if (!email || !password) {
    return {
      status: 400,
      data: { message: "Invalid email or password" },
    };
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return {
        status: 400,
        data: { message: "Email already exists" },
      };
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email: email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();
      return {
        status: 200,
        data: { user: savedUser },
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
        data: { message: "Username already exist" },
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
      data: { message: error },
    };
  }
};
