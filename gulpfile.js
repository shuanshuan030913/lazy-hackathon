/* eslint no-param-reassign: "off" */
const {
  src, dest, watch, parallel,
} = require('gulp');

const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-csso');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');

function css() {
  return src('./css/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(minifyCSS())
    .pipe(concat('all.css'))
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(dest('./build'));
}

function js() {
  return src('./js/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(dest('./build'));
}

function html() {
  return src('./view/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(dest('./'));
}

function isWatch() {
  watch('./view/*.html', html);
  watch('./css/scss/*.scss', css);
  watch('./js/*.js', js);
}
exports.default = parallel(css, js, html, isWatch);
