(function() {

    var app = angular.module('SimpleWorkoutPlanner');

    var controller = function($scope, $location, adminService, messagingService) {
        $scope.user = {};
        $scope.register = () => {
            if (checkPasswords())
                adminService.register($scope.user).then(goHome);
        }

        $scope.login = () => {
            adminService.login($scope.user).then(goHome);
        }

        function goHome() {
            $location.path('/');
        }

        function checkPasswords() {
            messagingService.clearMessages();
            if ($scope.user.password != $scope.passwordCheck) {
                messagingService.addError('Passwords do not match');
                return false;
            }
            return true;
        }
    }

    app.controller('loginRegisterController', ['$scope', '$location', 'admin', 'messagingService', controller])

}())