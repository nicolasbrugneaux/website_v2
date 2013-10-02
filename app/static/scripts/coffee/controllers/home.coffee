myApp.controller('HomeCtrl',
	[ '$scope', '$rootScope', 'sharedProperties', '$location', 'progressbar',
	($scope, $rootScope, sharedProperties, $location, progress) ->
		progress.start()
		$scope.data.location = $location
		$(".has-tooltip").tooltip()
		setTimeout( () ->
			progress.complete()
		, 500)
	]
)