const mongoose = require('mongoose');
const Menu = mongoose.model('menu');
module.exports.get_menu = async (req, res) => {
    // console.log(req.params.id);
    try {
        const currentMenu = await Menu.findById(req.params.id);
        res.status(200).send(currentMenu);
    } catch (error) {
        console.log(error.message);
    }
};
module.exports.create_menu = async (req, res) => {
    try {
        const newMenu = await Menu.create(req.body);
        res.status(200).send(newMenu);
    } catch (error) {
        console.log(error);
    }
};
module.exports.edit_menu = async (req, res) => {
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
module.exports.delete_menu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (menu) {
            await Menu.findOneAndDelete({ _id: req.params.id });
            res.status(200).send({
                status: true,
                message: 'delete menu',
            });
        } else {
            res.status(400).send({ status: false, message: 'Invalid menu' });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
