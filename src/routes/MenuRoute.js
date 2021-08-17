const { Router } = require('express');
const router = Router();
const MenuController = require('../controllers/MenuController');
router.get('/menu/:id', MenuController.menu_get);
router.post('/menu', MenuController.menu_create);
module.exports = router;
