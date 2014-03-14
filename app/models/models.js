(function() {
  var ArticleProvider, BSON, Connection, Db, MongoDB, ObjectID, Provider, Server, UserProvider, connect, db_uri, slugify, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MongoDB = require('mongodb');

  connect = require('connect');

  Db = MongoDB.Db;

  Connection = MongoDB.Connection;

  Server = MongoDB.Server;

  BSON = MongoDB.BSON;

  ObjectID = MongoDB.ObjectID;

  db_uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/blog';

  Provider = (function() {
    function Provider() {
      var _this = this;
      MongoDB.connect(db_uri, {}, function(error, db) {
        _this.db = db;
        console.log("Connected to " + db);
        _this.db.addListener('error', function(error) {
          return console.log("Error connecting to MongoLab: " + error);
        });
        return db;
      });
    }

    return Provider;

  })();

  slugify = function(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "").replace(/^\s\s*/, '').replace(/\s\s*$/, '').toLowerCase().replace(/[^a-z0-9_\-~!\+\s]+/g, '').replace(/[\s]+/g, '-');
  };

  /*
  @ArticleProvider
  */


  ArticleProvider = (function(_super) {
    __extends(ArticleProvider, _super);

    function ArticleProvider() {
      this.getCollection = __bind(this.getCollection, this);
      _ref = ArticleProvider.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ArticleProvider.prototype.getCollection = function(callback) {
      var _this = this;
      return this.db.createCollection('articles', function(error, article_collection) {
        return _this.db.collection('articles', function(error, article_collection) {
          if (error) {
            return callback(error);
          } else {
            return callback(null, article_collection);
          }
        });
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

    ArticleProvider.prototype.findBySlug = function(slug, callback) {
      return this.getCollection(function(error, article_collection) {
        if (error) {
          return callback(error);
        } else {
          return article_collection.findOne({
            slug: slug
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
            if (article.slug === void 0) {
              article.slug = slugify(article.title);
            }
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
          console.log(article.slug);
          return article_collection.update({
            _id: ObjectID(id)
          }, {
            $set: {
              title: article.title,
              slug: article.slug,
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

    ArticleProvider.prototype.deleteComment = function(id, index, callback) {
      return this.getCollection(function(error, article_collection) {
        if (error) {
          return callback(error);
        } else {
          return article_collection.findOne({
            _id: ObjectID(id)
          }, function(err, result) {
            if (err) {
              return callback(err);
            } else {
              result.comments.splice(index, 1);
              return article_collection.update({
                _id: ObjectID(id)
              }, {
                $set: {
                  comments: result.comments
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
