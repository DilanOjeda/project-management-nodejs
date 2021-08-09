const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const { User } = require('../models');


passport.use( 
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: "password"
        }, 
        async (email, password, done) => {
            try {
                const user = await User.findOne({
                    where: { email: email }
                });

                if ( !user ) {
                    return done(null, false, {
                        message: `Couldn't find your account`
                    });
                }
                // If password is incorrect
                if ( !user.verifyPassword(password) ) {
                    return done(null, false, {
                        message: `Incorrect password`
                    });
                }
                // When email and password are correct
                return done(null, user);
                 
            } catch (error) {
                console.log( 'ERROR => ', error );
                return done(null, false, {
                    message: `Something went wrong! Try again later`
                });
            }
        }
    )
)

passport.serializeUser( (user, callback) => {
    callback(null, user)
});

passport.deserializeUser( (user, callback) => {
    callback(null, user)
});

module.exports = passport;