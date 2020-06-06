
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtStrategy = () => {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('auth'),
        secretOrKey: __staticVar.secret
    }, async (jwt_payload, done) => {

        console.log('JwtStrategy')
        if (jwt_payload.sub)
            return done(null, jwt_payload.sub);
        return done(null, false);
    }));

}

module.exports = jwtStrategy;