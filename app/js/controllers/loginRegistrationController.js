(function() {

    var app = angular.module('SimpleWorkoutPlanner');

    var controller = function($scope, $location, $window, adminService, messagingService) {
        $scope.user = {};
        $scope.register = () => {
            if ($scope.checkPasswords())
                adminService.register($scope.user).then(goHome);
        }

        $scope.login = () => {
            adminService.login($scope.user).then(goHome).catch(function(err) {
                $('body').append(err)
            });
        }

        function goHome() {
            $location.path('/');
        }

        $scope.checkPasswords = function() {
            messagingService.clearMessages();
            if ($scope.user.password != $scope.passwordCheck) {
                messagingService.addError('Passwords do not match');
                return false;
            }
            return true;
        }

        function loginToFaceBook(code) {
            if (code.origin = $window.location.origin) {
                console.log(code.data);
            }
            adminService.facebookLogin(code.data).then(goHome);
            $scope.loginPopup.close();
            $window.removeEventListener('message', loginToFaceBook);
        }

        redirectURl = encodeURIComponent(`http://${$location.host()}:${$location.port()}/`);

        $scope.facebookAuth = function() {
            //todo make redirect url generic
            var facebook = `https://www.facebook.com/v2.8/dialog/oauth?client_id=151274692068121&redirect_uri=${redirectURl}&display=popup&request_type=code$scope=public_profile`
            $scope.loginPopup = $window.open(facebook, '_blank', 'height=500,width=600', false)
            $scope.loginPopup.focus();

            $window.addEventListener('message', loginToFaceBook);
        }
    }

    app.controller('loginRegisterController', ['$scope', '$location', '$window', 'admin', 'messagingService', controller])

}())