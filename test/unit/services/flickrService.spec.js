describe("A Flickr-Service", function () {

  beforeEach(module('cubeApp'));

  it("should exist", inject(function ($injector) {

    var flickrService;
    var testInject = function () {
      $injector.invoke(function (flickr) {
        flickrService = flickr;
      });
    };

    expect(testInject).not.toThrow();
    expect(flickrService).toBeDefined();

  }));


});