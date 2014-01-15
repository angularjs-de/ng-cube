angular.module("cubeApp")
    .controller("landingCtrl", function ($scope) {
        $scope.cubes = [];

        $scope.addCube = function (tag) {
            $scope.cubes.push({tag: tag});
        }

        $scope.removeCube = function (index) {
            $scope.cubes.splice(index, 1);
        }
    });