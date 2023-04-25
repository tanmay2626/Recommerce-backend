const config = require("../config/config");
const Transaction = require("../models/transactions.model");
const User = require("../models/user.model");
const stripe = require("stripe")(config.app.stripe);

exports.generateSecret = async (amount) => {
  if (!amount) {
    return {
      status: 400,
      data: { message: "Invalid Amount" },
    };
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
    return {
      status: 200,
      data: paymentIntent.client_secret,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};

exports.createTransaction = async (userId, transactionDetails) => {
  if (!transactionDetails) {
    return {
      status: 400,
      data: { message: "Invalid Transaction" },
    };
  }

  const transaction = {
    transactionId: transactionDetails.successfulTransaction.transactionId,
    status: transactionDetails.successfulTransaction.status,
    amount: transactionDetails.successfulTransaction.amount,
    paymentMethod: transactionDetails.successfulTransaction.paymentMethod,
    productId: transactionDetails.successfulTransaction.productId,
    productName: transactionDetails.successfulTransaction.productName,
    user: userId,
  };

  try {
    const newTransaction = await Transaction.create(transaction);
    const savedTransaction = await newTransaction.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { orders: savedTransaction } },
      { new: true }
    );

    await updatedUser.save();
    return {
      status: 200,
      data: savedTransaction,
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: error },
    };
  }
};
