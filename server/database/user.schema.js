var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var jwt = require('../services/jwt.js');


var userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    cookie: String,
    facebook_token: String,
    facebook_id: Number,
});


userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isNew && !user.isModified('password'))
        return next();
    bcrypt.genSalt(15, (err, salt) => {
        if (err)
            return next(new Error(err))
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            user.password = hash;
            return next();
        });
    })
});

userSchema.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;
    return user;
}

userSchema.methods.jwt = function() {
    return jwt.encode(this.toJSON(), process.env.jwt_secret);
}

userSchema.pre('init', function(next) {
    //delete this.password;
    next();
});

userSchema.post('findOne', function(user) {
    var queryObject = this;
    if (this._conditions.email) {

    }
});

module.exports = userSchema;