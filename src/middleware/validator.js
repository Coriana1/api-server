const validator = (req, res, next) => {
  //validation on req.body/other request parameters
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is missing or empty' });
  }

  // next middleware
  next();
};

module.exports = validator;
