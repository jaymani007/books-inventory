const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Here we connect the mongo db with env mongo uri
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
