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
      models/
        coffee/
          models.coffee
        models.js
      app.js
      package.json        --> for npm
      static/             --> all of the files to be used in on the client side
        stylesheets/      --> css files
          less/
            vendor/
              bootstrap/      --> less files from bootstrap
                *.less
              fonts/
            style.less        --> stylesheets.less
          style.css       --> compiled stylesheet
        img/              --> image files
        scripts/               --> javascript files
          coffee/
            controllers/
              *.coffee          --> application controllers
            app.coffee          --> declare top-level app module
            directives.coffee   --> custom angular directives
            filters.coffee      --> custom angular filters
            services.coffee     --> custom angular services
          *.js            --> compiled coffeescript files
          lib/            --> angular and 3rd party JavaScript libraries
            vendor/
              angular/
                angular.js            --> the latest angular js
                angular.min.js        --> the latest minified angular js
                angular-*.js          --> angular add-on modules
                version.txt           --> version number
              bootstrap/
                bootstrap.js          --> latest bootstrap js
                bootstrap.min.js
              jquery/
                jquery.1.10.2.js      --> latest jquery js
                jquery.1.10.2.js
      routes/
        coffee/
          api.coffee           --> route for serving JSON
          index.coffee          --> route for serving HTML pages and partials
        *.js                  --> compiled coffeescript files
      views/
        index.jade        --> main page for app
        layout.jade       --> doctype, title, head boilerplate
        *.jade
        partials/         --> angular view partials (partial jade templates)
          *.jade
