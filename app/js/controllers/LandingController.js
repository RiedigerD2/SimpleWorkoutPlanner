(function() {

    var app = angular.module('SimpleWorkoutPlanner');

    var LandingPageController = function($scope, $location) {

        $scope.generateWorkOut = function() {
            $location.path('/generator');
        };

        $scope.MyWorkouts = function() {
            $location.path('/workouts');
        };

        $scope.Exercises = function() {
            $location.path('/exercises');
        };

        $scope.Admin = function() {
            $location.path('/admin');
        };
    };

    app.controller('LandingPageController', ['$scope', '$location', LandingPageController]);

}());