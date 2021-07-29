const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const profileSchema = require('./Profile');
const userSchema = new Schema({
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    expiredIn: Date,
    profile_id: {
        type: mongoose.Types.ObjectId,
    },
});
// console.log('user');
// const Profile = mongoose.model('profile', profileSchema);
// const profile = new Profile({
//     userId: 'U58d4bbc89efb63ccf0ccb4a8c4098dd8',
//     displayName: 'Pim🐼',
//     pictureUrl:
//         'https://profile.line-scdn.net/0hPIj_3bSbD2ZXJhmdk8FwMWtjAQsgCAkuLxASVSUiU1AtQUs5PEkXVCAlUFd5Fkg1PxBHA3dyBARy',
//     statusMessage: 'ไม่เรียนแล้ว',
// });
// profile.save();
// const User = mongoose.model('user', userSchema);
// const user = new User({
//     accessToken: 'asdasdasdasd',
//     refreshToken: 'asdfglglglgl',
//     expireToken: '2021-07-28',
//     profile_id: profile._id,
// });
// user.save();
mongoose.model('user', userSchema);
