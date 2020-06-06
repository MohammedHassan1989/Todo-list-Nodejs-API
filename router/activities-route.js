const express = require('express');
const httpStatusCode = require('../shared/httpStatusCode')


function routes() {
    const router = express.Router();


    //================= Middleware ========================>

    router.use('/:catid/:id', (req, res, next) => {
        let catid = req.params.catid
        let id = req.params.id
        __context.activities.getSingleById(catid, id, (status, result) => {
            if (status != httpStatusCode.OK)
                return res.status(status).send(result);
            if (result) {
                req.activity = result;
                return next();
            }
            else {
                return res.status(httpStatusCode.BAD_REQUEST);
            }
        })

    });
    //================= End Middleware =====================>



    router.route('/:catid')
        .get((req, res) => {
            let catid = req.params.catid;
            __context.activities.getAll(catid, (status, result) => {
                res.status(status).json(result);
            })
        })
        .post((req, res) => {
            let catid = req.params.catid
           
            __context.activities.AddEdit(catid, req, (status, result) => {
                res.status(status).json(result);
            })
        });


    router.route('/:catid/:id')
        .get((req, res) => {
            res.json(req.activity);

        })
        .put((req, res) => {
            let catid = req.params.catid
            __context.activities.AddEdit(catid, req, (status, result) => {
                res.status(status).json(result);
            })
        })
        .delete((req, res) => {
            let catid = req.params.catid
            let id = req.params.id
            __context.activities.DeleteSingleById(catid, id, (status, result) => {
                res.status(status).json(result);

            })
        })

    return router;
}



module.exports = routes;