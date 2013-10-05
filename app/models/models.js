(function() {
  var ArticleProvider, BSON, Connection, Db, MongoDB, ObjectID, Provider, Server, UserProvider, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MongoDB = require('mongodb');

  Db = MongoDB.Db;

  Connection = MongoDB.Connection;

  Server = MongoDB.Server;

  BSON = MongoDB.BSON;

  ObjectID = MongoDB.ObjectID;

  Provider = (function() {
    function Provider(host, port) {
      this.db = new Db('blog', new Server(host, port, {
        auto_reconnect: true,
        safe: false
      }, {}));
      this.db.open(function(error, db) {
        if (!error) {
          console.log("Connected to " + host + ":" + port + "\\blog");
        } else {
          console.log(error);
        }
        return db;
      });
    }

    return Provider;

  })();

  /*
  @ArticleProvider
  */


  ArticleProvider = (function(_super) {
    __extends(ArticleProvider, _super);

    function ArticleProvider() {
      _ref = ArticleProvider.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ArticleProvider.prototype.getCollection = function(callback) {
      return this.db.collection('articles', function(error, article_collection) {
        if (error) {
          return callback(error);
        } else {
          return callback(null, article_collection);
        }
      });
    };

    ArticleProvider.prototype.findAll = function(sort, offset, limit, callback) {
      return this.getCollection(function(error, article_collection) {
        if (error) {
          return callback(error);
        } else {
          return article_collection.find().sort(sort).skip(offset).limit(limit).toArray(function(erro, results) {
            if (error) {
              return callback(error);
            } else {
              return callback(null, results);
            }
          });
        }
      });
    };

    ArticleProvider.prototype.findById = function(id, callback) {
      return this.getCollection(function(error, article_collection) {
        if (error) {
          return callback(error);
        } else {
          return article_collection.findOne({
            _id: ObjectID(id)
          }, function(err, results) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, results);
            }
          });
        }
      });
    };

    ArticleProvider.prototype.save = function(articles, callback) {
      return this.getCollection(function(error, article_collection) {
        var article, comment, _i, _j, _len, _len1, _ref1;
        if (error) {
          return callback(error);
        } else {
          if (typeof articles.length === void 0) {
            articles = [articles];
          }
          for (_i = 0, _len = articles.length; _i < _len; _i++) {
            article = articles[_i];
            article.create_at = new Date();
            if (article.comments === void 0) {
              article.comments = [];
            } else {
              _ref1 = article.comments;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                comment = _ref1[_j];
                comment.created_at = new Date();
              }
            }
          }
          return article_collection.insert(articles, function() {
            return callback(null, articles);
          });
        }
      });
    };

    ArticleProvider.prototype.addComment = function(id, comment, callback) {
      return this.getCollection(function(error, article_collection) {
        if (error) {
          return callback(error);
        } else {
          return article_collection.update({
            _id: ObjectID(id)
          }, {
            $push: {
              comments: comment
            }
          }, function(err, results) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, results);
            }
          });
        }
      });
    };

    ArticleProvider.prototype.edit = function(id, article, callback) {
      return this.getCollection(function(error, article_collection) {
        if (error) {
          return callback(error);
        } else {
          return article_collection.update({
            _id: ObjectID(id)
          }, {
            $set: {
              title: article.title,
              body: article.body,
              tags: article.tags,
              modified: new Date()
            }
          }, function(err, results) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, results);
            }
          });
        }
      });
    };

    ArticleProvider.prototype.deleteArticle = function(id, callback) {
      return this.getCollection(function(error, article_collection) {
        if (error) {
          return callback(error);
        } else {
          return article_collection.remove({
            _id: ObjectID(id)
          }, function(err, results) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, results);
            }
          });
        }
      });
    };

    return ArticleProvider;

  })(Provider);

  exports.ArticleProvider = ArticleProvider;

  /*
  @UserProvider
  */


  UserProvider = (function(_super) {
    __extends(UserProvider, _super);

    function UserProvider() {
      _ref1 = UserProvider.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    UserProvider.prototype.getCollection = function(callback) {
      return this.db.collection('users', function(error, user_collection) {
        if (error) {
          return callback(error);
        } else {
          return callback(null, user_collection);
        }
      });
    };

    UserProvider.prototype.findAll = function(callback) {
      return this.getCollection(function(error, user_collection) {
        if (error) {
          return callback(error);
        } else {
          return user_collection.find().toArray(function(erro, results) {
            if (error) {
              return callback(error);
            } else {
              return callback(null, results);
            }
          });
        }
      });
    };

    UserProvider.prototype.findByLoginAndPassword = function(login, password, callback) {
      return this.getCollection(function(error, user_collection) {
        if (error) {
          return callback(error);
        } else {
          return user_collection.findOne({
            login: login,
            password: password
          }, function(err, results) {
            if (err) {
              return callback(erro);
            } else {
              return callback(null, results);
            }
          });
        }
      });
    };

    UserProvider.prototype.findById = function(id, callback) {
      return this.getCollection(function(error, user_collection) {
        if (error) {
          return callback(error);
        } else {
          return user_collection.findOne({
            _id: ObjectID(id)
          }, function(err, results) {
            if (err) {
              return callback(err);
            } else {
              return callback(null, results);
            }
          });
        }
      });
    };

    UserProvider.prototype.save = function(users, callback) {
      return this.getCollection(function(error, user_collection) {
        if (error) {
          return callback(error);
        } else {
          if (typeof users.length === void 0) {
            users = [users];
          }
          return user_collection.insert(users, function() {
            return callback(null, users);
          });
        }
      });
    };

    return UserProvider;

  })(Provider);

  exports.UserProvider = UserProvider;

}).call(this);
