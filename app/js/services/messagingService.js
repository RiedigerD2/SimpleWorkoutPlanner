(function () {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('messagingService', ['$log', function ($log) {
        var errorMessages = [];
        var successMessages = [];
        var publicFunctions = {};

        publicFunctions.addSuccess = function (message) {
            successMessages.unshift({
                message: message
            })
        };

        publicFunctions.addError = function (message) {
            $log.log(message);
            errorMessages.unshift({
                message: message
            })
        };

        publicFunctions.errorMessages = function () {
            return errorMessages;
        };

        publicFunctions.successMessages = function () {
            return successMessages;
        };

        publicFunctions.removeErrorMessage = function (index) {
            $log.log('index remove ' + index)
            errorMessages.splice(index, 1);
        };

        publicFunctions.removeSuccessMessage = function (index) {
            $log.log('index remove ' + index)
            successMessages.splice(index, 1);
        };

        publicFunctions.clearMessages = function () {
            successMessages.clear();
            errorMessages.clear();
        };

        return publicFunctions;
    }]);
}());