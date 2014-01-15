angular.module("cubeApp")
    .controller("cubeCtrl", function ($scope, flickr) {
        if ($scope.tag) {
            flickr.getPhotos($scope.tag)
                .then(function (imgArray) {
                    $scope.img = imgArray;
                });
        }
    });