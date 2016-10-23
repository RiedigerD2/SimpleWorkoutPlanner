(function () {
    var app = angular.module('SimpleWorkoutPlanner');


    var NewMuscleController = function ($scope, $log, admin) {



        $scope.createMuscle = function (newMuscle) {
            admin.addMuscle(newMuscle).then(function (arg) {
                $log.log(arg);
                $log.debug('saved a muscle');
            }).catch(function () {

            });
        };


    };



    app.controller('NewMuscleController', ['$scope', '$log', 'admin',
        NewMuscleController]);




}());