(function() {
    var app = angular.module('SimpleWorkoutPlanner');



    var NewBodyPartController = function($scope, $log, general, admin, listManagment, messagingService) {

        function _getBodyParts() {
            return general.getBodyParts();
        }

        function _createNewBodyPart() {
            return {
                muscles: []
            };
        }

        function deleteBodyPart(bodyPart) {
            return admin.deleteBodyPart(bodyPart);
        };

        function _saveNewBodyPart(bodyPart) {
            return admin.addBodyPart(bodyPart);
        }

        function _updateBodyPart(bodyPart) {
            return admin.updateBodyPart(bodyPart);
        }

        function _getFullBodyPart(bodyPart) {
            return general.getBodyPart(bodyPart);
        }

        $scope.listManager = listManagment.getListManager(_getBodyParts, _createNewBodyPart, _saveNewBodyPart, _updateBodyPart, deleteBodyPart, _getFullBodyPart);

        //Actual unique behaviour code
        $scope.Save = function(bodyPart) {
            if (!bodyPart || !bodyPart.bodyPartName || bodyPart.muscles.length === 0) {
                messagingService.addError('Bodypart invalid.');
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
    app.controller('NewBodyPartController', ['$scope', '$log', 'general', 'admin', 'listManagment', 'messagingService',
        NewBodyPartController
    ]);




}());