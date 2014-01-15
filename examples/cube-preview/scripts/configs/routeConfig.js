angular.module("cubeApp")
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "landingCtrl",
                templateUrl: "views/landing.html"
            })
            .when("/:tag", {
                controller: "singleTagCubeCtrl",
                templateUrl: "views/singleTagCube.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    });