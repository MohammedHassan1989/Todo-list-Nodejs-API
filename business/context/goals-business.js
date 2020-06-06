const httpStatusCode = require('../../shared/httpStatusCode');
const validate = require('../goals/validate')()
const crud = require('../goals/crud')()
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

    const AddNewItem = (newItem, goalID, callback) => {
       
        crud.AddNewItem(newItem,goalID, (status, result) => {
            return callback(status, result);
        })
    }
    const EditSelectedItem = (goalID, itemID, item, callback) => {

        crud.EditSelectedItem(goalID,itemID,item,(status, result) => {
            return callback(status, result);
        })
    }

    const DeleteItem = (goalID, itemID, callback) => {
        crud.DeleteItem(goalID,itemID, (status, result) => {
            return callback(status, result);
        })
    }

    const AddEdit = (req, callback) => {


        let query = {};
        if (!req.goal) {
            query = {
                'title': req.body.title
            }
        }
        else {
            query = {
                'title': req.body.title,
                '_id': { $ne: req.goal._id }
            }
        }
     

        getAll((status, result) => {
            if (result)
                return callback(httpStatusCode.OK, 'tile is already exist.');


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
        AddNewItem:AddNewItem,
        EditSelectedItem:EditSelectedItem,
        DeleteSingleById: DeleteSingleById,
        DeleteItem:DeleteItem
    }

}

module.exports = categoriesBusiness;