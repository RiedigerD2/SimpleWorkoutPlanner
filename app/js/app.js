(function () {

    var app = angular.module('SimpleWorkoutPlanner', ['ngRoute', 'ngAnimate', 'ngResource', 'ui.bootstrap'])
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                    templateUrl: 'html/templates/LandingPage.html',
                    controller: 'LandingPageController'
                })
                .when('/my-workouts', {
                    templateUrl: 'html/templates/MyWorkouts.html',
                    controller: 'LandingPageController'

                })
                .when('/generator', {
                    templateUrl: 'html/templates/Generator.html',
                    controller: 'GeneratorController'

                })
                .when('/exercises', {
                    templateUrl: 'html/templates/Exercises.html',
                    controller: 'LandingPageController'

                })
                .when('/admin', {
                    templateUrl: 'html/templates/Admin.html',
                    controller: 'AdminController'
                })
                .when('/admin/muscle', {
                    templateUrl: 'html/templates/newMuscle.html',
                    controller: 'NewMuscleController'

                });
        });







}());