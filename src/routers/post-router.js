const express = require("express");
const postController = require("../controllers/post-controller");
const { authenticateRole } = require("../middlewares/auth-role");
const { authorizePostAccess } = require("../middlewares/post-access-auth");
const {
  authorizePostModification,
} = require("../middlewares/post-modification-auth");

const postRouter = express.Router({ mergeParams: true });

postRouter
  .route("/")
  .get(
    authenticateRole(["SuperAdmin", "Admin", "User"]),
    authorizePostAccess,
    postController.getAllPost
  )
  .post(authenticateRole(["Admin", "User"]), postController.createPost);

postRouter
  .route("/:id")
  .get(
    authenticateRole(["SuperAdmin", "Admin", "User"]),
    authorizePostModification,
    postController.getPostById
  )
  .put(
    authenticateRole(["SuperAdmin", "Admin", "User"]),
    authorizePostModification,
    postController.updatePost
  )
  .delete(
    authenticateRole(["SuperAdmin", "Admin", "User"]),
    authorizePostModification,
    postController.deletePost
  );

module.exports = postRouter;
