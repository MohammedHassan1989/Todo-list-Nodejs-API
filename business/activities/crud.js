const httpStatusCode = require('../../shared/httpStatusCode');
const model = require('../../model/activities-model')

const activitiesBusiness = (categoryID) => {
    const getAll = (callback, activityTitle) => {

        let categoryIDQuery = { '_id': categoryID }
        model.findOne(categoryIDQuery)
            .lean()
            .select('activities')
            .then(category => {
                if (category && !category.activities.length > 0)
                    return callback(httpStatusCode.OK, null);


                if (activityTitle)
                    return callback(httpStatusCode.OK, category.activities.filter(f => f.title == activityTitle));
                else
                    return callback(httpStatusCode.OK, category.activities);
            })
    }
    const getSingleById = (ID, callback) => {

        let categoryIDQuery = { '_id': categoryID, 'activities._id': ID }
        model.findOne(categoryIDQuery)
            .select('activities')
            .then(category => {
                if (!category)
                    return callback(httpStatusCode.BAD_REQUEST, null);
                if (category && !category.activities.length > 0)
                    return callback(httpStatusCode.BAD_REQUEST, null);
                return callback(httpStatusCode.OK, category.activities.find(word => word._id == ID));
            })


    }
    const AddEdit = (req, callback) => {
        if (req.activity) {

            let Query = { '_id': categoryID, 'activities._id': req.activity._id };
            let updateModel = {
                "$set":
                {
                    'activities.$.title': req.body.title,
                    'activities.$.description': req.body.description,
                    'activities.$.isActive': req.body.isActive,
                    'activities.$.isDone': req.body.isDone,

                }
            }
            model.updateOne(Query, updateModel, (err, result) => {

                if (err)
                    return callback(httpStatusCode.BAD_REQUEST, err);
                else
                    return callback(httpStatusCode.CREATED, result);
            })
        }
        else {

            let categoryIDQuery = { '_id': categoryID }
            model.findOne(categoryIDQuery).then(category => {

                category.activities.push(req.body)
                category.save((err) => {
                    if (err) {
                        return callback(httpStatusCode.INTERNAL_SERVER_ERROR, err);
                    }
                    else {
                        
                        return callback(httpStatusCode.OK, category.activities[category.activities.length-1])
                    }

                });
            })
        }
    }

    const DeleteSingleById = (id, callback) => {
        let Query = { '_id': categoryID };
        let updateModel = {
            "$pull":
                { 'activities': { '_id': id } }
        }
        model.updateOne(Query, updateModel, (err, result) => {
            if (err)
                return callback(httpStatusCode.BAD_REQUEST, err);
            else
                return callback(httpStatusCode.OK, result);
        })
    }

    return {
        getAll: getAll,
        getSingleById: getSingleById,
        AddEdit: AddEdit,
        DeleteSingleById: DeleteSingleById,
    }
}

module.exports = activitiesBusiness