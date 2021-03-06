var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(['./assets/js/*.js', './*.html', './assets/css/*css']).on('change', browserSync.reload);
});