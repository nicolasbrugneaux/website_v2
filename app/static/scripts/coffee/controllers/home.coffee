myApp.controller('HomeCtrl',
	[ '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar',
	($scope, $rootScope, sharedProperties, $location, progress) ->
		progress.start()
		$scope.data.location = $location
		setTimeout( () ->
			$(".has-tooltip").tooltip()
			progress.complete()
		, 500)
	]
)