describe("A CubeList-Controller", function () {

    beforeEach(module('cubeApp'));

    var $controller,
        $rootScope;

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    it("should exists", function () {
        var scope = $rootScope.$new;
        $controller("CubeListCtrl", {$scope: scope});
    });

    it("should create an array at scope.cubes", function () {
        var scope = $rootScope.$new;
        $controller("CubeListCtrl", {$scope: scope});
        expect(scope.cubes instanceof Array).toBeTruthy();
    });

});