const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
//add in package.json "broserslist"[last 3 versions]
const sync = require('browser-sync').create()
const imagemin = require('gulp-imagemin') // npm i -D gulp-imagemin@7
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
function imgmin() {
  return src('src/img/**.*')
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(dest('dist/img'))
}

function js() {
  return src('src/js/**/*.js')
  .pipe(uglify())
    .pipe(dest('dist/js'))
}

function html() {
  return src('src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist/css'))
}

function clear() {
  return del('dist')
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
  watch('src/js/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, imgmin)
exports.dev = series(clear, scss, html, imgmin, js, serve)
exports.clear = clear
exports.imgmin = imgmin