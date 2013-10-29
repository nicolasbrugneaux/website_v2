/*
	Module dependencies
*/


(function() {
  var app, express, flash, http, path, routes;

  express = require('express');

  http = require('http');

  path = require('path');

  routes = require('./routes/routes');

  flash = require('connect-flash');

  app = module.exports = express();

  /*
  	Configuration
  */


  app.configure(function() {
    var MemStore;
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('I Love Cookies <3'));
    MemStore = express.session.MemoryStore;
    app.use(express.session({
      secret: 'I Love Cookies <3',
      store: MemStore({
        reapInterval: 60000 * 10
      })
    }));
    app.use(express["static"](path.join(__dirname, 'static')));
    app.use('/static/public', express["static"](path.join(__dirname, 'public')));
    app.use(app.router);
    if (app.get('env') === 'development') {
      app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
      }));
    }
    if (app.get('env') === 'production') {
      return app.use(express.errorHandler());
    }
  });

  /*
  	Routes
  */


  app.get('/', routes.index);

  app.get('/partials/:name', routes.partials);

  app.post('/contact', routes.contact);

  app.get('/public', routes["public"]);

  app.get('/public/img', routes.public_images);

  app.get('/api/blog', routes.blog);

  app.param('articleid', routes.blog_article_param);

  app.get('/api/article/:slug', routes.blog_article_view);

  app.post('/api/article/comment', routes.blog_article_comment);

  app.get('/admin', routes.isUser, routes.admin_all);

  app.post('/admin', routes.isUser, routes.admin_upload_file);

  app.get('/admin/article/add', routes.isUser, routes.admin_add_view);

  app.post('/admin/article/add', routes.isUser, routes.admin_add);

  app.get('/admin/article/edit/:articleid', routes.isUser, routes.admin_edit_view);

  app.post('/admin/article/edit/:articleid', routes.isUser, routes.admin_edit);

  app.get('/admin/article/delete/:articleid', routes.isUser, routes.admin_delete);

  app.get('/admin/article/comment/delete/:articleid/:index', routes.isUser, routes.admin_delete_comment);

  app.get('/login', routes.login_view);

  app.post('/login', routes.login);

  app.get('/logout', routes.logout);

  app.get('/feed', routes.rss);

  app.get('*', routes.index);

  /*
  	Start Server
  */


  http.createServer(app).listen(app.get('port'), function() {
    return console.log('Express server listening on port ' + app.get('port'));
  });

}).call(this);
