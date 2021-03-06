# global module:false
module.exports = () ->

  # Project configuration.
  @initConfig
  
    pkg: @file.readJSON 'package.json'

    coffee:
      development:
        options:
          join: true
        
        files:
          # 1:1 compile

          # angular js
          './app/static/scripts/app.js': ['./app/static/scripts/coffee/app.coffee']
          './app/static/scripts/controllers.js': [
            './app/static/scripts/coffee/controllers/main.coffee'
            './app/static/scripts/coffee/controllers/home.coffee'
            './app/static/scripts/coffee/controllers/about.coffee'
            './app/static/scripts/coffee/controllers/skills.coffee'
            './app/static/scripts/coffee/controllers/contact.coffee'
            './app/static/scripts/coffee/controllers/blog.coffee'
            './app/static/scripts/coffee/controllers/article.coffee'
          ]
          './app/static/scripts/directives.js': ['./app/static/scripts/coffee/directives.coffee']
          './app/static/scripts/filters.js': ['./app/static/scripts/coffee/filters.coffee']
          './app/static/scripts/services.js': ['./app/static/scripts/coffee/services.coffee']


          './app/app.js': ['./app/coffee/app.coffee']
          './app/models/models.js': ['./app/models/coffee/*.coffee']
          './app/routes/routes.js': ['./app/routes/coffee/*.coffee']

      production:
        options:
          join: true

        files:
          './app/static/scripts/scripts.js': [

            './app/static/scripts/coffee/app.coffee'

              './app/static/scripts/coffee/controllers/main.coffee'
              './app/static/scripts/coffee/controllers/home.coffee'
              './app/static/scripts/coffee/controllers/about.coffee'
              './app/static/scripts/coffee/controllers/skills.coffee'
              './app/static/scripts/coffee/controllers/contact.coffee'
              './app/static/scripts/coffee/controllers/blog.coffee'
              './app/static/scripts/coffee/controllers/article.coffee'

            './app/static/scripts/coffee/directives.coffee'
            './app/static/scripts/coffee/filters.coffee'
            './app/static/scripts/coffee/services.coffee'

          ]
          './app/app.js': ['./app/coffee/app.coffee']
          './app/models/models.js': ['./app/models/coffee/*.coffee']
          './app/routes/routes.js': ['./app/routes/coffee/*.coffee']
    
    less:
      development:
        options:
          paths: ['./app/static/stylesheets/less']
          yuicompress: false
        
        files: 
          './app/static/stylesheets/style.css': './app/static/stylesheets/less/style.less'
      
      production:
        options:
          banner: '/*!\n<%= pkg.name %> - v<%= pkg.version %>\n' +
            '@nicolasbrugneaux.me - style.min.css\n' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'
          paths: ['./app/static/stylesheets/less']
          yuicompress: true
        files:
          './app/static/stylesheets/style.min.css': './app/static/stylesheets/less/style.less'

    uglify:
      options:
        banner: '/*!\n<%= pkg.name %> - v<%= pkg.version %>\n' +
            '@nicolasbrugneaux.me - scripts.min.js\n' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'
        mangle: false
        sourceMap: './app/static/scripts/scripts.min.map'

      scripts_min:
        files:
          './app/static/scripts/scripts.min.js': ['./app/static/scripts/scripts.js']

    notify:
      default:
        options:
          title: 'Done, without errors.'
          message: 'Coffee and Less finished running.'

    watch:
      development:
        files: [
          './app/static/stylesheets/less/*.less'
          './app/static/stylesheets/less/vendor/bootstrap/*.less'
          './app/static/scripts/coffee/*.coffee'
          './app/static/scripts/coffee/controllers/*.coffee'
          './app/models/coffee/*.coffee'
          './app/routes/coffee/*.coffee'
          './app/coffee/*.coffee'
        ]
        tasks: [
          'less:development'
          'coffee:development'
          'notify'
        ]

      production:
        files: [
          './app/static/stylesheets/less/*.less'
          './app/static/stylesheets/less/bootstrap/*.less'
          './app/static/scripts/coffee/*.coffee'
          './app/static/scripts/coffee/controllers/*.coffee'
          './app/models/coffee/*.coffee'
          './app/routes/coffee/*.coffee'
          './app/coffee/*.coffee'
        ],
        tasks: [
          'less:production'
          'coffee:production'
          'uglify'
          'notify'
        ]

  @loadNpmTasks 'grunt-notify'
  @loadNpmTasks 'grunt-contrib-coffee'
  @loadNpmTasks 'grunt-contrib-less'
  @loadNpmTasks 'grunt-contrib-watch'
  @loadNpmTasks 'grunt-contrib-uglify'

  # Default task.
  @registerTask 'default', 'watch:development'
  @registerTask 'dev', ['less:development', 'coffee:development', 'notify:default']
  @registerTask 'prod', ['less:production', 'coffee:production', 'uglify', 'notify:default']