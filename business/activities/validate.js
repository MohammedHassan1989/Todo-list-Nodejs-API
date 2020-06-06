const joi = require('@hapi/joi');
const model = require('../../model/activities-model')
const validator = () => {

    const validateModel = (req) => {

        errorMessages = [];
        let schema = joi.object().keys({
            'title': joi.string().required().messages({
                'string.base': ' title must be string.',
                'string.empty': 'title is required'
            }),
            'description':joi.string().required().messages({
                'string.base': ' description must be string.',
                'string.empty': 'description is required'
            }),
            'isActive':joi.any(),
            'isDone':joi.any()
        })

        const { error } = schema.validate(req.body, { abortEarly: false });

        if(error){
            error.details.forEach(element => {
                errorMessages.push(element.message)
            });
        }
    
       
      return errorMessages;
    }
    return {
        validateModel: validateModel,
    }
}




module.exports = validator;