const mongoose = require('mongoose');
const User = mongoose.model('user');
const Authorization = async (req, res, next) => {
    let accessToken;
    // console.log(req.body);
    console.log('Authorization');
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
            // console.log('accessToken ', accessToken);
        }
    } catch (err) {
        console.log(err);
    }

    try {
        const currentUser = await User.findOne({ accessToken }).populate({
            path: 'profile_id',
            model: 'profile',
            select: 'userId displayName pictureUrl statusMessage',
        });
        // console.log('user', currentUser.profile_id.displayName);
        req.user = currentUser;
        // console.log('currentUser Authorization', req.user);
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = Authorization;
