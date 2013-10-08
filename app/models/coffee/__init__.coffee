MongoDB = require('mongodb')
connect = require('connect')

Db = MongoDB.Db
Connection = MongoDB.Connection
Server = MongoDB.Server
BSON = MongoDB.BSON
ObjectID = MongoDB.ObjectID
db_uri = process.env.MONGOLAB_URI or 'mongodb://localhost:27017/blog'

class Provider
	constructor: () ->
		MongoDB.connect(db_uri, {}, (error, db) =>
			@db = db
			console.log("Connected to #{db}")
			@db.addListener('error', (error) ->
				console.log("Error connecting to MongoLab: #{error}")
			)
			db
		)

slugify = (input) ->
    input
    .replace(/<\/?[^>]+(>|$)/g, "") # remove html tags
    .replace(/^\s\s*/, '') # Trim start
    .replace(/\s\s*$/, '') # Trim end
    .toLowerCase() # Camel case is bad
    .replace(/[^a-z0-9_\-~!\+\s]+/g, '') # Exchange invalid chars
    .replace(/[\s]+/g, '-'); # Swap whitespace for single hyphen