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

    it("should create an empty array at scope.cubes", function () {
        var scope = $rootScope.$new;
        $controller("CubeListCtrl", {$scope: scope});
        expect(scope.cubes instanceof Array).toBeTruthy();
        expect(scope.cubes.length).toBe(0);
    });

    it("should define a scope.addCube function", function () {
        var scope = $rootScope.$new;
        $controller("CubeListCtrl", {$scope: scope});
        expect(scope.addCube).toBeDefined();
        expect(scope.addCube instanceof Function).toBeTruthy();
    });



});