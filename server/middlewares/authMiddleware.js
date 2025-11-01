const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

//This middleware is used to validate the JWT token on the api request.
const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Invalid or expired token");
  }
});

module.exports = { protect };
