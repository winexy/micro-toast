const gulp = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

exports.default = () => 
  gulp.src('./src/css/styles.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('dist'))
