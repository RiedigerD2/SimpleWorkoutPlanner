(function() {
    var app = angular.module('SimpleWorkoutPlanner');


    var NewMuscleController = function($scope, $log, admin, general, listManagment) {


        function _GetMuscles() {
            return general.getMuscles();
        }

        function _createEmptyMuscle() {
            return {};
        }

        $scope.Save = function(muscle) {
            if (!muscle || !muscle.muscleName) {
                return;
            }
            //todo include validation calls in list manager
            $scope.listManager.Save();
        };

        var _saveNewMuscle = function(muscle) {
            return admin.addMuscle(muscle).then(function() {
                $scope.focusedMuscle = {};
            });
        };

        var _updateMuscle = function(muscle) {
            return admin.updateMuscle(muscle).then(function(savedMuscle) {
                $scope.focusedMuscle = {};
            });
        };



        var _deleteMuscle = function(muscle) {
            return admin.deleteMuscle(muscle);
        };

        $scope.listManager = listManagment.getListManager(_GetMuscles, _createEmptyMuscle, _saveNewMuscle, _updateMuscle, _deleteMuscle);

    };

    app.controller('NewMuscleController', ['$scope', '$log', 'admin', 'general', 'listManagment',
        NewMuscleController
    ]);




}());