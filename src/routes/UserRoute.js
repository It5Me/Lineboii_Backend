const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/UserController');
const Authorization = require('../middleware/Authorization');
router.get('/user', Authorization, UserController.user_get);
router.post('/user', Authorization, UserController.user_post);

module.exports = router;
