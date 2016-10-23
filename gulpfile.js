var gulp = require('gulp');
var jsHint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

gulp.task('style', function () {
    'use strict';
    return gulp.src(['app/js/**/*.js'])
        .pipe(jsHint())
        .pipe(jsHint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: './app/lib/bower'
    };

    return gulp.src('./app/index.html')
        .pipe(wiredep(options))
        .pipe(gulp.dest('./app'))
});

gulp.task('server', ['style', 'inject'], function () {
    'use strict';

    var options = {
        script: 'server/web-server.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: ['server/**/*.*', '*.js']
    };

    return nodemon(options).on('restart', function () {
        console.log('Restarting...');
    });
});