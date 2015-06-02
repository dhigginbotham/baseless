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
    path = require('path');

// compile and put minified less file into the
// dist/ folder
gulp.task('less', function() {
  gulp.src('less/style.less')
      .pipe(gless())
      .pipe(gmincss())
      .pipe(gconcat('style.min.css'))
      .pipe(gulp.dest('dist'))
      .pipe(gfilesize())
      .on('error', gutil.log);
});

// cleans the project
gulp.task('clean', function() {
  gulp.src(['dist/**/*','styleguide/**/*'], {read: false})
    .pipe(gclean({force: true}))
    .on('error', gutil.log);
});

// turns our readme into the styleguide
gulp.task('styleguide:readme', function() {
  gulp.src('less/styleguide.md', {read: false})
      .pipe(gclean({force: true}))
      .on('error', gutil.log);

  gulp.src('./README.md')
      .pipe(grename('styleguide.md'))
      .pipe(gulp.dest('less/'))
      .on('error', gutil.log);
});

// builds the specific less file for our styleguide
gulp.task('styleguide:less', function() {
  gulp.src('less/style.less')
      .pipe(gless())
      .pipe(gmincss())
      .pipe(gconcat('public/style.css'))
      .pipe(gulp.dest('less/templates/styleguide/'))
      .on('error', gutil.log);
});

// runs the kss lib
gulp.task('styleguide:kss', gshell.task([
    'kss-node <%= source %> <%= destination %> --template <%= template %> --css <%= css %> --title "<%= title %>" --cssPrefix "<%= cssPrefix %>" --helpers "<%= helpers %>" --placeholder "<%= placeholder %>'
  ], {
    templateData: {
      source:       path.join(__dirname, 'less'),
      destination:  path.join(__dirname, 'styleguide'),
      template:     path.join(__dirname, 'less', 'templates', 'styleguide'),
      css:          'public/style.css',
      title:        'BASELESS',
      helpers:      path.join(__dirname, 'less', 'templates', 'styleguide', 'helpers'),
      placeholder:  '',
      cssPrefix:    'bs-'
    }
  }
));

// build the less file from the kss build
gulp.task('styleguide:kss:less', gshell.task([
    'lessc --verbose <%= input %> <%= output %>'
  ], {
    templateData: {
      input: path.join(__dirname, 'less', 'templates', 'styleguide', 'public', 'kss.less'),
      output: path.join(__dirname, 'less', 'templates', 'styleguide', 'public', 'kss.css')
    }
  }
));

// does the whole ghpages process
gulp.task('styleguide:ghpages', function() {
  gulp.src('./styleguide/**/*')
      .pipe(gpages());
});

// makes screenshots
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

gulp.task('styleguide:parker', function() {
  gulp.src('./dist/style.min.css')
    .pipe(gparker({
      file: './dist/bs-stats.md',
      title: 'BASELESS CSS Stats',
      metrics: [
          'TotalStylesheets',
          'TotalStylesheetSize',
          'TotalRules',
          'TotalSelectors',
          'TotalIdentifiers',
          'TotalDeclarations',
          'SelectorsPerRule',
          'IdentifiersPerSelector',
          'SpecificityPerSelector',
          'TopSelectorSpecificity',
          'TopSelectorSpecificitySelector',
          'TotalIdSelectors',
          'TotalUniqueColours',
          'TotalImportantKeywords',
          'TotalMediaQueries'
      ]}))
    .on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(['less/**/*.less', '!less/templates/styleguide/public/*.less'], ['less', 'styleguide:less', 'styleguide:kss']);
  gulp.watch('./README.md', ['styleguide:readme']);
  gulp.watch('less/templates/styleguide/public/*.less', ['styleguide:kss:less']);
});

gulp.task('go', ['less', 'styleguide:less', 'styleguide:kss', 'watch']);

gulp.task('styleguide', ['less', 'styleguide:less', 'styleguide:parker', 'styleguide:readme', 'styleguide:kss']);