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

exports.public = (req, res) ->
  res.send fs.readdirSync(__dirname + "/../static/public/")
exports.public_images = (req, res) ->
  res.send fs.readdirSync(__dirname + "/../static/public/img")