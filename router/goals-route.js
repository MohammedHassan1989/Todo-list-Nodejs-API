const express = require('express');
const httpStatusCode = require('../shared/httpStatusCode')
function routes() {
    const router = express.Router();


    //================= Middleware ========================>

    // router.use('/:id', (req, res, next) => {
    //     let id = req.params.id
    //     console.log(id)
    //     __context.goals.getSingleById(id, (status, result) => {
    //         if (status != httpStatusCode.OK)
    //             return res.status(status).send(result);
    //         if (result) {

    //             req.goal = result;
         
    //             return next();
    //         }
    //         else {
    //             return res.send(httpStatusCode.BAD_REQUEST);
    //         }
    //     })


    // });
    //================= End Middleware =====================>



    router.route('/')
        .get((req, res) => {
            __context.goals.getAll((status, result) => {
                res.status(status).json(result);
            })
        })
        .post((req, res) => {

            __context.goals.AddEdit(req, (status, result) => {
                res.status(status).json(result);

            })

        })

    router.route('/:id')
    .all( (req, res, next) => {
        let id = req.params.id

        __context.goals.getSingleById(id, (status, result) => {
            if (status != httpStatusCode.OK)
                return res.status(status).send(result);
            if (result) {

                req.goal = result;
         
                return next();
            }
            else {
                return res.send(httpStatusCode.BAD_REQUEST);
            }
        })


    })
        .get((req, res) => {
            res.json(req.goal);
        })
        .put((req, res) => {
            __context.goals.AddEdit(req, (status, result) => {

                res.status(status).json(result);
            })
        })
        .delete((req, res) => {
            let id = req.params.id;
            __context.goals.DeleteSingleById(id, (status, result) => {
                res.status(status).json(result);

            })
        })

    router.route('/additem/:id')
        .post((req, res) => {
            let id = req.params.id;
          
            __context.goals.AddNewItem(req.body, id, (status, result) => {
                res.status(status).json(result);
            })

        })

        router.route('/edititem/:goalID/:itemID')
        .put((req, res) => {
            let goalID = req.params.goalID;
            let itemID = req.params.itemID;
            __context.goals.EditSelectedItem(goalID, itemID,req.body, (status, result) => {
                res.status(status).json(result);
            })

        })
        .delete((req, res) => {
            let goalID = req.params.goalID;
            let itemID = req.params.itemID;
            __context.goals.DeleteItem(goalID, itemID, (status, result) => {
                res.status(status).json(result);
            })

        })



    return router;
}





module.exports = routes;