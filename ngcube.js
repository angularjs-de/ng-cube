angular.module('angularjsde.cube', []);
'use strict';
angular.module('angularjsde.cube').provider('flickr', function () {
  var API_KEY;
  this.apiKey = function (apiKey) {
    if (apiKey) {
      API_KEY = apiKey;
    }
    return apiKey;
  };
  this.$get = [
    '$http',
    function ($http) {
      var getPhotosByTagFn = function (tag) {
        return $http.get('http://api.flickr.com/services/rest/', {
          params: {
            method: 'flickr.photos.search',
            api_key: API_KEY,
            format: 'json',
            nojsoncallback: 1,
            per_page: '6',
            tags: tag,
            tag_mode: 'all'
          }
        }).then(function (response) {
          var array = response.data.photos.photo.map(function (photo) {
              return 'http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg'.replace('{farm-id}', photo.farm).replace('{server-id}', photo.server).replace('{id}', photo.id).replace('{secret}', photo.secret);
            });
          return array;
        });
      };
      return {
        getPhotosByTag: function (tag) {
          return getPhotosByTagFn(tag);
        },
        getApiKey: function () {
          return API_KEY;
        }
      };
    }
  ];
});
angular.module('angularjsde.cube').directive('cube', [
  'flickr',
  function (flickr) {
    return {
      restrict: 'E',
      templateUrl: 'views/cube.html',
      scope: {
        x: '@initX',
        y: '@initY',
        z: '@initZ',
        tag: '@'
      },
      link: function (scope) {
        if (scope.tag) {
          flickr.getPhotosByTag(scope.tag).then(function (imgArray) {
            scope.img = imgArray;
          });
        }
      }
    };
  }
]);
(function (module) {
  try {
    module = angular.module('angularjsde.cube');
  } catch (e) {
    module = angular.module('angularjsde.cube', []);
  }
  module.run([
    '$templateCache',
    function ($templateCache) {
      $templateCache.put('/srcviews/cube.html', '<div class="cube-container">\n' + '    <div class="inputs">\n' + '        X: <input type="range" min="0" max="360" step="1" ng-model="x"/>\n' + '        Y: <input type="range" min="0" max="360" step="1" ng-model="y"/>\n' + '        Z: <input type="range" min="0" max="360" step="1" ng-model="z"/>\n' + '    </div>\n' + '\n' + '    <div class="perspective">\n' + '        <div class="cube"\n' + '             style="-webkit-transform: rotateX({{x}}deg) rotateY({{y}}deg) rotate({{z}}deg)">\n' + '            <div class="front" style="background-image: url({{img[0]}})">front</div>\n' + '            <div class="back" style="background-image: url({{img[1]}})">back</div>\n' + '            <div class="top" style="background-image: url({{img[2]}})">top</div>\n' + '            <div class="bottom" style="background-image: url({{img[3]}})">bottom</div>\n' + '            <div class="left" style="background-image: url({{img[4]}})">left</div>\n' + '            <div class="right" style="background-image: url({{img[5]}})">right</div>\n' + '        </div>\n' + '    </div>\n' + '</div>');
    }
  ]);
}());