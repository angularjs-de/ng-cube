var gulp = require('gulp');
var ngHtml2Js = require("gulp-ng-html2js");

gulp.task('default', function(){
  gulp.src("./src/**/*.html")
      .pipe(ngHtml2Js({
        moduleName: "cubeApp",
        prefix: "/src"
      }))
      .pipe(gulp.dest("./dist"));
});
