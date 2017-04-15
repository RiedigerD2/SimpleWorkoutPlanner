/**
 * adds authentication token as header
 */
(function() {
    var app = angular.module('SimpleWorkoutPlanner');

    app.factory('httpAuthentication', ['auth', function(auth) {

        return {
            request: function(config) {
                var token = auth.getToken();

                if (token)
                    config.headers.Authorization = 'bearer ' + token;
                return config;
            },
            resonse: function(response) {
                return response;
            }
        }
    }])

}())