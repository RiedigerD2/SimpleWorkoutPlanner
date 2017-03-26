var express = require('express');
var path = require('path');
var events = require('./server-controller');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');
var muscleRouter = require('./routes/muscleRouter.js')();
var bodyPartRouter = require('./routes/bodyPartRouter.js')();
var exerciseRouter = require('./routes/exerciseRouter.js')();
var generatorRouter = require('./routes/generatorRouter')();
var adminRouter = require('./routes/adminRouter')();
require('node-env-file')(__dirname + '/.env');;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(rootPath + '/app'));


app.use(function(req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log(req.originalUrl)
    }
    next()
})

app.use('/generator', generatorRouter)
app.use('/admin', adminRouter);
app.use('/muscle', muscleRouter);
app.use('/bodypart', bodyPartRouter);
app.use('/exercise', exerciseRouter);

console.log(process.env);
console.log(app.get('env'));

mongoose.connect(process.env.mongoDB_connection)
var listeningPort = process.env.PORT || 5000;


app.listen(listeningPort, function() {
    console.log('Listening on port ' + listeningPort + '...');
});