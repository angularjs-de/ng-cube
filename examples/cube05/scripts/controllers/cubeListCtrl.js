angular.module("cubeApp")
  .controller("CubeListCtrl", function ($scope) {
    $scope.cubes = [
      {x: 1, y: 1, z: 1},
      {x: 100, y: 100, z: 100},
      {x: 50, y: 150, z: 250}
    ];
  });