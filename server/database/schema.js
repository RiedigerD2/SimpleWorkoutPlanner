var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var muscleSchema = new Schema({
    muscleName: {
        type: String,
        required: [true, 'Provide a muslceName for this muscle.'],
        unique: [true, 'Sorry we already have that muscle.']
    }
});


module.exports.muscleSchema = muscleSchema;

module.exports.bodyPartSchema = new Schema({
    bodyPartName: {
        type: String,
        required: [true, 'Provide a bodyPartName for this body Part.'],
        unique: [true, 'Sorry we already have that body part.']
    },
    muscles: {
        type: [{
            type: Number, //muscleSchema
            ref: "muscle"
        }]
    }
});


var exerciseSchema = new Schema({
    exerciseName: {
        type: String,
        required: [true, 'Provide an exerciseName for this muscle.'],
        unique: [true, 'Sorry we already have that exercise.']
    },
    primaryMuscles: {
        type: [muscleSchema],
        required: [true, 'Provide the primary muscles for the exercise']
    },
    secondaryMuscles: {
        type: [muscleSchema]
    }
});

module.exports.excerciseSchema = exerciseSchema;


var setGroupSchema = new Schema({
    sets: {
        type: [{
            goalWeight: Number,
            actualWeight: Number,
            goalReps: Number,
            actualReps: Number
        }],
        required: [true, 'set group must contain sets']
    },
    exercise: {
        type: Number,
        ref: 'excercise',
        required: [true, 'Exercise must be provided']
    } //excercise comes from the models table

});

module.exports.setGroupSchema = setGroupSchema;




module.exports.workoutSchema = new Schema({
    setGroups: {
        type: [setGroupSchema],
        required: [true, 'workouts must include exercises ']
    },
    name: {
        type: String,
        require: [false] //I know this is default I just wanted to be explicit 
    }
});