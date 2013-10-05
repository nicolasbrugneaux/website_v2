(function() {
  var articleProvider, host, models, port, userProvider;

  models = require('../models/models');

  host = 'localhost';

  port = 27017;

  articleProvider = new models.ArticleProvider(host, port);

  userProvider = new models.UserProvider(host, port);

  /*
   GET admin page.
  */


  exports.admin_all = function(req, res) {
    return articleProvider.findAll({
      'created_at': -1
    }, 0, 9999, function(error, docs) {
      return res.render('admin/index', {
        title: 'Administration panel',
        articles: docs
      });
    });
  };

  exports.admin_add_view = function(req, res) {
    return res.render('admin/add', {
      title: 'Add new blog article'
    });
  };

  exports.admin_add = function(req, res) {
    var article;
    article = {
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags.split(','),
      state: 'published',
      created_at: new Date(),
      modified_at: new Date(),
      comments: [],
      author: req.session.user.name
    };
    return articleProvider.save(article, function(err, result) {
      console.log(err, result);
      return res.redirect('/admin');
    });
  };

  exports.admin_edit_view = function(req, res) {
    return res.render('admin/edit', {
      title: 'Edit existing article',
      article: req.docs
    });
  };

  exports.admin_edit = function(req, res) {
    var article;
    article = {
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags.split(',')
    };
    return articleProvider.edit(req.body.id, article, function(err, result) {
      return res.redirect('/admin');
    });
  };

  exports.admin_delete = function(req, res) {
    return articleProvider.deleteArticle(req.params.articleid, function(err, result) {
      return res.redirect('/admin');
    });
  };

  /*
   GET blog page.
  */


  exports.blog = function(req, res) {
    var limit, offset;
    if (req.query.offset !== void 0) {
      offset = parseInt(req.query.offset);
    }
    if (req.query.offset !== void 0) {
      limit = parseInt(req.query.limit);
    }
    return articleProvider.findAll({
      'created_at': -1
    }, offset, limit, function(error, docs) {
      return res.send({
        articles: docs
      });
    });
  };

  /*
   GET article page by id.
  */


  exports.blog_article_param = function(req, res, next, id) {
    if (id.length !== 24) {
      next(new Error('The article id is not having the correct length'));
    }
    return articleProvider.findById(id, function(error, docs) {
      if (error) {
        return next(new Error('Make sure you provided correct article id'));
      } else if (!docs) {
        return next(new Error('Posts loading failed'));
      } else {
        req.docs = docs;
        return next();
      }
    });
  };

  exports.blog_article_view = function(req, res) {
    console.log(req.docs);
    return res.render('article_form', {
      article: req.docs
    });
  };

  /*
   POST comment
  */


  exports.blog_article_comment = function(req, res) {
    var data;
    data = {
      author: req.body.author,
      body: req.body.comment,
      created: new Date()
    };
    return articleProvider.addComment(req.body.id, data, function(error, docs) {
      return res.redirect("/api/article/" + req.body.id);
    });
  };

  /*
   RSS Feed
  */


  exports.rss = function(req, res) {
    return articleProvider.findAll({
      'created_at': -1
    }, 0, 9999, function(error, docs) {
      var doc, rssfeed, _i, _len;
      res.setHeader("Content-Type: application/xml; charset=UTF-8");
      rssfeed = "		<rss version=\"2.0\">		<channel>		<title>RSS Feed of nicolasbrugneaux.me</title>		<link>http://nicolasbrugneaux.me</link>		<description>This is the RSS feed of http://nicolasbrugneaux.me, website of a dedicated and ambitous student in Computer Science.</description>		<language>en-us</language>		<copyright>2013 nicolasbrugneaux.me</copyright>";
      for (_i = 0, _len = docs.length; _i < _len; _i++) {
        doc = docs[_i];
        rssfeed += "			<item>			<title>" + doc.title + "</title>			<description>" + (doc.body.substr(0, 250) + '...') + "</description>			<link>http://nicolasbrugneaux.me/posts/" + doc._id + "</link>			<pubDate>" + doc.created_at + "</pubDate>			</item>			";
      }
      rssfeed += "</channel></rss>";
      return res.end(rssfeed);
    });
  };

  /*
   Error pages
  */


  exports.error = (function(err, req, res, next) {
    if (err instanceof NotFound) {
      return res.render('error/404', {
        title: '404 - Not Found'
      });
    } else {
      return res.render('error/500', {
        title: '500 - Internal Error',
        error: err
      });
    }
  });

  /*
   GET home page.
  */


  exports.index = function(req, res) {
    return res.render('index');
  };

  exports.partials = function(req, res) {
    var name;
    name = req.params.name;
    return res.render('partials/' + name);
  };

  exports.contact = function(req, res) {
    console.log(req.body.mail);
    return res.redirect('/contact');
  };

  /*
   GET login page.
  */


  exports.login_view = function(req, res) {
    return res.render('login', {
      title: 'Login'
    });
  };

  /*
   GET Logout page.
  */


  exports.logout = function(req, res) {
    req.session.destroy();
    return res.redirect('/');
  };

  /*
   POST login page.
  */


  exports.login = function(req, res) {
    return userProvider.findByLoginAndPassword(req.body.login, req.body.password, function(err, user) {
      if (!err && user) {
        req.session.user = user;
        return res.redirect('/admin');
      } else {
        return res.redirect('/login');
      }
    });
  };

  exports.isUser = function(req, res, next) {
    if (req.session.user !== void 0) {
      return next();
    } else {
      return res.redirect('/login');
    }
  };

}).call(this);
