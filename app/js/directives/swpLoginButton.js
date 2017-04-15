(function() {

    var app = angular.module('SimpleWorkoutPlanner');


    var loginButton = function() {
        return {
            restrict: 'E',
            scope: {

            },
            controller: function($scope, $location, auth) {
                $scope.login = function() {
                    $location.path('/login');
                }
                $scope.showLoginButton = function() {
                    return !auth.isAuthenticated() && $location.path() !== '/login' && $location.path() !== '/register';
                }
                $scope.showLogoutButton = function() {
                    return auth.isAuthenticated() && $location.path() !== '/login' && $location.path() !== '/register';
                }
                $scope.logout = function() {
                    auth.removeToken();
                    $location.path('/');
                }
            },
            link: function(scope, element, atributes) {

            },
            templateUrl: '../../html/directives/swpLoginButton.html'
        };
    };

    app.directive('swpLoginButton', [loginButton]);






}());