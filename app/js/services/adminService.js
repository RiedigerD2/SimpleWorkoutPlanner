(function () {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('admin', ['$http', '$log', '$resource','messagingService', function ($http, $log, $resource, messagingService) {
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
                return adminCalls.addMuscle(null, muscleInfo).$promise.then(function (result){
                    messagingService.addSuccess('Saved muscle "'+ muscleInfo.muscleName+'.');
                    return result;
                }).catch(function (error) {
                    $log.log("adding error.");
                    messagingService.addError('Adding muscle "'+ muscleInfo.muscleName+'" failed.');
                    throw error;
                });
            },
            addBodyPart: function (bodyPartInfo) {
                $log.info(bodyPartInfo);
                return adminCalls.addBodyPart(null, bodyPartInfo).$promise.then(function (result){
                    messagingService.addSuccess('Saved Body Part "'+ bodyPartInfo.bodyPartName+'.');
                    return result;
                }).catch(function (error) {
                    $log.log("adding error.");
                    messagingService.addError('Adding bodyPart "'+ bodyPartInfo.bodyPartName+'" failed.');
                    throw error;
                });
            }
        };
    }]);
}());