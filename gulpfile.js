var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  merge = require('merge-stream');

const SRC_JS = 'src/**/*.js';
const SRC_HTML = 'src/**/*.html';
const SRC_CSS = 'src/**/*.css';
const SRC_RES = 'resources/*.json';
const PATH_DIST = 'dist/';
const SRC_TEST = 'test/**/*.js';

gulp.task('dist:js', function() {
  var js = gulp.src(['src/form/form.js', 'src/**/!(form).js']);

  var html = gulp.src(SRC_HTML)
    .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe($.angularTemplatecache({module: 'metadata.form'}));

  var resources = gulp.src('resources/*.json')
    .pipe($.angularData('resources.js', {suffix: '', name: 'metadata.constants'}));

  return merge(js, html, resources)
    .pipe($.concat('metadata-form.min.js'))
    .pipe($.ngAnnotate())
    .pipe($.insert.wrap('(function(){', '})();'))
    .pipe($.uglify())
    .pipe(gulp.dest(PATH_DIST))
    .pipe($.connect.reload());
});

gulp.task('dist:css', function() {
  return gulp.src(SRC_CSS)
    .pipe($.concat('metadata-form.min.css'))
    .pipe($.cssnano())
    .pipe(gulp.dest(PATH_DIST))
    .pipe($.connect.reload());
});

gulp.task('test', ['dist:js'], function(done) {
  var Server = require('karma').Server;
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('dev:watch', function() {
  gulp.watch(SRC_JS, ['dist:js', 'test']);
  gulp.watch(SRC_HTML, ['dist:js']);
  gulp.watch(SRC_CSS, ['dist:css']);
  gulp.watch(SRC_RES, ['dist:js'])
  gulp.watch(SRC_TEST, ['test']);
});

gulp.task('dev:connect', function() {
  return $.connect.server({
    port: 9000,
    root: '.',
    livereload: true
  });
});

gulp.task('dist', ['dist:js', 'dist:css', 'test']);

gulp.task('dev', ['dist', 'dev:watch', 'dev:connect']);

gulp.task('default', ['dist']);