var gulp = require('gulp'),
    gless = require('gulp-less'),
    gconcat = require('gulp-concat'),
    gshell = require('gulp-shell'),
    gclean = require('gulp-clean'),
    grename = require('gulp-rename'),
    gshot = require('gulp-local-screenshots'),
    gpages = require('gulp-gh-pages'),
    gmincss = require('gulp-minify-css'),
    gfilesize = require('gulp-filesize'),
    gutil = require('gulp-util'),
    path = require('path');

gulp.task('less', function() {
  gulp.src('less/style.less')
      .pipe(gless())
      .pipe(gmincss())
      .pipe(gconcat('style.min.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gfilesize())
      .on('error', gutil.log);
});

gulp.task('clean', function() {
  gulp.src(['dist/**/*','styleguide/**/*'], {read: false})
    .pipe(gclean({force: true}))
    .on('error', gutil.log);
});

gulp.task('styleguide:readme', function() {
  gulp.src('less/styleguide.md', {read: false})
      .pipe(gclean({force: true}))
      .on('error', gutil.log);

  gulp.src('./README.md')
      .pipe(grename('styleguide.md'))
      .pipe(gulp.dest('less/'))
      .on('error', gutil.log);
});

gulp.task('styleguide:less', function() {
  gulp.src('less/style.less')
      .pipe(gless())
      .pipe(gconcat('public/style.css'))
      .pipe(gulp.dest('less/templates/styleguide/'))
      .on('error', gutil.log);
});

gulp.task('styleguide:kss', gshell.task([
    'kss-node <%= source %> <%= destination %> --template <%= template %> --css <%= css %> --title "<%= title %>"'
  ], {
    templateData: {
      source:       path.join(__dirname, 'less'),
      destination:  path.join(__dirname, 'styleguide'),
      template:     path.join(__dirname, 'less', 'templates', 'styleguide'),
      css:          'public/style.css',
      title:        'BASELESS'
    }
  }
));

gulp.task('styleguide:kss:less', gshell.task([
    'lessc --verbose <%= input %> <%= output %>'
  ], {
    templateData: {
      input: path.join(__dirname, 'less', 'templates', 'styleguide', 'public', 'kss.less'),
      output: path.join(__dirname, 'less', 'templates', 'styleguide', 'public', 'kss.css')
    }
  }
));

gulp.task('styleguide:ghpages', function() {
  gulp.src('./styleguide/**/*')
      .pipe(gpages());
});

gulp.task('styleguide:screenshots', function() {
  gulp.src('styleguide/**/*.html')
      .pipe(gshot({
        width: ['1280', '1024', '768', '600', '480', '320'],
        folder: 'screenshots/',
        path: 'styleguide/',
        type: 'png'
      }))
      .on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch('less/**/*.less', ['less', 'styleguide:less', 'styleguide:kss']);
});

gulp.task('go', ['less', 'styleguide:less', 'styleguide:kss', 'watch']);
gulp.task('styleguide', ['less', 'styleguide:less', 'styleguide:readme', 'styleguide:kss']);