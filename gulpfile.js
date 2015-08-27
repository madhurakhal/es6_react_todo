var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var runSequence = require('run-sequence');
var concat      = require('gulp-concat'); //Concatenates files

var config = {
  paths: {
    css: [
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
          'css/todo.css'
      ],
    dist: './dist'
  }
};
gulp.task('build', function() {
  return browserify({
      entries: './src/app.js',
      extensions: ['.jsx'],
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('compress', function() {
  return gulp.src('./dist/bundle.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function(cb) {
  runSequence('build','compress','css', cb)
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});