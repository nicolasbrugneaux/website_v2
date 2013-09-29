'use strict'

###
	@Directives
###

myApp = angular.module('myApp.directives', [])

myApp.directive('appVersion', (version) ->
	(scope, elm, attrs) ->
		elm.text(version)
)
