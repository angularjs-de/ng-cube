angular.module("cubeApp")
    .controller("CubeListCtrl", function ($scope) {
        $scope.cubes = [];

        $scope.addCube = function (cube) {
            $scope.cubes.push(cube);
        }

        $scope.removeCube = function (index) {
            $scope.cubes.splice(index,1);
        }
    });