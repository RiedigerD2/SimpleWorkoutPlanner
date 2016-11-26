var express = require('express');
var models = require('../database/server.model.js');
var muscleLogic = require('../buisnessLogic/muscles.js');

var adminRouter = express.Router();

//use function so we can accept arguments
//when we use this from the server file
//todo add authentication
var router = function (arg) {


    adminRouter.route('/muscle')
        .post(function (req, res) {
            if (req.body) {
                console.log(req.body);
                if (!req.body.muscleName) {
                    res.status(400);
                    res.send('muslces have names use  field muscleName');
                    return;
                }
                var newMuscle = new models.muscle({
                    muscleName: req.body.muscleName
                });
                //newMuscle.name = request.body.name;
                newMuscle.save(function (error) {
                    if (error) {
                        console.log(error);
                        res.status(400);
                        res.send('failed ' + error);
                    } else {
                        res.send('you sent info ' + req.body.muscleName);
                    }
                });

                return;
            }
            res.status('400');
            res.send('send info to uploade paramater muscleName');
        });


  /*  adminRouter.route('/bodypart')
        .post(function (req, res) {
            if (req.body) {
                console.log(req.body);
                if (!req.body.bodyPartName) {
                    res.status(400);
                    res.send('Please provide information about the body part you want to create');
                    return;
                }

                var muscles = [];
                var promiseArray = [];
                if (req.body.muscles && req.body.muscles instanceof Array) {
                    req.body.muscles.forEach(function (muscle) {
                        console.log(muscle);
                        var promise = muscleLogic.getMuscleByID(muscle);
                        promiseArray.push(promise);

                        promise.then(function (result) {
                            muscles.push(result);
                        }).catch(function (err) {
                            res.status(400);
                            res.send('Couldn\'t find muscle: ' + muscle + '\n' + err);
                        });
                    });
                } else {
                    res.status(400);
                    res.send('Muscles should be a list');
                    return;
                }

                Promise.all(promiseArray).then(function (results) {
                    //todo consider adding result to primary muscles instead of 
                    //handling individually
                    if (muscles.length === 0) {
                        res.status(400);
                        res.send('Exercises must include Primary Muscles');
                        return;
                    }

                    var bodyPart = new models.bodyPart({
                        bodyPartName: req.body.bodyPartName,
                        muscles: muscles
                    });
                    bodyPart.save(function (error) {
                        if (error) {
                            console.log(error);
                            res.status(400);
                            res.send('failed ' + error);
                        } else {
                            res.send('you sent info ' + bodyPart);
                        }
                    });
                }).catch(function (err) {
                    console.log(err);
                    res.status(400);
                    res.send('error' + err);
                    return;
                });
                return;
            }
            res.status('400');
            res.send('send information about the exercise you wish to create');
        });

*/
    
    adminRouter.route('/bodypart')
        .post(function (req, res) {
            if (req.body) {
                console.log(req.body);
                if (!req.body.bodyPartName) {
                    res.status(400);
                    res.send('Please provide information about the body part you want to create');
                    return;
                }

                if (req.body.muscles && req.body.muscles instanceof Array) {
                    
                     var bodyPart = new models.bodyPart(req.body);
                        bodyPart.save(function (error) {
                        if (error) {
                            console.log(error);
                            res.status(400);
                            res.send('failed ' + error);
                        } else {
                            res.send({message:'you sent info ' + bodyPart});
                        }
                    });
               
                    return;
                    
                } else {
                    res.status(400);
                    res.send('Muscles should be a list');
                    return;
                }
            }
                
            res.status('400');
            res.send('send information about the exercise you wish to create');
        });


    adminRouter.route('/exercise')
        .post(function (req, res) {
            if (req.body) {
                console.log(req.body);
                if (!req.body.exerciseName) {
                    res.status(400);
                    res.send('Please provide information about the exercise you want to create');
                    return;
                }

                var primaryMuscles = [],
                    promiseArray = [];
                if (req.body.primaryMuscles && req.body.primaryMuscles instanceof Array) {
                    req.body.primaryMuscles.forEach(function (muscle) {
                        console.log(muscle);
                        var promise = muscleLogic.getMuscle(muscle);
                        promiseArray.push(promise);

                        promise.then(function (result) {
                            primaryMuscles.push(result);
                        }).catch(function (err) {
                            res.status(400);
                            res.send('Couldn\'t find muscle specified\n' + err);
                        });
                    });
                } else {
                    res.status(400);
                    res.send('Primary muscles should be a list');
                    return;
                }

                Promise.all(promiseArray).then(function (results) {
                    //todo consider adding result to primary muscles instead of 
                    //handling individually
                    if (primaryMuscles.length === 0) {
                        res.status(400);
                        res.send('Exercises must include Primary Muscles');
                        return;
                    }

                    var secondaryMusclePromises = [];
                    if (req.body.secondaryMuscles) {
                        if (req.body.secondaryMuscles instanceof Array) {
                            req.body.secondaryMuscles.forEach(function (muscle) {
                                secondaryMusclePromises.push(muscleLogic.getMuscle(muscle));
                            });
                        } else {
                            res.status(400);
                            res.send('Secondary muscles should be a list');
                            return;
                        }
                    } //no error if they don't include secondary musclees at all


                    Promise.all(secondaryMusclePromises).then(function (results) {

                        var newExercise = new models.exercise({
                            exerciseName: req.body.exerciseName,
                            primaryMuscles: primaryMuscles,
                            secondaryMuscles: results
                        });


                        newExercise.save(function (error) {
                            if (error) {
                                console.log(error);
                                res.status(400);
                                res.send('failed ' + error);
                            } else {
                                res.send('you sent info ' + newExercise);
                            }
                        });


                    }).catch(function (error) {
                        console.log(error);
                        res.status(400);
                        res.send('error' + error);
                        return;
                    });
                }).catch(function (error) {
                    console.log(error);
                    res.status(400);
                    res.send('error' + error);
                    return;
                });
                return;
            }
            res.status('400');
            res.send('send information about the exercise you wish to create');
        });


    return adminRouter;
};

module.exports = router;