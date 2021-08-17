const mongoose = require('mongoose');
const Menu = mongoose.model('menu');
module.exports.menu_get = async (req, res) => {
    // console.log(req.params.id);
    try {
        const currentMenu = await Menu.findById(req.params.id);
        res.status(200).send(currentMenu);
    } catch (error) {
        console.log(error.message);
    }
};
module.exports.menu_create = async (req, res) => {
    try {
        const newMenu = await Menu.create(req.body);
        res.status(200).send(newMenu);
    } catch (error) {
        console.log(error);
    }
};
