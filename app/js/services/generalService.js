(function() {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('general', ['$http', '$log', '$resource', function($http, $log, $resource) {
        var baseAddress = '/';
        var resource = $resource(baseAddress, null, {
            getMuscle: {
                method: 'get',
                url: '/muscle/:muscleName'
            },
            getMuscles: {
                method: 'get',
                url: '/muscle',
                isArray: true
            },
            getBodyParts: {
                method: 'get',
                url: '/bodypart',
                isArray: true
            },
            getBodyPart: {
                method: 'get',
                url: '/bodypart/:id'
            },
            getExercises: {
                method: 'get',
                url: '/exercise',
                isArray: true
            },
            getExercise: {
                method: 'get',
                url: '/exercise/:id'
            }
        });
        return {
            getMuscles: function(muscleName) {
                var argument = null;
                if (muscleName) {
                    argument = {
                        name: muscleName
                    };
                }
                return resource.getMuscles(argument).$promise;
            },
            getBodyParts: function() {
                return resource.getBodyParts().$promise;
            },
            getBodyPart: function(bodyPart) {
                var urlArguments = {};
                if (bodyPart && bodyPart._id) {
                    urlArguments = { id: bodyPart._id };
                }
                return resource.getBodyPart(urlArguments).$promise;
            },
            getExercises: function() {
                return resource.getExercises().$promise;
            },
            getExercise: function(exercise) {
                var urlArguments = {};
                if (exercise && exercise._id) {
                    urlArguments = { id: exercise._id };
                }
                return resource.getExercise(urlArguments).$promise;
            }

        };
    }]);
}());