const User = require("../database/models/user-model");
const { AppError } = require("../utils/errors");

exports.authorizePostAccess = async (req, res, next) => {
  if (req.user.role === "SuperAdmin") {
    req.defaultFilter = {};
    next();
  } else if (req.user.role === "Admin") {
    req.defaultFilter = { organizationId: req.user?.organizationId };
    next();
  } else {
    req.defaultFilter = { createdBy: req.user?._id };
    next();
  }
};
