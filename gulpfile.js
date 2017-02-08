var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  merge = require('merge-stream');

const SRC_JS = 'src/**/*.js';
const SRC_HTML = 'src/**/*.html';
const SRC_CSS = 'src/**/*.css';
const PATH_DIST = 'dist/';

gulp.task('dist:js', function() {
  var js = gulp.src(SRC_JS);
  var html = gulp.src(SRC_HTML)
    .pipe($.angularTemplatecache({module: 'metadata.form'}));
  var resources = gulp.src('resources/*.json')
    .pipe($.angularData('resources.js', {suffix: '', name: 'metadata.constants'}))
    .pipe($.uglify());

  return merge(js, html, resources)
    .pipe($.angularFilesort())
    .pipe($.concat('metadata-form.js'))
    .pipe($.ngAnnotate())
    .pipe($.insert.wrap('(function(){', '})();'))
    .pipe(gulp.dest(PATH_DIST))
    .pipe($.connect.reload());
});

gulp.task('dist:css', function() {
  return gulp.src(SRC_CSS)
    .pipe($.concat('metadata-form.css'))
    .pipe(gulp.dest(PATH_DIST))
    .pipe($.connect.reload());
});

gulp.task('dev:watch', function() {
  gulp.watch(SRC_JS, ['dist:js']);
  gulp.watch(SRC_HTML, ['dist:js']);
  gulp.watch(SRC_CSS, ['dist:css']);
});

gulp.task('dev:connect', function() {
  return $.connect.server({
    port: 9000,
    root: '.',
    livereload: true
  });
});

gulp.task('dist', ['dist:js', 'dist:css']);

gulp.task('dev', ['dist', 'dev:watch', 'dev:connect']);

gulp.task('default', ['dist']);