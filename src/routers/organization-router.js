const express = require("express");
const organizationController = require("../controllers/organization-controller");
const { authenticateRole } = require("../middlewares/auth-role");

const organizationRouter = express.Router({ mergeParams: true });

organizationRouter.use(authenticateRole(["SuperAdmin"]));

organizationRouter
  .route("/")
  .get(organizationController.getAllOrganization)
  .post(organizationController.createOrganization);

organizationRouter
  .route("/:id")
  .get(organizationController.getOrganizationById)
  .put(organizationController.updateOrganization)
  .delete(organizationController.deleteOrganization);

module.exports = organizationRouter;
