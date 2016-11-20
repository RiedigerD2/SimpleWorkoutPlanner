var express = require('express');
var router = express.Router();

var models = require('../database/server.model.js');
var muscleLogic = require('../buisnessLogic/muscles.js');


var routs = function (arg) {

    router.route('/muscle/:muscleName').get(function (req, res) {
        var muscleName = req.params.muscleName;
        console.log(muscleName);
        muscleLogic.getMuscles(muscleName).then(function (result) {
            console.log('then method called ' + result);
            res.send(result);
        }).catch(function (error) {
            res.status(400);
            res.send(error);

        });
    });

    router.route('/muscle/:muscleName/single').get(function (req, res) {
        var muscleName = req.params.muscleName;

        muscleLogic.getMuscle(muscleName).then(function (result) {
            console.log('then method called');
            res.send(result);
        }).catch(function (error) {
            res.status(400);
            res.send(error);
        });
    });


    return router;
};

module.exports = routs;