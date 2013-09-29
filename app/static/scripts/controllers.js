(function() {
  'use strict';
  /*
  	@Controllers
  */

  var myApp;

  myApp = angular.module('myApp.controllers', []);

  myApp.controller('AppCtrl', function($scope, $http) {
    var http;
    http = $http({
      method: 'GET',
      url: '/api/name'
    });
    http.success(function(data, status, headers, config) {
      return $scope.name = data.name;
    });
    return http.error(function(data, status, headers, config) {
      return $scope.name = 'Error!';
    });
  });

  myApp.controller('MyCtrl1', function($scope) {});

  myApp.controller('MyCtrl2', function($scope) {});

}).call(this);
