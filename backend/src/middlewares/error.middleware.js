module.exports = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${new Date().toISOString()}] Error (${status}):`, message);
  if (process.env.NODE_ENV === "development") {
    console.error("Stack:", err.stack);
  }

  res.status(status).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
