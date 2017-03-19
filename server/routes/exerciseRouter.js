var express = require('express');
var router = express.Router();

var models = require('../database/server.model.js');
var exerciseLogic = require('../buisnessLogic/exercise.js');


var routes = function(arg) {

    router.route('/').get(function(req, res) {
        if (req.query.name) {
            exerciseLogic.getExerciseByName(req.query.name).then(function(result) {
                res.send(result);
            }).catch(function(error) {
                res.status(400);
                res.send(error);
            });
        } else {
            exerciseLogic.getAllExercises().then(function(result) {
                res.send(result);
            }).catch(function(error) {
                res.status(400);
                res.send(error);
            });
        }
    }).post(function(req, res) {
        if (req.body) {
            console.log(req.body);
            if (!req.body.exerciseName) {
                res.status(400);
                res.send('Exercises have names use  field exerciseName');
                return;
            }
            var newExercise = new models.exercise(req.body);
            newExercise.primaryMuscles = req.body.primaryMuscles.map(function(muscle) {
                if (muscle._id)
                    return muscle._id;
                return muslce;
            });

            newExercise.secondaryMuscles = req.body.secondaryMuscles.map(function(muscle) {
                if (muscle._id)
                    return muscle._id;
                return muslce;
            });
            //newMuscle.name = request.body.name;
            newExercise.save(function(error) {
                if (error) {
                    console.log(error);
                    res.status(400);
                    res.send('failed ' + error);
                } else {
                    res.send(newExercise);
                }
            });

            return;
        }
        res.status('400');
        res.send('send info to upload paramater exerciseName');
    });

    router.use('/:exerciseId', function(req, res, next) {
        exerciseLogic.getExerciseById(req.params.exerciseId).then(
            function(exercise) {
                req.exercise = exercise;
                next();
            }).catch(function(error) {
            console.error(error);
            res.status(404);
            res.send('Could not find exercise');
        });

    });

    router.route('/:exerciseId').get(function(req, res) {
        res.send(req.exercise);
    }).put(function(req, res) {
        if (req.body) {
            if (!req.body.exerciseName) {
                res.status(400);
                res.send('exercises have names use  field muscleName');
                return;
            }
            if (req.params.exerciseId !== req.body._id) {
                res.status(400);
                res.send('updating infromation was incorrect');
            }

            var exercise = req.exercise;
            exercise.exerciseName = req.body.exerciseName;
            exercise.primaryMuscles = req.body.primaryMuscles.map(function(muscle) {
                if (muscle._id)
                    return muscle._id;
                return muslce;
            });

            exercise.secondaryMuscles = req.body.secondaryMuscles.map(function(muscle) {
                if (muscle._id)
                    return muscle._id;
                return muslce;
            });
            exercise.save().then(function(result) {
                res.status(201)
                res.send(result);
            }).catch(function(error) {
                res.status(500);
                res.send('Updating Failed');
            });
            return;
        }
        res.status('400');
        res.send('send info to upload paramater exerciseName');
    }).delete(function(req, res) {
        if (!req.exercise) {
            res.status(404);
            res.send('Could not find');
            return
        }
        var exercise = req.exercise;

        exercise.remove().then(function() {
            res.send();
        }).catch(function() {
            res.status(500);
            res.send('Failed Delete');
        });

    });


    return router;
};

module.exports = routes;