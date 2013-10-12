myApp.controller('ArticleCtrl', 
	[ '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar', '$http', '$routeParams'
	($scope, $rootScope, sharedProperties, $location, progress, $http, $routeParams) ->
		$scope.data.location = $location
		$scope.article = {
			article: undefined
			validated_once: false
			add_comment: {
				author: ""
				email: ""
				body: ""
				id: undefined
			}
		}
		$scope.init = () ->
			$scope.view()

		$scope.view = (slug) ->
				progress.start()
				query = $http.get("/api/article/#{$routeParams.slug}")
				.then(
					# success
					(response) ->
						$scope.article.article = response.data
						$scope.article.add_comment.id = response.data._id
						progress.complete()
						$(".has-tooltip").tooltip()
						console.log $scope.article
					# error
					(response) ->
						console.log 'An error has occurred: ' + response
						progress.complete()

				)
		$scope.add_comment = () ->
			$scope.article.validated_once = true
			console.log($scope.article)
			if ($scope.article.add_comment.author != "" and $scope.article.add_comment.email != "" and $scope.article.add_comment.body != "" )
				progress.start()
				query = $http.post(
					"api/article/comment/",
					$scope.article.add_comment
				)
				.then(
					#  success
					(response) ->
						$scope.article.article.comments = response.data.comments
						$scope.article.add_comment.author = ""
						$scope.article.add_comment.email = ""
						$scope.article.add_comment.body = ""
						$scope.article.validated_once = false
						progress.complete()

					# error
					(response) ->
						console.log "An error has occured: "+response.data
						$scope.article.validated_once = false
						progress.complete()
				)
	]
)