const users = require('./user.route');
const locations = require('./location.route');

module.exports = (router) => {
  users(router);
  locations(router);
  return router;
};
