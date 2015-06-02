var gulp = require('gulp'),
    gless = require('gulp-less'),
    gconcat = require('gulp-concat'),
    gshell = require('gulp-shell'),
    gclean = require('gulp-clean'),
    grename = require('gulp-rename'),
    gparker = require('gulp-parker'),
    gshot = require('gulp-local-screenshots'),
    gpages = require('gulp-gh-pages'),
    gmincss = require('gulp-minify-css'),
    gfilesize = require('gulp-filesize'),
    gutil = require('gulp-util'),
    path = require('path'),
    conf = require('./config'),
    tasks = conf.tasks;

gulp.task(tasks.clean.name, function() {
  gulp.src(tasks.clean.src, {read: false})
    .pipe(gclean({force: true}))
    .on('error', gutil.log);
});

gulp.task(tasks.dist.name, function() {
  gulp.src(tasks.dist.src)
    .pipe(gless(tasks.less.opts))
    .pipe(gmincss())
    .pipe(gconcat(tasks.less.dest.file))
    .pipe(gulp.dest(tasks.less.dest.path))
    .pipe(gfilesize())
    .on('error', gutil.log);
});

gulp.task(tasks.readme.name, function() {
  gulp.src(tasks.readme.src)
    .pipe(grename(tasks.readme.dest.file))
    .pipe(gulp.dest(tasks.readme.dest.path))
    .on('error', gutil.log);
});

gulp.task(tasks.kss.name, 
  gshell.task([tasks.kss.exec], 
  {templateData: tasks.kss.opts}
));

gulp.task(tasks.kss.less.name,
  gshell.task([tasks.kss.less.exec],
  {templateData: tasks.kss.less.opts}
));

gulp.task(tasks.less.name, function() {
  gulp.src(tasks.less.src)
    .pipe(gless(tasks.less.opts))
    .pipe(gmincss())
    .pipe(gconcat(tasks.less.dest.file))
    .pipe(gulp.dest(tasks.less.dest.path))
    .on('error', gutil.log);
});

gulp.task(tasks.screens.name, function() {
  gulp.src(tasks.screens.src)
    .pipe(gshot(tasks.screens.opts))
    .on('error', gutil.log);
});

gulp.task(tasks.ghpages.name, function() {
  gulp.src(tasks.ghpages.src)
    .pipe(gpages());
});

gulp.task(tasks.parker.name, function() {
  gulp.src(tasks.parker.src)
    .pipe(gparker(tasks.parker.opts))
    .on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(['less/**/*.less', '!less/templates/styleguide/public/*.less'], [tasks.dist.name, tasks.less.name, tasks.kss.name]);
  gulp.watch('./README.md', [tasks.readme.name, 'styleguide']);
  gulp.watch('less/templates/styleguide/public/*.less', [tasks.kss.less.name]);
});

gulp.task('go', [tasks.dist.name, tasks.less.name, tasks.kss.name, 'watch']);
gulp.task('styleguide', [tasks.dist.name, tasks.less.name, tasks.parker.name, tasks.readme.name, tasks.kss.name, tasks.screens.name]);