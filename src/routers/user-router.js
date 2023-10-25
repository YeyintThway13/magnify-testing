const express = require("express");
const userController = require("../controllers/user-controller");
const { authenticateRole } = require("../middlewares/auth-role");

const userRouter = express.Router({ mergeParams: true });

userRouter
  .route("/register/user")
  .post(authenticateRole(["SuperAdmin", "Admin"]), userController.registerUser);
userRouter
  .route("/register/admin")
  .post(
    authenticateRole(["SuperAdmin"]),
    userController.registerOrganizationAdmin
  );
userRouter.route("/login").post(userController.loginUser);
userRouter.route("/refresh-token").post(userController.refreshToken);

module.exports = userRouter;
