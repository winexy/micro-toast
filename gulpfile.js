const gulp = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

exports.default = () => 
  gulp.src('./src/css/styles.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('toast.min.css'))
    .pipe(gulp.dest('dist'))
