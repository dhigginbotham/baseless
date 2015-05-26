var gulp = require('gulp'),
    gless = require('gulp-less'),
    gkss = require('gulp-kss'),
    gconcat = require('gulp-concat'),
    gminifyCss = require('gulp-minify-css'),
    gfilesize = require('gulp-filesize'),
    gutil = require('gulp-util'),
    path = require('path');

gulp.task('less', function() {
 return gulp.src('less/style.less')
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

gulp.task('watch', function() {
  gulp.watch('less/**/*.less', ['less']);
});

gulp.task('go', ['less', 'watch']);