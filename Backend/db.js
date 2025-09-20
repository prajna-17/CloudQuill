const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo successfully");
  } catch (error) {
    console.error("Mongo connection failed:", error);
  }
};

module.exports = connectToMongo;
