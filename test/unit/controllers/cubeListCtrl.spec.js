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

  it("should create an array with default data", function () {
    var scope = $rootScope.$new;
    $controller("CubeListCtrl", {$scope: scope});
    expect(scope.cubes).toEqual([
      {x: 1, y: 1, z: 1},
      {x: 100, y: 100, z: 100},
      {x: 50, y: 150, z: 250}
    ]);
  });
});