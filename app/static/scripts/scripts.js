(function() {
  'use strict';
  /*
  	@app: Declare app level module which depends on filters, and services
  */

  var myApp;

  myApp = angular.module('myApp', ['ngProgress', 'myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']);

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
    $routeProvider.otherwise({
      redirectTo: '/'
    });
    return $locationProvider.html5Mode(true);
  });

  'use strict';

  /*
  	@Controllers
  */


  myApp = angular.module('myApp.controllers', []);

  myApp.controller('AppCtrl', ['$scope', '$rootScope', 'sharedProperties', 'progressbar', function($scope, $rootScope, sharedProperties, progress) {}]);

  myApp.controller('MainCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      $scope.init = function() {
        if ($(".notifications").children().size() === 1) {
          return $(".notifications").hide();
        } else {
          return $(".notifications").slideUp(0).slideDown(150).delay(5000).slideUp(150);
        }
      };
      return $scope.data = {
        location: $location,
        info: {
          email: "nicolas.brugneaux@gmail.com",
          author: "Nicolas Brugneaux",
          date_creation: new Date("October 1, 2013"),
          repository: "https://github.com/nicolasbrugneaux/website_v2",
          name: "nicolasbrugneaux.me",
          phone: '+336 42 24 38 46',
          skype: 'nicolas.brugneaux'
        },
        links: {
          social: [
            {
              name: "Twitter",
              link: "https://twitter.com/nbrugneaux",
              "class": "twitter-2"
            }, {
              name: "Github",
              link: "https://github.com/nicolasbrugneaux",
              "class": "github-5"
            }, {
              name: "Facebook",
              link: "https://facebook.com/nicolas.brugneaux",
              "class": "facebook-2"
            }, {
              name: "Google +",
              link: "https://plus.google.com/113934921579560371005",
              "class": "google-plus-4"
            }, {
              name: "LinkedIn",
              link: "http://www.linkedin.com/profile/view?id=267950653",
              "class": "linkedin"
            }
          ],
          navigation: [
            {
              name: 'Home',
              link: '/'
            }, {
              name: 'About',
              link: '/about'
            }, {
              name: 'Skills',
              link: '/skills'
            }, {
              name: 'Contact',
              link: '/contact'
            }
          ]
        }
      };
    }
  ]);

  myApp.controller('HomeCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      progress.start();
      $scope.data.location = $location;
      $(".has-tooltip").tooltip();
      return setTimeout(function() {
        return progress.complete();
      }, 500);
    }
  ]);

  myApp.controller('AboutCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      progress.start();
      $scope.data.location = $location;
      return setTimeout(function() {
        $(".has-tooltip").tooltip();
        return progress.complete();
      }, 500);
    }
  ]);

  myApp.controller('SkillsCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      progress.start();
      $scope.data.location = $location;
      return setTimeout(function() {
        $(".has-tooltip").tooltip();
        return progress.complete();
      }, 500);
    }
  ]);

  myApp.controller('ContactCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      progress.start();
      $scope.data.location = $location;
      return setTimeout(function() {
        $(".has-tooltip").tooltip();
        return progress.complete();
      }, 500);
    }
  ]);

  'use strict';

  /*
  	@Directives
  */


  myApp = angular.module('myApp.directives', []);

  myApp.directive('appVersion', function(version) {
    return function(scope, elm, attrs) {
      return elm.text(version);
    };
  });

  'use strict';

  /*
  	@Filters
  */


  myApp = angular.module('myApp.filters', []);

  myApp.filter('interpolate', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  });

  'use strict';

  /*
  	@Services
  */


  myApp = angular.module('myApp.services', []);

  myApp.value('version', '0.1');

}).call(this);
