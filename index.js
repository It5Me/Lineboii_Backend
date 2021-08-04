require('dotenv').config({ path: './config.env' });
const config = require('./src/config');
const express = require('express');
const passport = require('passport');
const LineStrategy = require('passport-line').Strategy;
const connectDB = require('./src/config/db');
const session = require('express-session');
const cors = require('cors');
require('./src/models');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Profile = mongoose.model('profile');
const app = express();
const DashboardRoute = require('./src/routes/DashboardRoute');
const BrandRoute = require('./src/routes/BrandRoute');
const RestaurantRoute = require('./src/routes/RestaurantRoute');
const UserRoute = require('./src/routes/UserRoute');
const PromotionRoute = require('./src/routes/PromotionRoute');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// required for passport
app.use(session({ secret: config.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
connectDB();
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(
    new LineStrategy(
        {
            channelID: config.LINE_CHANNEL_ID,
            channelSecret: config.LINE_CHANNEL_SECRET,
            callbackURL: 'https://shrouded-plains-45055.herokuapp.com/auth/line/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            // console.log('accessToken', accessToken);
            // console.log('refreshToken', refreshToken);
            // console.log('profile', profile.id);
            const newProfile = new Profile(profile);
            newProfile.save((err, profile) => {
                const newUser = new User({
                    accessToken,
                    refreshToken,
                    profile_id: profile,
                });
                newUser.save();
            });

            // asynchronous verification, for effect...
            process.nextTick(function () {
                // To keep the example simple, the user's LINE profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the LINE account with a user record in your database,
                // and return that user instead.

                return done(null, profile);
            });
        }
    )
);
// //when use req.body

//ไอเขียวหน้าล็อคอิน
app.get('/auth/line', passport.authenticate('line'), function (req, res) {
    // The request will be redirected to LINE for authentication, so this
    // function will not be called.4
});
//check ว่า ล็อคอินได้ไหม
app.get(
    '/auth/line/callback',
    passport.authenticate('line', {
        failureRedirect: '/login',
        successRedirect: '/user',
    }),
    function (req, res) {}
);
// app.use('/api/', UserRoute);
app.use(PromotionRoute);
app.use(DashboardRoute);
app.use(BrandRoute);
app.use(UserRoute);
app.use(RestaurantRoute);
app.listen(config.PORT, () => {
    console.log(`Server RUNNING ON PORT ${config.PORT}`);
});
