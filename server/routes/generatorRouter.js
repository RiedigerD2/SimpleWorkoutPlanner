var express = require('express');

var generatorRouter = express.Router();

var router = function (arg) {
    generatorRouter.route('/')
        .get(function (req, res) {
            res.send('Generator');
        });


    generatorRouter.route('/plan/:id')
        .post(function (req, res) {
            var id = req.params.id;
            if (req.body) {
                console.log(req.body)
                res.send('you sent info ' + req.body.muscle);
                return;
            }
            res.send('plan' + id);
        });

    return generatorRouter;
};

module.exports = router;