###
 GET home page.
###

exports.index = (req, res) ->
	res.render('index')

exports.partials = (req, res) ->
	name = req.params.name
	res.render('partials/' + name)

exports.contact = (req, res) ->
	console.log req.body.mail
	res.redirect('/contact')