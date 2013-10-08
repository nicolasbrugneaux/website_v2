###
@ArticleProvider
###
class ArticleProvider extends Provider
	
	getCollection: (callback) =>
		@db.createCollection('articles', (error, article_collection) =>
			@db.collection('articles', (error, article_collection) ->
				if error then callback(error) else callback(null, article_collection)
			)
		)
	findAll: (sort, offset, limit, callback) ->
		@getCollection( (error, article_collection) ->
			if error then callback(error)
			else
				article_collection.find().sort(sort).skip(offset).limit(limit).toArray( (erro, results) ->
					if error then callback(error) else callback(null, results)
				)
		)

	findById: (id, callback) ->
		@getCollection( (error, article_collection) ->
			if error then callback(error)
			else
				article_collection.findOne({ _id: ObjectID(id) }, (err, results) ->
					if err then callback(err) else callback(null, results)
				)
		)
		
	findBySlug: (slug, callback) ->
		@getCollection( (error, article_collection) ->
			if error then callback(error)
			else
				article_collection.findOne({ slug: slug }, (err, results) ->
					if err then callback(err) else callback(null, results)
				)
		)

	save: (articles, callback) ->
		@getCollection( (error, article_collection) ->
			if error then callback(error)
			else
				if typeof(articles.length) is undefined
					articles = [articles]

				for article in articles
					article.full_slug 
					article.create_at = new Date()
					if article.slug is undefined then article.slug = slugify( article.title )
					if article.comments is undefined then article.comments = []
					else
						for comment in article.comments
							comment.created_at = new Date()

				article_collection.insert(articles, () ->
					callback(null, articles)
				)
		)

	addComment: (id, comment, callback) ->
		@getCollection( (error, article_collection) ->
			if error then callback(error)
			else
				article_collection.update(
					{ _id: ObjectID(id) },
					{ $push: { 
						comments: comment 
						}
					},
					(err, results) -> 
						if err then callback(err) else callback(null, results)
				)
		)
	edit: (id, article, callback) ->
		@getCollection( (error, article_collection) ->
			if error then callback(error)
			else
				console.log article.slug
				article_collection.update(
					{ _id: ObjectID(id)},
					{ $set: {
							title: article.title
							slug: article.slug
							body: article.body
							tags: article.tags
							modified: new Date()
						}
					},
					(err, results) ->
						if err then callback(err) else callback(null, results)
				)
		)
	deleteArticle: (id, callback) ->
		@getCollection( (error, article_collection) ->
			if error then callback(error)
			else
				article_collection.remove({ _id: ObjectID(id) }, (err, results) ->
					if err then callback(err) else callback(null, results)
				)
		)
	deleteComment: (id, index, callback) ->
		@getCollection( (error, article_collection) ->
			if error then callback(error)
			else
				article_collection.findOne({ _id: ObjectID(id) }, (err, result) ->
					if err then callback(err)
					else
						result.comments.splice(index,1)
						article_collection.update(
							{ _id: ObjectID(id) },
							{ $set: { comments: result.comments } },
							(err, results) ->
								if err then callback(err) else callback(null, results)
						)
				)
		)
exports.ArticleProvider = ArticleProvider