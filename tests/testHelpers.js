const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../src/models/User');

const clearDB = async () => {
  await mongoose.connection.dropDatabase();
};

module.exports = {
  cleanDatabase: () => (clearDB()),
  withLogin: async (req, user = { email: 'user@email.com', password: '123' }) => {
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '1d',
      issuer: 'https://andela.com/',
    };
    const newUser = await User.findOrCreate({ email: user.email, password: user.password });
    const authToken = jwt.sign({ user: newUser.email }, secret, options);
    return req.set('Authorization', `Bearer ${authToken}`);
  },
};
