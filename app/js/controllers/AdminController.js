(function () {

    var app = angular.module('SimpleWorkoutPlanner');

    var AdminController = function ($scope, $location) {

        $scope.addMuscle = function () {
            $location.path('/admin/muscle');
        };

        $scope.addBodyPart = function () {
            $location.path('/my-workouts');
        };

    };

    app.controller('AdminController', ['$scope', '$location', AdminController]);

}());