require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  getUserIdToken: (token) => {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    const result = data.id;
    return result;
  },

};

module.exports = jwtService;