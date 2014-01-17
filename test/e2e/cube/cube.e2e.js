describe("A initial project", function () {

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
    expect(button.getAttribute("ng-click")).toBe("addCube(x,y,z)");
  });

});