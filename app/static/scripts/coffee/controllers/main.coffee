'use strict'

###
	@Controllers
###

myApp = angular.module('myApp.controllers', [])

myApp.controller('AppCtrl',
	[ '$scope', '$rootScope', 'sharedProperties', 'progressbar',
	($scope, $rootScope, sharedProperties, progress) ->
		
	]
)

myApp.controller('MainCtrl', 
	[ '$scope', '$rootScope', 'sharedProperties','$location', 'progressbar',
	($scope, $rootScope, sharedProperties, $location, progress) ->
		$scope.init = () ->
			slide_notifications()
			create_dynamic_menu()

		$scope.data =
			location: $location
			info:
				email: "nicolas.brugneaux@gmail.com"
				author: "Nicolas Brugneaux"
				date_creation: new Date("October 1, 2013")
				repository: "https://github.com/nicolasbrugneaux/website_v2"
				name: "nicolasbrugneaux.me"
				phone: '+336 42 24 38 46'
				skype: 'nicolas.brugneaux'
				photo: 'https://graph.facebook.com/nicolas.brugneaux/picture?width=140&height=140'
			links:
				social: [
					{
						name: "Twitter"
						link: "https://twitter.com/nbrugneaux"
						class: "twitter"
					}
					{
						name: "Github"
						link: "https://github.com/nicolasbrugneaux"
						class: "github"
					}
					{
						name: "Facebook"
						link: "https://facebook.com/nicolas.brugneaux"
						class: "facebook"
					}
					{
						name: "Google+"
						link: "https://plus.google.com/113934921579560371005"
						class: "google-plus"
					}
					{
						name: "LinkedIn"
						link: "http://www.linkedin.com/profile/view?id=267950653"
						class: "linkedin"
					}
				]
				navigation: [
					{
						name: 'Home'
						link: '/'
					}
					{
						name: 'About'
						link: '/about'
					}
					{
						name: 'Skills'
						link: '/skills'
					}
					{
						name: 'Contact'
						link: '/contact'
					}
				]
	]
)

create_dynamic_menu = () ->
	menu = $( '#bt-menu' )
	trigger = $( '#bt-menu a.bt-menu-trigger' )
	overlay = $('<div>').addClass('bt-overlay')
	menu_links = $('#bt-menu ul.nav-menu')
	menu.append( overlay )
	resetMenu = () ->
			$('#bt-menu').removeClass('bt-menu-open')
			$('#bt-menu').addClass( 'bt-menu-close' )
	closeClickFn = ( ev ) ->
		resetMenu()
		overlay.off( 'click', closeClickFn )


	trigger.on( 'click', ( ev ) =>
		ev.stopPropagation()
		ev.preventDefault()
		
		if( $('#bt-menu').hasClass( 'bt-menu-open' ) )
			resetMenu()

		else
			$('#bt-menu').removeClass( 'bt-menu-close' )
			$('#bt-menu').addClass( 'bt-menu-open' )
			overlay.on( 'click', closeClickFn )
			menu_links.on( 'click', 'li', closeClickFn )

	)

slide_notifications = () ->
	if $(".notifications").children().size() == 1
		$(".notifications").hide()
	else 
		$(".notifications").slideUp(0).slideDown(150).delay(5000).slideUp(150)