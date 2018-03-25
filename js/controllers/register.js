angular
.module('app')
.controller('RegisterController',['LocalStorageService','$scope','$state',function(LocalStorageService, $scope, $state){
    $scope.user = {
        name: "",
        email: "",
        password: ""
    }
    $scope.createUser = function() {
        LocalStorageService.createUser($scope.user)
        $scope.user.name = $scope.user.email = $scope.user.password = '';
        $state.go('appSimple.login');
    }
}]);