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
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.userId, req.body);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
