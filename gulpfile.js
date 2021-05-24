// プラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");

// Sassコンパイルタスクの定義
gulp.task("default", function() {
  return gulp.src("src/scss/style.scss")
    .pipe(sassGlob()) // Sassの@importにおけるglobを有効にする
    .pipe(sass({
      // コンパイル時の整形
      outputStyle: 'expanded'
    }))
    .on('error', sass.logError)
    .pipe(gulp.dest("dest/css"));
});
