var gulp = require('gulp');
var ngHtml2Js = require('gulp-ng-html2js');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task('default', ['html2js', 'styles'], function () {
  return gulp.src(['./src/**/*.js', './dist/views/*.js'])
      .pipe(ngmin())
      .pipe(concat('ngcube.js'))
      .pipe(gulp.dest('./'))
      .pipe(concat('ngcube.min.js'))
      .pipe(uglify({outSourceMaps: true}))
      .pipe(gulp.dest('./'));
});

gulp.task('html2js', ['clean'], function () {
  return gulp.src('./src/**/*.html')
      .pipe(ngHtml2Js({
        moduleName: 'angularjsde.cube',
        prefix: '/src'
      }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function () {
  return gulp.src('./src/**/*.css')
      .pipe(concat('ngcube.css'))
      .pipe(gulp.dest('./'));
})

gulp.task('clean', function () {
  return gulp.src('./dist', {read: false})
      .pipe(clean());
})