const mongoose = require('mongoose');
const User = mongoose.model('user');
const Authorization = async (req, res, next) => {
    let accessToken;

    try {
        // console.log(req.headers);
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
            console.log('accessToken ', accessToken);
            console.log(accessToken);

            const currentUser = await User.findOne({ accessToken });
            // .populate({
            //     path: 'profile_id',
            //     model: 'profile',
            //     select: 'userId displayName pictureUrl statusMessage',
            // });
            console.log('user', currentUser);
            req.user = currentUser;
            // console.log('currentUser Authorization', req.user);
            next();
        } else {
            console.log('No headers');
            res.status(401).send('unauthorization');
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = Authorization;
