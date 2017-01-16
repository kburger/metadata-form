var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  merge = require('merge-stream');

const SRC_JS = 'src/**/*.js';
const SRC_HTML = 'src/**/*.html';
const SRC_CSS = 'src/**/*.css';
const PATH_DIST = 'dist/';

gulp.task('dist.js', function() {
  var js = gulp.src(SRC_JS);
  var html = gulp.src(SRC_HTML)
    .pipe($.angularTemplatecache());

    return merge(js, html)
      .pipe($.concat('metadata-form.js'))
      .pipe($.ngAnnotate())
      .pipe(gulp.dest(PATH_DIST))
      .pipe($.connect.reload());
});

gulp.task('dist.css', function() {
  return gulp.src(SRC_CSS)
    .pipe($.concat('metadata-form.css'))
    .pipe(gulp.dest(PATH_DIST))
    .pipe($.connect.reload());
});

gulp.task('dev.watch', function() {
  gulp.watch(SRC_JS, 'js');
  gulp.watch(SRC_HTML, 'html');
  gulp.watch(SRC_CSS, 'css');
});

gulp.task('dev.connect', function() {
  return $.connect({
    port: 9000,
    livereload: true
  });
});

gulp.task('dist', ['dist.js', 'dist.css']);

gulp.task('dev', ['dist', 'dev.watch', 'dev.connect']);

gulp.task('default', ['dist']);