var gulp = require('gulp'),
    gless = require('gulp-less'),
    gkss = require('gulp-kss'),
    gconcat = require('gulp-concat'),
    gshell = require('gulp-shell'),
    gclean = require('gulp-clean'),
    gminifyCss = require('gulp-minify-css'),
    gfilesize = require('gulp-filesize'),
    gutil = require('gulp-util'),
    path = require('path');

gulp.task('less', function() {
  gulp.src('less/style.less')
      .pipe(gless({
        paths: [
          path.join(__dirname, 'less', 'components'),
          path.join(__dirname, 'less', 'templates')
        ]
      }))
      .pipe(gminifyCss())
      .pipe(gconcat('style.min.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gfilesize())
      .on('error', gutil.log);
});

// this is the kss gulp task we run to generate
// the styleguide for BASELESS
gulp.task('kss', function() {
  // clean our styleguide folder out before
  // we create the styleguide.
  gulp.src(['styleguide/*', 'styleguide/**/*'], {read: false})
      .pipe(gclean({force: true}));

  // runs through all our less files to make
  // our styleguide
  gulp.src(['less/*.less', 'less/**/*.less'])
      .pipe(gkss({
        overview: __dirname + '/less/styleguide.md'
      }))
      .on('error', gutil.log)
      .pipe(gulp.dest('styleguide/'));

  // build our less so we get context to 
  // the components to style
  gulp.src('less/style.less')
      .pipe(gless())
      .pipe(gconcat('public/style.css'))
      .pipe(gulp.dest('styleguide/'));
});

gulp.task('watch', function() {
  gulp.watch('less/**/*.less', ['less']);
});

gulp.task('go', ['less', 'watch']);