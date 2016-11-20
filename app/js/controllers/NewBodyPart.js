(function () {
    var app = angular.module('SimpleWorkoutPlanner');



    var NewBodyPartController = function ($scope, $log, general) {


        $scope.selectedMuscles = [];

        $scope.getMuscles = function (muscleName) {
            $log.log(muscleName);
            return general.getMuscleList(muscleName).then(function (arg) {
                $log.log(arg);
                $log.debug('saved a muscle');
                return arg;
            }).catch(function () {

            });
        };


    };



    app.controller('NewBodyPartController', ['$scope', '$log', 'general',
        NewBodyPartController]);




}());