###
 GET blog page.
###
exports.blog = (req, res) ->
  if req.query.offset != undefined
    offset = parseInt(req.query.offset)
  if req.query.offset != undefined
    limit = parseInt(req.query.limit)
  articleProvider.findAll( {'created_at': -1}, offset, limit, (error, docs) ->
    res.send(articles: docs)
  )
###
 GET article page by id.
###
exports.blog_article_param = (req, res, next, id) ->
  if id.length != 24
    next(new Error('The article id is not having the correct length'))

  articleProvider.findById(id, (error, docs) ->
    if error or docs is null
      res.redirect('/admin')
    else
      req.docs = docs
      next()
  )
###
 GET article page by slug.
###
exports.blog_article_slug = (req, res, next, slug) ->
  articleProvider.findBySlug(slug, (error, docs) ->
    if error or docs is null
      res.redirect('/blog')
    else
      req.docs = docs
      next()
  )
exports.blog_article_view = (req, res) ->
  articleProvider.findBySlug(req.params.slug, (error, docs) ->
    res.send(docs)
  )
###
  POST comment
###
exports.blog_article_comment = (req, res) ->
  if req.body.author == '' or
  req.body.email == '' or
  req.body.body == ''
    res.redirect('back')
  else
    data = {
      author: req.body.author
      email: req.body.email
      body: req.body.body
      created: new Date()
    }
    articleProvider.addComment(req.body.id, data, (error, docs) ->
      articleProvider.findById(req.body.id, (error, docs) ->
        res.send(docs)
      )
    )

###
 RSS Feed
###
exports.rss = (req, res) ->
  articleProvider.findAll( {'created_at': -1}, 0, 9999, (error, docs) ->
    res.setHeader("Content-Type: application/xml; charset=UTF-8")
    rssfeed = "
    <rss version=\"2.0\">
    <channel>
    <title>RSS Feed of nicolasbrugneaux.me</title>
    <link>http://nicolasbrugneaux.me</link>
    <description>This is the RSS feed of http://nicolasbrugneaux.me, website of a dedicated and ambitous student in Computer Science.</description>
    <language>en-us</language>
    <copyright>2013 nicolasbrugneaux.me</copyright>"
    for doc in docs
      rssfeed += "
      <item>
      <title>#{doc.title}</title>
      <description>#{doc.body.replace(/<\/?[^>]+(>|$)/g, "").substr(0, 400) + '...'}</description>
      <link>http://nicolasbrugneaux.me/blog/article/#{doc.slug}</link>
      <pubDate>#{doc.created_at}</pubDate>
      </item>
      "
    rssfeed += "</channel></rss>"
    res.end(rssfeed)
  )