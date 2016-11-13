var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver');

var src = './'

gulp.task('js', function()
{
  gulp.src('./js/app.js')
      .pipe(browserify(
      {
        transform: 'reactify',
        debug: true
      }))
      .on('error', function (err) 
      {
        console.error('Error!', err.message);
      })
      .pipe(gulp.dest('./builds/js'));
});

gulp.task('webserver', function()
{
  gulp.src(src)
      .pipe(webserver(
      {
        livereload: true,
        open: true
      }));
});

gulp.task('watch', function()
{
  gulp.watch('./js/*.js', ['js']);
});

gulp.task('default', ['watch','js', 'webserver']);