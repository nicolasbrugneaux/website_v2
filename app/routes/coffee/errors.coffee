###
 Error pages
###
exports.error = ( (err, req, res, next) ->
  if err instanceof NotFound
    res.render('error/404', { title: '404 - Not Found' })
  else
    res.render('error/500', { title: '500 - Internal Error', error: err })
)