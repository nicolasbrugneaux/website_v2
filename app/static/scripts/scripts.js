(function() {
  'use strict';
  /*
  	@app: Declare app level module which depends on filters, and services
  */

  var create_dynamic_menu, myApp, slide_notifications;

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
        slide_notifications();
        return create_dynamic_menu();
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
          skype: 'nicolas.brugneaux',
          photo: 'https://graph.facebook.com/nicolas.brugneaux/picture?width=140&height=140'
        },
        links: {
          social: [
            {
              name: "Twitter",
              link: "https://twitter.com/nbrugneaux",
              "class": "twitter"
            }, {
              name: "Github",
              link: "https://github.com/nicolasbrugneaux",
              "class": "github"
            }, {
              name: "Facebook",
              link: "https://facebook.com/nicolas.brugneaux",
              "class": "facebook"
            }, {
              name: "Google+",
              link: "https://plus.google.com/113934921579560371005",
              "class": "google-plus"
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

  create_dynamic_menu = function() {
    var closeClickFn, menu, menu_links, overlay, resetMenu, trigger,
      _this = this;
    menu = $('#bt-menu');
    trigger = $('#bt-menu a.bt-menu-trigger');
    overlay = $('<div>').addClass('bt-overlay');
    menu_links = $('#bt-menu ul.nav-menu');
    menu.append(overlay);
    resetMenu = function() {
      $('#bt-menu').removeClass('bt-menu-open');
      return $('#bt-menu').addClass('bt-menu-close');
    };
    closeClickFn = function(ev) {
      resetMenu();
      return overlay.off('click', closeClickFn);
    };
    return trigger.on('click', function(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      if ($('#bt-menu').hasClass('bt-menu-open')) {
        return resetMenu();
      } else {
        $('#bt-menu').removeClass('bt-menu-close');
        $('#bt-menu').addClass('bt-menu-open');
        overlay.on('click', closeClickFn);
        return menu_links.on('click', 'li', closeClickFn);
      }
    });
  };

  slide_notifications = function() {
    if ($(".notifications").children().size() === 1) {
      return $(".notifications").hide();
    } else {
      return $(".notifications").slideUp(0).slideDown(150).delay(5000).slideUp(150);
    }
  };

  myApp.controller('HomeCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      progress.start();
      $scope.data.location = $location;
      return setTimeout(function() {
        $(".has-tooltip").tooltip();
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
