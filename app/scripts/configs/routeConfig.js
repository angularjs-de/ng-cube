angular.module("cubeApp")
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/landing.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    });