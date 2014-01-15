angular.module("cubeApp")
    .controller("cubeCtrl", function ($scope, flickr) {
        if ($scope.tags) {
            flickr.getPhotos($scope.tags)
                .then(function (imgArray) {
                    $scope.img = imgArray;
                });
        }
    });