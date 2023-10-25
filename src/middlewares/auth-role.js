const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/errors");

exports.authenticateRole = (roles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req?.cookies?.access_token;

    if (!authHeader) {
      return next(new AppError("No token provided.", 401));
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

      if (roles.includes(decoded.role)) {
        req.user = decoded;
        next();
      } else {
        return next(new AppError("Permission denied.", 403));
      }
    } catch (err) {
      console.log(err);
      return next(new AppError("Invalid token.", 400));
    }
  };
};
