(function() {
    var app = angular.module('SimpleWorkoutPlanner');
    app.factory('auth', ['$window', function($window) {
        var storage = $window.localStorage;
        var cachedToken;
        var jwtToken = 'jwtToken';
        return {
            setToken: function(token) {
                cachedToken = token;
                storage.setItem(jwtToken, token);
            },
            getToken: function() {
                //todo logic for not logged in users
                if (!cachedToken)
                    cachedToken = storage.getItem(jwtToken);
                return cachedToken;
            },
            isAuthenticated: function() {
                //todo cookies for non logged in users 
                return !!this.getToken();
            },
            removeToken: function() {
                cachedToken = null;
                storage.removeItem(jwtToken);
            }
        }
    }])

}())