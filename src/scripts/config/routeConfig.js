angular.module("cubeApp")
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "CubeListCtrl",
                templateUrl: "views/cubeList.html"
            })
            .when("/:tag", {
                controller: "singleTagCubeCtrl",
                templateUrl: "views/singleTagCube.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    });