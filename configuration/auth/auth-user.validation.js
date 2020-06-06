const userModel = require('../../model/users');
const restPasswordModel = require('../../model/restrictedPasswords')
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const httpStatus = require('../../shared/httpStatusCode')

const usersValidation = () => {

    //---------------------- Signup ------------------------------->
    const validateBody = (userReq, done) => {

        let errorMessages = [];
        // validation
        let schema = joi.object().keys({
            'username': joi.string().required().email().messages({
                'string.base': ' username must be string.',
                'string.empty': 'username is required',
                'string.email': 'Invalid Email'
            }),
            'password': joi.string().required().min(8).messages({
                'string.empty': 'password is required',
                'string.min': 'Password must be more than 8 character'
            }),
            'privileges': joi.any()
        })

        const { error } = schema.validate(userReq, { abortEarly: false });
        if (error) {

            error.details.forEach(element => {
                errorMessages.push(element.message)
            });
            return done(httpStatus.OK, errorMessages);
        }
        else {
            // return done(httpStatus.OK, null); 
            ifUsernameExist(userReq, done);
        }

    }
    const ifUsernameExist = (userReq, done) => {

        let errorMessages = [];
        userModel.findOne({ username: userReq.username.toLowerCase() }, (err, result) => {
            if (err) {
                errorMessages.push(err)
                return done(httpStatus.INTERNAL_SERVER_ERROR, errorMessages);
            }
            else if (result) {
                errorMessages.push('Email is already exist')
                return done(httpStatus.OK, errorMessages);
            }
            else {
                // return done(httpStatus.OK, null); 
                ifPasswordRestricted(userReq.password, done);
            }


        })
    }
    const ifPasswordRestricted = (password, done) => {

        let errorMessages = [];
        restPasswordModel.findOne({ password: password }, (err, result) => {
            if (err) {
                errorMessages.push(err)
                return done(httpStatus.INTERNAL_SERVER_ERROR, errorMessages);
            }
            else if (result) {
                errorMessages.push('Easy password')
                return done(httpStatus.OK, errorMessages);
            }
            else {
                return done(httpStatus.OK, null);
            }
        })

    }
    const SignupValidation = (userReq, done) => {

        return validateBody(userReq, (status, result) => {
            return done(status, result);
        })

        //  return done(httpStatus.OK, null);   


    }

    //---------------------- End Signup ------------------------------->

    //---------------------- Login ------------------------------->


    const getUser = (userReq, done) => {

    }
    const comparePassword = (userReq, done) => {

    }
    const updateUnsuccessfulLogin = (userReq, done) => {

    }
    const updatesuccessfulLogin = (userReq, done) => {

    }

    const LoginValidation = (userReq, done) => {
        let errorMessages = [];
 
        // check username
        userModel.findOne({ username: userReq.username }, (err, result) => {
            if (err) {
                errorMessages.push(err)
                return done(httpStatus.INTERNAL_SERVER_ERROR, errorMessages);
            }
            if (!result) {
                errorMessages.push('Invalid username or password')
                return done(httpStatus.OK, errorMessages);
            }

            if (result.unsuccessfulLoginCount == 4) {
                if (!result.unsuccessfulLoginInProgress) {
                    result.unsuccessfulLoginInProgress = true;
                    result.save();
                    setInterval(() => {
                        result.unsuccessfulLoginCount = 0;
                        result.unsuccessfulLoginInProgress = false;
                        result.save();
                    }, 60000);
                }
                errorMessages.push('you are exceeded available login limit, Please try again after 1 minute');
                return done(httpStatus.OK, errorMessages);
            }
            bcrypt.compare(userReq.password, result.password, (err,same) => {

                if (!same) {
                    result.unsuccessfulLoginCount = result.unsuccessfulLoginCount + 1;
                    result.lastUnsuccessfulLoginDate = Date.now();
                    result.save();
                    errorMessages.push('Invalid username or password')
                    return done(httpStatus.OK, errorMessages);
                }
                else {
                    result.unsuccessfulLoginCount = 0
                    result.lastSuccessfulLoginDate = Date.now();
                    result.save();

                    return done(httpStatus.OK, null);
                }
            })



        })
        //if exist check password
        // count unsuccesul login
        // remove flag after login

    }
    //---------------------- End Login ------------------------------->

    return {
        SignupValidation: SignupValidation,
        LoginValidation: LoginValidation
    }
}

module.exports = usersValidation;