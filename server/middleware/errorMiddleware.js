// centralized error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({ message: err.message || 'Server Error' });
};

module.exports = { errorHandler };
