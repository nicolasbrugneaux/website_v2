(function() {
  'use strict';
  /*
  	@Controllers
  */

  var myApp;

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

}).call(this);
