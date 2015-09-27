var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

var watchify = require('watchify');

gulp.task('build', function() {
  // browserify({
  //   entries: 'index.jsx',
  //   extensions: ['.jsx'],
  //   debug: true
  // })
  var bundler = browserify({
    entries: 'index.jsx',
    extensions: ['.jsx'],
    debug: true
  });
  var watcher = watchify(bundler);

  return watcher
    .on('update', function() {
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
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

gulp.task('default', ['build', 'browserSync']);