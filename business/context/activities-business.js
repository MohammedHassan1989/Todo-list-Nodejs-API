const httpStatusCode = require('../../shared/httpStatusCode');
const model = require('../../model/activities-model')
const validate = require('../activities/validate')()
const activitiesBusiness = () => {

    const getAll = (CategoryID, callback, query = null) => {


        let crud = require('../activities/crud')(CategoryID);
        crud.getAll((status, result) => {

            return callback(status, result);
        }, query)
    }

    const getSingleById = (categoryID, ItemID, callback) => {
        let crud = require('../activities/crud')(categoryID);
        crud.getSingleById(ItemID, (status, result) => {
            return callback(status, result);
        })
    }

    const AddEdit = (CategoryID, req, callback) => {
        let crud = require('../activities/crud')(CategoryID);
        let validateReslt = validate.validateModel(req);

        if (validateReslt && validateReslt.length > 0) {
            return callback(httpStatusCode.OK, validateReslt);
        }


        // if (!req.activity) {

        //     query = {
        //         'activities.title': req.body.title
        //     }
        // }
        // else {
        //     console.log(2)
        //     query = {
        //         'activities.title': req.body.title,
        //         'activities._id': { $ne: req.activity._id }
        //     }
        // }



        getAll(CategoryID, (status, result) => {
            if (result && result.length > 0)//'category is already exist.'
                return callback(httpStatusCode.OK, 'category is already exist.');

            crud.AddEdit(req, (status, result) => {
                return callback(status, result);
            })
        }, req.body.title)



    }

    const DeleteSingleById = (categoryID, ItemID, callback) => {
        let crud = require('../activities/crud')(categoryID);
        crud.DeleteSingleById(ItemID, (status, result) => {
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

module.exports = activitiesBusiness;