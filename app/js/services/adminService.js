(function() {
    var planner = angular.module('SimpleWorkoutPlanner');
    planner.factory('admin', ['$http', '$log', '$resource', '$location', 'messagingService', 'auth', function($http, $log, $resource, $location, messagingService, auth) {

        let putMethod = { put: { method: 'put' } };

        let muscleResource = $resource('/muscle/:muscleId', null, putMethod);
        let bodyPartResource = $resource('/bodypart/:bodyPartId', null, putMethod);
        let exerciseResource = $resource('/exercise/:exerciseId', null, putMethod);

        let authentication = $resource('/', null, {
            login: {
                method: 'post',
                url: '/login',
            },
            register: {
                method: 'post',
                url: '/register',
            },
            facebookLogin: {
                method: 'post',
                url: '/facebookLogin'
            }
        });

        return {
            addMuscle: function(muscleInfo) {
                return muscleResource.save(null, muscleInfo).$promise.then(function(result) {
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
                    messagingService.addError('updating muscle "' + muscleInfo.muscleName + '" failed.');
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
                    messagingService.addError('Failed to delete muscle "' + error.muscleName + '" failed.');
                    throw error;
                });
            },
            addBodyPart: function(bodyPartInfo) {
                return bodyPartResource.save(null, bodyPartInfo).$promise.then(function(result) {
                    messagingService.addSuccess('Saved Body Part "' + bodyPartInfo.bodyPartName + '.');
                    return result;
                }).catch(function(error) {
                    messagingService.addError('Updating bodyPart "' + bodyPartInfo.bodyPartName + '" failed.');
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
                    messagingService.addSuccess('Delted Body Part "' + bodyPartInfo.bodyPartName + '.');
                    return result;
                }).catch(function(error) {
                    $log.error(error);
                    messagingService.addError('Deleteing bodyPart  failed.');
                    throw error;
                });
            },
            addExercise: function(exerciseInfo) {
                return exerciseResource.save(null, exerciseInfo).$promise.then(function(result) {
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
                    messagingService.addSuccess('Deleting Exercise "' + exerciseInfo.exerciseName + '.');
                    return result;
                }).catch(function(error) {
                    $log.error(error);
                    messagingService.addError('Deleting exercise  failed.');
                    throw error;
                });
            },

            register: function(user) {
                return exerciseResource.register(null, user).$promise.then(function(result) {
                    messagingService.addSuccess('Created new account.');
                    return result;
                }).catch(function(error) {
                    $log.error(error);
                    messagingService.addError('Sorry could not creat a new account.');
                    throw error;
                });
            },
            login: function(user) {
                return authentication.login(null, user).$promise.then(function(result) {
                    messagingService.addSuccess('Logged in.');
                    auth.setToken(result.jwt);
                    return result;
                }).catch(function(error) {
                    $log.error(error);
                    messagingService.addError('Sorry could not match your user name or password.');
                    throw error;
                });
            },
            register: function(user) {
                return authentication.register(null, user).$promise.then(function(result) {
                    messagingService.addSuccess('Logged in.');
                    auth.setToken(result.jwt);
                    return result;
                }).catch(function(error) {
                    $log.error(error);
                    messagingService.addError('Registration failed.');
                    throw error;
                });
            },
            facebookLogin: function(code) {
                return authentication.facebookLogin(null, { code: code }).$promise.then(function(result) {
                    messagingService.addSuccess('Logged in with facebook.');
                    auth.setToken(result.jwt);
                    return result;
                }).catch(function(error) {
                    $log.error(error);
                    messagingService.addError('Failed to authenticate');
                    throw error;
                });
            }
        };
    }]);
}());