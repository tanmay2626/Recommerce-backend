const jwt = require("jsonwebtoken");
const config = require("../config/config");

// authentication middleware
exports.Authenticate = async (req, res, next) => {
  try {
    // get token from header
    const tokenString = req.headers.authorization;
    // split token from bearer
    const token = tokenString?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "You are not authenticated" });
    } else {
      const decodedUserData = jwt.verify(token, config.jwt.jwtsecret);
      req.userId = decodedUserData?.userId;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
