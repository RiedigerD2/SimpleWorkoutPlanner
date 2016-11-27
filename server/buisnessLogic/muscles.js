var model = require('../database/server.model.js');

module.exports.getMuscles = function (muscleName) {
    return new Promise(function (resolve, reject) {
        model.muscle.find({
            muscleName: {
                $regex: muscleName,
                $options: 'i'
            }
        }, function (err, results) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(results)
        });
        console.log(muscleName);
    });
};

module.exports.getAllMuscles = function () {

    return new Promise(function (resolve, reject) {
        model.muscle.find(function (err, results) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(results)
        }).sort('muscleName');
    });
}


module.exports.getMuscle = function (muscleName) {
    return new Promise(function (resolve, reject) {
        model.muscle.findOne({
            muscleName: {
                $regex: muscleName,
                $options: 'i'
            }
        }, function (err, results) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(results)
        });
    });
};

module.exports.getMuscleByID = function (muscleID) {
    return new Promise(function (resolve, reject) {
        model.muscle.findOne({
            _id: muscleID
        }, function (err, results) {
            if (err) {
                reject(err);
                throw err;
            }
            resolve(results)
        });
    });
};