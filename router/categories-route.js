const express = require('express');
const httpStatusCode = require('../shared/httpStatusCode');
const Authorization = require('../middelware/Auth')();
function routes() {
    const router = express.Router();


    //================= Middleware ========================>

    router.use('/:id', (req, res, next) => {
        let id = req.params.id

        __context.categories.getSingleById(id, (status, result) => {
            if (status != httpStatusCode.OK)
                return res.status(status).send(result);
            if (result) {

                req.category = result;
                return next();
            }
            else {
                return res.send(httpStatusCode.BAD_REQUEST);
            }
        })


    });
    //================= End Middleware =====================>


//Authorization.IsAuthorized,
    router.route('/')
        .get((req, res) => {
            __context.categories.getAll((status, result) => {
                res.status(status).json(result);
            })
        })
        .post((req, res) => {
            __context.categories.AddEdit(req, (status, result) => {
                res.status(status).json(result);

            })

        })


    router.route('/:id')
        .get((req, res) => {
            res.json(req.category);
        })
        .put((req, res) => {
            __context.categories.AddEdit(req, (status, result) => {

                res.status(status).json(result);
            })
        })
        .delete((req, res) => {
            let id = req.params.id;
            __context.categories.DeleteSingleById(id, (status, result) => {
                res.status(status).json(result);

            })
        })
    return router;
}



module.exports = routes;