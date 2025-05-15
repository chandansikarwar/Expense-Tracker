require("dotenv").config(); // No need to assign dotenv to a variable
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (e) {
    console.error(`DB connection error: ${e.message}`, e); // Log detailed error
    process.exit(1); // Exit the process with a failure
  }
};

module.exports = connectDB;