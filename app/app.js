/*
	Module dependencies
*/


(function() {
  var api, app, express, http, path, routes;

  express = require('express');

  http = require('http');

  path = require('path');

  routes = require('./routes');

  api = require('./routes/api');

  app = module.exports = express();

  /*
  	Configuration
  */


  app.set('port', process.env.PORT || 3000);

  app.set('views', __dirname + '/views');

  app.set('view engine', 'jade');

  app.use(express.logger('dev'));

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(express["static"](path.join(__dirname, 'static')));

  app.use('/static/public', express["static"](__dirname, 'public'));

  app.use(app.router);

  if (app.get('env') === 'development') {
    app.use(express.errorHandler());
  }

  if (app.get('env') === 'production') {
    void 0;
  }

  /*
  	Routes
  */


  app.get('/', routes.index);

  app.get('/partials/:name', routes.partials);

  app.post('/contact', function(request, response) {
    console.log(request.body.mail);
    return res.redirect('/contact');
  });

  app.get('/api/name', api.name);

  app.get('*', routes.index);

  /*
  	Start Server
  */


  http.createServer(app).listen(app.get('port'), function() {
    return console.log('Express server listening on port ' + app.get('port'));
  });

}).call(this);
