const Post = require("../database/models/post-model");
const {
  createOne,
  deleteOne,
  getAll,
  getOneById,
  updateOne,
} = require("./base-controller");

exports.getAllPost = getAll(Post, ["title"]);
exports.getPostById = getOneById(Post);
exports.createPost = createOne(Post);
exports.updatePost = updateOne(Post);
exports.deletePost = deleteOne(Post);
