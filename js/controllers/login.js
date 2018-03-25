angular
.module('app')
.controller('LoginController',['LocalStorageService','$scope','$state',function(LocalStorageService, $scope, $state){
    $scope.login = {
        name : "",
        password : "",
        error: ""
    }
    $scope.authenticate = function() {
        $scope.login.error = '';
        if(LocalStorageService.authenticate($scope.login)) {
            $state.go('app.explore');
        }
        else {
            $scope.login.error = 'Invalid credentials';
        }
    }
}]);