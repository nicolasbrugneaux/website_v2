(function() {
  'use strict';
  /*
  	@Controllers
  */

  var create_dynamic_menu, myApp, slide_notifications;

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
            }, {
              name: 'Blog',
              link: '/blog'
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

  myApp.controller('BlogCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', '$http', function($scope, $rootScope, sharedProperties, $location, progress, $http) {
      $scope.data.location = $location;
      $scope.blog = {
        articles: [],
        no_more_article: false,
        last: 0,
        limit: 4
      };
      $scope.init = function() {
        return $scope.search($scope.blog.last, $scope.blog.limit);
      };
      return $scope.search = function(offset, limit) {
        var query;
        if (!$scope.blog.no_more_article) {
          progress.start();
          return query = $http.get("/api/blog?offset=" + offset + "&limit=" + limit).then(function(response) {
            var article, _i, _len, _ref;
            _ref = response.data.articles;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              article = _ref[_i];
              if ($scope.blog.articles.length === 0) {
                $scope.blog.articles.push({
                  article: article,
                  body_display: article.body.substr(0, 500) + "..."
                });
              } else {
                $scope.blog.articles.push({
                  article: article,
                  body_display: article.body.substr(0, 250) + "..."
                });
              }
            }
            if (response.data.articles.length < 4) {
              $scope.blog.no_more_article = true;
            }
            $scope.blog.last += response.data.articles.length;
            progress.complete();
            return $(".has-tooltip").tooltip();
          }, function(response) {
            console.log('An error has occurred: ' + response);
            return progress.complete();
          });
        }
      };
    }
  ]);

  myApp.controller('ArticleCtrl', [
    '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', '$http', '$routeParams', function($scope, $rootScope, sharedProperties, $location, progress, $http, $routeParams) {
      $scope.data.location = $location;
      $scope.article = {
        article: void 0,
        add_comment: {
          author: "",
          email: "",
          body: "",
          id: void 0
        }
      };
      $scope.init = function() {
        return $scope.view();
      };
      $scope.view = function(slug) {
        var query;
        progress.start();
        return query = $http.get("/api/article/" + $routeParams.slug).then(function(response) {
          $scope.article.article = response.data;
          $scope.article.add_comment.id = response.data._id;
          progress.complete();
          $(".has-tooltip").tooltip();
          return console.log($scope.article);
        }, function(response) {
          console.log('An error has occurred: ' + response);
          return progress.complete();
        });
      };
      return $scope.add_comment = function() {
        var query;
        if ($scope.article.add_comment.author !== "" && $scope.article.add_comment.email !== "" && $scope.article.add_comment.body !== "") {
          progress.start();
          return query = $http.post("api/article/comment/", $scope.article.add_comment).then(function(response) {
            $scope.article.article.comments = response.data.comments;
            $scope.article.add_comment.author = "";
            $scope.article.add_comment.email = "";
            $scope.article.add_comment.body = "";
            return progress.complete();
          }, function(response) {
            console.log("An error has occured: " + response.data);
            return progress.complete();
          });
        }
      };
    }
  ]);

}).call(this);
