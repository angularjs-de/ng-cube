angular.module("cubeApp")
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                controller: "CubeListCtrl",
                templateUrl: "views/cubeList.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    });