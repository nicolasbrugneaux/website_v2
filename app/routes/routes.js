(function() {
  var articleProvider, fs, models, userProvider;

  models = require('../models/models');

  fs = require('fs');

  articleProvider = new models.ArticleProvider();

  userProvider = new models.UserProvider();

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

  exports.admin_upload_file = function(req, res) {
    fs.readFile(req.files.fileUpload.path, function(err, data) {
      var img, newName, newPath;
      newPath = __dirname + "/../static/public/";
      img = new RegExp(/^image\//);
      if (img.test(req.files.fileUpload.headers['content-type'])) {
        newPath += 'img/';
      }
      if (req.body.fileName !== '') {
        newName = req.body.fileName + '.' + req.files.fileUpload.name.split('.')[1];
      } else {
        newName = req.files.fileUpload.name;
      }
      return fs.writeFile(newPath + newName, data, function(err) {
        if (err) {
          return console.log(err);
        }
      });
    });
    return res.redirect('/admin');
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
      slug: req.body.slug,
      body: req.body.body,
      tags: req.body.tags.split(','),
      state: 'published',
      created_at: new Date(),
      modified_at: new Date(),
      comments: [],
      author: req.session.user.name
    };
    return articleProvider.save(article, function(err, result) {
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
    console.log(req.body);
    article = {
      title: req.body.title,
      slug: req.body.slug,
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

  exports.admin_delete_comment = function(req, res) {
    console.log('test_delete_comment');
    console.log(req.params);
    return articleProvider.deleteComment(req.params.articleid, req.params.index, function(err, result) {
      return res.redirect('/admin/article/edit/' + req.params.articleid);
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
    return articleProvider.findBySlug(req.params.slug, function(error, docs) {
      return res.send(docs);
    });
  };

  /*
   POST comment
  */


  exports.blog_article_comment = function(req, res) {
    var data;
    data = {
      author: req.body.author,
      email: req.body.email,
      body: req.body.body,
      created: new Date()
    };
    return articleProvider.addComment(req.body.id, data, function(error, docs) {
      return articleProvider.findById(req.body.id, function(error, docs) {
        return res.send(docs);
      });
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
        rssfeed += "			<item>			<title>" + doc.title + "</title>			<description>" + (doc.body.replace(/<\/?[^>]+(>|$)/g, "").substr(0, 400) + '...') + "</description>			<link>http://nicolasbrugneaux.me/blog/article/" + doc.slug + "</link>			<pubDate>" + doc.created_at + "</pubDate>			</item>			";
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

  exports["public"] = function(req, res) {
    return res.send(fs.readdirSync(__dirname + "/../static/public/"));
  };

  exports.public_images = function(req, res) {
    return res.send(fs.readdirSync(__dirname + "/../static/public/img"));
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
