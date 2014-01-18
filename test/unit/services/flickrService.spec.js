describe("A Flickr-Service", function () {

  var $httpBackend;
  beforeEach(module('cubeApp'));
  beforeEach(inject(function (_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

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

    var flickrService,
      queryTag = "animal",
      requestParams = {
        method: "flickr.photos.search",
        api_key: "API_KEY",
        format: "json",
        nojsoncallback: 1,
        per_page: "6",
        tag_mode: "all"
      },
      imgUrlFormat = "http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg",
      flickrResponse = {
        photos: {
          photo: [
            {
              farm: "FARM",
              server: "SERVER",
              id: "ID",
              secret: "SECRET"
            }
          ]
        }
      };

    beforeEach(inject(function (flickr) {
      flickrService = flickr;
    }));

    beforeEach(function () {
      $httpBackend.when('GET', 'http://api.flickr.com/services/rest/').respond(flickrResponse);
    });

    it("should be defined", function () {
      expect(flickrService.getPhotosByTag).toBeDefined();
    });

    it("should be a function", function () {
      expect(flickrService.getPhotosByTag instanceof Function).toBe(true);
    });

    it("should request a http GET to the flicker rest API", function () {
      $httpBackend.expectGET('http://api.flickr.com/services/rest/');
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });


    it("should request the correct method", function () {
      $httpBackend.expectGET('http://api.flickr.com/services/rest/', {method: requestParams.method});
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request the correct api key", function () {
      $httpBackend.expectGET('http://api.flickr.com/services/rest/', {api_key: requestParams.api_key});
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request format json", function () {
      $httpBackend.expectGET('http://api.flickr.com/services/rest/', {format: requestParams.format});
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request nojsoncallback", function () {
      $httpBackend.expectGET('http://api.flickr.com/services/rest/', {nojsoncallback: requestParams.nojsoncallback});
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request per_page", function () {
      $httpBackend.expectGET('http://api.flickr.com/services/rest/', {per_page: requestParams.per_page});
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request the correct tags", function () {
      $httpBackend.expectGET('http://api.flickr.com/services/rest/', {tags: queryTag});
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request the correct tag_mode", function () {
      $httpBackend.expectGET('http://api.flickr.com/services/rest/', {tag_mode: requestParams.tag_mode});
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });


    it("should transform response to an array", function () {
      var responseArray;
      flickrService.getPhotosByTag(queryTag)
        .then(function (response) {
          responseArray = response;
        });
      $httpBackend.flush();

      expect(responseArray instanceof Array).toBe(true);
    });

    it("should transform responseArray to correct flickr imgUrls", function () {
      var responseArray;
      flickrService.getPhotosByTag(queryTag)
        .then(function (response) {
          responseArray = response;
        });
      $httpBackend.flush();

      var imgUrl = imgUrlFormat
        .replace("{farm-id}", flickrResponse.farm)
        .replace("{server-id}", flickrResponse.server)
        .replace("{id}", flickrResponse.id)
        .replace("{secret}", flickrResponse.secret);

      expect(imgUrl).toBe(responseArray[0]);
    });

  });


})
;