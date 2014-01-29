angular.module("cubeApp")
  .directive("cube", function (flickr) {
    return {
      restrict: "E",
      templateUrl: "views/cube.html",
      scope: {
        x: "@initX",
        y: "@initY",
        z: "@initZ",
        tag: "@"
      },
      link: function (scope) {
        if (scope.tag) {
          flickr.getPhotosByTag(scope.tag)
            .then(function (imgArray) {
              scope.img = imgArray;
            });
        }
      }
    };
  });