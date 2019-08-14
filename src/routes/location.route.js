const controller = require('../controllers/locationController');
const { validateToken } = require('../helpers/validateToken');

module.exports = (router) => {
  router.route('/locations')
    .post(validateToken, controller.add)
    .get(validateToken, controller.getAll);

  router.route('/locations/:id')
    .delete(validateToken, controller.delete)
    .put(validateToken, controller.update);
};
