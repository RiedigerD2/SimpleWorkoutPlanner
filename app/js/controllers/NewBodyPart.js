(function () {
    var app = angular.module('SimpleWorkoutPlanner');



    var NewBodyPartController = function ($scope, $log, $mdToast, general, admin) {


        $scope.selectedMuscles = [];

        $scope.getMuscles = function (muscleName) {
            return general.getMuscleList(muscleName).then(function (arg) {
                return arg;
            }).catch(function () {

            });
        };
        
        
        $scope.createBodyPart = function (bodyPart) {
            
            bodyPart.muscles = $scope.selectedMuscles.map(function (muscle) {
                return muscle._id;
            });
            $log.log(bodyPart);
            admin.addBodyPart(bodyPart).then(function (result) {
               
                $mdToast.show(
                $mdToast.simple()
                    .textContent('Saved ' + bodyPart.bodyPartName)
                    .position( 'top right')
                    .hideDelay(4000)
                );
                $scope.newBodyPart={};
                $scope.selectedMuscles=[];
            }).catch(function(error){
                $log.log(error);
                $mdToast.show(
                $mdToast.simple()
                    .textContent('Error '+ error)
                    .position( 'top right' )
                    .hideDelay(5000)
                    .theme('md-warn')
                );
            });
        };
    };



    app.controller('NewBodyPartController', ['$scope', '$log','$mdToast', 'general', 'admin',
        NewBodyPartController]);




}());