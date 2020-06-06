
const { Strategy } = require('passport-local');
const userBusiness = require('../auth-user.business')();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const localStratagy = () => {

    passport.use(new Strategy(
        function (username, password, done) {

            const user = { username, password };


            userBusiness.Login(user, (err, result) => {
                if (err)
                    return done(err, result);

                    
            //  payLoad ... 
            const userInfo = { // mathine id and browzer
                id: result._id,
                username: result.username,
                privileges: result.privileges,
                
            }

          
                jwt.sign({ sub: userInfo }, __staticVar.secret, (err, token) => {
                    // save valid token 
                    userInfo['token'] = token
                    userBusiness.SaveToken(token)
                    return done(err, userInfo);
                })

            })

        }
    ));

}

module.exports = localStratagy;

