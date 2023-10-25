const organizationRouter = require("./routers/organization-router");
const postRouter = require("./routers/post-router");
const userRouter = require("./routers/user-router");

const routes = (app) => {
  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/organizations", organizationRouter);
  app.use("/api/v1/users", userRouter);
};

module.exports = routes;
