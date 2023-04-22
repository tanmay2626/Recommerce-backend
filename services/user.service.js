const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.registerUser = async (email) => {
  try {
    const token = jwt.sign(
      {
        userId: email,
      },
      config.jwt.jwtsecret
    );
    return {
      status: 200,
      data: token,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error.message },
    };
  }
};
