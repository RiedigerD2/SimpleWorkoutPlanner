var express = require('express');
var path = require('path');
var events = require('./server-controller');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');
var muscleRouter = require('./routes/muscleRouter.js')();
var bodyPartRouter = require('./routes/bodyPartRouter.js')();
var generatorRouter = require('./routes/generatorRouter')();
var adminRouter = require('./routes/adminRouter')();
var mongoose = require('mongoose');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(rootPath + '/app'));

app.use(function (req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log(req.originalUrl)
    }
    next()
})

app.use('/generator', generatorRouter)
app.use('/admin', adminRouter);
app.use('/muscle', muscleRouter);
app.use('/bodypart', bodyPartRouter);

mongoose.connect('mongodb://dbUser:y#f!hAAN7nYV@ds035766.mlab.com:35766/simpleworkoutplannerdb')
var listeningPort = process.env.PORT || 5000;

//app.get('/data/event',events.getAll);
//app.post('/data/event/:id',events.saveEvent);
//app.get('/data/eventMax',events.getMaxId);
//app.get('/data/user/:userName',events.getProfile);L
//app.post('/data/user/:userName',events.saveProfile);



app.listen(listeningPort, function () {
    console.log('Listening on port ' + listeningPort + '...');
});