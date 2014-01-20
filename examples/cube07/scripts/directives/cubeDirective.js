angular.module("cubeApp")
    .directive("cube",function(){
    return {
        restrict: "E",
        templateUrl: "views/cube.html",
        scope: {
            "x" : "@initX",
            "y" : "@initY",
            "z" : "@initZ"
        }
    };
});