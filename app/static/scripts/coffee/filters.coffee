'use strict'

# Filters

myApp = angular.module('myApp.filters', [])

myApp.filter('interpolate', (version) ->
	(text) ->
		String(text).replace(/\%VERSION\%/mg, version)
)
