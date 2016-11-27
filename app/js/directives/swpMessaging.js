(function () {

    var app = angular.module('SimpleWorkoutPlanner');


    var messaging = function (messagingService) {
        return {
            restrict: 'E',
            scope: {

            },
            controller: function () {

            },
            link: function (scope, element, atributes) {
                scope.messages = messagingService;

            },
            templateUrl: '../../html/directives/swpMessaging.html'
        };
    };

    app.directive('swpMessaging', ['messagingService', messaging]);






}());