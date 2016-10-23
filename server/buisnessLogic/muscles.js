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