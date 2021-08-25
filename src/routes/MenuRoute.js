const { Router } = require('express');
const router = Router();
const MenuController = require('../controllers/MenuController');
router.get('/menu/:id', MenuController.get_menu);
router.post('/menu', MenuController.create_menu);
router.put('/menu/:id', MenuController.edit_menu);
router.delete('/menu/:id', MenuController.delete_menu);
module.exports = router;
