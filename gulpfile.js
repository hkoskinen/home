const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const header = require('gulp-header');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const SRC = './src';
const ASSETS = './src/assets';

gulp.task('browser-sync', () => {
  browserSync.init({
    server: SRC
  });
  gulp.watch(`${ASSETS}/scss/*.scss`, ['sass']);
  gulp.watch(`${SRC}/*.html`).on('change', browserSync.reload);
});

gulp.task('sass', () => {
  return gulp.src(`${ASSETS}/scss/*.scss`)
    .pipe(sass())
    .pipe(header(`/* home - ${new Date()} - hkoskinen */\n`))
    .pipe(gulp.dest(`${ASSETS}/css`))
    .pipe(browserSync.stream());
});

gulp.task('start', ['browser-sync']);
