var gulp = require('gulp'),
    gless = require('gulp-less'),
    gconcat = require('gulp-concat'),
    gshell = require('gulp-shell'),
    gclean = require('gulp-clean'),
    gpages = require('gulp-gh-pages'),
    gminifyCss = require('gulp-minify-css'),
    gfilesize = require('gulp-filesize'),
    gutil = require('gulp-util'),
    path = require('path');

gulp.task('less', function() {
  gulp.src('less/style.less')
      .pipe(gless())
      .pipe(gminifyCss())
      .pipe(gconcat('style.min.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gfilesize())
      .on('error', gutil.log);
});

gulp.task('styleguide:clean', function() {
  gulp.src(['styleguide/**/*'], {read: false})
    .pipe(gclean({force: true}));
});

gulp.task('styleguide:less', function() {
  gulp.src('less/style.less')
      .pipe(gless())
      .pipe(gconcat('public/style.css'))
      .pipe(gulp.dest('styleguide/'));
});

gulp.task('styleguide:kss', gshell.task([
    'kss-node <%= source %> <%= destination %> --template <%= template %> --css <%= css %> --title "<%= title %>"'
  ], {
    templateData: {
      source:       path.join(__dirname, 'less'),
      destination:  path.join(__dirname, 'styleguide'),
      template:     path.join(__dirname, 'less', 'templates', 'styleguide'),
      css:          'public/style.css',
      title:        'BASELESS Minimal UI Framework'
    }
  }
));

gulp.task('styleguide:ghpages', function() {
  gulp.src('./styleguide/**/*')
      .pipe(gpages());
});

gulp.task('watch', function() {
  gulp.watch('less/**/*.less', ['less', 'styleguide:kss', 'styleguide:less']);
});

gulp.task('go', ['less', 'styleguide:kss', 'styleguide:less', 'watch']);
gulp.task('gh', ['less', 'styleguide:kss', 'styleguide:less', 'styleguide:ghpages']);