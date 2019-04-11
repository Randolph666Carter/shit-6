var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant');

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.+(sass|scss)')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream())
});

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
    gulp.watch('./app/sass/**/*.+(sass|scss)', gulp.series('sass'));
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('min-css', function() {
  return gulp.src('./app/css/style.css')
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./app/css/min-css'));
});

gulp.task('img', function() {
  return gulp.src('./app/img/**/*')
  .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]))
  .pipe(gulp.dest('./app/img/min-img'));
});





// del      = require('del');

// gulp.task('clean', function() {
//   return del.sync('dist');
// });

// gulp.task('build', function() {
//   return gulp.src('./app/css/min-css/*.css')
//   .pipe(gulp.dest('./dist/css'));
//   return gulp.src('./app/fonts/**/*')
//   .pipe(gulp.dest('./dist/fonts'));
//   return gulp.src('./app/js/**/*.js')
//   .pipe(gulp.dest('./dist/js'));
//   return gulp.src('./app/*.html')
//   .pipe(gulp.dest('./dist'));
//   return gulp.src('./app/min-img')
//   .pipe(gulp.dest('./dist/img'));
// });
