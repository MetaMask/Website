const fs = require('fs')
const fsExtra = require('fs-extra')
const rmRf = require('rimraf')

const Streams = require('mississippi')
const bind = require('ap').partial
const async = require('./async')

const Browserify = require('browserify')
const watchify = require('watchify')
const sassStream = require('sass-css-stream')




start(function(err){
  if (err) throw err
  console.log('end')
})


function start(cb){
  async.series({
    clean,
    build,
  }, cb)
}

function clean(cb){
  fsExtra.remove('./docs/', cb)
}

function build(cb){
  async.parallel({
    buildJs,
    buildCss,
    buildStatic,
  }, cb)
}

function buildJs(cb) {
  var browserify = Browserify({
    entries: ['./src/js/index.js'],
    cache: {},
    packageCache: {},
    // plugin: [watchify],
  })

  browserify.on('update', bundle)

  async.series({
    buildJsPrep: bind(fsExtra.mkdirs, './docs/js'),
    buildJsStart: start,
  }, cb)

  function start(cb){
    var firstBundle = bundle()
    Streams.finished(firstBundle, cb)
  }

  function bundle() {
    console.log('bundle')
    return Streams.pipeline(
      browserify.bundle(),
      fs.createWriteStream('./docs/js/bundle.js')
    )
  }
}

function buildCss(cb) {

  async.series({
    buildCssPrep: bind(fsExtra.mkdirs, './docs/css'),
    buildCssStart: start,
  }, cb)

  function start(cb) {
    var pipeline = Streams.pipeline(
      fs.createReadStream( './src/css/index.scss' ),
      sassStream( './src/css/index.scss' ),
      fs.createWriteStream( './docs/css/bundle.css' )
    )
    Streams.finished(pipeline, cb)
  }
}

function buildStatic(cb) {

  async.parallel({
    imgs:           bind(fsExtra.copy, './src/img/', './docs/img/'),
    faviconAndroid: bind(fsExtra.copy, './src/manifest.json', './docs/manifest.json'),
    faviconIE:      bind(fsExtra.copy, './src/browserconfig.xml', './docs/browserconfig.xml'),
    fonts:          bind(fsExtra.copy, './src/fonts/', './docs/fonts/'),
    index:          bind(fsExtra.copy, './src/index.html', './docs/index.html'),
    privacy:        bind(fsExtra.copy, './src/privacy.html', './docs/privacy.html'),
    terms:          bind(fsExtra.copy, './src/terms.html', './docs/terms.html'),
    phishing:       bind(fsExtra.copy, './src/phishing.html', './docs/phishing.html'),
    attributions:   bind(fsExtra.copy, './src/attributions.html', './docs/attributions.html'),


    goog:           bind(fsExtra.copy, './src/google3bfcd95a7b5008a9.html', './docs/google3bfcd95a7b5008a9.html'),
  }, cb)

}
