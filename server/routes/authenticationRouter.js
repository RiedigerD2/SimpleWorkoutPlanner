var express = require('express');

var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt.js');
var userLogic = require('../buisnessLogic/user.js')
var request = require('request');

var models = require('../database/server.model.js');
var rout = function(app) {
        router.route('/login')
            .post(function(req, res) {
                models.user.findOne({
                        email: req.body.email
                    }).exec().then(result => {
                        var user = result;
                        bcrypt.compare(req.body.password, result.password, function(err, loggedIn) {
                            if (err) {
                                res.status(500);
                                return res.send('Email or password is incorrect.');
                            }
                            if (loggedIn) {
                                return res.send({
                                    jwt: user.jwt()
                                });
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
                    res.send({
                        jwt: user.jwt()
                    })
                });
            });

        router.route('/facebookLogin')
            .post(function(req, res) {
                    //todo add check for cookie information 
                    //try and connect cookie users with their
                    // new login
                    if (!req.body.code) {
                        throw new Error('Code required for login');
                    }
                    var url = 'https://graph.facebook.com/v2.8/oauth/access_token?'

                    var arguments = [];
                    arguments.push(`client_id=151274692068121`);
                    arguments.push(`redirect_uri=${encodeURIComponent(`http://${req.hostname}:4000/`)}`);
            arguments.push(`client_secret=${process.env.facebook_secret}`);
            arguments.push(`code=${req.body.code}`);

            url += arguments.join('&')

            request.get(url, {
                    json: true,
                }, function(err, response, body) {

                    if (body.access_token) {
                        var facebook_token = body.access_token;
                        request.get('https://graph.facebook.com/me?fields=id,email,name', {
                            json: true,
                            auth: {
                                bearer: facebook_token
                            }
                        }, function(err, httpsResult, fbUser) {
                            userLogic.getUserByFacebookID(fbUser.id)
                                .then(function(user) {
                                    if (user) {
                                        res.send({ jwt: user.jwt() });
                                    } else {
                                        var user = {
                                            facebook_id: fbUser.id,
                                            name: fbUser.name,
                                            email: fbUser.email,
                                            facebook_token: facebook_token
                                        }

                                        var user = new models.user(user);
                                        user.save(function(err) {
                                            if (err) {
                                                res.status(500);
                                                return res.send(err);
                                            }
                                            res.send({ jwt: user.jwt() })
                                        });
                                    }
                                }).catch(function(err) {
                                    console.log(err);
                                    res.status(500);
                                    res.send('Not Authenticated.')
                                });
                        });

                    } else {
                        res.status(500)
                        res.send('Failed to authenticate')
                    }

                })
                //todo search for member
                //create user if not found
                //return jwt


        });


    //app.use('/', router);
    return router;
};

module.exports = rout;