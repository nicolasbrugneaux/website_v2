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
  console.log('test')
  console.log(req.param.route)
  dir = fs.readdirSync(__dirname + "/../static#{req.route.path}")
  html = "<ul>"
  for item in dir
    html += "<li><a href=#{item}>#{item}</li>"
  html += "</ul>"
  res.send(html)