myApp.controller('BlogCtrl', 
	[ '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', '$http'
	($scope, $rootScope, sharedProperties, $location, progress, $http) ->
		$scope.data.location = $location
		$scope.blog = {
			articles: []
			no_more_article: false
		}
		$scope.init = () ->
			limit = 4
			$scope.search(0,limit)

		$scope.search = (offset, limit) ->
			progress.start()
			query = $http.get(
				"/api/blog?
				offset=#{offset}
				&limit=#{limit}")
			.then(
				# success
				(response) ->
					for article in response.data.articles
						$scope.blog.articles.push(article)
					if response.data.articles.length < 4
						$scope.blog.no_more_article = true
					progress.complete()
					$(".has-tooltip").tooltip()
				# error
				(response) ->
					console.log 'An error has occurred: ' + response
					progress.complete()

			)
	]
)