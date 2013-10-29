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
exports.admin_upload_file = (req, res) ->

	fs.readFile req.files.fileUpload.path, (err, data) ->
		newPath = __dirname + "/../static/public/"
		img = new RegExp(/^image\//)
		if img.test req.files.fileUpload.headers['content-type']
			newPath += 'img/'
		if req.body.fileName != ''
			newName = req.body.fileName + '.' + req.files.fileUpload.name.split('.')[1]
		else
			newName = req.files.fileUpload.name

		fs.writeFile newPath+newName, data, (err) ->
			if err
				console.log err

	res.redirect('/admin')

exports.admin_add_view = (req, res) ->
	res.render('admin/add',
		{ title: 'Add new blog article' }
	)

exports.admin_add = (req, res) ->
	article = {
		title: req.body.title
		slug: req.body.slug
		body: req.body.body
		tags: req.body.tags.split(',')
		state: 'published'
		created_at: new Date()
		modified_at: new Date()
		comments: []
		author: req.session.user.name
	}

	articleProvider.save(article, (err, result) ->
		res.redirect('/admin')
	)

exports.admin_edit_view = (req, res) ->
	res.render('admin/edit', {
		title: 'Edit existing article'
		article: req.docs
	})

exports.admin_edit = (req, res) ->
	console.log req.body
	article = {
		title: req.body.title
		slug: req.body.slug
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

exports.admin_delete_comment = (req, res) ->
	console.log 'test_delete_comment'
	console.log req.params
	articleProvider.deleteComment( req.params.articleid, req.params.index, (err, result) ->
		res.redirect('/admin/article/edit/' + req.params.articleid)
	)