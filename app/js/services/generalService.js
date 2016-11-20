(function () {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('general', ['$http', '$log', '$resource', function ($http, $log, $resource) {
        var baseAddress = '/';
        var resource = $resource(baseAddress, null, {
            getMuscle: {
                method: 'get',
                url: '/muscle/:muscleName/single'

            },
            getMuscleList: {
                method: 'get',
                url: '/muscle/:muscleName',
                isArray: true
            }
        });
        return {
            getMuscleList: function (muscleName) {
                return resource.getMuscleList({
                    muscleName: muscleName
                }).$promise;
            }

        };
    }]);
}());