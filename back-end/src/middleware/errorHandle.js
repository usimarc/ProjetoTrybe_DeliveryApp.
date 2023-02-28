const mapError = require('./mapError');

function errorHandler(err, _req, res, _next) {
  const { name, message } = err;
  res.status(mapError[name] || 500).json({ message });
}

module.exports = errorHandler;