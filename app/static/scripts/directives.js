(function() {
  'use strict';
  /*
    @Directives
  */

  var myApp;

  myApp = angular.module('myApp.directives', []);

  myApp.directive('appVersion', function(version) {
    return function(scope, elm, attrs) {
      return elm.text(version);
    };
  });

}).call(this);
