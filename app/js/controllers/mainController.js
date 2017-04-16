(function() {

    var app = angular.module('SimpleWorkoutPlanner');


    var controller = function($window, $location) {
        console.log($window.opener);
        console.log($window.location.origin);
        //console.log($window.opener.location.origin)

        if ($window.opener && $window.location.origin === $window.opener.location.origin) {
            var params = $window.location.search.substr(1).split('=');
            if (params[0] == 'code') {
                var code = params[1];
                $window.opener.postMessage(code, $window.location.origin);
            }
        }
    }

    app.controller('mainController', ['$window', '$location', controller])

}())