var express = require('express');
var path = require('path');
var events = require('./server-controller');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');
var jwt = require('./services/jwt.js');
require('node-env-file')(__dirname + '/.env');;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(rootPath + '/app'));


app.use(function(req, res, next) {

    var header = req.headers.authorization;
    if (header) {
        var userInfo = jwt.confirm(header.split(' ')[1], process.env.jwt_secret);
        if (userInfo) {
            req.authenticated = true;
            //todo get user
            return next();
        }
    }
    req.authenticated = false;
    next();
})

function requireAuthenticationForEdit(router) {
    router.use(function(req, res, next) {
        if (req.method !== 'GET' && !req.authenticated) {
            res.status(403);
            return res.send('You must login to use this service')
        }
        next();
    });
}


var muscleRouter = require('./routes/muscleRouter.js')(requireAuthenticationForEdit);
var bodyPartRouter = require('./routes/bodyPartRouter.js')(requireAuthenticationForEdit);
var exerciseRouter = require('./routes/exerciseRouter.js')(requireAuthenticationForEdit);
var authenticationRouter = require('./routes/authenticationRouter.js')();
var generatorRouter = require('./routes/generatorRouter')();
var adminRouter = require('./routes/adminRouter')();

app.use('/admin', adminRouter);
app.use('/generator', generatorRouter)
app.use('/muscle', muscleRouter);
app.use('/bodypart', bodyPartRouter);
app.use('/exercise', exerciseRouter);
app.use('/', authenticationRouter);




console.log(process.env);
console.log(app.get('env'));

mongoose.connect(process.env.mongoDB_connection)
var listeningPort = process.env.PORT || 5000;


app.listen(listeningPort, function() {
    console.log('Listening on port ' + listeningPort + '...');
});