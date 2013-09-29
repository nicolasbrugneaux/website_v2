'use strict'

###
	@app: Declare app level module which depends on filters, and services
###

myApp = angular.module('myApp', [
	'ngProgress'
	'myApp.controllers'
	'myApp.filters'
	'myApp.services'
	'myApp.directives'
])

myApp.factory('sharedProperties', ($rootScope) ->
	sharedProperties = {}
	list = {}
	sharedProperties.get = (name) ->
		list[name]

	sharedProperties.set = (name, value) ->
		list[name] = value
		$rootScope.$broadcast(name.concat('Event'), list)

	sharedProperties.all = () ->
		list

	sharedProperties
)

myApp.config( ($routeProvider, $locationProvider) ->
	$routeProvider.when('/', {
		templateUrl: 'partials/home'
		controller: 'HomeCtrl'
	})
	$routeProvider.when('/about', {
		templateUrl: 'partials/about',
		controller: 'AboutCtrl'
	})
	$routeProvider.when('/skills', {
		templateUrl: 'partials/skills',
		controller: 'SkillsCtrl'
	})
	$routeProvider.when('/contact', {
		templateUrl: 'partials/contact',
		controller: 'ContactCtrl'
	})
	$routeProvider.otherwise({
		redirectTo: '/'
	})

	$locationProvider.html5Mode(true)
)