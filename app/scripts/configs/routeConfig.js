angular.module("cubeApp")
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/landing.html"
            })
            .when("/:tag", {
                controller: "singleTagCube",
                templateUrl: "views/singleTagCube.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    });