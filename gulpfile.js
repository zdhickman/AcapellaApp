var gulp = require('gulp');
var mustache = require('gulp-mustache');
var concatCss = require('gulp-concat-css');
var del = require('del');

var $ = require('gulp-load-plugins')();
var appConfig = require('./appConfig.js');

var webpackConfig = require('./webpack.config.js').getConfig(true);

var app = 'app/';
var dist = 'dist/';
var port = 5000;

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

// babel
gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest(dist + 'scripts/'))
    .pipe($.connect.reload());
});

gulp.task('lint', function () {
  return gulp.src([app + 'scripts/*/**.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('html', function() {
  return gulp.src(app + 'index.mustache')
    .pipe(mustache(appConfig, {extension: '.html'}))
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

gulp.task('styles',function(cb) {
  // convert stylus to css
  return gulp.src(app + 'stylus/main.styl')
    .pipe($.stylus({
      'include css' : true
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers}))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload());

});

// grab any images and move to /dist/images/
gulp.task('images', function() {
  return gulp.src([
    app + 'images/**/*.{png,jpg,jpeg,gif,svg}'
  ])
    .pipe(gulp.dest(dist + 'images/'));
});

// server
gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35739
    },
    fallback: dist + 'index.html'
  });
});

// watch everything
gulp.task('watch', function() {
  gulp.watch(app + 'images/**/*.{png,jpg,jpeg,gif,svg}', ['images']);
  gulp.watch(app + 'stylus/*/**.css', ['styles']);
  gulp.watch(app + 'index.mustache', ['html']);
  gulp.watch(app + 'scripts/**/*.js', ['lint', 'scripts']);
});

gulp.task('clean', function(cb) {
  del([dist], cb);
});

gulp.task('build', ['clean'], function() {
  gulp.start(['images', 'html', 'lint', 'scripts', 'styles']);
});

gulp.task('default', ['build', 'serve', 'watch']);
