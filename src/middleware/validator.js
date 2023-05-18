const validator = (req, res, next) => {
  // Perform validation on req.body or any other request parameters
  // If the validation fails, you can send an appropriate error response
  // For example:
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is missing or empty' });
  }

  // If the validation passes, call the next middleware
  next();
};

module.exports = validator;
