/* global module:false */
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		coffee: {
			compile: {
				files: {
					// 1:1 compile

					// angular scripts
					'./app/static/scripts/app.js': ['./app/static/scripts/coffee/app.coffee'],
					'./app/static/scripts/controllers.js': ['./app/static/scripts/coffee/controllers.coffee'],
					'./app/static/scripts/directives.js': ['./app/static/scripts/coffee/directives.coffee'],
					'./app/static/scripts/filters.js': ['./app/static/scripts/coffee/filters.coffee'],
					'./app/static/scripts/services.js': ['./app/static/scripts/coffee/services.coffee'],

					// node scripts
					'./app/app.js': ['./app/coffee/app.coffee'],

					'./app/routes/index.js': ['./app/routes/coffee/index.coffee'],
					'./app/routes/api.js': ['./app/routes/coffee/api.coffee']
				}
			}
		},
		less: {
			development: {
				options: {
					paths: ['./app/static/stylesheets/less'],
					yuicompress: false
				},
				files: {
					'./app/static/stylesheets/style.css': './app/static/stylesheets/less/style.less'
				}
			}/*,
			production: {
				options: {
					paths: ['.app/static/stylesheets/less'],
					yuicompress: true
				},
				files: {
					'./app/static/stylesheets/style.min.css': './app/static/stylesheets/less/style.less'
				}
			}*/
		},
		watch: {
			files: [
				'./app/static/stylesheets/less/*',
				'./app/static/scripts/coffee/*',
				'./app/coffee/*',
				'./app/routes/coffee/*'
			],
			tasks: ['less', 'coffee']
		}
	});

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', 'watch');
};