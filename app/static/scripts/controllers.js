(function() {
  'use strict';
  /*
  	@Controllers
  */

  var myApp;

  myApp = angular.module('myApp.controllers', []);

  myApp.controller('AppCtrl', [
    '$scope', '$rootScope', 'sharedProperties', 'progressbar', function($scope, $rootScope, sharedProperties, progress) {
      return $scope.init = function() {
        if ($(".notifications").children().size() === 1) {
          return $(".notifications").hide();
        } else {
          return $(".notifications").slideUp(0).slideDown(150).delay(5000).slideUp(150);
        }
      };
    }
  ]);

  myApp.controller('HomeCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      progress.start();
      $scope.data.location = $location;
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
        return progress.complete();
      }, 500);
    }
  ]);

  myApp.controller('SkillsCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      progress.start();
      $scope.data.location = $location;
      return setTimeout(function() {
        return progress.complete();
      }, 500);
    }
  ]);

  myApp.controller('ContactCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      progress.start();
      $scope.data.location = $location;
      return setTimeout(function() {
        return progress.complete();
      }, 500);
    }
  ]);

  myApp.controller('MainCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', function($scope, $rootScope, sharedProperties, $location, progress) {
      return $scope.data = {
        location: $location,
        info: {
          email: "nicolas.brugneaux@gmail.com",
          author: "Nicolas Brugneaux",
          date_creation: new Date("October 1, 2013"),
          repository: "https://github.com/nicolasbrugneaux/website_v2",
          name: "nicolasbrugneaux.me"
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
              name: "Google +",
              link: "https://plus.google.com/113934921579560371005",
              "class": "google-plus"
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

}).call(this);
