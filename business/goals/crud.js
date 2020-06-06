const httpStatusCode = require('../../shared/httpStatusCode');
const model = require('../../model/goals-model')
const goalsBusiness = () => {


    const getAll = (callback, query) => {
        model.find(query)
            .lean()
            .then(goals => {

                if (!goals.length > 0)
                    return callback(httpStatusCode.OK, null);
                else
                    return callback(httpStatusCode.OK, goals);
            })
    }

    const getSingleById = (ID, callback) => {
        model.findById(ID, (err, result) => {
            if (err)
                return callback(httpStatusCode.INTERNAL_SERVER_ERROR, null);


            if (result)
                return callback(httpStatusCode.OK, result);
            else
                return callback(httpStatusCode.OK, null);

        });
    }


    const AddNewItem = (newItem, goalID, callback) => {

        let goalIDQuery = { '_id': goalID }
        model.findOne(goalIDQuery).then(goal => {
            goal.properties.push(newItem)
            goal.save((err) => {
                if (err) {
                    return callback(httpStatusCode.INTERNAL_SERVER_ERROR, err);
                }

                console.log(newItem)
                return callback(httpStatusCode.OK, null)
            });
        })
    }

    const EditSelectedItem = (goalID, itemID, item, callback) => {

        let Query = { '_id': goalID, 'properties._id': itemID };
        let updateModel = {
            "$set":
            {
                'properties.$.title': item.title,
                'properties.$.value': item.value,
                'properties.$.position': item.position
            }
        }
        model.updateOne(Query, updateModel, (err, result) => {
            if (err)
                return callback(httpStatusCode.BAD_REQUEST, err);
            else
                return callback(httpStatusCode.CREATED, result);
        })


    }

    const DeleteItem = (goalID, itemID, callback) => {
        let Query = { '_id': goalID};
        let updateModel = {
            "$pull":
                { 'properties': { '_id': itemID } }      
        }
        
        model.updateOne(Query, updateModel, (err, result) => {
            if (err)
                return callback(httpStatusCode.BAD_REQUEST, err);
            else
                return callback(httpStatusCode.OK, result);
        })
    }

    const AddEdit = (req, callback) => {

        if (req.goal) {
            const { goal } = req;
            goal.title = req.body.title;

            req.goal.save((err) => {
                if (err) {
                    return callback(httpStatusCode.INTERNAL_SERVER_ERROR, null);
                }

                return callback(httpStatusCode.OK, req.goal._id);
            });
        }
        else {


            const category = new model(req.body);

            category.save((err) => {
                if (err) {
                    //httpStatusCode.INTERNAL_SERVER_ERROR
                    return callback(httpStatusCode.INTERNAL_SERVER_ERROR, err);
                }
                return callback(httpStatusCode.CREATED, category._id);
            })


        }

    }

    const DeleteSingleById = (id, callback) => {

        getSingleById(id, (status, result) => {
            if (status != httpStatusCode.OK)
                return callback(httpStatusCode.INTERNAL_SERVER_ERROR, result);
            result.remove((err) => {
                if (err) {
                    return callback(httpStatusCode.INTERNAL_SERVER_ERROR, result);
                }
                return callback(httpStatusCode.OK, result._id);
            });
        });
    }

    return {
        getAll: getAll,
        getSingleById: getSingleById,
        AddEdit: AddEdit,
        AddNewItem: AddNewItem,
        EditSelectedItem: EditSelectedItem,
        DeleteItem: DeleteItem,
        DeleteSingleById: DeleteSingleById,
    }

}

module.exports = goalsBusiness;