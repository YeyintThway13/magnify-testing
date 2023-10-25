const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const database_uri = process.env.MONGO_URI;

    await mongoose.connect(database_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection successful");
  } catch (error) {
    console.error("Error happening in database connection", error);
  }
};

module.exports = connectDb;
