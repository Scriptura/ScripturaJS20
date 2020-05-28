'use strict'

const vv = require('./settings/variables'),
      //uuid = require('uuid/v4'),
      createError = require('http-errors'),
      express = require('express'),
      helmet = require('helmet'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      morgan = require('morgan'),
      compression = require('compression'),
      bodyParser = require('body-parser'),
      favicon = require('serve-favicon'),
      robots = require('express-robots-txt'),
      useragent = require('express-useragent'),
      //flash = require('connect-flash'), // @todo en test. En lien avec Passeport.js
      //session = require('express-session'), // @todo idem
      // yarn add :
      // passport
      // express-validator
      // sitemap
      // jsonld @note Microdata
      // express-naked-redirect // @ http -> https, www.site.com -> site.com, etc
      // sharp
      // svgo
      // imagemin-webp
      app = express(), // Instantiation
      hostname = 'http://localhost:3000', // @todo À requêter dynamiquement...
      routesDispatcher = require(path.join(__dirname, 'controllers', 'routesDispatcher'))

app.use(helmet()) // Protection des entêtes @see https://helmetjs.github.io/
app.use(morgan('dev')) // Info sur les logs en console.
app.set('views', path.join(__dirname, 'views')) // Racine pour les vues.
app.set('view engine', 'pug') // Choix du moteur de template.
// Option 'pretty' dépréciée par Pug, en effet l'identation peut créer des espaces blancs conduisant à des différences d'interprétation subtiles
// @see https://pugjs.org/api/reference.html#options
// @toto Option utilisée pour l'instant car pratique pour contrôler le code de sortie
if(vv.dev) app.locals.pretty = true
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public'))) // Gestion des fichiers statiques.
app.use(favicon(path.join(__dirname, 'public', 'medias', 'favicons', 'favicon.ico'))) // addresse de la favicon
app.use(robots({UserAgent: '*', Disallow: '/', CrawlDelay: '10', Sitemap: hostname + '/sitemap.xml'})) // Génération dynanique d'un fichier robots.txt
app.use(compression()) // Compression deflate et gzip.
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(useragent.express())

app.use('/', routesDispatcher) // Redirige vers le répartiteur des routes

app.use((req, res, next) => { // catch 404 and forward to error handler
  next(createError(404))
})

app.use((err, req, res, next) => { // Gestionnaire d'erreurs.
  // Set locals, only providing error in development.
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page.
  res.status(err.status || 500)
  res.render('error', {_title: '404 | ' + vv.siteName})
})

module.exports = app
