const joi = require('@hapi/joi');
const model = require('../../model/activities-model')
const validator = () => {

    const validateModel = (req) => {
        errorMessages = [];
        let schema = joi.object().keys({
            'categoryName': joi.string().required().messages({
                'string.base': ' categoryName must be string.',
                'string.empty': 'categoryName is required'
            }),
        })

        const { error } = schema.validate(req.body, { abortEarly: false });

        if(error){
            error.details.forEach(element => {
                errorMessages.push(element.message) //element.message)
            });
        }
       
      return errorMessages;
    }
    return {
        validateModel: validateModel,
    }
}




module.exports = validator;