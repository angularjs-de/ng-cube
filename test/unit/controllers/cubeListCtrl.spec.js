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

    describe("addCube Function", function () {
        it("should be defined", function () {
            var scope = $rootScope.$new;
            $controller("CubeListCtrl", {$scope: scope});
            expect(scope.addCube).toBeDefined();
            expect(scope.addCube instanceof Function).toBeTruthy();
        });

        it("should append objects to the scope.cubes array", function () {
            var testObject,
                scope = $rootScope.$new;
            $controller("CubeListCtrl", {$scope: scope});
            expect(scope.cubes.length).toBe(0);

            testObject = {};
            scope.addCube(testObject)

            expect(scope.cubes.length).toBe(1);
            expect(scope.cubes[0]).toBe(testObject);

            scope.addCube({});
            scope.addCube({});
            scope.addCube({});
            scope.addCube({});

            expect(scope.cubes.length).toBe(5);
            expect(scope.cubes[0]).toBe(testObject);
        });
    });

});