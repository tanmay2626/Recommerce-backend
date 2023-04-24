const userService = require("../services/user.service");

exports.viewsHandler = async (req, res) => {
  try {
    const result = await userService.updateViews(req.userId, req.body.id);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.registerHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userService.registerUser(email, password);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.signinHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userService.signinUser(email, password);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.oAuthHandler = async (req, res) => {
  try {
    const result = await userService.registerOAuth(req.body.email);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getUserHandler = async (req, res) => {
  try {
    const user = await userService.getProfile(req.userId);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.userId, req.body);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
