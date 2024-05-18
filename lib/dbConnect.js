const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/login-signup-basic",
      {
        dbName: "mongo-auth-db",
      }
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("failed to connect to database!");
  }
};

module.exports = dbConnect;
