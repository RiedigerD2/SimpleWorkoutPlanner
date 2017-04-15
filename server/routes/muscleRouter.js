var express = require('express');
var router = express.Router();

var models = require('../database/server.model.js');
var muscleLogic = require('../buisnessLogic/muscles.js');


var routs = function(arg) {
    arg(router);
    router.route('/:muscleName').get(function(req, res) {
        var muscleName = req.params.muscleName;

        muscleLogic.getMuscle(muscleName).then(function(result) {
            res.send(result);
        }).catch(function(error) {
            res.status(400);
            res.send(error);
        });
    });

    router.route('/').get(function(req, res) {
        if (req.query.name) {
            console.log('Query Muscles');
            var muscleName = req.query.name;
            muscleLogic.getMuscles(muscleName).then(function(result) {
                res.send(result);
            }).catch(function(error) {
                res.status(400);
                res.send(error);

            });
        } else {
            console.log('Get All muscles...')
            muscleLogic.getAllMuscles().then(function(result) {
                res.send(result);
            }).catch(function(error) {
                res.status(400);
                res.send(error);
            });
        }
    }).post(function(req, res) {
        if (req.body) {
            console.log(req.body);
            if (!req.body.muscleName) {
                res.status(400);
                res.send('muslces have names use  field muscleName');
                return;
            }
            var newMuscle = new models.muscle(req.body);
            //newMuscle.name = request.body.name;
            newMuscle.save(function(error) {
                if (error) {
                    console.log(error);
                    res.status(400);
                    res.send('failed ' + error);
                } else {
                    res.send(newMuscle);
                }
            });

            return;
        }
        res.status('400');
        res.send('send info to uploade paramater muscleName');
    });

    router.use('/:muscleId', function(req, res, next) {
        muscleLogic.getMuscleByID(req.params.muscleId).then(
            function(muscle) {
                req.muscle = muscle;
                next();
            }).catch(function(error) {
            res.status(404);
            res.send('Could not find muscle');
        });

    });

    router.route('/:muscleId').put(function(req, res) {
        if (req.body) {
            if (!req.body.muscleName) {
                res.status(400);
                res.send('muslces have names use  field muscleName');
                return;
            }
            if (req.params.muscleId !== req.body._id) {
                res.status(400);
                res.send('updating infromation was incorrect');
            }

            var muscle = req.muscle;
            muscle.muscleName = req.body.muscleName;
            muscle.save().then(function(result) {
                res.status(201)
                res.send(muscle);
            }).catch(function(error) {
                res.status(500);
                res.send('Updating Failed');
            });
            return;
        }
        res.status('400');
        res.send('send info to uploade paramater muscleName');
    }).delete(function(req, res) {
        var muscle = req.muscle;
        muscle.remove().then(function() {
            res.send();
        }).catch(function() {
            res.status(500);
            res.send('Failed Delete');
        });

    });


    return router;
};

module.exports = routs;