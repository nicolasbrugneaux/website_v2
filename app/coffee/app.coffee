
###
	Module dependencies
###

express = require('express')
http = require('http')
path = require('path')
routes = require('./routes/routes')
flash = require('connect-flash')

app = module.exports = express()

###
	Configuration
###
app.configure( () ->

	# all environments
	app.set('port', process.env.PORT or 3000)
	app.set('views', __dirname + '/views')
	app.set('view engine', 'jade')
	app.use(express.logger('dev'))
	app.use(express.bodyParser())
	app.use(express.methodOverride())
	app.use(express.cookieParser('I Love Cookies <3'))
	MemStore = express.session.MemoryStore
	app.use(express.session({secret: 'I Love Cookies <3', store: MemStore({
	    reapInterval: 60000 * 10
	})}))
	app.use(express.static(path.join(__dirname, 'static')))
	app.use('/static/public', express.static(path.join(__dirname, 'public')))
	app.use(app.router)

	# development only
	if app.get('env') is 'development'
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))

	# production only
	if app.get('env') is 'production'
		app.use(express.errorHandler())
)

###
	Routes
###

# serve index and view partials
app.get('/', routes.index)
app.get('/partials/:name', routes.partials)
app.post('/contact', routes.contact)

# what the normal user can get
app.get('/api/blog', routes.blog)
app.param('articleid', routes.blog_article_param)
app.get('/api/article/:slug', routes.blog_article_view)
app.post('/api/article/comment', routes.blog_article_comment)

# what the admin can do
app.get('/admin', routes.isUser, routes.admin_all)
app.get('/admin/article/add', routes.isUser, routes.admin_add_view)
app.post('/admin/article/add', routes.isUser, routes.admin_add)
app.get('/admin/article/edit/:articleid', routes.isUser, routes.admin_edit_view)
app.post('/admin/article/edit/:articleid', routes.isUser, routes.admin_edit)
app.get('/admin/article/delete/:articleid', routes.isUser, routes.admin_delete)
app.get('/admin/article/comment/delete/:articleid/:index', routes.isUser, routes.admin_delete_comment)

app.get('/login', routes.login_view)
app.post('/login', routes.login)
app.get('/logout', routes.logout)

app.get('/feed', routes.rss)

#app.error(routes.errors)

# redirect all others to the index (HTML5 history)
app.get('*', routes.index)

###
	Start Server
###

http.createServer(app).listen(app.get('port'), () ->
	console.log('Express server listening on port ' + app.get('port'))
)

