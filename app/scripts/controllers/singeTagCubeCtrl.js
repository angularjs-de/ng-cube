angular.module("cubeApp")
    .controller("singleTagCubeCtrl", function ($scope, $routeParams) {
        $scope.paramTag = $routeParams.tag;
    });