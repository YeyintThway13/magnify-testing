const { AppError } = require("./errors");

const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(new AppError(err, 500));
    }
  };
};

module.exports = asyncHandler;
