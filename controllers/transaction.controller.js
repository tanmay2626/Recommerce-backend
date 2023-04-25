const transactionServices = require("../services/transaction.service");
exports.PaymentSecretHandler = async (req, res) => {
  try {
    const result = await transactionServices.generateSecret(req.query.amount);
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.TransactionHandler = async (req, res) => {
  try {
    const result = await transactionServices.createTransaction(
      req.userId,
      req.body
    );
    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
