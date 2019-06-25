require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = (cb = () => {}) => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
      cb();
      console.log("MongoDB Connected!");
    })
    .catch(e => {
      console.log(e.message);
      process.exit(1);
    });
};

module.exports = connectDB;
