MongoDB = require('mongodb')
Db = MongoDB.Db
Connection = MongoDB.Connection
Server = MongoDB.Server
BSON = MongoDB.BSON
ObjectID = MongoDB.ObjectID

class Provider
	constructor: (host, port) ->
		@db = new Db('blog', new Server(host, port, {auto_reconnect: true, safe: false}, {} ))
		@db.open( (error, db) ->
			if not error 
				console.log("Connected to #{host}:#{port}\\blog")
			else
				console.log(error)
			db
		)