angular.module("cubeApp")
    .controller("cubeCtrl", function ($scope, flickr) {
        flickr.getPhotos($scope.tags)
            .then(function (imgArray) {
                $scope.img = imgArray;
            });
    });