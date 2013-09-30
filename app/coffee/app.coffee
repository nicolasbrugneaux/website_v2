
###
	Module dependencies
###

express = require('express')
http = require('http')
path = require('path')

routes = require('./routes')
api = require('./routes/api')


app = module.exports = express()

###
	Configuration
###

# all environments
app.set('port', process.env.PORT or 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.static(path.join(__dirname, 'static')))
app.use(app.router)

# development only
if app.get('env') is 'development'
	app.use(express.errorHandler())

# production only
if app.get('env') is 'production'
	# TODO
	undefined
###
	Routes
###

# serve index and view partials
app.get('/', routes.index)
app.get('/partials/:name', routes.partials)
app.post('/contact', (req, res) ->
	console.log req.body.mail
	res.redirect('/contact')
)

# JSON API
app.get('/api/name', api.name)

# redirect all others to the index (HTML5 history)
app.get('*', routes.index)

###
	Start Server
###

http.createServer(app).listen(app.get('port'), () ->
	console.log('Express server listening on port ' + app.get('port'))
)

