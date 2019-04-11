var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

//sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.+(sass|scss)')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
  gulp.watch('./app/sass/**/*.+(sass|scss)', gulp.series('sass'))
});
