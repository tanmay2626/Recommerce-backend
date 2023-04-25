const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(express.json()); // middleware to parse incoming json data
app.use(cors()); // middleware to  handle incoming request from client
app.use(bodyparser.urlencoded({ extended: true })); // middleware to parse incoming data from req.body
// urlencoded - parse incoming req in url-encoded payloads ( data encoded then sent as part of url )
// extened - allowing nestes objects

// routes
app.use("/api", require("./routes/user.routes"));
app.use("/api", require("./routes/product.routes"));
app.use("/api", require("./routes/transaction.routes"));

// initial request
app.get("/", (req, res) => {
  res.json({
    server: "running",
  });
});

module.exports = app;
