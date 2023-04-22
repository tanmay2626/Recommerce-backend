const config = require("./config/config");
const connectDB = require("./config/database");
const app = require("./app");
const port = config.app.port;

connectDB();

app.listen(port, () => {
  console.log(`Server is connected on port ${port}`);
});
