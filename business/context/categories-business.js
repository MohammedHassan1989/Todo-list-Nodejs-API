const httpStatusCode = require('../../shared/httpStatusCode');
const validate = require('../categories/validate')()
const crud = require('../categories/crud')()
const categoriesBusiness = () => {

    const getAll = (callback, query = null) => {

        crud.getAll((status, result) => {
            return callback(status, result);
        }, query)

    }

    const getSingleById = (ID, callback) => {
        crud.getSingleById(ID, (status, result) => {
            return callback(status, result);
        })
    }

    const AddEdit = (req, callback) => {

        let validateReslt = validate.validateModel(req);

        if (validateReslt.length > 0) {
            return callback(httpStatusCode.OK, validateReslt);
        }

        let query = {};
        if (!req.category) {
            query = {
                'categoryName': req.body.categoryName
            }
        }
        else {
            query = {
                'categoryName': req.body.categoryName,
                '_id': { $ne: req.category._id }
            }
        }
        getAll((status, result) => {
            if (result)
                return callback(httpStatusCode.OK, 'category is already exist.');


            crud.AddEdit(req, (status, result) => {
                return callback(status, result);
            })
        }, query)




    }

    const DeleteSingleById = (id, callback) => {
        crud.DeleteSingleById(id, (status, result) => {
            return callback(status, result);
        })
    }

    return {
        getAll: getAll,
        getSingleById: getSingleById,
        AddEdit: AddEdit,
        DeleteSingleById: DeleteSingleById,
    }

}

module.exports = categoriesBusiness;