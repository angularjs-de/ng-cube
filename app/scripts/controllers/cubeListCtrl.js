angular.module("cubeApp")
    .controller("CubeListCtrl", function ($scope) {
      $scope.cubes = [];

      $scope.addCube = function (xValue, yValue, zValue, tagValue) {
        $scope.cubes.push({x: xValue, y: yValue, z: zValue, tag: tagValue});
      }

      $scope.removeCube = function (index) {
        $scope.cubes.splice(index, 1);
      }
    });