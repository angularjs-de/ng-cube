angular.module("cubeApp")
    .controller("CubeListCtrl", function ($scope) {
        $scope.cubes = [];

        $scope.addCube = function (cube) {
            $scope.cubes.push(cube);
        }
    });