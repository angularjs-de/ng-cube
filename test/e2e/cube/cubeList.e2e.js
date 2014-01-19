describe("A CubeList View", function () {

  var webServerUrl = 'http://localhost:8080/';
  beforeEach(function () {
    browser.get(webServerUrl);
  });

  it("should include angularjs", function () {
    expect(element(by.tagName('script')).getAttribute('src')).toBe(webServerUrl + 'lib/angular/angular.js');
  });

  it("should include cube styles", function () {
    expect(element(by.tagName('link')).getAttribute('href')).toBe(webServerUrl + 'styles/cube.css');
  });

  it("should contain three input-elements with bindings to x,y and z", function () {
    expect(element(by.model('x')).getAttribute("value")).toBeDefined();
    expect(element(by.model('y')).getAttribute("value")).toBeDefined();
    expect(element(by.model('z')).getAttribute("value")).toBeDefined();
  });

  it("should contain a button-element with binding addCube", function () {
    var button = element(by.css("button.addCube"));
    expect(button.getAttribute("ng-click")).toBe("addCube(x,y,z,tag)");
  });


  it("should add a cube on button.addCube click", function () {
    var addButton = element(by.css("button.addCube"));
    element.all(by.repeater('cube in cubes'))
      .then(function (rows) {
        expect(rows.length).toBe(0);
      });
    addButton.click()
      .then(function () {
        return element.all(by.repeater('cube in cubes'));
      })
      .then(function (rows) {
        expect(rows.length).toBe(1);
      });
  });

  it("should add a cube on button.addCube click", function () {
    var addButton = element(by.css("button.addCube"));
    expect(element(by.repeater('cube in cubes').row(0)).isPresent()).toBe(false);

    addButton.click()
      .then(function () {
        expect(element(by.repeater('cube in cubes').row(0)).isPresent()).toBe(true);
      });
  });


  it("should remove a cube on button.removeCube click", function () {
    var addButton = element(by.css("button.addCube"));
    expect(element(by.repeater('cube in cubes').row(0)).isPresent()).toBe(false);

    addButton.click()
      .then(function () {
        expect(element(by.repeater('cube in cubes').row(0)).isPresent()).toBe(true);
      });

    var listElement = element(by.repeater('cube in cubes').row(0));

    listElement.findElement(by.css(".removeCube")).click()
      .then(function () {
        expect(element(by.repeater('cube in cubes').row(0)).isPresent()).toBe(false);
      });


  });

});