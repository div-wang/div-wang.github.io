var gulp = require('gulp'),
    getServe = require('./lib/app.js')
    setProcess = require('./lib/process.js')


gulp.task('serve', getServe({
    port: '3000',
    root: '/'
}))

gulp.task('build', setProcess)

gulp.task('default', ['build', 'serve'])

