(function() {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('messagingService', ['$log', function($log) {
        var messages = [];
        var publicFunctions = {};

        publicFunctions.addSuccess = function(message) {
            var newMessage = { text: message, success: true };
            messages.unshift(newMessage);
        };

        publicFunctions.addError = function(message) {
            var newMessage = { text: message, error: true }
            messages.unshift(newMessage);
        };

        publicFunctions.errorMessages = function() {
            return messages.filter(message => {
                return message.error;
            });
        };

        publicFunctions.successMessages = function() {
            return messages.filter(message => {
                return message.success;
            });
        };

        publicFunctions.removeMessage = function(index) {
            messages.splice(index, 1);
        };

        publicFunctions.clearMessages = function() {
            messages = [];
        };

        publicFunctions.all = function() {
            return messages;
        }

        return publicFunctions;
    }]);
}());