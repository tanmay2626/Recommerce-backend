const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  app: {
    port: process.env.PORT || 8080,
    stripe: process.env.STRIPE_KEY,
  },
  database: {
    url: process.env.DB_URL || "mongodb://localhost:27017/scrapyar",
  },
  jwt: {
    jwtsecret: process.env.JWT_SECRET,
  },
};
