(function() {

    var app = angular.module('SimpleWorkoutPlanner', ['ngRoute', 'ngAnimate', 'ngResource', 'ngMaterial', 'ui.bootstrap'])
        .config(function($routeProvider, $httpProvider) {
            $routeProvider.when('/', {
                    templateUrl: 'html/templates/LandingPage.html',
                    controller: 'LandingPageController'
                })
                .when('/workouts', {
                    templateUrl: 'html/templates/MyWorkouts.html',
                    controller: 'MyWorkoutsController'

                }).when('/newWorkout', {
                    templateUrl: 'html/templates/newWorkout.html',
                    controller: 'NewWorkoutController'
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

                })
                .when('/admin/bodypart', {
                    templateUrl: 'html/templates/newBodyPart.html',
                    controller: 'NewBodyPartController'

                })
                .when('/admin/exercise', {
                    templateUrl: 'html/templates/newExercise.html',
                    controller: 'NewExerciseController'
                })
                .when('/login', {
                    templateUrl: 'html/templates/login.html',
                    controller: 'loginRegisterController'
                })
                .when('/register', {
                    templateUrl: 'html/templates/register.html',
                    controller: 'loginRegisterController'
                }).when('/facebookAuth', {
                    template: '',
                    controller: 'facebookAuthController'
                });

            $httpProvider.interceptors.push('httpAuthentication');

        });







}());