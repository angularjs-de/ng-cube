angular.module("cubeApp")
    .directive("cube",function(){
    return {
        restrict: "E",
        templateUrl: "views/cube.html",
        controller: "cubeCtrl",
        scope: {
            x : "@initX",
            y : "@initY",
            z : "@initZ",
            tag : "@"
        }
    };
});