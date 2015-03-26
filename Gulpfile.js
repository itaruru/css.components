var del      = require('del')
  , gulp     = require('gulp')
  , gsass    = require('gulp-sass')
  , gkss     = require('gulp-kss')
  , gconcat  = require('gulp-concat')
  , runseq   = require('run-sequence')
  , bourbon  = require('node-bourbon');
;

bourbon.with('src/*.scss');

gulp.task('clean', function(cb) {
  return del([
    'dist/',
    'docs/'
  ], cb);
});

gulp.task('kss', function() {
  return gulp.src('src/*.scss')
    .pipe(gkss({
      overview:          'src/styleguide.md',
      templateDirectory: 'helpers/kss_template'
    }))
    .pipe(gulp.dest('docs/'))
  ;
});

gulp.task('kss-concat', function() {
  return gulp.src('src/*.scss')
    .pipe(gsass({
      includePaths: bourbon.includePaths,
      outputStyle: 'compressed'
    }))
    .pipe(gconcat('public/style.css'))
    .pipe(gulp.dest('docs/'))
  ;
});

gulp.task('kss-copy', function() {
  return gulp.src('helpers/assets/*')
    .pipe(gulp.dest('docs/assets/'))
  ;
});

gulp.task('docs', function() {
  runseq('clean', 'kss-concat', 'kss-copy', 'kss')
});

gulp.task('default', function() {});
