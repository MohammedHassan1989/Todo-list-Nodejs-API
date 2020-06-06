const session = require('express-session')
const passport = require('passport');
const cookieparser = require('cookie-parser');

const passportConfig = (app) => {

    app.use(cookieparser());
    app.use(session({ secret: __staticVar.secret, name:__staticVar.appName }));

    require('./stratagyLocal')()
    require('./stratagyjwt')()

    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser(function (user, done) {
        
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('deserializeUser');
        done(null, user);

    });
}

module.exports = passportConfig