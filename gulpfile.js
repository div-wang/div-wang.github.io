var gulp = require('gulp'),
  sass = require('gulp-sass'),
  swig = require('gulp-swig'),
  serve = require('gulp-serve'),
  markdown = require('gulp-markdown');

gulp.task('serve', serve({
  port: '3000',
  root: ['.']
}))

gulp.task('css', function() {
  gulp.src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'))
})

gulp.task('html', function() {
  var time = new Date().getTime()
  gulp.src('./src/html/index.html')
    .pipe(swig({
      defaults: {
        cache: false,
        locals: {
          time: time
        }
      }
    }))
    .pipe(gulp.dest('.'))
})

gulp.task('blog', function() {
  var time = new Date().getTime()
  gulp.src('./src/blog/index.html')
    .pipe(swig({
      defaults: {
        cache: false,
        locals: {
          time: time
        }
      }
    }))
    .pipe(gulp.dest('./blog'))
})


gulp.task('md', function () {
    gulp.src('./src/blog/*.md')
      .pipe(markdown())
      .pipe(gulp.dest('./blog'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', ['css'])
  gulp.watch('./src/html/*.html', ['html'])
  gulp.watch('./src/blog/*.md', ['html'])
})

gulp.task('build', ['css', 'blog', 'html'])

gulp.task('default', ['build', 'watch', 'serve'])
