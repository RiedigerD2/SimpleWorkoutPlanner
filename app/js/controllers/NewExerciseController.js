(function() {
    var app = angular.module('SimpleWorkoutPlanner');



    var NewExerciseController = function($scope, $log, general, admin, listManagment, messagingService) {

        function _getExercises() {
            return general.getExercises();
        }

        function _createNewExercise() {
            return {
                primaryMuscles: [],
                secondaryMuscles: []
            };
        }

        var deleteExercise = function(Exercise) {
            return admin.deleteExercise(Exercise);
        };

        function _saveNewExercise(Exercise) {
            return admin.addExercise(Exercise);
        }

        function _updateExercise(Exercise) {
            return admin.updateExercise(Exercise);
        }

        function _getFullExercise(Exercise) {
            return general.getExercise(Exercise);
        }

        $scope.listManager = listManagment.getListManager(_getExercises, _createNewExercise, _saveNewExercise, _updateExercise, deleteExercise, _getFullExercise);

        //Actual unique behaviour code
        $scope.Save = function(exercise) {
            if (!exercise || !exercise.exerciseName || exercise.primaryMuscles.length === 0) {
                messagingService.addError("Exercise not valid")
                return;
            }
            $scope.listManager.Save();
        };

        $scope.getMuscles = function(muscleName) {
            return general.getMuscles(muscleName)
                .then(function(muscles) {
                    return muscles;
                });
        };



    };
    app.controller('NewExerciseController', ['$scope', '$log', 'general', 'admin', 'listManagment', 'messagingService',
        NewExerciseController
    ]);




}());