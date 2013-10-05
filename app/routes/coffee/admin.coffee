###
 GET admin page.
###
exports.admin_all = (req, res) ->
	articleProvider.findAll( {'created_at': -1}, 0, 9999, (error, docs) ->
		res.render('admin/index', {
			title: 'Administration panel'
			articles: docs
		})
	)
exports.admin_add_view = (req, res) ->
	res.render('admin/add',
		{ title: 'Add new blog article' }
	)

exports.admin_add = (req, res) ->
	article = {
		title: req.body.title
		body: req.body.body
		tags: req.body.tags.split(',')
		state: 'published'
		created_at: new Date()
		modified_at: new Date()
		comments: []
		author: req.session.user.name
	}

	articleProvider.save(article, (err, result) ->
		console.log(err, result)
		res.redirect('/admin')
	)

exports.admin_edit_view = (req, res) ->
	res.render('admin/edit', {
		title: 'Edit existing article'
		article: req.docs
	})

exports.admin_edit = (req, res) ->
	article = {
		title: req.body.title
		body: req.body.body
		tags: req.body.tags.split(',')
	}
	articleProvider.edit( req.body.id, article, (err, result) ->
		res.redirect('/admin')
	)

exports.admin_delete = (req, res) ->
	articleProvider.deleteArticle( req.params.articleid, (err, result) ->
		res.redirect('/admin')
	)