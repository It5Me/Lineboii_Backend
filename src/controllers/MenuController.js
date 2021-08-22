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
module.exports.menu_edit = async (req, res) => {
    try {
        const getMenu = await Menu.findOne({ _id: req.params.id });
        console.log(getMenu);
        if (getMenu) {
            await Menu.findByIdAndUpdate(getMenu._id, req.body);
            return res.status(200).json({
                status: true,
                message: 'Updata Menu Complete',
            });
        } else {
            res.status(400).send('Invalid menu');
        }
    } catch (error) {
        console.log(error.message);
    }
};
