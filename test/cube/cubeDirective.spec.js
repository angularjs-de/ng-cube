describe("A Cube-Directive", function () {

  beforeEach(module('cubeApp'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it("should contain the correct template", function () {
    var scope = $rootScope.$new();
    var element = $compile('<cube></cube>')(scope);

    $rootScope.$apply();

    expect(element.html()).toBeDefined();
    expect(element.find("input").length).toBe(3);
    expect(element.find('div.perspective').length).toBe(1);
    expect(element.find('div.perspective > div.cube').length).toBe(1);
    expect(element.find('div.perspective > div.cube').children().length).toBe(6);

    expect(element.find('div.perspective > div.cube .front').html()).toBeDefined();
    expect(element.find('div.perspective > div.cube .back').html()).toBeDefined();
    expect(element.find('div.perspective > div.cube .top').html()).toBeDefined();
    expect(element.find('div.perspective > div.cube .left').html()).toBeDefined();
    expect(element.find('div.perspective > div.cube .right').html()).toBeDefined();
    expect(element.find('div.perspective > div.cube .bottom').html()).toBeDefined();
  });


  it("should bind x,y,z to css attribute transform of the cube", function () {
    var testTemplate = "-webkit-transform: rotateX({{x}}deg) rotateY({{y}}deg) rotate({{z}}deg)",
        testString;
    var scope = $rootScope.$new();

    var element = $compile('<cube init-x="1" init-y="2" init-z="3"></cube>')(scope);

    $rootScope.$apply();

    expect(element.find("input[ng-model='x']").val()).toBe("1");
    expect(element.find("input[ng-model='y']").val()).toBe("2");
    expect(element.find("input[ng-model='z']").val()).toBe("3");

    testString = testTemplate
        .replace("{{x}}", "1")
        .replace("{{y}}", "2")
        .replace("{{z}}", "3");

    expect(element.find('div.perspective > div.cube').attr("style")).toBe(testString);

    var cubeScope = angular.element(element.children()).scope();
    cubeScope.x = 101;
    cubeScope.y = 102;
    cubeScope.z = 103;

    $rootScope.$apply();

    expect(element.find("input[ng-model='x']").val()).toBe("101");
    expect(element.find("input[ng-model='y']").val()).toBe("102");
    expect(element.find("input[ng-model='z']").val()).toBe("103");

    testString = testTemplate
        .replace("{{x}}", "101")
        .replace("{{y}}", "102")
        .replace("{{z}}", "103");

    expect(element.find('div.perspective > div.cube').attr("style")).toBe(testString);

  });

  it("should create an own scope", function () {
    var scope = $rootScope.$new();

    var element = $compile('<cube id="A"></cube><cube id="B"></cube>')(scope);

    var cubeA = element,
        cubeB = element.next();

    $rootScope.$apply();

    var scopeA = angular.element(cubeA.children()).scope(),
        scopeB = angular.element(cubeB.children()).scope();

    expect(scopeA.$id).not.toBe(scopeB.$id);
  });

  it("should create an isolated scope", function () {
    var scope = $rootScope.$new();

    scope.x = 1;

    var element = $compile('<cube id="A"></cube><cube id="B"></cube>')(scope);

    $rootScope.$apply();


    var cubeA = element,
        cubeB = element.next();
    var scopeA = angular.element(cubeA.children()).scope(),
        scopeB = angular.element(cubeB.children()).scope();

    expect(scopeA.$id).not.toBe(scope.$id);
    expect(scopeB.x).not.toBe(scope.x);

  });


  it("should define a tag attribute", inject(function ($q, flickr) {

    spyOn(flickr, "getPhotosByTag").andReturn($q.when());

    var scope = $rootScope.$new();
    scope.tag = "exampleTag";

    var element = $compile('<cube tag="abc123"></cube><cube tag="{{tag}}"></cube>')(scope);

    $rootScope.$apply();

    var cubeA = element,
        cubeB = element.next();
    var scopeA = angular.element(cubeA.children()).scope(),
        scopeB = angular.element(cubeB.children()).scope();

    expect(scopeA.tag).toBe("abc123");
    expect(scopeB.tag).toBe(scope.tag);


  }));


  it("should set response images to cube ", inject(function ($httpBackend, $q, flickr) {

    var flickrResponse = {
      photos: {
        photo: [
          {
            farm: "FARM",
            server: "SERVER",
            id: "1",
            secret: "SECRET"
          },
          {
            farm: "FARM",
            server: "SERVER",
            id: "2",
            secret: "SECRET"
          },
          {
            farm: "FARM",
            server: "SERVER",
            id: "3",
            secret: "SECRET"
          },
          {
            farm: "FARM",
            server: "SERVER",
            id: "4",
            secret: "SECRET"
          },
          {
            farm: "FARM",
            server: "SERVER",
            id: "5",
            secret: "SECRET"
          },
          {
            farm: "FARM",
            server: "SERVER",
            id: "6",
            secret: "SECRET"
          }
        ]
      }
    };
    $httpBackend
        .when('GET', new RegExp('http\\:\\/\\/api\\.flickr\\.com\\/services\\/rest\/[a-zA-Z0-9^?^=^&^.^_]*'))
        .respond(flickrResponse);

    var scope = $rootScope.$new();
    scope.tag = "exampleTag";

    var element = $compile('<cube tag="abc123"></cube>')(scope);

    $httpBackend.flush();
    $rootScope.$apply();

    var cubeA = element,
        scopeA = angular.element(cubeA.children()).scope();

    console.log(scopeA.img);
    expect(scopeA.img instanceof Array).toBe(true);
    expect(scopeA.img.length).toBe(6);

    var checkStyle = 'background-image: url(http://farmFARM.staticflickr.com/SERVER/%ID%_SECRET.jpg)';
    expect(element.find('div.front').attr("style")).toBe(checkStyle.replace("%ID%",1));
    expect(element.find('div.back').attr("style")).toBe(checkStyle.replace("%ID%",2));
    expect(element.find('div.top').attr("style")).toBe(checkStyle.replace("%ID%",3));
    expect(element.find('div.bottom').attr("style")).toBe(checkStyle.replace("%ID%",4));
    expect(element.find('div.left').attr("style")).toBe(checkStyle.replace("%ID%",5));
    expect(element.find('div.right').attr("style")).toBe(checkStyle.replace("%ID%",6));


  }));

});