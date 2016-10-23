var mongoose = require('mongoose');
var schema = require('./schema.js');

module.exports.muscle = mongoose.model('muscle', schema.muscleSchema);
module.exports.bodyPart = mongoose.model('bodyPart', schema.bodyPartSchema);
module.exports.exercise = mongoose.model('excercise', schema.excerciseSchema);
module.exports.setGroup = mongoose.model('setGroup', schema.setGroupSchema);
module.exports.workout = mongoose.model('workout', schema.setGroupSchema);