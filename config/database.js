const mongoose = require("mongoose");

let database = process.env.MONGODB_URI;

if (!database) {
  throw new Error(
    "One environment variable ( MONGODB_URI) is missing or empty."
  );
}

mongoose
  .connect(database)
  .then(() => {
    // logger.info(`DB Connection Established`);
    console.log("DB Connected");
  })
  .catch((err) => {
    // logger.error(`DB Connection Fail | ${err.stack}`);
    console.log(err);
  });

