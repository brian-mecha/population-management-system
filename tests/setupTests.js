const mongoose = require('mongoose');
const testHelpers = require('./testHelpers');

// Load models since we will not be instantiating our express server.
require('../src/models/User');
require('../src/models/Location');

// eslint-disable-next-line no-undef
beforeEach((done) => {
  /*
    Define clearDB function that will loop through all
    the collections in our mongoose connection and drop them.
  */
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }

  /*
    If the mongoose connection is closed,
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://localhost:27017/${process.env.TEST_SUITE}`, { useNewUrlParser: true }, // <------- IMPORTANT
      (err) => {
        if (err) {
          throw err;
        }
        return clearDB();
      },
    );
  } else {
    return clearDB();
  }
});

// eslint-disable-next-line no-undef
// afterEach((done) => {
//   mongoose.disconnect();
//   return done();
// });

// eslint-disable-next-line no-undef
afterAll((done) => {
  testHelpers.cleanDatabase();
  return done();
});
