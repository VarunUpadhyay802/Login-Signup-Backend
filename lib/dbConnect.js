const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://varun802vu:TbO292CaM0a1ajwR@cluster0.uljo41k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "mongo-auth",
      }
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("failed to connect to database!");
  }
};

module.exports = dbConnect;
