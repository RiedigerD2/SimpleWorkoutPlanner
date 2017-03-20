(function() {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('admin', ['$http', '$log', '$resource', 'messagingService', function($http, $log, $resource, messagingService) {

        let putMethod = { put: { method: 'put' } };

        let muscleResource = $resource('/muscle/:muscleId', null, putMethod);
        let bodyPartResource = $resource('/bodypart/:bodyPartId', null, putMethod);
        let exerciseResource = $resource('/exercise/:exerciseId', null, putMethod);

        return {
            addMuscle: function(muscleInfo) {
                return muscleResource.post(null, muscleInfo).$promise.then(function(result) {
                    messagingService.addSuccess('Created muscle "' + muscleInfo.muscleName + '".');
                    return result;
                }).catch(function(error) {
                    messagingService.addError('Creating muscle "' + muscleInfo.muscleName + '" failed.');
                    throw error;
                });
            },
            updateMuscle: function(muscleInfo) {
                return muscleResource.put({
                    muscleId: muscleInfo._id
                }, muscleInfo).$promise.then(function(result) {
                    messagingService.addSuccess('Updated muscle "' + muscleInfo.muscleName + '.');
                    return result;
                }).catch(function(error) {
                    messagingService.addError('Adding muscle "' + muscleInfo.muscleName + '" failed.');
                    throw error;
                });
            },
            deleteMuscle: function(muscleinfo) {
                return muscleResource.delete({
                    muscleId: muscleinfo._id
                }).$promise.then(function(result) {
                    messagingService.addSuccess('Deleted muscle.');
                    return result;
                }).catch(function(error) {
                    messagingService.addError('Failed to delte muscle "' + error.muscleName + '" failed.');
                    throw error;
                });
            },
            addBodyPart: function(bodyPartInfo) {
                return bodyPartResource.post(null, bodyPartInfo).$promise.then(function(result) {
                    messagingService.addSuccess('Saved Body Part "' + bodyPartInfo.bodyPartName + '.');
                    return result;
                }).catch(function(error) {
                    messagingService.addError('Adding bodyPart "' + bodyPartInfo.bodyPartName + '" failed.');
                    throw error;
                });
            },
            updateBodyPart: function(bodyPartInfo) {
                return bodyPartResource.put({
                    bodyPartId: bodyPartInfo._id
                }, bodyPartInfo).$promise.then(function(result) {
                    messagingService.addSuccess('Updated Body Part "' + bodyPartInfo.bodyPartName + '.');
                    return result;
                }).catch(function(error) {
                    messagingService.addError('Updating bodyPart "' + bodyPartInfo.bodyPartName + '" failed.');
                    throw error;
                });
            },
            deleteBodyPart: function(bodyPartInfo) {
                return bodyPartResource.delete({
                    bodyPartId: bodyPartInfo._id
                }).$promise.then(function(result) {
                    messagingService.addSuccess('Saved Body Part "' + bodyPartInfo.bodyPartName + '.');
                    return result;
                }).catch(function(error) {
                    $log.error(error);
                    messagingService.addError('Deleteing bodyPart  failed.');
                    throw error;
                });
            },
            addExercise: function(exerciseInfo) {
                return exerciseResource.post(null, exerciseInfo).$promise.then(function(result) {
                    messagingService.addSuccess('Saved Exercise "' + exerciseInfo.exerciseName + '.');
                    return result;
                }).catch(function(error) {
                    messagingService.addError('Adding exercise "' + exerciseInfo.exerciseName + '" failed.');
                    throw error;
                });
            },
            updateExercise: function(exerciseInfo) {
                return exerciseResource.put({
                    exerciseId: exerciseInfo._id
                }, exerciseInfo).$promise.then(function(result) {
                    messagingService.addSuccess('Updated Exercise "' + exerciseInfo.exerciseName + '.');
                    return result;
                }).catch(function(error) {
                    messagingService.addError('Updating exercise "' + exerciseInfo.exerciseName + '" failed.');
                    throw error;
                });
            },
            deleteExercise: function(exerciseInfo) {
                return exerciseResource.delete({
                    exerciseId: exerciseInfo._id
                }).$promise.then(function(result) {
                    messagingService.addSuccess('Saved Exercise "' + exerciseInfo.exerciseName + '.');
                    return result;
                }).catch(function(error) {
                    $log.error(error);
                    messagingService.addError('Deleteing exercise  failed.');
                    throw error;
                });
            }
        };
    }]);
}());