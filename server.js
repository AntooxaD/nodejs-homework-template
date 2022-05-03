const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database succuess connect");
    });
  })
  .catch((error) => {
    process.exit(1);

    // eslint-disable-next-line no-unreachable
    console.log(error.message);
  });
