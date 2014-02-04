###
 GET login page.
###
exports.login_view = (req, res) ->
  res.render('login', {
    title: 'Login'
  })
###
 GET Logout page.
###
exports.logout = (req, res) ->
  req.session.destroy()
  res.redirect('/')
###
 POST login page.
###
exports.login = (req, res) ->
  userProvider.findByLoginAndPassword(
    req.body.login,
    req.body.password,
    (err, user) ->
      if not err and user
        req.session.user = user
        res.redirect('/admin')
      else
        res.redirect('/login')
  )

exports.isUser = (req, res, next) ->
  if req.session.user != undefined then next() else res.redirect('/login')