angular
.module('app')
.controller('NewProjectController',['LocalStorageService','$scope','$state',function(LocalStorageService, $scope, $state){
    $scope.newProject = {
        title: "",
        description: "",
        required: 0,
        received: 0,
        posted: 0,
        backers: []
    }

    $scope.createNewProject = function() {
        var uid = LocalStorageService.getSession()._id;
        $scope.newProject.uid = uid;
        LocalStorageService.addProject($scope.newProject);
        $state.go('app.explore');
    }

}]);