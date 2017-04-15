var express = require('express');

var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt.js');

var models = require('../database/server.model.js');
var rout = function(app) {
    router.route('/login')
        .post(function(req, res) {
            models.user.findOne({ email: req.body.email }).exec().then(result => {
                    var user = result;
                    bcrypt.compare(req.body.password, result.password, function(err, loggedIn) {
                        if (err) {
                            res.status(500);
                            return res.send('Email or password is incorrect.');
                        }
                        if (loggedIn) {
                            return res.send({ jwt: user.jwt() });
                        }
                        res.status(401);
                        res.send('Email or password is incorrect.');
                    });
                })
                .catch(error => {
                    res.status(500);
                    res.send(error);
                });
        });

    router.route('/register')
        .post(function(req, res) {
            //todo add check for cookie information 
            //try and connect cookie users with their
            // new login
            if (!req.body.password) {
                throw new Error('Passwords are always good.');
            }
            if (!req.body.email) {
                throw new Error('Need an email yo.')
            }
            var user = new models.user(req.body);
            user.save(function(err) {
                if (err) {
                    res.status(500);
                    return res.send(err);
                }
                res.send({ jwt: user.jwt() })
            });
        });

    //app.use('/', router);
    return router;
};

module.exports = rout;