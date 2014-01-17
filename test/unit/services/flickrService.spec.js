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


  describe("getPhotosByTag method", function () {

    var flickrService;

    beforeEach(inject(function (flickr) {
      flickrService = flickr;
    }));

    it("should be defined", function () {
      expect(flickrService.getPhotosByTag).toBeDefined();
    });

    it("should be a function", function () {
      expect(flickrService.getPhotosByTag instanceof Function).toBe(true);
    });

  });


});