var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var watchify = require('watchify');

gulp.task('browserify', function() {
  browserify({
    entries: 'src/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.jsx', ['browserify'])
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

gulp.task('release', ['browserify'], function() {
  gulp.src([
    'index.html',
    'dist/*',
    'css/*',
    'node_modules/material-design-lite/*.min.*'
  ],
  { base: '.'})
  .pipe(gulp.dest('public'))
});

gulp.task('default', ['browserify', 'watch', 'browserSync']);