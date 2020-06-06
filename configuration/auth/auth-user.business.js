const userModel = require('../../model/users')
const tokenModel = require('../../model/validTokens')
const rp = require('../../model/restrictedPasswords')
const bcrypt = require('bcrypt');

const users = () => {
    const Signup = (user, done) => {

   
        let _user = new userModel(user);
        _user.save((err, result) => {
            return done(err, result);
        })
    }

    const Login = (user, done) => {

        userModel.findOne({ username: user.username.toLowerCase() }, (err, result) => {
            if (err)
                return done(err, null);

            return done(null, result);
        })

    }


    const SaveToken = (token) => {

        let tokenSchema = {
            userToken: token
        }
        new tokenModel(tokenSchema).save();
    }


    const Logout = (token) => {

     
        tokenModel.findOne({ userToken:token }, (err, result) => {
            result.remove();
        });
      
    }

    IsTokenVald = (token, done) => {
        tokenModel.findOne({ userToken:token }, (err, result) => {
            if (err)
                return done(err, null)
            else if (result)
                return done(null, true);
            else
                return done(null, false);
        })
    }

    return {
        Signup: Signup,
        Login: Login,
        SaveToken: SaveToken,
        Logout: Logout,
        IsTokenVald:IsTokenVald
    }
}

module.exports = users;