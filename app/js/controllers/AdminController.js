(function() {

    var app = angular.module('SimpleWorkoutPlanner');

    var AdminController = function($scope, $location) {

        $scope.addMuscle = function() {
            $location.path('/admin/muscle');
        };

        $scope.addBodyPart = function() {
            $location.path('/admin/bodypart');
        };

        $scope.addExercise = function() {
            $location.path('/admin/exercise');
        };

    };

    app.controller('AdminController', ['$scope', '$location', AdminController]);

}());