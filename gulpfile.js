const gulp = require('gulp');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');

const src = 'src';
const dist = 'dist';

// ----------------------------------------------------------------------------
// tasks for development
// ----------------------------------------------------------------------------

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: `${src}`
    }
  });
});

gulp.task('sass', () => {
  return gulp.src(`${src}/scss/**/*.scss`)
    .pipe(sass())
    .pipe(gulp.dest(`${src}/css`))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browser-sync', 'sass'], () => {
  gulp.watch(`${src}/scss/**/*.scss`, ['sass']);
  gulp.watch(`${src}/*.html`, browserSync.reload);
  gulp.watch(`${src}/js/**/*.js`, browserSync.reload);
});


// ----------------------------------------------------------------------------
// tasks for the dist build
// ----------------------------------------------------------------------------

gulp.task('html', ['clean:dist'], () => {
  return gulp.src(`${src}/*.html`)
    .pipe(useref())
    .pipe(gulpif('*.css', postcss([
      autoprefixer({ browsers: ['last 2 version']}),
      cssnano()
    ])))
    .pipe(gulp.dest(`${dist}`));
});

gulp.task('clean:dist', () => {
  return del.sync(`${dist}`);
});
