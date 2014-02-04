(function() {
  'use strict';
  /*
    @Filters
  */

  var myApp;

  myApp = angular.module('myApp.filters', []);

  myApp.filter('interpolate', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  });

}).call(this);
