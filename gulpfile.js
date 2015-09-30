var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
// var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var watchify = require('watchify');

gulp.task('browserify', function() {
  browserify({
    entries: 'index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('**/*.jsx', ['browserify'])
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['./*.html', 'dist/**'], function() {
    browserSync.reload();
  });
});

gulp.task('default', ['browserify', 'watch', 'browserSync']);