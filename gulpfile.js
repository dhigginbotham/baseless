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


// CLEAN PROJECT TASK
// if things get weird, you can fix them with this
gulp.task(tasks.clean.name, function() {
  gulp.src(tasks.clean.src, {read: false})
    .pipe(gclean({force: true}))
    .on('error', gutil.log);
});

// DIST LESS TASK
// compiles, minifies, concats distributed version 
// of baseless
gulp.task(tasks.dist.name, function() {
  gulp.src(tasks.dist.src)
    .pipe(gless(tasks.less.opts))
    .pipe(gmincss())
    .pipe(gconcat(tasks.dist.dest.file))
    .pipe(gulp.dest(tasks.dist.dest.path))
    .pipe(gfilesize())
    .on('error', gutil.log);
});

// README TASK
// grabs the lastest copy of readme.md and renames
// it to `styleguide.md` inside of the template
// folder so we can use it as our homepage of the
// styleguide
gulp.task(tasks.readme.name, function() {
  gulp.src(tasks.readme.src)
    .pipe(grename(tasks.readme.dest.file))
    .pipe(gulp.dest(tasks.readme.dest.path))
    .on('error', gutil.log);
});

// KSS TASK
// child process to [kss-node](#) that builds the
// 'living' styleguide
gulp.task(tasks.kss.name, 
  gshell.task([tasks.kss.exec], 
  {templateData: tasks.kss.opts}
));

// KSS TEMPLATE LESS TASK
// compiles the less files specific to the 
// styleguides template
gulp.task(tasks.kss.less.name,
  gshell.task([tasks.kss.less.exec],
  {templateData: tasks.kss.less.opts}
));

// LESS TASK
// base less task for compiling baseless framework,
// this one specifically gets delivered to the 
// styleguide, and is not the `dist` task
gulp.task(tasks.less.name, function() {
  gulp.src(tasks.less.src)
    .pipe(gless(tasks.less.opts))
    .pipe(gmincss())
    .pipe(gconcat(tasks.less.dest.file))
    .pipe(gulp.dest(tasks.less.dest.path))
    .on('error', gutil.log);
});

// SCREENSHOTS TASK
// task to take basic screenshots of various
// device widths, helpful for pixel diffing
gulp.task(tasks.screens.name, function() {
  gulp.src(tasks.screens.src)
    .pipe(gshot(tasks.screens.opts))
    .on('error', gutil.log);
});

// GHPAGES TASK
// automate ghpages! we want this as easy
// as possible, no excuses
gulp.task(tasks.ghpages.name, function() {
  gulp.src(tasks.ghpages.src)
    .pipe(gpages());
});

// PARKER TASK
// generates [parker](#) stats based on our
// stylesheet, lists various important selector
// information
gulp.task(tasks.parker.name, function() {
  gulp.src(tasks.parker.src)
    .pipe(gparker(tasks.parker.opts))
    .on('error', gutil.log);
});

// WATCH TASK
// handles all the specific files in the framework
// that should be watched on, allows us to dev like
// a boss
gulp.task('watch', function() {
  gulp.watch(['less/**/*.less', '!less/templates/styleguide/public/*.less'], [tasks.dist.name, tasks.less.name, tasks.kss.name]);
  gulp.watch('./README.md', [tasks.readme.name, 'styleguide']);
  gulp.watch('less/templates/styleguide/public/*.less', [tasks.kss.less.name]);
});

// STYLEGUIDE TASK
// collection of styleguide related tasks so we can 
// prepare for distribution
gulp.task('styleguide', [tasks.less.name, tasks.dist.name, tasks.readme.name, tasks.kss.name, tasks.screens.name, tasks.parker.name]);

// DEFAULT TASK
// ...
gulp.task('default', [tasks.less.name, tasks.dist.name, tasks.kss.name, 'watch']);