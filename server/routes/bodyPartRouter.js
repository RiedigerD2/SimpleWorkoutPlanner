var express = require('express');
var router = express.Router();

var models = require('../database/server.model.js');
var bodyPartLogic = require('../buisnessLogic/bodyPart.js');


var routs = function(arg) {



    arg(router)

    router.route('/').get(function(req, res) {
        if (req.query.name) {
            console.log('Query Name');
            bodyPartLogic.getBodyPartByName(req.query.name).then(function(result) {
                res.send(result);
            }).catch(function(error) {
                res.status(400);
                res.send(error);
            });
        } else {
            console.log('All body parts');
            bodyPartLogic.getAllBodyParts().then(function(result) {
                res.send(result);
            }).catch(function(error) {
                res.status(400);
                res.send(error);
            });
        }
    }).post(function(req, res) {
        if (req.body) {
            console.log(req.body);
            if (!req.body.bodyPartName) {
                res.status(400);
                res.send('Body parts have names use  field bodyPartName');
                return;
            }
            var newBodyPart = new models.bodyPart(req.body);
            newBodyPart.muscles = req.body.muscles.map(function(muscle) {
                if (muscle._id)
                    return muscle._id;
                return muslce;
            });
            //newMuscle.name = request.body.name;
            newBodyPart.save(function(error) {
                if (error) {
                    console.log(error);
                    res.status(400);
                    res.send('failed ' + error);
                } else {
                    res.send(newBodyPart);
                }
            });

            return;
        }
        res.status('400');
        res.send('send info to uploade paramater muscleName');
    });

    router.use('/:bodyPartId', function(req, res, next) {
        bodyPartLogic.getBodyPartById(req.params.bodyPartId).then(
            function(bodyPart) {
                console.log(bodyPart);
                req.bodyPart = bodyPart;
                next();
            }).catch(function(error) {
            console.error(error);
            res.status(404);
            res.send('Could not find bodyPart');
        });

    });

    router.route('/:bodyPartId').get(function(req, res) {
        res.send(req.bodyPart);
    }).put(function(req, res) {
        if (req.body) {
            if (!req.body.bodyPartName) {
                res.status(400);
                res.send('body parts have names use  field muscleName');
                return;
            }
            if (req.params.bodyPartId !== req.body._id) {
                res.status(400);
                res.send('updating infromation was incorrect');
            }

            var bodyPart = req.bodyPart;
            bodyPart.bodyPartName = req.body.bodyPartName;
            bodyPart.muscles = req.body.muscles.map(function(muscle) {
                if (muscle._id)
                    return muscle._id;
                return muslce;
            });
            bodyPart.save().then(function(result) {
                res.status(201)
                res.send(result);
            }).catch(function(error) {
                res.status(500);
                res.send('Updating Failed');
            });
            return;
        }
        res.status('400');
        res.send('send info to uploade paramater muscleName');
    }).delete(function(req, res) {
        if (!req.bodyPart) {
            res.status(404);
            res.send('Could not find');
            return
        }
        var bodyPart = req.bodyPart;

        bodyPart.remove().then(function() {
            res.send();
        }).catch(function() {
            res.status(500);
            res.send('Failed Delete');
        });

    });


    return router;
};

module.exports = routs;