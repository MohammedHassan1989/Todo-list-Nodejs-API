const joi = require('@hapi/joi');
const model = require('../../model/goals-model')
const validator = () => {

    const validateModel = (req) => {
        errorMessages = [];
        let schema = joi.object().keys({
            'title': joi.string().required().messages({
                'string.base': ' title must be string.',
                'string.empty': 'title is required'
            }),
        })



        const { error } = schema.validate(req.body, { abortEarly: false });
        if(error){
            error.details.forEach(element => {
                errorMessages.push(element.message) 
            });
        }
       


        let propertiesschema = joi.object.keys({
            'title': joi.string().required().messages({
                'string.base': ' item title must be string.',
                'string.empty': 'item title is required'
            }),
            'position': joi.number().positive().required().messages({
                'string.base': ' title position be number.',
                'string.positive': ' title position be positive number.',
                'string.empty': 'title is required'
            }),
    
        })
    let propertiesListSchema = joi.array().items(propertiesschema);

  error  = propertiesListSchema.validate(req.body.properties, { abortEarly: false });
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