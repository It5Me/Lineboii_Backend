const mongoose = require('mongoose');
const User = mongoose.model('user');
const Authorization = async (req, res, next) => {
    let accessToken;
    // console.log('reqAuthorizationfromLine', req.user);
    try {
        // console.log(req.headers);
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
            // console.log('accessToken ', accessToken);
            // console.log(accessToken);

            const currentUser = await User.findOne({ accessToken });
            // .populate({
            //     path: 'profile_id',
            //     model: 'profile',
            //     select: 'userId displayName pictureUrl statusMessage',
            // });
            // console.log('userHeadersSetInPostman', currentUser);
            req.user = currentUser;
            // console.log('currentUser Authorization', req.user);
            next();
            //เข้า else if
        } else if (req.user.accessToken) {
            accessToken = req.user.accessToken;
            const currentUser = await User.findOne({ accessToken });
            req.user = currentUser;
            console.log('user', currentUser);
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
