describe("A FlickrServiceProvider", function () {

  var exampleApiKey = "MyPublicApiKey";
  beforeEach(module('cubeApp', function (flickrProvider) {
    flickrProvider.apiKey(exampleApiKey);
  }));

  it("should set apiKey via provider", inject(function (flickr) {
    expect(flickr.getApiKey()).toBe(exampleApiKey);
  }));

});


describe("A FlickrService", function () {

  var $httpBackend;
  beforeEach(module('cubeApp', function (flickrProvider) {
    flickrProvider.apiKey("API_KEY");
  }));

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
        },
        basisRegex = 'http\\:\\/\\/api\\.flickr\\.com\\/services\\/rest\/',
        getRegexForKey = function (key, value) {
          return new RegExp(basisRegex + '[a-zA-Z0-9^?^=^&^.^_]*' + key + "=" + value + '[a-zA-Z0-9^?^=^&^.^_]*');
        };

    beforeEach(inject(function (flickr) {
      flickrService = flickr;
    }));

    beforeEach(function () {
      $httpBackend.when('GET', new RegExp(basisRegex + '[a-zA-Z0-9^?^=^&^.^_]*')).respond(flickrResponse);
    });

    it("should be defined", function () {
      expect(flickrService.getPhotosByTag).toBeDefined();
    });

    it("should be a function", function () {
      expect(flickrService.getPhotosByTag instanceof Function).toBe(true);
    });

    it("should request the correct method", function () {
      $httpBackend.expectGET(getRegexForKey('method', requestParams.method));
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request the correct api key", function () {
      $httpBackend.expectGET(getRegexForKey('api_key', requestParams.api_key));
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request format json", function () {
      $httpBackend.expectGET(getRegexForKey('format', requestParams.format));
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request nojsoncallback", function () {
      $httpBackend.expectGET(getRegexForKey('nojsoncallback', requestParams.nojsoncallback));
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request per_page", function () {
      $httpBackend.expectGET(getRegexForKey('per_page', requestParams.per_page));
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request the correct tags", function () {
      $httpBackend.expectGET(getRegexForKey('tags', queryTag));
      flickrService.getPhotosByTag(queryTag);
      $httpBackend.flush();
    });

    it("should request the correct tag_mode", function () {
      $httpBackend.expectGET(getRegexForKey('tag_mode', requestParams.tag_mode));
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
          .replace("{farm-id}", flickrResponse.photos.photo[0].farm)
          .replace("{server-id}", flickrResponse.photos.photo[0].server)
          .replace("{id}", flickrResponse.photos.photo[0].id)
          .replace("{secret}", flickrResponse.photos.photo[0].secret);

      expect(imgUrl).toBe(responseArray[0]);
    });

  });

});