models = require('../models/models')
host = 'localhost'
port = 27017
articleProvider = new models.ArticleProvider(host, port)
userProvider = new models.UserProvider(host, port)