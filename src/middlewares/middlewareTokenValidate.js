const jwt = require('jsonwebtoken');

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const error = new Error('Token not found');
    error.status = 401;
    error.name = 'NotFoundError';
    throw error;
  }
  try {
     jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    const error = new Error('Expired or invalid token');
    error.name = 'UnauthorizedError';
    error.status = 401;
    throw error; 
  }

  next();
};

module.exports = validateToken;
