const { Router } = require('express');
const router = Router();
const MenuController = require('../controllers/MenuController');
router.get('/menu/:id', MenuController.menu_get);
router.post('/menu', MenuController.menu_create);
router.put('/menu/edit/:id', MenuController.menu_edit);
module.exports = router;
