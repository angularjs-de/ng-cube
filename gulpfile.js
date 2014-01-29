var gulp = require('gulp');
var ngHtml2Js = require("gulp-ng-html2js");
var ngmin = require('gulp-ngmin');

gulp.task('default', function(){




  gulp.src("./src/**/*.js")
      .pipe(ngmin())
      .pipe(gulp.dest("./dist"));



  gulp.src("./src/**/*.html")
      .pipe(ngHtml2Js({
        moduleName: "cubeApp",
        prefix: "/src"
      }))
      .pipe(gulp.dest("./dist"));
});
