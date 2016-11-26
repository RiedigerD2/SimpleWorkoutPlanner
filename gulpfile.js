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

var paths={
    sources: ['./app/js/**/*.js','./app/css/*.css']
};

gulp.task('inject', function () {
    console.log('Injecting');
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: './app/lib/bower'
    };

    var inject = require('gulp-inject');
    return gulp.src(['./app/index.html'])
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(paths.sources, {read: false}), {relative: true}))
        .pipe(gulp.dest('./app'));
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