angular.module("cubeApp")
    .controller("singleTagCube", function ($scope, $routeParams) {
        $scope.paramTag = $routeParams.tag;
    });