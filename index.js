require('dotenv').config({ path: './config.env' });
const config = require('./src/config');
const express = require('express');
const passport = require('passport');
const LineStrategy = require('passport-line').Strategy;
const connectDB = require('./src/config/db');
const session = require('express-session');
connectDB();
const app = express();
const RestaurantRoute = require('./src/routes/RestaurantRoute');
app.use(express.json());

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
            channelID: config.LINE_CHANNEL_ID,
            channelSecret: config.LINE_CHANNEL_SECRET,
            callbackURL:
                'https://shrouded-plains-45055.herokuapp.com/auth/line/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            // process.nextTick(function () {
            //     // To keep the example simple, the user's LINE profile is returned to
            //     // represent the logged-in user.  In a typical application, you would want
            //     // to associate the LINE account with a user record in your database,
            //     // and return that user instead.
            //     return done(null, profile);
            // });
            console.log('accesToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);
        }
    )
);
// //when use req.body

app.get('/auth/line', passport.authenticate('line'), function (req, res) {
    // The request will be redirected to LINE for authentication, so this
    // function will not be called.
});
app.get(
    '/auth/line/callback',
    passport.authenticate('line', { failureRedirect: '/login' }),
    function (req, res) {
        // res.redirect('/');
        res.send('success');
    }
);
app.use(RestaurantRoute);
app.listen(config.PORT, () =>
    console.log(`Server RUNNING ON PORT ${config.PORT}`)
);
