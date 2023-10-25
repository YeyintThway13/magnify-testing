const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userModel = new schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "SuperAdmin"],
      required: true,
      default: "User",
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);

module.exports = User;
