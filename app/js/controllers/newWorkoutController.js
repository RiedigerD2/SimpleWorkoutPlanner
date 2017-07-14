(function() {
    var app = angular.module('SimpleWorkoutPlanner')

    controller = function($scope, general) {
        $scope.workout = {
            name: "",
            setGroups: []
        }
        $scope.searchMuscles = [];

        $scope.addExercise = function() {
            $scope.addingExercise = true;
        }

        $scope.getMuscles = function(muscleName) {
            return general.getMuscles(muscleName)
                .then(function(muscles) {
                    return muscles;
                });
        };



    }

    app.controller("NewWorkoutController", ['$scope', 'general', controller])

}())