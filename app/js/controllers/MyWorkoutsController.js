(function() {

    var app = angular.module("SimpleWorkoutPlanner");

    var controller = function($scope, $location) {
        $scope.newWorkout = function() {
            $location.path("/newWorkout")
        }
    }

    app.controller('MyWorkoutsController', ['$scope', '$location', controller])
}())