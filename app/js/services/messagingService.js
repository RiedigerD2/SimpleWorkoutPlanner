(function () {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('messagingService', ['$log', function ( $log) {
        var errorMessages = [];
        var successMessages = [];
        var publicFunctions={};
        
        publicFunctions.addSuccess= function(message){
            successMessages.push({message: message})
        }
        
        publicFunctions.addError= function(message){
            $log.log(message);
            errorMessages.push({message: message})
        }
        
        publicFunctions.errorMessages= function(){
            return errorMessages;
        }
        
         publicFunctions.successMessages= function(){
            return successMessages;
        }
        
         publicFunctions.clearMessages = function(){
             successMessages.clear();
             errorMessages.clear();
         }
        
        return publicFunctions;
    }]);
}());