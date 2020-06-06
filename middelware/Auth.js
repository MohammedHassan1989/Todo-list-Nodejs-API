const httpStatus = require('../shared/httpStatusCode');
const jwt = require('jsonwebtoken');
const userBusiness = require('../configuration/auth/auth-user.business')();
const AuthMW = () => {
    IsAuthorized = function (req, res, next) {
        // validate token

        let RequestHeader = req.headers['auth']

        if (!RequestHeader)
            return res.sendStatus(httpStatus.UNAUTHORIZED);


        userBusiness.IsTokenVald(RequestHeader, (err, IsValidToken) => {

            if (err)
                return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);

            if (!IsValidToken)
                return res.sendStatus(httpStatus.UNAUTHORIZED);


            jwt.verify(RequestHeader, __staticVar.secret, (err, user) => {
                if (err)
                    return res.sendStatus(httpStatus.UNAUTHORIZED);
                if (!user)
                    return res.sendStatus(httpStatus.UNAUTHORIZED);

                req.user = user.sub
                if (!req.user)
                    res.status(httpStatus.UNAUTHORIZED);
                 console.log(req.user.privileges)
        
 
                if (req.user.privileges.filter(prv => prv.url.toLowerCase() == req.originalUrl.toLowerCase()
                    && prv.method.toLowerCase() === req.method.toLowerCase()).length == 0)
                    return res.sendStatus(httpStatus.UNAUTHORIZED);

                next();
            })
        })



    }
    return {
        IsAuthorized: IsAuthorized
    }
}


module.exports = AuthMW