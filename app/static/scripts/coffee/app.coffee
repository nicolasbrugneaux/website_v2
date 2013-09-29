'use strict'

###
	@app: Declare app level module which depends on filters, and services
###

myApp = angular.module('myApp', [
	'myApp.controllers'
	'myApp.filters'
	'myApp.services'
	'myApp.directives'
])

myApp.config( ($routeProvider, $locationProvider) ->
	$routeProvider.when('/view1', {
		templateUrl: 'partials/partial1',
		controller: 'MyCtrl1'
	})
	$routeProvider.when('/view2', {
		templateUrl: 'partials/partial2',
		ontroller: 'MyCtrl2'
	})
	$routeProvider.otherwise({
		redirectTo: '/'
	})

	$locationProvider.html5Mode(true)
)