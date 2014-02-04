###
@UserProvider
###
class UserProvider extends Provider

  getCollection: (callback) ->
    @db.collection('users', (error, user_collection) ->
      if error then callback(error) else callback(null, user_collection)
    )

  findAll: (callback) ->
    @getCollection( (error, user_collection) ->
      if error then callback(error)
      else
        user_collection.find().toArray( (erro, results) ->
          if error then callback(error) else callback(null, results)
        )
    )
  findByLoginAndPassword: (login, password, callback) ->
    @getCollection( (error, user_collection) ->
      if error then callback(error)
      else
        user_collection.findOne({ login: login, password: password },
        (err, results) ->
          if err then callback(erro) else callback(null, results)
        )

    )

  findById: (id, callback)->
    @getCollection( (error, user_collection) ->
      if error then callback(error)
      else
        user_collection.findOne({ _id: ObjectID(id) }, (err, results) ->
          if err then callback(err) else callback(null, results)
        )
    )

  save: (users, callback) ->
    @getCollection( (error, user_collection) ->
      if error then callback(error)
      else
        if typeof(users.length) is undefined
          users = [users]

        user_collection.insert(users, () ->
          callback(null, users)
        )

    )
exports.UserProvider = UserProvider