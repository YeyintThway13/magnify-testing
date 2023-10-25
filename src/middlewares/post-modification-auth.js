const Post = require("../database/models/post-model");
const User = require("../database/models/user-model");
const { AppError } = require("../utils/errors");

exports.authorizePostModification = async (req, res, next) => {
  if (req.user.role === "SuperAdmin") {
    next();
  } else if (req.user.role === "Admin") {
    const postId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user.organizationId.equals(post.organizationId)) {
      return next(new AppError("Permission denied", 403));
    } else {
      next();
    }
  } else {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post || post.createdBy != userId) {
      return next(new AppError("Permission denied", 403));
    } else {
      next();
    }

    // , (err, post) => {
    //   if (err || !post || post.createdBy != userId) {
    //     return next(new AppError("Permission denied", 403));
    //   } else {
    //     next();
    //   }
    // });
  }
};
