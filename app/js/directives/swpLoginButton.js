(function() {

    var app = angular.module('SimpleWorkoutPlanner');


    var loginButton = function() {
        return {
            restrict: 'E',
            scope: {

            },
            controller: function($scope, $location) {
                $scope.login = function() {
                    $location.path('/login');
                }
                $scope.showButton = function() {
                    return $location.path() !== '/login';
                }
            },
            link: function(scope, element, atributes) {

            },
            templateUrl: '../../html/directives/swpLoginButton.html'
        };
    };

    app.directive('swpLoginButton', [loginButton]);






}());