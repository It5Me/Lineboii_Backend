const mongoose = require('mongoose');
const User = mongoose.model('user');
const Authorization = async (req, res, next) => {
    let accessToken;
    // console.log(req.body);
    console.log('Authorization');
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        accessToken = req.headers.authorization.split(' ')[1];

        // console.log('accessToken', accessToken);
        // req.accessToken = accessToken;
        next();
    } else {
        res.status(401).send('UnAuthorization');
    }
    try {
        const currentUser = await User.findOne({ accessToken }).populate({
            path: 'profile_id',
            model: 'profile',
            select: 'displayName',
        });
        // console.log('user', currentUser.profile_id.displayName);
        req.user = currentUser;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = Authorization;
