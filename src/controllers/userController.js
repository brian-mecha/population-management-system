require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const dbUri = process.env.MONGO_LOCAL_URL;

module.exports = {
  register: (req, res) => {
    mongoose.connect(dbUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 201;

      if (!err) {
        const newUser = new User(req.body);

        newUser.save((error, user) => {
          if (!error) {
            result.status = status;
            result.data = user;
          } else {
            status = 500;
            result.status = status;
            result.error = error;
          }
          res.status(status).send(result);
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    mongoose.connect(dbUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 200;

      if (!err) {
        User.findOne({ email }, (err, user) => {
          if (!err && user) {
            bcrypt.compare(password, user.password).then((match) => {
              if (match) {
                const payload = { user: user.email };
                const options = {
                  expiresIn: '1d',
                  issuer: 'https://andela.com/',
                };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);

                result.token = token;
                result.status = status;
                result.result = user;
              } else {
                status = 401;
                result.status = status;
                result.error = 'Authentication error';
              }
              res.status(status).send(result);
            }).catch((error) => {
              status = 500;
              result.status = status;
              result.error = error;
              res.status(status).send(result);
            });
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
};
