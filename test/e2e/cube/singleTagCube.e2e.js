describe("A singleTag CubeView", function () {

  var webServerUrl = 'http://localhost:8080/';

  it("should set the h1 header to the url param tag", function () {
    var tag = "animal",
        tag2 = "noanimal";
    browser.get(webServerUrl + "#/" + tag);
    expect(element(by.tagName("h1")).getText()).toBe(tag.toUpperCase());
    browser.get(webServerUrl + "#/" + tag2);
    expect(element(by.tagName("h1")).getText()).toBe(tag2.toUpperCase());
  });

  it("should instantiate one cube", function () {
    var tag = "animal";
    browser.get(webServerUrl + "#/" + tag);

    browser.findElements(by.tagName("cube"))
        .then(function (cubes) {
          expect(cubes.length).toBe(1);
        });
  });

  it("should instantiate a cube with css class rotate", function () {
    var tag = "animal";
    browser.get(webServerUrl + "#/" + tag);

    browser.findElement(by.tagName("cube"))
        .then(function (cube) {
          expect(cube.getAttribute("class")).toContain("rotate");
        });
  });

  it("should add a div with class center", function () {
    var tag = "animal";
    browser.get(webServerUrl + "#/" + tag);
    expect(element(by.css("div.center")).isPresent()).toBe(true);
    expect(element(by.css("div.center cube")).isPresent()).toBe(true);
  });


});