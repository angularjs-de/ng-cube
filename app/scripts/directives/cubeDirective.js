angular.module("cubeApp")
    .directive("cube",function(flickr){
    return {
        restrict: "E",
        templateUrl: "views/cube.html",
        link: function(scope){
            if (scope.tag) {
                flickr.getPhotos(scope.tag)
                    .then(function (imgArray) {
                        scope.img = imgArray;
                    });
            }
        },
        scope: {
            x : "@initX",
            y : "@initY",
            z : "@initZ",
            tag : "@"
        }
    };
});