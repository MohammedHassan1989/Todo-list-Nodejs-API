const express = require('express');
const usersBusiness = require('../configuration/auth/auth-user.business')();
const router = express.Router();
const passport = require('passport')
const Authorization = require('../middelware/Auth')()
const validation = require('../middelware/validation')()
const userBusiness = require('../configuration/auth/auth-user.business')();
const httpStatus = require('../shared/httpStatusCode');
const UsersRouter = () => {
    router.route('/signup')
        .post(validation.Isvalidated, (req, res) => {
            usersBusiness.Signup(req.body, (err, result) => {
                if (err)
                    return res.status(404).json(result)
                req.login(result, () => {
                    return res.status(200).json();
                })

            })
        })
    router.route('/login')
        .post(validation.Isvalidated, passport.authenticate('local', { session: false }), function (req, res) {
            console.log(req)
            if (req.user)
                return res.status(200).json(req.user);
            else
                return res.status(404).json('404');
        })
    router.route('/test')
        .get(Authorization.IsAuthorized, function (req, res) {
            if (req.user)
                return res.json(req.user);
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        })

    router.route('/logout')
        //passport.authenticate('jwt', { session: false }),
        .get((req, res) => {




            let RequestHeader = req.headers['auth']
            // let token = RequestHeader.split('.')[1];

            if (!RequestHeader)
                return res.sendStatus(httpStatus.UNAUTHORIZED);
            userBusiness.Logout(RequestHeader);

            return res.sendStatus(httpStatus.OK);

        })


    return router;
}
module.exports = UsersRouter;