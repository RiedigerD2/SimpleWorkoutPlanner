var model = require('../database/server.model.js');



module.exports.getAllExercises = function() {
    console.log('get all')
    return model.exercise.find().sort('exerciseName').exec();
}


module.exports.getExerciseByName = function(name) {
    console.log(name);
    return model.exercise.find({
        exerciseName: {
            $regex: name,
            $options: 'i'
        }
    }).sort('exerciseName').exec();
}


module.exports.getExerciseById = function(exerciseId) {
    return model.exercise.findOne({
        _id: exerciseId
    }).populate('primaryMuscles').populate('secondaryMuscles').exec();
}