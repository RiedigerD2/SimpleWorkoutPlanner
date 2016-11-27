(function () {
    var app = angular.module('SimpleWorkoutPlanner');


    var NewMuscleController = function ($scope, $log, admin, general) {

        $scope.focusedMuscle = {};

        $scope.saveMuscle = function (muscle) {
            var result;
            if (!muscle || !muscle.muscleName) {
                return;
            }
            if (muscle._id) {
                result = admin.updateMuscle(muscle).then(function (savedMuscle) {
                    $scope.focusedMuscle = {};
                });
            } else {
                result = admin.addMuscle(muscle).then(function () {
                    $scope.focusedMuscle = {};
                });
                _GetMuscles();
            };

            result.then(function (savedMuscle) {
                $scope.focusedMuscle = savedMuscle;
            });
        };

        $scope.selectMuscle = function (muscle) {
            $scope.focusedMuscle = muscle;
        };

        $scope.createNewMuscle = function () {
            $scope.focusedMuscle = {};
        };

        $scope.deleteMuscle = function (muscle) {

            admin.deleteMuscle(muscle).then(function () {
                $log.log('Calling then in controller');

                //_GetMuscles();
                var index = $scope.existingMuscles.indexOf(muscle);
                $scope.existingMuscles.splice(index, 1);
                $scope.focusedMuscle = {};
            }).catch(function () {


            });
        }

        function _GetMuscles() {
            general.getAllMuscles().then(function (muscles) {
                $scope.existingMuscles = muscles;
            });
        }
        _GetMuscles();
    };

    app.controller('NewMuscleController', ['$scope', '$log', 'admin', 'general',
        NewMuscleController]);




}());