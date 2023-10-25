const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Organization = require("../database/models/organization-model");

const User = require("../database/models/user-model");
const asyncHandler = require("../utils/async-handler");
const { NotFoundError, AppError } = require("../utils/errors");

exports.registerOrganizationAdmin = asyncHandler(async (req, res) => {
  const { username, email, password, organizationId } = req.body;

  const organization = await Organization.findById(organizationId);

  if (!organization) {
    return next(new NotFoundError());
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: "Admin",
    organizationId,
  });
  await newUser.save();
  res
    .status(201)
    .json({ message: "Admin account created successfully.", data: newUser });
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, organizationId } = req.body;

  const organization = await Organization.findById(organizationId);

  if (!organization) {
    return next(new NotFoundError());
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const reqUser = await User.findById(req.user._id);

  if (
    reqUser.role === "Admin" &&
    reqUser.organizationId != req.body.organizationId
  ) {
    return next(
      new AppError(
        "You are not allowed to create user under another organization",
        400
      )
    );
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: "User",
    organizationId,
  });
  await newUser.save();
  res
    .status(201)
    .json({ message: "User account created successfully.", data: newUser });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    return next(new NotFoundError());
  }

  // Check if password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(new AppError("Invalid Password", 401));
  }

  // Generate an access token with a 10-minute expiration time
  const accessToken = jwt.sign(
    {
      email,
      _id: user._id,
      role: user.role,
      organizationId: user?.organizationId,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "10m",
    }
  );

  // Generate a refresh token with a longer expiration time, e.g., 30 days
  const refreshToken = jwt.sign(
    {
      email,
      _id: user._id,
      role: user.role,
      organizationId: user?.organizationId,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );

  // Set HTTP-only cookies for the tokens
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: 10 * 60 * 10000, // 10 minutes in milliseconds
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  // Return the access token and refresh token to the client
  res.status(200).json({ accessToken, refreshToken, user });
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return next(new AppError("Refrest Token not provided", 401));
  }

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY
  );

  const { email, _id, role, organizationId } = decodedToken;

  const accessToken = jwt.sign(
    { email, _id, role, organizationId },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "10m",
    }
  );

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000, // 10 minutes in milliseconds
  });

  res.status(200).json({ accessToken });
});
