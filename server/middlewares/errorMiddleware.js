
//This middleware is used to handle errors all over the application
function errorHandler(err, req, res, next) {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}

module.exports = errorHandler;
