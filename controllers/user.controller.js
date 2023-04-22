const userService = require("../services/user.service");

exports.registerHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await userService.registerUser(email);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserHandler = async (req, res) => {
  try {
    const user = req.userId;
    res.status(200).json({ user: { email: req.userId } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
