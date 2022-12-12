const router = require('express').Router();
const {
    createUser,
    login,
    addProject
  } = require('../../controllers/userControler');

  const { authMiddleware } = require('../../utils/auth');

  router.route('/').post(createUser).put(authMiddleware);

  router.route('/login').post(login);
  
  router.route('/addProject').put(addProject, authMiddleware);


module.exports = router;