myApp.controller('BlogCtrl',
  [ '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', '$http'
  ($scope, $rootScope, sharedProperties, $location, progress, $http) ->
    $scope.data.location = $location
    $scope.blog = {
      articles: []
      no_more_article: false
      last: 0
      limit: 4
    }
    $scope.init = () ->
      $scope.search($scope.blog.last,$scope.blog.limit)

    $scope.search = (offset, limit) ->
      if not $scope.blog.no_more_article
        progress.start()

        query = $http.get("/api/blog?offset=#{offset}&limit=#{limit}")
        .then(
          # success
          (response) ->
            for article in response.data.articles
              if $scope.blog.articles.length == 0
                $scope.blog.articles.push({
                  article: article
                  body_display: "#{article.body.substr(0, 500)}..."
                })
              else
                $scope.blog.articles.push({
                  article: article
                  body_display: "#{article.body.substr(0, 250)}..."
                })
            if response.data.articles.length < 4
              $scope.blog.no_more_article = true
            $scope.blog.last += response.data.articles.length
            progress.complete()
            $(".has-tooltip").tooltip()
          # error
          (response) ->
            console.log 'An error has occurred: ' + response
            progress.complete()

        )
  ]
)