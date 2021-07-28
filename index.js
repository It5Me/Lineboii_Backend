require('dotenv').config({ path: './config.env' });
const config = require('./src/config');
const express = require('express');
const passport = require('passport');
const LineStrategy = require('passport-line').Strategy;
const connectDB = require('./src/config/db');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const userSchema = require('./src/models/User');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Profile = mongoose.model('profile');
connectDB();
const app = express();
const RestaurantRoute = require('./src/routes/RestaurantRoute');
const UserRoute = require('./src/routes/UserRoute');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// required for passport
app.use(session({ secret: config.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(
    new LineStrategy(
        {
            clientID: config.LINE_CHANNEL_ID,
            clientSecret: config.LINE_CHANNEL_SECRET,
            callbackURL: 'http://localhost:1234/auth/line/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile.id);
            const newProfile = new Profile(profile);
            newProfile.save((err, profile) => {
                const newUser = new User({
                    accessToken,
                    refreshToken,
                    profile_id: profile._id,
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
app.get('/', (req, res) => {
    res.send('test');
});
app.get(
    '/auth/line/callback',
    passport.authenticate('line', {
        failureRedirect: '/login',
        successRedirect: '/data',
    }),
    function (req, res) {}
);
app.use(UserRoute);
app.use(RestaurantRoute);
app.listen(config.PORT, () => console.log(`Server RUNNING ON PORT ${config.PORT}`));
