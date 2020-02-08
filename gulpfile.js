const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const c = require('ansi-colors');

function ourErrors(err) {
  console.log(c.red("----------------"));
  console.log(c.red(err.formatted));
  console.log(c.red("----------------"));
  this.emit("end");
}

function compileSass(cb) {
    gulp.src('./sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle : "expanded"}).on('error', ourErrors))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
    cb();
}

function watcher(cb) {
  gulp.watch('./sass/**/*.scss', gulp.series(compileSass));
}

exports.default = gulp.parallel(compileSass, watcher);