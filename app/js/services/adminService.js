(function () {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('admin', ['$http', '$log', '$resource', function ($http, $log, $resource) {
        var baseAddress = '/admin';
        var adminCalls = $resource(baseAddress, null, {
            addMuscle: {
                method: 'post',
                url: baseAddress + '/muscle'

            },
            addBodyPart: {
                method: 'post',
                url: baseAddress + '/bodypart'
            },
            addExercise: {
                method: 'post',
                url: baseAddress + '/exercise'
            }
        });
        return {
            addMuscle: function (muscleInfo) {
                return adminCalls.addMuscle(null, muscleInfo).$promise;
            }
        };
    }]);
}());