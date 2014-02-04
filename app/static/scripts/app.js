(function() {
  'use strict';
  /*
    @app: Declare app level module which depends on filters, and services
  */

  var myApp;

  myApp = angular.module('myApp', ['ngProgress', 'ngSanitize', 'myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']);

  myApp.factory('sharedProperties', function($rootScope) {
    var list, sharedProperties;
    sharedProperties = {};
    list = {};
    sharedProperties.get = function(name) {
      return list[name];
    };
    sharedProperties.set = function(name, value) {
      list[name] = value;
      return $rootScope.$broadcast(name.concat('Event'), list);
    };
    sharedProperties.all = function() {
      return list;
    };
    return sharedProperties;
  });

  myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/home',
      controller: 'HomeCtrl'
    });
    $routeProvider.when('/about', {
      templateUrl: 'partials/about',
      controller: 'AboutCtrl'
    });
    $routeProvider.when('/skills', {
      templateUrl: 'partials/skills',
      controller: 'SkillsCtrl'
    });
    $routeProvider.when('/contact', {
      templateUrl: 'partials/contact',
      controller: 'ContactCtrl'
    });
    $routeProvider.when('/blog', {
      templateUrl: 'partials/blog',
      controller: 'BlogCtrl'
    });
    $routeProvider.when('/blog/article/:slug', {
      templateUrl: 'partials/article',
      controller: 'ArticleCtrl'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
    return $locationProvider.html5Mode(true);
  });

}).call(this);
