# website_v2

I used [Angular Express Seed](https://github.com/btford/angular-express-seed) by btford
Then I customized with Grunt to use cofeescript and less more efficiently.
I'm still new with all of this.
  Stay tuned.
:-)


## Directory Layout
    app/
      coffee/
        app.coffee        --> app config
      app.js
      package.json        --> for npm
      static/             --> all of the files to be used in on the client side
        stylesheets/      --> css files
          less/
            *.less        --> stylesheets.less
          style.css       --> compiled stylesheet
        img/              --> image files
        scripts/               --> javascript files
          coffee/
            app.coffee          --> declare top-level app module
            controllers.coffee  --> application controllers
            directives.coffee   --> custom angular directives
            filters.coffee      --> custom angular filters
            services.coffee     --> custom angular services
          *.js            --> compiled coffeescript files
          lib/            --> angular and 3rd party JavaScript libraries
            angular/
              angular.js            --> the latest angular js
              angular.min.js        --> the latest minified angular js
              angular-*.js          --> angular add-on modules
              version.txt           --> version number
      routes/
        coffee/
          api.coffee           --> route for serving JSON
          index.coffee          --> route for serving HTML pages and partials
        *.js                  --> compiled coffeescript files
      views/
        index.jade        --> main page for app
        layout.jade       --> doctype, title, head boilerplate
        partials/         --> angular view partials (partial jade templates)
          partial1.jade
          partial2.jade
