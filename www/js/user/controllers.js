/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('user.controllers', [])
    .controller('LoginCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {
            console.log("LoginCtrl");

            // debugger;

            // ng-model holding values from view/html
            
            UserService.init();
            $scope.creds = {
                //username: "adminuser",
                //password: "password"
            };

            // /**
            //  *
            //  */
            $scope.doLogoutAction = function () {
                UserService.logout()
                    .then(function (_response) {
                        // transition to next state
                        $state.go('app-login');
                    }, function (_error) {
                        alert("error logging in " + _error.debug);
                    })
            };

            /**
             *
             */
            $scope.doLogIn = function () {
                console.log("in doLogin Function");
                console.log($scope.creds.username, $scope.creds.password);
                UserService.login($scope.creds.username, $scope.creds.password)
                    .then(function (_response) {

                        alert("login success " + _response.attributes.username);

                        // transition to next state
                        $state.go('app.profile');

                    }, function (_error) {
                        alert("error logging in " + _error.message);
                    })
            };
        }])
    .controller('SignUpCtrl', [
         '$state', '$scope', 'UserService',   // <-- controller dependencies
         function ($state, $scope, UserService) {

             $scope.creds = {};

             /**
              *
              */
             $scope.signUpUser = function () {

                 UserService.init();

                 UserService.createUser($scope.creds).then(function (_data) {
                     $scope.user = _data;

                     alert("Success Creating User Account ");

                     $state.go('app.profile', {});

                 }, function (_error) {
                     alert("Error Creating User Account " + _error.debug)
                 });
             }
     
       }]);
       
       
       
       