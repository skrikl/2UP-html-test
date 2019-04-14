const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const imagemin = require('gulp-imagemin');
 
const cssFiles = [
  "./node_modules/normalize.css/normalize.css",
  "./**/*.css"
];

function styles(){
  return  gulp.src(cssFiles)
              .pipe(concat('styles.css'))
              .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
              }))
              .pipe(cleanCSS({
                  level: 2
              }))
              .pipe(gulp.dest("./dist/css"));
}

function images(cb){
      gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        cb();
};

function html(){
  return gulp.src('./src/index.html')
             .pipe(gulp.dest("./dist"));
}

function watch (){
  gulp.watch('./src/css/**/*.css', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/*.html', html);
}

function clean(){
  return del(['dist/*']);
}

gulp.task("styles", styles);
gulp.task("html", html);
gulp.task("watch", watch);
gulp.task('build', gulp.series(clean,
                               gulp.parallel(styles, scripts, html, images)
                                     ));

function default_task(cb) {
  console.log('Your Pikachu used Default');
  console.log('...');
  console.log('...');
  console.log("It doesn't affect enemy GULP");
  cb();
}
