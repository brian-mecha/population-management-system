require('dotenv').config();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Location = require('../models/Location');

const dbUri = process.env.MONGO_LOCAL_URL;

module.exports = {
  add: (req, res) => {
    mongoose.connect(dbUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 201;

      if (!err) {
        const payload = req.decoded;

        if (payload) {
          const { name, population: { male, female } } = req.body;
          const total = parseInt(male || 0, 10) + parseInt(female || 0, 10);
          const loc = {
            name,
            population: {
              male,
              female,
              total,
            },
          };
          const newLocation = new Location(loc);

          newLocation.save((error, location) => {
            if (!error) {
              result.status = status;
              result.data = location;
            } else {
              status = 500;
              result.status = status;
              result.error = error;
            }
            res.status(status).send(result);
          });
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication failed. Try again.';
          res.status(status).send(result);
        }
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },

  getAll: (req, res) => {
    mongoose.connect(dbUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 200;

      if (!err) {
        const payload = req.decoded;

        if (payload) {
          Location.find({}, (error, locations) => {
            if (!error) {
              result.status = status;
              result.data = locations;
            } else {
              status = 500;
              result.status = status;
              result.error = error;
            }
            res.status(status).send(result);
          });
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication failed. Try again.';
          res.status(status).send(result);
        }
      } else {
        status = 500;
        result.status = status;
        result.error = err;
      }
    });
  },

  delete: (req, res) => {
    mongoose.connect(dbUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 200;

      if (!err) {
        const payload = req.decoded;
        const locationId = mongodb.ObjectID(req.params.id);

        if (payload) {
          Location.findOneAndDelete({ _id: locationId }, (error, location) => {
            if (!error) {
              result.status = status;
              result.data = location;
            } else {
              status = 500;
              result.status = status;
              result.error = error;
            }
            res.status(status).send(result);
          });
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication failed. Please try again.';
          res.status(status).send(result);
        }
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },

  update: (req, res) => {
    mongoose.connect(dbUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 200;

      if (!err) {
        const payload = req.decoded;
        const locationId = mongodb.ObjectID(req.params.id);
        const { name, population: { male, female } } = req.body;

        if (payload) {
          Location.updateOne({ _id: locationId },
            {
              $set:
              {
                name,
                population: {
                  male,
                  female,
                },
              },
            },
            { runValidators: true },
            (error, location) => {
              if (!error) {
                result.status = status;
                result.data = location;
              } else {
                status = 500;
                result.status = status;
                result.error = error;
              }
              res.status(status).send(result);
            });
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication failed. Please try again.';
          res.status(status).send(result);
        }
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
};
