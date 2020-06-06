const httpStatusCode = require('../../shared/httpStatusCode');
const model = require('../../model/activities-model')
const categoriesBusiness = () => {

    
    const getAll = (callback, query) => {
        model.find(query)
            .lean()
            .select('_id categoryName activities')
            .then(categories => {

                if (!categories.length > 0)
                    return callback(httpStatusCode.OK, null);

                const result = {

                    categories: categories.map(category => {
                        return {
                            categoryid: category._id,
                            categoryName: category.categoryName,
                            activitiesCount: category.activities.length
                        }
                    })
                }

                return callback(httpStatusCode.OK, result);
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

    const AddEdit = (req, callback) => {

        if (req.category) {
            const { category } = req;
            category.categoryName = req.body.categoryName;

            req.category.save((err) => {
                if (err) {
                    return callback(httpStatusCode.INTERNAL_SERVER_ERROR, null);
                }

                return callback(httpStatusCode.OK, req.category._id);
            });
        }
        else {


            const category = new model(req.body);

            category.save((err) => {
                if (err) {
                    //httpStatusCode.INTERNAL_SERVER_ERROR
                    return callback(httpStatusCode.INTERNAL_SERVER_ERROR, err);
                }
            
                var newCategory = {
                    categoryid: category._id,
                    categoryName: category.categoryName,
                    activitiesCount: 0
                }
                return callback(httpStatusCode.CREATED, newCategory);
            })


        }

    }

    const DeleteSingleById = (id, callback) => {
       
        getSingleById(id, (status, result) => {
            if (status !=httpStatusCode.OK)
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
        DeleteSingleById: DeleteSingleById,
    }

}

module.exports = categoriesBusiness;