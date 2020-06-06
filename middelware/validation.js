const httpStatus = require('../shared/httpStatusCode')
const userValidation = require('../configuration/auth/auth-user.validation')()
const validationWW = () => {
    Isvalidated = function (req, res, next) {
     

        if (req.url.toLowerCase() === '/signup' &&
            req.method.toLowerCase() === 'post') {
            userValidation.SignupValidation(req.body, (status, result) => {
                if (result){
                    console.log(result)
                     res.status(status).json(result);
                }
                else{
                    console.log('next')
                    next();
                }
            })
        }

        if (req.url.toLowerCase() === '/login' &&
        req.method.toLowerCase() === 'post') {
        userValidation.LoginValidation(req.body, (status, result) => {
            if (result){
          
                 res.status(status).json(result);
            }
            else{
            
                next();
            }
        })
    }

      
    }
    return {
        Isvalidated: Isvalidated
    }
}


module.exports = validationWW