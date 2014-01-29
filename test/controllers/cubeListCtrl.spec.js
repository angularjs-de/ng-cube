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

  it("should create an empty array at scope.cubes", function () {
    var scope = $rootScope.$new;
    $controller("CubeListCtrl", {$scope: scope});
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

      scope.addCube(1, 2, 3);

      expect(scope.cubes.length).toBe(1);
      expect(scope.cubes[0]).toEqual({x: 1, y: 2, z: 3});

      scope.addCube({});
      scope.addCube({});
      scope.addCube({});
      scope.addCube({});

      expect(scope.cubes.length).toBe(5);
      expect(scope.cubes[0]).toEqual({x: 1, y: 2, z: 3});
    });
  });

  describe("removeCube Function", function () {
    it("should be defined", function () {
      var scope = $rootScope.$new;
      $controller("CubeListCtrl", {$scope: scope});
      expect(scope.removeCube).toBeDefined();
      expect(scope.removeCube instanceof Function).toBeTruthy();
    });

    it("should append objects to the scope.cubes array", function () {
      var testObject1 = {},
        testObject2 = {},
        testObject3 = {},
        scope = $rootScope.$new;
      $controller("CubeListCtrl", {$scope: scope});

      scope.cubes = [testObject1, testObject2, testObject3];

      expect(scope.cubes.length).toBe(3);
      expect(scope.cubes[0]).toBe(testObject1);
      scope.removeCube(0);
      expect(scope.cubes.length).toBe(2);
      expect(scope.cubes[0]).toBe(testObject2);


      scope.cubes = [testObject1, testObject2, testObject3];

      expect(scope.cubes.length).toBe(3);
      expect(scope.cubes[0]).toBe(testObject1);
      scope.removeCube(1);
      expect(scope.cubes.length).toBe(2);
      expect(scope.cubes[0]).toBe(testObject1);
      expect(scope.cubes[1]).toBe(testObject3);
    });
  });
});