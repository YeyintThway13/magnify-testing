const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    organizationId: {
      type: mongoose.Schema.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
