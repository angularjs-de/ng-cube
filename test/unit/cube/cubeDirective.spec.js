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

        scope.x = 1;
        scope.y = 2;
        scope.z = 3;

        var element = $compile('<cube></cube>')(scope);

        $rootScope.$apply();

        expect(element.find("input[ng-model='x']").val()).toBe("1");
        expect(element.find("input[ng-model='y']").val()).toBe("2");
        expect(element.find("input[ng-model='z']").val()).toBe("3");

        testString = testTemplate
            .replace("{{x}}", "1")
            .replace("{{y}}", "2")
            .replace("{{z}}", "3");

        expect(element.find('div.perspective > div.cube').attr("style")).toBe(testString);

        scope.x = 101;
        scope.y = 102;
        scope.z = 103;

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

});