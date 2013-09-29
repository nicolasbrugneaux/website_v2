'use strict'

###
	@Controllers
###

myApp = angular.module('myApp.controllers', [])

myApp.controller('AppCtrl', ($scope, $http) ->

	http = $http({
		method: 'GET',
		url: '/api/name'
	})
	http.success( (data, status, headers, config) ->
		$scope.name = data.name
	)
	http.error( (data, status, headers, config) ->
		$scope.name = 'Error!'
	)
)

myApp.controller('MyCtrl1', ($scope) ->
	# write Ctrl here

)

myApp.controller('MyCtrl2', ($scope) ->
	# write Ctrl here

)