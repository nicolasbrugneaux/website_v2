(function() {
  'use strict';
  var myApp;

  myApp = angular.module('myApp', ['myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']);

  myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    });
    $routeProvider.when('/view2', {
      templateUrl: 'partials/partial2',
      ontroller: 'MyCtrl2'
    });
    $routeProvider.otherwise({
      redirectTo: '/view1'
    });
    return $locationProvider.html5Mode(true);
  });

}).call(this);
