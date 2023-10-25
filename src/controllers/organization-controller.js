const Organization = require("../database/models/organization-model");
const {
  createOne,
  deleteOne,
  getAll,
  getOneById,
  updateOne,
} = require("./base-controller");

exports.getAllOrganization = getAll(Organization, ["name"]);
exports.getOrganizationById = getOneById(Organization);
exports.createOrganization = createOne(Organization);
exports.updateOrganization = updateOne(Organization);
exports.deleteOrganization = deleteOne(Organization);
