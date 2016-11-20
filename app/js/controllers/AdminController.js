(function () {

    var app = angular.module('SimpleWorkoutPlanner');

    var AdminController = function ($scope, $location) {

        $scope.addMuscle = function () {
            $location.path('/admin/muscle');
        };

        $scope.addBodyPart = function () {
            $location.path('/admin/bodypart');
        };

    };

    app.controller('AdminController', ['$scope', '$location', AdminController]);

}());