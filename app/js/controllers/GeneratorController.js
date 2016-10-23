(function(){
    var app = angular.module('SimpleWorkoutPlanner');
    
    
    var generatorController=function($scope){
        
        $scope.Generate = function(template){
            template.MuscleGroups=template.MuscleGroups.split(' ');
            console.log(template);
            
        };
        
    };
    
    app.controller('GeneratorController',['$scope', generatorController]);
    
    
    
    
}());